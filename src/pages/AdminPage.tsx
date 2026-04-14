import { useState } from "react";
import { Lock, LogOut, Package, ShoppingBag, Truck, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";
import OrdersTab from "@/components/admin/OrdersTab";
import ProductsTab from "@/components/admin/ProductsTab";
import DeliveryTab from "@/components/admin/DeliveryTab";
import ChatsTab from "@/components/admin/ChatsTab";

const ADMIN_PASSWORD = "admin2024";

type Tab = "orders" | "products" | "delivery" | "chats";

const AdminPage = () => {
  const { orders, chatSessions } = useStore();
  const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("admin_auth") === "true");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("orders");

  const newCount = orders.filter(o => o.status === "new").length;
  const ticketCount = chatSessions.filter(s => s.hasTicket).length;
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true);
      sessionStorage.setItem("admin_auth", "true");
      setPassword("");
    } else {
      toast.error("Неверный пароль");
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    sessionStorage.removeItem("admin_auth");
  };

  if (!isAuth) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center">
        <div className="bg-card border border-border rounded-xl p-8 w-full max-w-sm space-y-6">
          <div className="text-center">
            <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
            <h1 className="font-heading text-2xl text-foreground">Вход в админ-панель</h1>
          </div>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-body"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-body text-sm hover:bg-rose-dark transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { key: "orders", label: "Заказы", icon: <Package className="w-4 h-4" />, count: orders.length },
    { key: "products", label: "Товары", icon: <ShoppingBag className="w-4 h-4" /> },
    { key: "delivery", label: "Доставка", icon: <Truck className="w-4 h-4" /> },
    { key: "chats", label: "Чаты", icon: <MessageSquare className="w-4 h-4" />, count: chatSessions.length },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-light text-foreground">Админ-панель</h1>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body transition-colors">
          <LogOut className="w-4 h-4" /> Выйти
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-body whitespace-nowrap transition-colors ${
              tab === t.key ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t.icon}
            {t.label}
            {t.key === "orders" && newCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0">{newCount}</Badge>
            )}
            {t.key === "chats" && ticketCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0">{ticketCount}</Badge>
            )}
          </button>
        ))}
      </div>

      {tab === "orders" && <OrdersTab />}
      {tab === "products" && <ProductsTab />}
      {tab === "delivery" && <DeliveryTab />}
      {tab === "chats" && <ChatsTab />}
    </div>
  );
};

export default AdminPage;
