## Цель
Переработать форму регистрации в чат-виджете: убрать поле телефона и чекбокс согласия, добавить большое поле для первого сообщения. После отправки имя+сообщение автоматически открывают диалог с приветственным автоответом консультанта.

## Изменения в файлах

### 1. `src/components/chat/ChatRegistration.tsx` (основная переработка)
- Удалить state `phone` и `agreed`, удалить input телефона, удалить чекбокс с текстом политики.
- Оставить input «Ваше имя» (обязательное).
- Добавить `<textarea>` (state `message`) с placeholder «Напишите, какой букет вам нужен или задайте вопрос» — визуально крупнее поля имени (min-h ~120px), скруглённые углы, плавный фокус (`transition` + `focus:ring-primary/40`).
- Кнопка «Начать чат»: `disabled` пока `name.trim() && message.trim()` не заполнены оба (вместо disabled — также можно показывать как полупрозрачную через `disabled:opacity-50`).
- При submit:
  1. Вызвать `addChatSession(name, "")` (телефон передаём пустой строкой — поле в `ChatSession.customerPhone` остаётся для совместимости, без изменения типов).
  2. Добавить в сессию сообщение пользователя: `addMessageToChat(sessionId, { id: uuid, role: "user", content: message })`.
  3. Добавить первое автосообщение ассистента: `addMessageToChat(sessionId, { id: uuid, role: "assistant", content: \`Здравствуйте, ${name}! Я помогу подобрать идеальный букет. Для кого букет и на какую дату?\` })`.
  4. Вызвать `onRegistered(sessionId)` — откроется `ChatWindow` с уже заполненной перепиской.
- Под кнопкой — мелкий текст:  
  «Нажимая кнопку, вы соглашаетесь с [политикой конфиденциальности](/privacy)» — ссылка `<a href="/privacy" target="_blank">` с подчёркиванием в стиле primary.

### 2. `src/components/chat/ChatWindow.tsx` (мелкая правка)
- Welcome-блок (`messages.length === 0`) сейчас показывает приветствие Алисы. Поскольку теперь при открытии уже будут 2 сообщения (user + assistant), этот блок никогда не сработает — но всё равно убрать его, чтобы не было дублирования приветствия в случае старых сессий без сообщений (заменить на простую пустую заглушку или удалить полностью).

## Дизайн / UX
- Сохраняем существующие токены (`bg-primary`, `text-primary-foreground`, `border-border`, `bg-background`) — пудрово-розовая палитра уже определена в `index.css`/`tailwind.config.ts`.
- Контейнер формы: `flex-1 flex flex-col justify-center px-6 py-6 space-y-4` — выравнивание по центру по вертикали, аккуратные интервалы.
- Inputs/textarea: `rounded-xl`, `border-border`, `focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all`.
- Textarea: `min-h-[120px] resize-none` — заметно больше, чем поле имени.
- Кнопка: `rounded-xl py-3 font-medium`, hover `opacity-90`.
- Текст про политику: `text-xs text-muted-foreground text-center`.
- Никаких пустых отступов после удалённых элементов — структура `space-y-4` сама компактно выровняет.

## Логика — ключевые моменты
- Не отправляем сообщение на edge function здесь — первый ответ статический («Здравствуйте, [Имя]! …»). Дальнейшую переписку обрабатывает `ChatWindow` стандартным образом через `/functions/v1/chat`.
- Поле `customerPhone` в `ChatSession` остаётся в типе (используется в админке `ChatsTab`), просто будет пустой строкой для новых сессий — никаких изменений в `StoreContext` или типах не требуется.

## Файлы
- `src/components/chat/ChatRegistration.tsx` — переписать
- `src/components/chat/ChatWindow.tsx` — удалить welcome-блок при `messages.length === 0`
