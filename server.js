// Сервер сайта-визитки: отдаёт страницу и принимает заявки.
//
// Здесь выполняется всё, что нельзя доверить браузеру: повторная проверка полей,
// запись в PostgreSQL и отправка уведомления в Telegram. Секреты берутся только
// из переменных окружения и в браузер не попадают никогда.

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// Значения переменных чистим от пробелов: при копировании в панель Railway
// легко прихватить лишний пробел, и тогда, например, Telegram не найдёт чат.
const env = (name) => (process.env[name] || '').trim();

const DATABASE_URL = env('DATABASE_URL');
const TELEGRAM_BOT_TOKEN = env('TELEGRAM_BOT_TOKEN');
const TELEGRAM_CHAT_ID = env('TELEGRAM_CHAT_ID');

// ===== Раздача файлов сайта =====
// Список разрешённых файлов, а не запрещённых: так наружу не попадут
// ни server.js, ни package.json, ни заметки вроде design.md и CLAUDE.md.

const PAGE_FILES = new Set(['index.html', 'styles.css', 'script.js']);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function resolveStaticFile(urlPath) {
  let name;
  try {
    name = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }

  name = name === '/' ? 'index.html' : name.replace(/^\/+/, '');

  const allowed = PAGE_FILES.has(name) || /^images\/[A-Za-z0-9._-]+$/.test(name);
  if (!allowed) return null;

  const full = path.resolve(ROOT, name);
  if (full !== ROOT && !full.startsWith(ROOT + path.sep)) return null;
  return full;
}

function serveStatic(req, res) {
  const file = resolveStaticFile(req.url);
  if (!file) return send(res, 404, 'text/plain; charset=utf-8', 'Not found');

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      return send(res, 404, 'text/plain; charset=utf-8', 'Not found');
    }

    const ext = path.extname(file).toLowerCase();
    // Страницу и код не кешируем, чтобы правки были видны сразу.
    // Картинки меняются редко — их можно держать в кеше сутки.
    const cache = ext === '.html' || ext === '.css' || ext === '.js'
      ? 'no-cache'
      : 'public, max-age=86400';

    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff'
    });

    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).pipe(res);
  });
}

