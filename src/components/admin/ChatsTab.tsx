import { useState } from "react";
import { useStore, ChatSession } from "@/context/StoreContext";
import { ArrowLeft, AlertCircle, Bot, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ChatsTab = () => {
  const { chatSessions } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = chatSessions.find(s => s.id === selectedId);

  if (selected) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Назад к списку
        </button>

        <div className="bg-card border border-border rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg text-foreground">{selected.customerName}</h3>
            {selected.hasTicket && (
              <Badge className="bg-destructive text-destructive-foreground text-xs">Тикет</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground font-body">{selected.customerPhone} • {selected.createdAt}</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 space-y-3 max-h-[500px] overflow-y-auto">
          {selected.messages.map(msg => (
            <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
              )}
              <div
                className={`rounded-lg px-3 py-2 text-sm font-body max-w-[80%] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-primary/10 text-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <UserRound className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
          {selected.messages.length === 0 && (
            <p className="text-sm text-muted-foreground text-center font-body py-8">Сообщений пока нет</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {chatSessions.length === 0 ? (
        <p className="text-center text-muted-foreground font-body py-12">Чатов пока нет</p>
      ) : (
        chatSessions.map(session => (
          <button
            key={session.id}
            onClick={() => setSelectedId(session.id)}
            className="w-full bg-card border border-border rounded-xl p-4 text-left hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading text-base text-foreground">{session.customerName}</h3>
              <div className="flex items-center gap-2">
                {session.hasTicket && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Тикет
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground font-body">{session.messages.length} сообщ.</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-body">{session.customerPhone} • {session.createdAt}</p>
            {session.messages.length > 0 && (
              <p className="text-xs text-muted-foreground/70 font-body mt-1 truncate">
                {session.messages[session.messages.length - 1].content}
              </p>
            )}
          </button>
        ))
      )}
    </div>
  );
};

export default ChatsTab;
