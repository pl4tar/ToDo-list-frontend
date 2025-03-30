export const nameRules = [
  (v) => !!v || 'Обязательное поле',
  (v) => (v && v.length >= 2) || 'Минимум 2 символа',
  (v) => (v && v.length <= 50) || 'Не более 50 символов',
  (v) => /^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(v) || 'Только буквы, пробелы и дефисы',
];

export const emailRules = [
  (v) => !!v || 'E-mail обязателен',
  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Введите корректный email',
  (v) => (v && v.length <= 100) || 'Ваш email слишком длинный',
];

export const passwordRules = [
  (v) => !!v || 'Пароль обязателен',
  (v) => (v && v.length >= 8) || 'Минимум 8 символов',
  (v) => (v && v.length <= 64) || 'Максимум 64 символа',
  (v) => /[A-Z]/.test(v) || 'Хотя бы одна заглавная буква',
  (v) => /[0-9]/.test(v) || 'Хотя бы одна цифра',
];

export const subjectRules = [(v) => !!v || 'Выберите тему сообщения'];

export const messageRules = [
  (v) => !!v || 'Обязательное поле',
  (v) => v.length >= 10 || 'Минимум 10 символов',
  (v) => v.length <= 500 || 'Максимум 2000 символов',
];

export const consentRules = [(v) => !!v || 'Необходимо ваше согласие'];

export const passwordRulesList = [
  {
    id: 1,
    text: 'Минимум 8 символов',
  },
  {
    id: 2,
    text: 'Хотя бы одна заглавная буква',
  },
  {
    id: 3,
    text: 'Хотя бы одна цифра',
  },
];
