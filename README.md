# TaskFlow

Навчальний PWA-застосунок на Vue 3, Pinia, Framework7 та Vite. Практична робота 2/10: постійне локальне збереження завдань і проєктів в IndexedDB через idb, відновлення Pinia до показу інтерфейсу та індикатор збереження з повторною спробою після помилки запису. CRUD, фільтри, маршрути й PWA попередніх робіт збережено.

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
  components/TaskCard.vue  # Картка з подіями зміни статусу/пріоритету
  components/TaskForm.vue  # Форма створення й редагування та валідація
  components/TaskListControls.vue # Пошук, фільтри й сортування
  components/StatusBadge.vue   # Статус
  components/PriorityBadge.vue # Пріоритет
  store/tasks.js          # Pinia: завдання, фільтри, статистика
  store/projects.js       # Pinia: каталог проєктів
  services/database.js    # IndexedDB: tasks, projects, metadata; транзакції
  services/persistence.js # Відновлення Pinia та послідовне збереження знімків
  pages/HomePage.vue      # Статистика й актуальні завдання
  pages/TasksPage.vue     # Завдання, проєкти, фільтри й стан збереження
  pages/AboutPage.vue     # Опис застосунку
  data/tasks.js           # Тестові дані
  css/app.css             # Адаптивні стилі
  css/task-components.css # Оформлення карток, статистики й фільтрів
  css/task-form.css       # Стилі форми роботи 2/6
  css/task-list.css       # Стилі списку та каталогу проєктів робіт 2/8 і 2/9
  css/persistence.css     # Стан локального збереження роботи 2/10
public/icons/             # SVG, PNG 192/512 та окрема maskable-іконка
scripts/generate-icons.mjs # Генерація PNG через sharp
vite.config.js            # Vue, Web App Manifest, Workbox
wrangler.jsonc            # Cloudflare Workers Static Assets
```

## Перевірка PWA

Відкрити production-версію на HTTPS або локальний `npm run preview`. У Chrome DevTools → Application перевірити Manifest та активний Service Worker. Після першого завантаження увімкнути Offline та перезавантажити сторінку. Кеш містить сторінки й ресурси застосунку. Встановлення доступне через меню Chrome «Установити TaskFlow».

База `taskflow-db`, версія 1, містить `tasks` (числовий `id`), `projects` (рядковий `id`) та `metadata` (`initialized`, `nextProjectId`). Шість демонстраційних завдань і три проєкти записуються лише під час першого запуску. Перед оновленням сторінки дочекайтеся повідомлення «Усі зміни збережено». Порожній список не засівається повторно; пошук і фільтри не записуються в базу.

Дані належать поточному origin і профілю браузера; між пристроями або вкладками автоматично не синхронізуються. Очищення даних сайту видаляє локальну базу. Після першого онлайн-запуску Service Worker дозволяє відкривати кешовану оболонку PWA без мережі; IndexedDB забезпечує локальну роботу з даними.
