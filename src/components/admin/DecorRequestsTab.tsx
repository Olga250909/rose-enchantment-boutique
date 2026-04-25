import { useState } from "react";
import { ClipboardList } from "lucide-react";
import { DecorRequest, useStore } from "@/context/StoreContext";
import { Badge } from "@/components/ui/badge";

const statusLabels: Record<DecorRequest["status"], string> = {
  new: "Новая",
  processing: "В обработке",
  completed: "Выполнена",
};

const statusColors: Record<DecorRequest["status"], string> = {
  new: "bg-rose-light text-rose-dark",
  processing: "bg-accent text-accent-foreground",
  completed: "bg-sage-light text-foreground",
};

type FilterStatus = "all" | DecorRequest["status"];

const DecorRequestsTab = () => {
  const { decorRequests, updateDecorRequestStatus } = useStore();
  const [filter, setFilter] = useState<FilterStatus>("all");

  const newCount = decorRequests.filter(r => r.status === "new").length;
  const processingCount = decorRequests.filter(r => r.status === "processing").length;
  const completedCount = decorRequests.filter(r => r.status === "completed").length;
  const filtered = filter === "all" ? decorRequests : decorRequests.filter(r => r.status === filter);

  const filters: { value: FilterStatus; label: string }[] = [
    { value: "all", label: `Все (${decorRequests.length})` },
    { value: "new", label: `Новые (${newCount})` },
    { value: "processing", label: `В обработке (${processingCount})` },
    { value: "completed", label: `Выполнены (${completedCount})` },
  ];

  return (
    <div className="space-y-6">
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

      {filtered.length === 0 ? (
        <p className="text-muted-foreground font-body text-center py-10">Заявок пока нет</p>
      ) : (
        filtered.map(req => (
          <div key={req.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 flex-wrap">
                <ClipboardList className="w-5 h-5 text-primary" />
                <span className="font-heading text-lg text-foreground">Заявка #{req.id.slice(-4)}</span>
                <span className={`text-xs px-3 py-1 rounded-full font-body ${statusColors[req.status]}`}>
                  {statusLabels[req.status]}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-body">{req.createdAt}</span>
            </div>
            <div className="text-sm font-body text-muted-foreground space-y-1 mb-3">
              <p><strong className="text-foreground">Услуга:</strong> {req.serviceName}</p>
              <p><strong className="text-foreground">Клиент:</strong> {req.customerName}</p>
              <p><strong className="text-foreground">Телефон:</strong> {req.customerPhone}</p>
              {req.eventDate && (
                <p><strong className="text-foreground">Дата мероприятия:</strong> {req.eventDate}</p>
              )}
              {req.comment && (
                <p><strong className="text-foreground">Комментарий:</strong> {req.comment}</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body font-semibold text-foreground">
                от {req.servicePrice.toLocaleString("ru-RU")} ₽
              </span>
              <select
                value={req.status}
                onChange={e => updateDecorRequestStatus(req.id, e.target.value as DecorRequest["status"])}
                className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground font-body"
              >
                <option value="new">Новая</option>
                <option value="processing">В обработке</option>
                <option value="completed">Выполнена</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DecorRequestsTab;
