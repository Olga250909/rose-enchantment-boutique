

## План: Исправить найденные ошибки для премиум-вида

### 1. Hero-изображение (файл существует, но может не загружаться из-за формата/размера)
Файл `src/assets/hero-roses.jpg` существует в проекте. Если изображение не отображается — добавить обработку ошибки загрузки с fallback на одну из product-фотографий.

**Файл:** `src/components/HeroSection.tsx`
- Добавить `onError` handler на `<img>` с fallback на `product-blush-bouquet.jpg`

### 2. Эмодзи в футере → Lucide-иконки
**Файл:** `src/components/Footer.tsx`
- Заменить 📞 → `<Phone>`, ✉️ → `<Mail>`, 📍 → `<MapPin>`, 🕐 → `<Clock>` из lucide-react

### 3. Единый тёмный фон карточек товаров
**Файл:** `src/components/ProductCard.tsx`
- `bg-muted` → `bg-[#1a1a1a]`
- `rounded-xl` → `rounded-sm`
- Добавить тёмный gradient overlay поверх изображения
- Кнопка корзины: `rounded-full bg-primary` → outline-стиль `border border-gold/70 bg-transparent`
- Цена: добавить `tracking-wide`

### 4. Страница товара — тёмный фон
**Файл:** `src/pages/ProductPage.tsx`
- `bg-muted rounded-2xl` → `bg-[#1a1a1a] rounded-sm`
- Добавить overlay

### 5. Каталог — больше воздуха + прямоугольные фильтры
**Файл:** `src/pages/CatalogPage.tsx`
- `gap-8` → `gap-10`, `py-12` → `py-16`
- Кнопки фильтров: `rounded-full` → `rounded-none`, добавить `border border-gold/30`

### 6. Header — золотой акцент
**Файл:** `src/components/Header.tsx`
- Добавить `border-b border-gold/20` для премиального вида

### Итого: 6 файлов, только CSS/стилевые изменения, логика не затрагивается.

