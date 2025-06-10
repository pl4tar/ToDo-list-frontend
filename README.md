# Корпоративный ToDo-лист (Vue3 + Vuetify + Firebase)

## Описание проекта

Корпоративное веб-приложение для управления задачами с авторизацией сотрудников и разделением прав доступа. Проект реализован на современном стеке Vue3 с использованием UI-фреймворка Vuetify и роутинга через Vue Router, с бэкенд-частью на Firebase.

## Функциональные возможности

- 🔐 Система авторизации через Firebase Auth
- 👥 Ролевая модель (сотрудник/менеджер/админ)
- 📝 Создание, редактирование и удаление задач
- 🏷️ Категории и метки для задач
- 🔍 Фильтрация и поиск задач
- 📅 Календарь и дедлайны
- 👥 Назначение задач между сотрудниками
- 📊 Статистика и отчеты
- 🔔 Уведомления о изменениях задач

## Технологический стек

**Frontend:**
- Vue 3 (Composition API)
- Vuetify 3 (Material Design компоненты)
- Vue Router
- Vuex/Pinia (по состоянию проекта)
- Firebase SDK

**Backend:**
- Firebase Authentication
- Firebase Firestore (база данных)
- Firebase Storage 

**Дополнительно:**
- Axios (если есть внешние API)

## Установка и запуск

1. Клонировать репозиторий:
```bash
git clone https://github.com/your-company/corporate-todo.git
```

## Установить зависимости:

```
npm install
```

## Запустить проект 
```
npm run build
npm run dev
```

## Структура проекта 
```src/
├── assets/            # Статические ресурсы
├── components/        # Глобальные компоненты
├── composables/       # Композаблы (хуки)
├── firebase/          # Конфигурация Firebase
├── router/            # Конфигурация роутера
├── stores/            # Хранилища (Pinia/Vuex)
├── styles/            # Глобальные стили
├── views/             # Страницы приложения
├── App.vue            # Корневой компонент
└── main.js            # Точка входа
```

## Доступные скрипты

```dev``` - Запуск dev-сервера

```build``` - Сборка production-версии

```lint``` - Проверка кода линтером

```preview``` - Локальный просмотр production-сборки

## Деплой
Проект настроен для деплоя на:

- Firebase Hosting

- Vercel

- Netlify

## Для деплоя на Firebase:

```bash
firebase login
firebase init
firebase deploy
```

##Лицензия
MIT License
