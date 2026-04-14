import { useState, useRef, useEffect, useCallback } from "react";
import { Send, UserRound, Bot, AlertCircle } from "lucide-react";
import { useStore, ChatMessage } from "@/context/StoreContext";
import { toast } from "sonner";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface Props {
  sessionId: string;
}

const ChatWindow = ({ sessionId }: Props) => {
  const { chatSessions, addMessageToChat, createTicket, products } = useStore();
  const session = chatSessions.find(s => s.id === sessionId);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isProcessingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messages = session?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isProcessingRef.current) return;

    isProcessingRef.current = true;
    setIsLoading(true);
    setInput("");

    // Add user message
    const userMsgId = crypto.randomUUID();
    addMessageToChat(sessionId, { id: userMsgId, role: "user", content: text });

    // Build messages for API (without ids)
    const apiMessages = [
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: "user" as const, content: text },
    ];

    // Prepare products data (strip image imports)
    const productsData = products.map(p => ({
      name: p.name, price: p.price, description: p.description,
      category: p.category, inStock: p.inStock, roses: p.roses,
    }));

    const assistantMsgId = crypto.randomUUID();
    let assistantContent = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: apiMessages, products: productsData }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.error || "Ошибка сервиса");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") { streamDone = true; break; }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              // Update assistant message in store
              addMessageToChat(sessionId, { id: assistantMsgId, role: "assistant", content: assistantContent });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Final flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              addMessageToChat(sessionId, { id: assistantMsgId, role: "assistant", content: assistantContent });
            }
          } catch { /* ignore */ }
        }
      }

      if (!assistantContent) {
        addMessageToChat(sessionId, { id: assistantMsgId, role: "assistant", content: "Извините, не удалось получить ответ. Попробуйте ещё раз." });
      }
    } catch (e: any) {
      console.error("Chat error:", e);
      addMessageToChat(sessionId, {
        id: assistantMsgId,
        role: "assistant",
        content: "Произошла ошибка. Попробуйте позже или позовите оператора.",
      });
      toast.error(e.message || "Ошибка связи");
    } finally {
      isProcessingRef.current = false;
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, messages, sessionId, addMessageToChat, products]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCallOperator = () => {
    createTicket(sessionId);
    toast.success("Запрос передан оператору. Мы свяжемся с вами!");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-heading text-lg">Алиса</span>
          <span className="text-xs opacity-75 font-body">• онлайн</span>
        </div>
        {!session?.hasTicket && (
          <button
            onClick={handleCallOperator}
            className="text-xs bg-primary-foreground/20 hover:bg-primary-foreground/30 px-3 py-1 rounded-full transition-colors font-body flex items-center gap-1"
          >
            <AlertCircle className="w-3 h-3" />
            Оператор
          </button>
        )}
      </div>

      {session?.hasTicket && (
        <div className="bg-accent px-4 py-2 text-xs text-accent-foreground font-body flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Тикет создан — оператор скоро подключится
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {/* Welcome message */}
        {messages.length === 0 && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 text-sm font-body text-foreground max-w-[85%]">
              Здравствуйте, {session?.customerName}! Я Алиса, ваш персональный флорист-консультант 🌹 Чем могу помочь?
            </div>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`rounded-xl px-3 py-2 text-sm font-body max-w-[85%] whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-sm"
                  : "bg-muted text-foreground rounded-tl-sm"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                <UserRound className="w-4 h-4 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border px-3 py-2 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите сообщение..."
          disabled={isLoading}
          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-body focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
          className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
