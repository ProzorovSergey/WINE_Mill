# Винная мельница — Frontend

Pixel-perfect вёрстка сайта интернет-магазина вина и крепких напитков.

## Стек

- **HTML5** — семантическая разметка
- **SCSS** — BEM-методология, разбитый на модули
- **JavaScript** — чистый ES5/ES6, без фреймворков
- **Шрифты** — Cormorant Garamond, Great Vibes, Montserrat (Google Fonts)

---

## Структура проекта

```
wine_mill/
├── index.html                 ← Главная страница
├── css/
│   └── style.css              ← Скомпилированный CSS (минифицированный)
├── scss/
│   ├── style.scss             ← Точка входа (@use)
│   ├── _variables.scss        ← Переменные (цвета, шрифты, отступы)
│   ├── _mixins.scss           ← Миксины (адаптивность, layout, typography)
│   ├── _base.scss             ← Сброс, глобальные стили, утилиты
│   └── blocks/
│       ├── _topbar.scss       ← Верхняя информационная строка
│       ├── _header.scss       ← Шапка + навигация
│       ├── _hero.scss         ← Слайдер на главной
│       ├── _promo-banners.scss← Три промо-баннера
│       ├── _catalog.scss      ← Каталог + фильтры
│       ├── _product-card.scss ← Карточка товара
│       ├── _sommelier.scss    ← Блок сомелье + рассылка
│       └── _footer.scss       ← Подвал
├── img/
│   ├── hero/                  ← Фоновые и атмосферные фото
│   ├── products/              ← Бутылки (PNG с прозрачностью)
│   └── banners/               ← Промо-фотографии
├── js/
│   └── main.js                ← Слайдер, меню, фильтры, корзина
└── README.md
```

---

## Быстрый старт

### Требования

- Node.js >= 16
- Sass (dart-sass) >= 1.50

### Установка

```bash
npm install -g sass
```

### Разработка (watch-режим)

```bash
sass --watch scss/style.scss:css/style.css
```

### Продакшн-сборка (минификация)

```bash
sass scss/style.scss css/style.css --style=compressed --no-source-map
```

---

## Деплой

### GitHub Pages

```bash
# 1. Инициализируй репозиторий
git init
git add .
git commit -m "Initial commit: Wine Mill website"

# 2. Создай репозиторий на GitHub и привяжи remote
git remote add origin https://github.com/your-username/wine-mill.git

# 3. Запушь
git push -u origin main

# 4. В настройках репо: Settings → Pages → Branch: main / (root)
# Сайт будет доступен: https://your-username.github.io/wine-mill/
```

### Netlify (drag & drop)

1. Открой [app.netlify.com/drop](https://app.netlify.com/drop)
2. Перетащи папку `wine_mill/` в браузер
3. Netlify автоматически опубликует сайт на случайном URL вида `https://random-name.netlify.app`

### Netlify + GitHub (автодеплой)

```bash
# Установи Netlify CLI
npm install -g netlify-cli

# Деплой
netlify deploy --prod --dir=.
```

---

## Адаптивность

| Устройство         | Ширина    | Поведение                                  |
|--------------------|-----------|---------------------------------------------|
| Desktop            | > 1280px  | Полная раскладка, боковой фильтр            |
| Tablet             | 768–1279px| Двухколоночная сетка товаров                |
| iPhone 12 (mobile) | 390px     | Одна колонка, бургер-меню, скрытые фильтры  |

---

## Дизайн-токены

| Переменная          | Значение   | Назначение                 |
|---------------------|-----------|----------------------------|
| `$color-bg`         | `#181818` | Основной фон               |
| `$color-red`        | `#C8271D` | Кнопки, акценты            |
| `$color-crimson`    | `#6B1A1A` | Hero-секция, сомелье       |
| `$color-surface`    | `#1E1E1E` | Карточки, подложки         |
| `$font-display`     | Cormorant Garamond | Заголовки           |
| `$font-script`      | Great Vibes | Декоративный скрипт    |
| `$font-body`        | Montserrat | Текст, навигация           |

---

## Методология BEM

Пример именования:

```html
<article class="product-card">               <!-- Блок -->
  <div class="product-card__img-wrap">       <!-- Элемент -->
    <img class="product-card__img" />
    <span class="product-card__badge">       <!-- Элемент -->
      Новинка
    </span>
  </div>
  <div class="product-card__body">
    <h3 class="product-card__name">…</h3>
    <button class="product-card__btn">В корзину</button>
  </div>
</article>
```

---

## Страницы сайта

| Файл | Страница |
|---|---|
| `index.html` | Главная — слайдер, каталог, сомелье, рассылка |
| `catalog.html` | Каталог вина — фильтры + сетка товаров |
| `catalog-whiskey.html` | Каталог виски — фильтры + сетка товаров |
| `product.html` | Карточка товара — галерея, характеристики, вкладки, похожие |
| `articles.html` | Список статей — сетка из 6 материалов |
| `article.html` | Отдельная статья — текст + сайдбар |
| `about.html` | О нас — история, фотогалерея, форма контактов |
| `cart.html` | Корзина — таблица товаров + сводка заказа |
| `404.html` | Страница не найдена |
