# TaskFlow

Навчальний PWA-застосунок на Vue 3, Framework7 та Vite. Практична робота 2/4: три сторінки зі спільною нижньою навігацією, чотири демонстраційні завдання та обчислювана статистика. Додаткові завдання з методички: показник «Очікує виконання» та доступність навігації.

## Запуск

```sh
npm ci
npm run dev
```

## Збірка та публікація

```sh
npm run generate:icons
npm run build
npm run preview
```

Cloudflare Worker `taskflow-demo` збирає гілку `main` командами `npm run build` і `npx wrangler deploy`. Корінь репозиторію `/`, каталог статичних файлів `dist`. `dist` і `node_modules` не потрібно додавати до Git. Для ручного деплою з авторизованим Wrangler: `npm run deploy`.

## Структура

```text
src/
  main.js                 # Vue, Framework7, реєстрація Service Worker
  App.vue                 # Кореневий компонент і головне представлення
  routes.js               # Маршрути /, /tasks/ та /about/
  components/AppTabbar.vue # Спільна нижня навігація
  components/TaskCard.vue  # Картка одного завдання
  pages/HomePage.vue      # Статистика і три останні завдання
  pages/TasksPage.vue     # Чотири демонстраційні завдання
  pages/AboutPage.vue     # Опис застосунку
  data/tasks.js           # Тестові дані
  css/app.css             # Адаптивні стилі
public/icons/             # SVG, PNG 192/512 та окрема maskable-іконка
scripts/generate-icons.mjs # Генерація PNG через sharp
vite.config.js            # Vue, Web App Manifest, Workbox
wrangler.jsonc            # Cloudflare Workers Static Assets
```

## Перевірка PWA

Відкрити production-версію на HTTPS або локальний `npm run preview`. У Chrome DevTools → Application перевірити Manifest та активний Service Worker. Після першого завантаження увімкнути Offline та перезавантажити сторінку. Кеш містить обидві сторінки й ресурси застосунку. Встановлення доступне через меню Chrome «Установити TaskFlow».

Дані є демонстраційними відповідно до завдання. Додавання, редагування й збереження завдань не реалізовані.