function send(res, status, type, body) {
  res.writeHead(status, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff' });
  res.end(body);
}

function sendJson(res, status, data) {
  send(res, status, 'application/json; charset=utf-8', JSON.stringify(data));
}

// ===== Проверка полей =====
// Те же правила, что и в браузере (script.js). Проверку в браузере легко обойти,
// поэтому здесь она делается заново и присланному не доверяем.

const SERVICES = {
  landing: 'Лендинг или сайт-визитка',
  design: 'Дизайн-макет',
  publish: 'Публикация и домен',
  leads: 'Заявки и Telegram-бот',
  other: 'Другое'
};

const RE_PHONE = /^[+(]?\d[\d\s()\-.]{5,}$/;
const RE_TELEGRAM = /^@?[A-Za-z0-9_]{4,32}$/;
const RE_TELEGRAM_LINK = /^(https?:\/\/)?t\.me\/[A-Za-z0-9_]{4,32}\/?$/i;

function asText(value, limit) {
  return typeof value === 'string' ? value.trim().slice(0, limit) : '';
}

// Возвращает ключи сообщений — те же, что в словарях script.js.
// Переводит их браузер, поэтому сервер не знает языков.
function validate(body) {
  const data = {
    name: asText(body.name, 80),
    contact: asText(body.contact, 120),
    service: asText(body.service, 40),
    comment: asText(body.comment, 2000),
    lang: ['uk', 'ru', 'en'].includes(body.lang) ? body.lang : 'uk'
  };

  const errors = {};

  if (!data.name) errors.name = 'errNameEmpty';
  else if (data.name.length < 2) errors.name = 'errNameShort';

  if (!data.contact) errors.contact = 'errContactEmpty';
  else if (!(RE_PHONE.test(data.contact) || RE_TELEGRAM.test(data.contact) || RE_TELEGRAM_LINK.test(data.contact))) {
    errors.contact = 'errContactBad';
  }

  if (!SERVICES[data.service]) errors.service = 'errServiceEmpty';

  if (data.comment.length > 1000) errors.comment = 'errCommentLong';

  return { data, errors };
}

// ===== База данных =====

const pool = DATABASE_URL ? new pg.Pool({ connectionString: DATABASE_URL, max: 4 }) : null;

async function prepareDatabase() {
  if (!pool) {
    console.error('[база] DATABASE_URL не задана — заявки принимать некуда');
    return false;
  }
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id         bigserial PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        name       text NOT NULL,
        contact    text NOT NULL,
        service    text NOT NULL,
        comment    text,
        lang       text
      )
    `);
    console.log('[база] таблица leads готова');
    return true;
  } catch (error) {
    console.error('[база] не удалось подготовить таблицу:', error.message);
    return false;
  }
}

async function saveLead(data) {
  const result = await pool.query(
    `INSERT INTO leads (name, contact, service, comment, lang)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, created_at`,
    [data.name, data.contact, data.service, data.comment || null, data.lang]
  );
  return result.rows[0];
}

// ===== Уведомление в Telegram =====

async function notifyTelegram(lead, data) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.error('[telegram] нет TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID — уведомление не отправлено');
    return false;
  }

  const lines = [
    'Новая заявка с сайта',
    '',
    'Имя: ' + data.name,
    'Связь: ' + data.contact,
    'Нужно: ' + SERVICES[data.service]
  ];
  if (data.comment) lines.push('Комментарий: ' + data.comment);
  lines.push('', 'Язык страницы: ' + data.lang, 'Заявка №' + lead.id);

  const stop = AbortSignal.timeout(8000);

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: lines.join('\n') }),
      signal: stop
    });

    if (!response.ok) {
      // В ответе Telegram нет токена, но описание ошибки полезно в журнале
      const detail = await response.text().catch(() => '');
      console.error('[telegram] ответ ' + response.status + ': ' + detail.slice(0, 300));
      return false;
    }

    console.log('[telegram] уведомление о заявке №' + lead.id + ' отправлено');
    return true;
  } catch (error) {
    console.error('[telegram] не удалось отправить:', error.message);
    return false;
  }
}

// ===== Ограничение частоты =====
// Простая защита от потока заявок с одного адреса. Хранится в памяти:
// при перезапуске сбрасывается, для одного сайта этого достаточно.

const RATE_LIMIT = 5;
const RATE_WINDOW = 10 * 60 * 1000;
const recent = new Map();

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return req.socket.remoteAddress || 'unknown';
}

function tooManyRequests(ip) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((time) => now - time < RATE_WINDOW);
  hits.push(now);
  recent.set(ip, hits);

  if (recent.size > 1000) {
    for (const [key, times] of recent) {
      if (!times.some((time) => now - time < RATE_WINDOW)) recent.delete(key);
    }
  }

  return hits.length > RATE_LIMIT;
}

// ===== Приём заявки =====

function readBody(req, limit = 10 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function handleLead(req, res) {
  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    return sendJson(res, 400, { ok: false, error: 'bad-request' });
  }

  // Ловушка для ботов: поле скрыто от людей, заполнить его мог только робот.
  // Отвечаем «успех», чтобы бот не подбирал обход, но ничего не сохраняем.
  if (asText(body.company, 100)) {
    console.warn('[заявка] отброшена: заполнено скрытое поле');
    return sendJson(res, 200, { ok: true });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) {
    console.warn('[заявка] не прошла проверку на сервере: ' + Object.keys(errors).join(', '));
    return sendJson(res, 400, { ok: false, errors });
  }

  // Ограничение стоит здесь, а не в начале: считаем только заявки, дошедшие
  // до записи. Иначе человек, пару раз ошибившийся в форме, попал бы в блокировку.
  if (tooManyRequests(clientIp(req))) {
    console.warn('[заявка] слишком много заявок с одного адреса');
    return sendJson(res, 429, { ok: false, error: 'rate' });
  }

  let lead;
  try {
    lead = await saveLead(data);
    console.log('[заявка] №' + lead.id + ' сохранена (' + data.service + ', язык ' + data.lang + ')');
  } catch (error) {
    console.error('[заявка] не удалось записать в базу:', error.message);
    return sendJson(res, 500, { ok: false, error: 'db' });
  }

  // Заявка уже в базе и не потеряна. Если Telegram промолчал, это наша забота,
  // а не посетителя — он видит успех, а сбой попадает в журнал.
  await notifyTelegram(lead, data);

  return sendJson(res, 200, { ok: true, id: lead.id });
}

// ===== Маршруты =====

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];

  if (url === '/api/lead') {
    if (req.method !== 'POST') return sendJson(res, 405, { ok: false, error: 'method' });
    return handleLead(req, res).catch((error) => {
      console.error('[заявка] непредвиденная ошибка:', error.message);
      sendJson(res, 500, { ok: false, error: 'server' });
    });
  }

  if (url === '/api/health') {
    if (!pool) return sendJson(res, 503, { ok: false, database: 'no-url' });
    return pool.query('SELECT 1')
      .then(() => sendJson(res, 200, { ok: true, database: 'ok', telegram: Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) }))
      .catch((error) => {
        console.error('[база] проверка не прошла:', error.message);
        sendJson(res, 503, { ok: false, database: 'error' });
      });
  }

  if (req.method === 'GET' || req.method === 'HEAD') return serveStatic(req, res);
  return send(res, 405, 'text/plain; charset=utf-8', 'Method not allowed');
});

await prepareDatabase();

server.listen(PORT, () => {
  console.log('[сервер] слушает порт ' + PORT);
  console.log('[настройки] база: ' + (DATABASE_URL ? 'есть' : 'НЕТ') +
    ', токен бота: ' + (TELEGRAM_BOT_TOKEN ? 'есть' : 'НЕТ') +
    ', чат для уведомлений: ' + (TELEGRAM_CHAT_ID ? 'есть' : 'НЕТ'));
});

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log('[сервер] останавливаюсь');
    server.close(() => pool?.end().then(() => process.exit(0), () => process.exit(0)));
  });
}
