import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface Props {
  onRegistered: (sessionId: string) => void;
}

const ChatRegistration = ({ onRegistered }: Props) => {
  const { addChatSession, addMessageToChat } = useStore();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName) return toast.error("Введите ваше имя");
    if (!trimmedMessage) return toast.error("Напишите сообщение");

    const sessionId = addChatSession(trimmedName, "");

    addMessageToChat(sessionId, {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedMessage,
    });

    addMessageToChat(sessionId, {
      id: crypto.randomUUID(),
      role: "assistant",
      content: `Здравствуйте, ${trimmedName}! Я помогу подобрать идеальный букет. Для кого букет и на какую дату?`,
    });

    onRegistered(sessionId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        <span className="font-heading text-lg">Консультант</span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 py-6 space-y-4">
        <p className="text-sm text-muted-foreground text-center font-body">
          Привет! Я помогу выбрать идеальный букет.
        </p>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        <textarea
          placeholder="Напишите, какой букет вам нужен или задайте вопрос"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm font-body min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-body text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Начать чат
        </button>
        <p className="text-xs text-muted-foreground text-center font-body">
          Нажимая кнопку, вы соглашаетесь с{" "}
          <a
            href="/privacy"
            target="_blank"
            className="text-primary underline hover:no-underline"
          >
            политикой конфиденциальности
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChatRegistration;
