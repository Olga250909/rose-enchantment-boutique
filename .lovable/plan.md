

## План: Плавная анимация появления элементов Hero Section при скролле

Заменить CSS-анимации на Intersection Observer для последовательного появления элементов при скролле.

### Изменения

**`src/components/HeroSection.tsx`**

Создать хук `useScrollReveal` с Intersection Observer (`threshold: 0.15`, `triggerOnce`). Разбить содержимое на 5 анимируемых элементов с нарастающей задержкой:

1. Метка «Авторская флористика...» + золотая линия — delay 0ms
2. Заголовок h1 — delay 150ms
3. Подзаголовок + доп. текст — delay 300ms
4. Кнопка «Выбрать букет» — delay 450ms
5. Trust-блок — delay 600ms
6. Изображение — delay 200ms (параллельно с текстом)

Каждый элемент оборачивается в `<div ref={ref}>` с начальным состоянием `opacity-0 translate-y-8` и переходом через `transition-all duration-700 ease-out`. При пересечении viewport добавляется `opacity-100 translate-y-0`.

Убрать текущие классы `animate-fade-in-up` — они срабатывают сразу при загрузке, а не при скролле.

### Файлы
| Файл | Изменение |
|---|---|
| `src/components/HeroSection.tsx` | Добавить Intersection Observer, поэлементная анимация с задержками |

