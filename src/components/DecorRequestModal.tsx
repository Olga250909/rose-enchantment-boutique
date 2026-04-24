import { X } from "lucide-react";
import { useState } from "react";
import { DecorService } from "@/data/decorServices";
import { useStore } from "@/context/StoreContext";
import { toast } from "sonner";

interface DecorRequestModalProps {
  service: DecorService;
  onClose: () => void;
}

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  let formatted = "+7";
  if (digits.length > 1) formatted += ` (${digits.slice(1, 4)}`;
  if (digits.length > 4) formatted += `) ${digits.slice(4, 7)}`;
  if (digits.length > 7) formatted += `-${digits.slice(7, 9)}`;
  if (digits.length > 9) formatted += `-${digits.slice(9, 11)}`;
  return formatted;
};

const DecorRequestModal = ({ service, onClose }: DecorRequestModalProps) => {
  const { addOrder } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 11) {
      toast.error("Заполните имя и телефон");
      return;
    }
    addOrder({
      items: [{
        product: {
          id: service.id,
          name: service.name,
          price: service.price,
          image: service.image,
          category: service.category,
          description: service.description,
          roses: 0,
        } as any,
        quantity: 1,
      }],
      total: service.price,
      customerName: name,
      customerPhone: phone,
      customerAddress: "Уточнить при звонке",
      comment: `Услуга оформления: ${service.name}${date ? ` · Дата мероприятия: ${date}` : ""}${comment.trim() ? ` · ${comment.trim()}` : ""}`,
    });
    toast.success("Заявка принята! Мы свяжемся с вами в ближайшее время.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background border border-border p-8 max-w-sm w-full mx-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
        <h3 className="font-heading text-xl text-foreground mb-1">Заявка на оформление</h3>
        <p className="text-sm text-muted-foreground font-body mb-6">
          {service.name} — от {service.price.toLocaleString("ru-RU")} ₽
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Ваше имя</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-border bg-background text-foreground text-sm font-body rounded-sm focus:ring-1 focus:ring-gold outline-none"
              placeholder="Имя"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Телефон</label>
            <input
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              className="w-full mt-1 px-4 py-3 border border-border bg-background text-foreground text-sm font-body rounded-sm focus:ring-1 focus:ring-gold outline-none"
              placeholder="+7 (___) ___-__-__"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Дата мероприятия</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-1 px-4 py-3 border border-border bg-background text-foreground text-sm font-body rounded-sm focus:ring-1 focus:ring-gold outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Комментарий</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full mt-1 px-4 py-3 border border-border bg-background text-foreground text-sm font-body rounded-sm focus:ring-1 focus:ring-gold outline-none resize-none"
              placeholder="Пожелания, формат, место..."
            />
          </div>
          <button
            type="submit"
            className="w-full border border-gold bg-gold/10 text-foreground font-body text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-sm hover:bg-gold hover:text-background transition-all"
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </div>
  );
};

export default DecorRequestModal;
