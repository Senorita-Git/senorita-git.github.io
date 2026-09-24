// Переключатель языков: UA (uk) · RU · EN
const translations = {
  uk: {
    navAbout: 'Про мене',
    navSkills: 'Що я вмію',
    navWorks: 'Проєкти',
    navContacts: 'Контакти',
    heroLead: 'Ваш бізнес в інтернеті за кілька днів: сторінка, після якої хочеться вам написати',
    heroSub: 'Лендинги та сайти-візитки для малого бізнесу за допомогою ШІ',
    cta: 'Хочу сайт',
    aboutText: 'Створюю сайти за допомогою ШІ-інструментів — швидко й під задачу клієнта. Допомагаю від ідеї до публікації в інтернеті.',
    skill1: 'Лендинг або сайт-візитка з нуля',
    skill2: 'Дизайн-макет до початку розробки, щоб ви одразу бачили результат',
    skill3: 'Публікація сайту в інтернеті та підключення домену',
    skill4: 'Приймання заявок із сайту та простий Telegram-бот',
    workSoon: 'Незабаром тут з\'явиться проєкт',
    contactMail: 'Пошта'
  },
  ru: {
    navAbout: 'Обо мне',
    navSkills: 'Что я умею',
    navWorks: 'Проекты',
    navContacts: 'Контакты',
    heroLead: 'Ваш бизнес в интернете за несколько дней: страница, после которой хочется вам написать',
    heroSub: 'Лендинги и сайты-визитки для малого бизнеса с помощью ИИ',
    cta: 'Хочу сайт',
    aboutText: 'Создаю сайты с помощью ИИ-инструментов — быстро и под задачу клиента. Помогаю от идеи до публикации в интернете.',
    skill1: 'Лендинг или сайт-визитка с нуля',
    skill2: 'Дизайн-макет до начала разработки, чтобы вы сразу видели результат',
    skill3: 'Публикация сайта в интернете и подключение домена',
    skill4: 'Приём заявок с сайта и простой Telegram-бот',
    workSoon: 'Скоро здесь появится проект',
    contactMail: 'Почта'
  },
  en: {
    navAbout: 'About',
    navSkills: 'What I do',
    navWorks: 'Projects',
    navContacts: 'Contact',
    heroLead: 'Your business online in a few days: a page that makes people want to reach out',
    heroSub: 'Landing pages and business-card websites for small businesses, built with AI',
    cta: 'I want a website',
    aboutText: 'I build websites with AI tools — quickly and around each client\'s goals. I\'ll take you from the first idea to going live.',
    skill1: 'A landing page or business-card website from scratch',
    skill2: 'A design mockup before development, so you see the result right away',
    skill3: 'Publishing your site and connecting a domain',
    skill4: 'Collecting leads from your site and a simple Telegram bot',
    workSoon: 'A project is coming soon',
    contactMail: 'Email'
  }
};

const STORAGE_KEY = 'yv-lang';
const DEFAULT_LANG = 'uk';
const buttons = document.querySelectorAll('.lang__btn');

function setLang(lang) {
  const dict = translations[lang] || translations[DEFAULT_LANG];

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const text = dict[el.dataset.i18n];
    if (text) el.textContent = text;
  });

  document.documentElement.lang = lang;

  buttons.forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', active);
  });

  try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

let saved = null;
try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
setLang(translations[saved] ? saved : DEFAULT_LANG);
