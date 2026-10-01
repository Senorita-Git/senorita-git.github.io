// Переключатель языков UA (uk) · RU · EN и форма заявки.
// Здесь только то, что происходит в браузере. Запись в базу и Telegram — на сервере (server.js).

const translations = {
  uk: {
    navAbout: 'Про мене',
    navSkills: 'Що я вмію',
    navWorks: 'Проєкти',
    navContacts: 'Контакти',
    heroLead: 'Ваш бізнес в інтернеті за кілька днів: сторінка, після якої хочеться вам написати',
    heroSub: 'Лендинги та сайти-візитки для малого бізнесу за допомогою ШІ',
    cta: 'Залишити заявку',
    ctaTelegram: 'Хочу сайт',
    aboutText: 'Створюю сайти за допомогою ШІ-інструментів — швидко й під задачу клієнта. Допомагаю від ідеї до публікації в інтернеті.',
    skill1: 'Лендинг або сайт-візитка з нуля',
    skill2: 'Дизайн-макет до початку розробки, щоб ви одразу бачили результат',
    skill3: 'Публікація сайту в інтернеті та підключення домену',
    skill4: 'Приймання заявок із сайту та простий Telegram-бот',
    workSoon: 'Незабаром тут з\'явиться проєкт',
    contactMail: 'Пошта',

    leadKicker: 'Заявка',
    leadIntro: 'Розкажіть коротко, що потрібно, — і я відповім вам особисто.',
    fieldName: 'Ім\'я',
    fieldContact: 'Як зв\'язатися',
    fieldService: 'Що потрібно',
    fieldComment: 'Коментар',
    optional: 'не обов\'язково',
    phName: 'Як до вас звертатися',
    phContact: '+380… або @nickname',
    phComment: 'Кілька слів про ваш бізнес і задачу',
    hintContact: 'Телефон або Telegram — як вам зручніше',
    optChoose: 'Оберіть зі списку',
    optLanding: 'Лендинг або сайт-візитка',
    optDesign: 'Дизайн-макет',
    optPublish: 'Публікація та домен',
    optLeads: 'Заявки і Telegram-бот',
    optOther: 'Інше',
    errNameEmpty: 'Напишіть, будь ласка, як до вас звертатися',
    errNameShort: 'Занадто коротко — мінімум дві літери',
    errContactEmpty: 'Залиште телефон або Telegram, щоб я могла відповісти',
    errContactBad: 'Не схоже на телефон чи Telegram — перевірте, будь ласка',
    errServiceEmpty: 'Оберіть, що вам потрібно',
    errCommentLong: 'Занадто довго — максимум 1000 символів',
    statusSending: 'Надсилаю…',
    statusOk: 'Дякую! Заявка надійшла — я відповім вам найближчим часом.',
    statusError: 'Не вдалося надіслати заявку. Спробуйте ще раз або напишіть мені в Telegram.',
    statusCheck: 'Перевірте, будь ласка, виділені поля.',

    consentTitle: 'Файли cookie',
    consentText: 'Сайт використовує Google Analytics, щоб розуміти, що покращити. Дані збираються лише з вашої згоди.',
    consentAccept: 'Прийняти',
    consentDecline: 'Відхилити'
  },

  ru: {
    navAbout: 'Обо мне',
    navSkills: 'Что я умею',
    navWorks: 'Проекты',
    navContacts: 'Контакты',
    heroLead: 'Ваш бизнес в интернете за несколько дней: страница, после которой хочется вам написать',
    heroSub: 'Лендинги и сайты-визитки для малого бизнеса с помощью ИИ',
    cta: 'Оставить заявку',
    ctaTelegram: 'Хочу сайт',
    aboutText: 'Создаю сайты с помощью ИИ-инструментов — быстро и под задачу клиента. Помогаю от идеи до публикации в интернете.',
    skill1: 'Лендинг или сайт-визитка с нуля',
    skill2: 'Дизайн-макет до начала разработки, чтобы вы сразу видели результат',
    skill3: 'Публикация сайта в интернете и подключение домена',
    skill4: 'Приём заявок с сайта и простой Telegram-бот',
    workSoon: 'Скоро здесь появится проект',
    contactMail: 'Почта',

    leadKicker: 'Заявка',
    leadIntro: 'Расскажите коротко, что нужно, — и я отвечу вам лично.',
    fieldName: 'Имя',
    fieldContact: 'Как связаться',
    fieldService: 'Что нужно',
    fieldComment: 'Комментарий',
    optional: 'не обязательно',
    phName: 'Как к вам обращаться',
    phContact: '+380… или @nickname',
    phComment: 'Несколько слов о вашем бизнесе и задаче',
    hintContact: 'Телефон или Telegram — как вам удобнее',
    optChoose: 'Выберите из списка',
    optLanding: 'Лендинг или сайт-визитка',
    optDesign: 'Дизайн-макет',
    optPublish: 'Публикация и домен',
    optLeads: 'Заявки и Telegram-бот',
    optOther: 'Другое',
    errNameEmpty: 'Напишите, пожалуйста, как к вам обращаться',
    errNameShort: 'Слишком коротко — минимум две буквы',
    errContactEmpty: 'Оставьте телефон или Telegram, чтобы я могла ответить',
    errContactBad: 'Не похоже на телефон или Telegram — проверьте, пожалуйста',
    errServiceEmpty: 'Выберите, что вам нужно',
    errCommentLong: 'Слишком длинно — максимум 1000 символов',
    statusSending: 'Отправляю…',
    statusOk: 'Спасибо! Заявка пришла — я отвечу вам в ближайшее время.',
    statusError: 'Не удалось отправить заявку. Попробуйте ещё раз или напишите мне в Telegram.',
    statusCheck: 'Проверьте, пожалуйста, выделенные поля.',

    consentTitle: 'Файлы cookie',
    consentText: 'Сайт использует Google Analytics, чтобы понимать, что улучшить. Данные собираются только с вашего согласия.',
    consentAccept: 'Принять',
    consentDecline: 'Отклонить'
  },

  en: {
    navAbout: 'About',
    navSkills: 'What I do',
    navWorks: 'Projects',
    navContacts: 'Contact',
    heroLead: 'Your business online in a few days: a page that makes people want to reach out',
    heroSub: 'Landing pages and business-card websites for small businesses, built with AI',
    cta: 'Leave a request',
    ctaTelegram: 'I want a website',
    aboutText: 'I build websites with AI tools — quickly and around each client\'s goals. I\'ll take you from the first idea to going live.',
    skill1: 'A landing page or business-card website from scratch',
    skill2: 'A design mockup before development, so you see the result right away',
    skill3: 'Publishing your site and connecting a domain',
    skill4: 'Collecting leads from your site and a simple Telegram bot',
    workSoon: 'A project is coming soon',
    contactMail: 'Email',

    leadKicker: 'Request',
    leadIntro: 'Tell me briefly what you need — I\'ll reply personally.',
    fieldName: 'Name',
    fieldContact: 'How to reach you',
    fieldService: 'What you need',
    fieldComment: 'Comment',
    optional: 'optional',
    phName: 'What should I call you',
    phContact: '+380… or @nickname',
    phComment: 'A few words about your business and your goal',
    hintContact: 'A phone number or Telegram — whichever suits you',
    optChoose: 'Choose from the list',
    optLanding: 'Landing or business-card site',
    optDesign: 'Design mockup',
    optPublish: 'Publishing and domain',
    optLeads: 'Leads and Telegram bot',
    optOther: 'Something else',
    errNameEmpty: 'Please tell me what to call you',
    errNameShort: 'Too short — at least two letters',
    errContactEmpty: 'Leave a phone number or Telegram so I can reply',
    errContactBad: 'That doesn\'t look like a phone number or Telegram — please check',
    errServiceEmpty: 'Please choose what you need',
    errCommentLong: 'Too long — 1000 characters maximum',
    statusSending: 'Sending…',
    statusOk: 'Thank you! Your request has arrived — I\'ll reply shortly.',
    statusError: 'The request could not be sent. Please try again or write to me on Telegram.',
    statusCheck: 'Please check the highlighted fields.',

    consentTitle: 'Cookies',
    consentText: 'This site uses Google Analytics to understand what to improve. Data is only collected with your consent.',
    consentAccept: 'Accept',
    consentDecline: 'Decline'
  }
};

