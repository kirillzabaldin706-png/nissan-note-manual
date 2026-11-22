# Nissan Note 2011 Service Manual

Цифровое интерактивное руководство по ремонту и обслуживанию **Nissan Note 2011 (E11) с двигателем 1.4 CR14DE**.

Современный стек 2025–2026: Next.js + TypeScript + Tailwind + React Three Fiber + Firebase + imgbb.

## Быстрый старт

```bash
cd nissan-note-manual
cp .env.example .env.local
# Заполните ключи Firebase и imgbb

npm install --legacy-peer-deps
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Технологический стек

| Слой | Технология |
|------|------------|
| Frontend | Next.js (App Router) + TypeScript + Tailwind CSS 4 |
| 3D | React Three Fiber + Drei + Three.js |
| База данных | Firebase Firestore |
| Хранение 3D-моделей | Firebase Storage |
| Фотографии / схемы | **imgbb API** (`https://api.imgbb.com`) |
| Auth | Firebase Auth (опционально) |
| Тема | next-themes (тёмная / светлая) |
| Иконки | lucide-react |

## Структура проекта

```
src/
├── app/
│   ├── page.tsx                 # Главная с 3D-моделью
│   ├── sections/[slug]/         # Страница раздела
│   ├── sections/[slug]/[procedure]/  # Полная процедура
│   └── admin/                   # Админ-панель (загрузка в imgbb)
├── components/
│   ├── 3d/car-viewer.tsx        # Интерактивная 3D-сцена
│   ├── layout/                  # Header + Sidebar
│   └── theme-*                  # Тема
├── data/sections.ts             # Демо-данные (пока без Firebase)
├── lib/
│   ├── firebase.ts
│   ├── imgbb.ts                 # Загрузка фото
│   └── utils.ts
└── types/index.ts
```

## Архитектура Firebase + imgbb

1. **Фотографии**  
   Админ загружает файл → фронтенд отправляет на `https://api.imgbb.com/1/upload` → получает `url` / `display_url` → сохраняет ссылки в Firestore (`media.images[]`).

2. **3D-модели** (`.glb`)  
   Хранятся в Firebase Storage. Ссылка записывается в документ процедуры / раздела.

3. **Контент**  
   Разделы, процедуры, моменты затяжки, инструменты, чек-листы — всё в Firestore.

4. **Пользовательские данные**  
   Закладки и история просмотра (при включённом Auth).

## Что уже реализовано

- Главная страница с интерактивной 3D-моделью (placeholder-геометрия + hotspots)
- Тёмная / светлая тема
- Боковое меню разделов
- Страница раздела
- Полная страница процедуры «Замена ремня ГРМ и водяного насоса» с:
  - инструментами
  - моментами затяжки
  - пошаговой инструкцией
  - чек-листом
- Админ-страница с рабочей загрузкой на imgbb (нужен API-ключ)
- Типы TypeScript и демо-данные

## Что нужно доделать для продакшена

1. Подключить реальный Firebase проект и заменить sample data на Firestore-запросы.
2. Добавить настоящие `.glb`-модели автомобиля и узлов (можно взять бесплатные с Sketchfab / подготовить в Blender).
3. Реализовать полноценный CRUD в админке.
4. Добавить генерацию PDF (react-pdf).
5. Поиск по всему мануалу (Algolia / Firestore full-text или клиентский).
6. Закладки и история (Firebase Auth + Firestore).

## Ключи

- **imgbb**: бесплатный ключ на [api.imgbb.com](https://api.imgbb.com)
- **Firebase**: создайте проект, включите Firestore + Storage + Auth

## Дизайн

- Акцентный цвет Nissan Red `#c3002f`
- Минималистичный премиальный UI
- Адаптив под мобильные устройства
- Плавные переходы и 3D-взаимодействие

---

Сделано как современный цифровой сервисный портал 2026 года.
