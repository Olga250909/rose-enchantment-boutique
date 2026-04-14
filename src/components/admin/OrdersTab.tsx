import { useState } from "react";
import { Package } from "lucide-react";
import { Order, useStore } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";

const statusLabels: Record<Order["status"], string> = {
  new: "Новый",
  processing: "В обработке",
  delivered: "Доставлен",
};

const statusColors: Record<Order["status"], string> = {
  new: "bg-rose-light text-rose-dark",
  processing: "bg-accent text-accent-foreground",
  delivered: "bg-sage-light text-foreground",
};

type FilterStatus = "all" | Order["status"];

const OrdersTab = () => {
  const { orders, updateOrderStatus } = useStore();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const newCount = orders.filter(o => o.status === "new").length;
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const filters: { value: FilterStatus; label: string }[] = [
    { value: "all", label: `Все (${orders.length})` },
    { value: "new", label: `Новые (${newCount})` },
    { value: "processing", label: "В обработке" },
    { value: "delivered", label: "Доставлены" },
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-full text-sm font-body whitespace-nowrap transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {f.label}
            {f.value === "new" && newCount > 0 && filter !== "new" && (
              <Badge className="ml-2 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0">{newCount}</Badge>
            )}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <p className="text-muted-foreground font-body text-center py-10">Заказов нет</p>
      ) : (
        filtered.map(order => (
          <div key={order.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                <span className="font-heading text-lg text-foreground">Заказ #{order.id.slice(-4)}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-body ${statusColors[order.status]}`}>
                  {statusLabels[order.status]}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-body">{order.createdAt}</span>
            </div>
            <div className="text-sm font-body text-muted-foreground space-y-1 mb-3">
              <p><strong className="text-foreground">Клиент:</strong> {order.customerName}</p>
              <p><strong className="text-foreground">Телефон:</strong> {order.customerPhone}</p>
              <p><strong className="text-foreground">Адрес:</strong> {order.customerAddress}</p>
              {order.comment && <p><strong className="text-foreground">Комментарий:</strong> {order.comment}</p>}
            </div>
            <div className="text-sm font-body mb-3">
              {order.items.map(i => (
                <span key={i.product.id} className="mr-3 text-muted-foreground">{i.product.name} × {i.quantity}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body font-semibold text-foreground">{order.total.toLocaleString("ru-RU")} ₽</span>
              <select
                value={order.status}
                onChange={e => updateOrderStatus(order.id, e.target.value as Order["status"])}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground font-body"
              >
                <option value="new">Новый</option>
                <option value="processing">В обработке</option>
                <option value="delivered">Доставлен</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersTab;