const STORAGE_KEY = 'yv-lang';
const DEFAULT_LANG = 'uk';
const TELEGRAM_URL = 'https://t.me/yuliyaverhoglyad';

let currentLang = DEFAULT_LANG;

function t(key) {
  const dict = translations[currentLang] || translations[DEFAULT_LANG];
  return dict[key] || '';
}

// ===== Переключатель языков =====

const langButtons = document.querySelectorAll('.lang__btn');

function setLang(lang) {
  currentLang = translations[lang] ? lang : DEFAULT_LANG;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const text = t(el.dataset.i18n);
    if (text) el.textContent = text;
  });

  // Подсказки внутри полей формы
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const text = t(el.dataset.i18nPlaceholder);
    if (text) el.placeholder = text;
  });

  // Сообщения, которых нет в разметке: показанные ошибки и статус отправки
  document.querySelectorAll('[data-msg-key]').forEach((el) => {
    const text = t(el.dataset.msgKey);
    if (text) el.textContent = text;
  });

  document.documentElement.lang = currentLang;

  langButtons.forEach((btn) => {
    const active = btn.dataset.lang === currentLang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active);
  });

  try { localStorage.setItem(STORAGE_KEY, currentLang); } catch (e) {}
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// ===== Согласие на аналитику (Google Consent Mode v2) =====
// В index.html по умолчанию задан отказ (gtag('consent', 'default', {...denied})).
// Сам файл gtag.js при этом вообще не подключён — счётчик физически не может
// ничего отправить в Google, пока человек не нажмёт «Прийняти». Это строже,
// чем просто выставить Consent Mode: обычно gtag.js загружается сразу и шлёт
// обезличенные «cookieless»-пинги даже при отказе, а здесь до согласия
// на сервер Google не уходит вообще ничего.
const GA_ID = 'G-W05ZD5TLJH';
const CONSENT_KEY = 'yv-consent';

