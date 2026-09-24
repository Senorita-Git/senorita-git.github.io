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
    aboutText: 'Створюю сайти за допомогою ШІ-інструментів — швидко й під задачу клієнта. Допомагаю від ідеї до публікації в інтернеті.'
  },
  ru: {
    navAbout: 'Обо мне',
    navSkills: 'Что я умею',
    navWorks: 'Проекты',
    navContacts: 'Контакты',
    heroLead: 'Ваш бизнес в интернете за несколько дней: страница, после которой хочется вам написать',
    heroSub: 'Лендинги и сайты-визитки для малого бизнеса с помощью ИИ',
    cta: 'Хочу сайт',
    aboutText: 'Создаю сайты с помощью ИИ-инструментов — быстро и под задачу клиента. Помогаю от идеи до публикации в интернете.'
  },
  en: {
    navAbout: 'About',
    navSkills: 'What I do',
    navWorks: 'Projects',
    navContacts: 'Contact',
    heroLead: 'Your business online in a few days: a page that makes people want to reach out',
    heroSub: 'Landing pages and business-card websites for small businesses, built with AI',
    cta: 'I want a website',
    aboutText: 'I build websites with AI tools — quickly and around each client\'s goals. I\'ll take you from the first idea to going live.'
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
