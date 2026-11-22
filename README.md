# TaskFlow

Навчальний PWA-застосунок на Vue 3, Framework7 та Vite. Практична робота 2/5: картки з Props/Emits, спільний реактивний стан, циклічна зміна статусів і пріоритетів, фільтри та статистика. Збережено маршрути й нижню навігацію роботи 2/4. Додаткові завдання: показник «Заплановано» та TaskCounter з числовим prop.

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
  components/StatusBadge.vue   # Статус
  components/PriorityBadge.vue # Пріоритет
  components/TaskCounter.vue   # Лічильник результатів фільтрації
  store/tasks.js          # Спільний реактивний стан
  pages/HomePage.vue      # Статистика й актуальні завдання
  pages/TasksPage.vue     # Фільтрація шести демонстраційних завдань
  pages/AboutPage.vue     # Опис застосунку
  data/tasks.js           # Тестові дані
  css/app.css             # Адаптивні стилі
  css/task-components.css # Оформлення карток, статистики й фільтрів
public/icons/             # SVG, PNG 192/512 та окрема maskable-іконка
scripts/generate-icons.mjs # Генерація PNG через sharp
vite.config.js            # Vue, Web App Manifest, Workbox
wrangler.jsonc            # Cloudflare Workers Static Assets
```

## Перевірка PWA

Відкрити production-версію на HTTPS або локальний `npm run preview`. У Chrome DevTools → Application перевірити Manifest та активний Service Worker. Після першого завантаження увімкнути Offline та перезавантажити сторінку. Кеш містить обидві сторінки й ресурси застосунку. Встановлення доступне через меню Chrome «Установити TaskFlow».

Дані є демонстраційними відповідно до завдання. Зміни статусів і пріоритетів узгоджуються між сторінками; після повного перезавантаження відновлюються початкові дані. Постійне сховище не використовується, як і передбачено роботою 2/5.