const consentBanner = document.getElementById('consent');
const consentAcceptBtn = document.getElementById('consent-accept');
const consentDeclineBtn = document.getElementById('consent-decline');

let gaLoaded = false;

function loadAnalytics() {
  if (gaLoaded) return;
  gaLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);
  gtag('js', new Date());
  gtag('config', GA_ID);
}

function hideConsentBanner() {
  if (consentBanner) consentBanner.hidden = true;
}

function saveConsent(value) {
  try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
}

if (consentAcceptBtn) {
  consentAcceptBtn.addEventListener('click', () => {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadAnalytics();
    saveConsent('granted');
    hideConsentBanner();
  });
}

if (consentDeclineBtn) {
  consentDeclineBtn.addEventListener('click', () => {
    // Счётчик и так не загружен — просто запоминаем выбор, чтобы не спрашивать снова
    saveConsent('denied');
    hideConsentBanner();
  });
}

let storedConsent = null;
try { storedConsent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

if (storedConsent === 'granted') {
  gtag('consent', 'update', { analytics_storage: 'granted' });
  loadAnalytics();
} else if (storedConsent !== 'denied' && consentBanner) {
  consentBanner.hidden = false;
}

// ===== Аналитика (Google Analytics) =====
// Клики ниже считаются всегда, но это не значит, что данные куда-то уходят:
// до согласия gtag.js не загружен (см. блок выше), и вызов просто кладёт
// запись в локальный dataLayer, которую некому читать. Если счётчик
// заблокирован расширением в браузере — тоже ничего не ломается.
function trackEvent(name, params) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params || {});
  }
}

// Главная кнопка на первом экране. Она же превращается в прямую ссылку
// на Telegram на GitHub Pages (см. ниже) — клик считаем в обоих случаях.
const heroCta = document.querySelector('.hero__cta');
if (heroCta) {
  heroCta.addEventListener('click', () => trackEvent('hero_cta_click'));
}

// Ссылки-контакты внизу страницы: отличаем по адресу, на который они ведут.
document.querySelectorAll('.contact').forEach((link) => {
  const href = link.getAttribute('href') || '';
  if (href.startsWith('https://t.me/')) {
    link.addEventListener('click', () => trackEvent('contact_telegram_click'));
  } else if (href.startsWith('mailto:')) {
    link.addEventListener('click', () => trackEvent('contact_email_click'));
  } else if (href.startsWith('https://wa.me/') || href.startsWith('https://api.whatsapp.com/')) {
    // На сайте пока нет ссылки на WhatsApp. Как только она появится —
    // это событие заработает само, ничего больше менять не нужно.
    link.addEventListener('click', () => trackEvent('contact_whatsapp_click'));
  }
});

// ===== Форма заявки =====

const form = document.getElementById('lead-form');

// GitHub Pages отдаёт только файлы, сервера там нет и заявку принять некому.
// Поэтому на том адресе форму убираем, а кнопки возвращаем в Telegram.
const hasServer = !location.hostname.endsWith('github.io');

if (form && !hasServer) {
  const section = document.getElementById('lead');
  const divider = section.previousElementSibling;
  if (divider && divider.classList.contains('divider')) divider.remove();
  section.remove();

  document.querySelectorAll('.hero__cta, .contacts__cta, .sticky-cta__btn').forEach((link) => {
    link.href = TELEGRAM_URL;
    link.target = '_blank';
    link.rel = 'noopener';
    link.dataset.i18n = 'ctaTelegram';
  });
}

