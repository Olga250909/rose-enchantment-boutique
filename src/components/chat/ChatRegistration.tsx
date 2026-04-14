import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface Props {
  onRegistered: (sessionId: string) => void;
}

const ChatRegistration = ({ onRegistered }: Props) => {
  const { addChatSession } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return toast.error("Введите ваше имя");
    if (!phone.trim()) return toast.error("Введите номер телефона");
    if (!agreed) return toast.error("Примите политику конфиденциальности");

    const sessionId = addChatSession(name.trim(), phone.trim());
    onRegistered(sessionId);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        <span className="font-heading text-lg">Консультант</span>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 space-y-4">
        <p className="text-sm text-muted-foreground text-center font-body">
          Привет! Я помогу выбрать идеальный букет. Представьтесь, пожалуйста:
        </p>
        <input
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-body"
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-body"
        />
        <label className="flex items-start gap-2 text-xs text-muted-foreground font-body cursor-pointer">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="mt-0.5 rounded border-border"
          />
          <span>
            Я принимаю{" "}
            <a href="/privacy" target="_blank" className="text-primary underline hover:no-underline">
              политику конфиденциальности
            </a>
          </span>
        </label>
        <button
          onClick={handleSubmit}
          className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-body text-sm hover:opacity-90 transition-opacity"
        >
          Начать чат
        </button>
      </div>
    </div>
  );
};

export default ChatRegistration;
