## Цель
Сделать кнопку «Начать чат» всегда активной (убрать состояние disabled при незаполненных полях). Валидация остаётся внутри `handleSubmit` через toast.

## Изменения
**Файл:** `src/components/chat/ChatRegistration.tsx`
- Удалить атрибут `disabled={!canSubmit}` у кнопки.
- Удалить классы `disabled:opacity-50 disabled:cursor-not-allowed`.
- Убрать неиспользуемую переменную `canSubmit`.

Кнопка визуально всегда активна; при пустом имени или сообщении пользователь увидит toast-ошибку (логика в `handleSubmit` уже есть).