if (form && hasServer) {
  const submitBtn = form.querySelector('.form__submit');
  const status = document.getElementById('form-status');

  // Телефон: цифры, пробелы, скобки, дефисы. Telegram: @ник или ссылка t.me
  const RE_PHONE = /^[+(]?\d[\d\s()\-.]{5,}$/;
  const RE_TELEGRAM = /^@?[A-Za-z0-9_]{4,32}$/;
  const RE_TELEGRAM_LINK = /^(https?:\/\/)?t\.me\/[A-Za-z0-9_]{4,32}\/?$/i;

  // Те же правила продублированы на сервере: проверку в браузере легко обойти
  const rules = {
    name(value) {
      if (!value) return 'errNameEmpty';
      if (value.length < 2) return 'errNameShort';
      return null;
    },
    contact(value) {
      if (!value) return 'errContactEmpty';
      const ok = RE_PHONE.test(value) || RE_TELEGRAM.test(value) || RE_TELEGRAM_LINK.test(value);
      return ok ? null : 'errContactBad';
    },
    service(value) {
      return value ? null : 'errServiceEmpty';
    },
    comment(value) {
      return value.length > 1000 ? 'errCommentLong' : null;
    }
  };

  function setMessage(el, key, className) {
    if (key) {
      el.dataset.msgKey = key;
      el.textContent = t(key);
    } else {
      delete el.dataset.msgKey;
      el.textContent = '';
    }
    el.classList.toggle('is-shown', Boolean(key));
    if (className !== undefined) {
      el.classList.remove('is-ok', 'is-error');
      if (className) el.classList.add(className);
    }
  }

  function showFieldError(name, key) {
    const input = form.elements[name];
    const box = document.getElementById('err-' + name);
    setMessage(box, key);
    if (key) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function checkField(name) {
    const key = rules[name](form.elements[name].value.trim());
    showFieldError(name, key);
    return !key;
  }

  Object.keys(rules).forEach((name) => {
    const input = form.elements[name];
    // Придираться на лету неприятно: проверяем, когда человек уходит с поля,
    // а если ошибка уже показана — сразу убираем её, как только поле исправили
    input.addEventListener('blur', () => checkField(name));
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') checkField(name);
    });
    input.addEventListener('change', () => {
      if (input.getAttribute('aria-invalid') === 'true') checkField(name);
    });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const names = Object.keys(rules);
    const bad = names.filter((name) => !checkField(name));

    if (bad.length) {
      setMessage(status, 'statusCheck', 'is-error');
      form.elements[bad[0]].focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.dataset.i18n = 'statusSending';
    submitBtn.textContent = t('statusSending');
    setMessage(status, null, '');

    const payload = {
      name: form.elements.name.value.trim(),
      contact: form.elements.contact.value.trim(),
      service: form.elements.service.value,
      comment: form.elements.comment.value.trim(),
      company: form.elements.company.value,
      lang: currentLang
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let data = null;
      try { data = await response.json(); } catch (e) {}

      if (response.ok && data && data.ok) {
        form.reset();
        names.forEach((name) => showFieldError(name, null));
        setMessage(status, 'statusOk', 'is-ok');
        // Событие только при подтверждённом успехе: сервер сохранил заявку
        trackEvent('lead_form_submit', { service: payload.service, lang: payload.lang });
      } else if (data && data.errors) {
        // Сервер отвечает теми же ключами — переводит их браузер
        Object.keys(data.errors).forEach((name) => {
          if (rules[name]) showFieldError(name, data.errors[name]);
        });
        setMessage(status, 'statusCheck', 'is-error');
      } else {
        setMessage(status, 'statusError', 'is-error');
      }
    } catch (e) {
      setMessage(status, 'statusError', 'is-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.dataset.i18n = 'cta';
      submitBtn.textContent = t('cta');
    }
  });
}

// Закреплённая кнопка на телефоне ведёт к форме и выглядит так же, как кнопка
// отправки. Когда кнопка отправки на экране, закреплённая закрывала бы её собой
// и сбивала с толку — прячем её ровно на это время.
const stickyBar = document.querySelector('.sticky-cta');
const submitButton = form ? form.querySelector('.form__submit') : null;

if (stickyBar && submitButton && 'IntersectionObserver' in window) {
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      stickyBar.classList.toggle('is-hidden', entry.isIntersecting);
    });
  });
  watcher.observe(submitButton);
}

// ===== Запуск =====

let saved = null;
try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
setLang(translations[saved] ? saved : DEFAULT_LANG);
