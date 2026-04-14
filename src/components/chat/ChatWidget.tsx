import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatRegistration from "./ChatRegistration";
import ChatWindow from "./ChatWindow";
import { useStore } from "@/context/StoreContext";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { chatSessions } = useStore();
  
  // Find active session (last one created in this browser tab)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const activeSession = chatSessions.find(s => s.id === activeSessionId);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
        aria-label="Открыть чат"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {!activeSession ? (
            <ChatRegistration onRegistered={(id) => setActiveSessionId(id)} />
          ) : (
            <ChatWindow sessionId={activeSession.id} />
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
