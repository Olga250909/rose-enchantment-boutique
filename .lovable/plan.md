

## План: Исправить порог бесплатной доставки на 15 000 ₽

### Проблема
В `src/context/StoreContext.tsx` установлено значение по умолчанию `freeDeliveryFrom: 5000`, но должно быть `15000` для соответствия премиум-ценовой политике.

### Проверка других файлов
- Edge function `supabase/functions/chat/index.ts` — уже имеет правильное значение `бесплатно от 15000 ₽` ✅
- `CartContext.tsx` — не содержит хардкода доставки ✅
- `DeliveryPage.tsx` — берёт значение из StoreContext ✅

### Изменение

| Файл | Что меняется |
|---|---|
| `src/context/StoreContext.tsx` | `freeDeliveryFrom: 5000` → `freeDeliveryFrom: 15000` (строка 42) |
| `src/context/StoreContext.tsx` | `deliveryCost: 500` → `deliveryCost: 1500` (для консистентности) |

После исправления значение будет корректно отображаться на странице доставки и в админ-панели.

