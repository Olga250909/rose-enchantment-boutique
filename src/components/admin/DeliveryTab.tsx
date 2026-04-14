import { useState } from "react";
import { useStore, DeliverySettings } from "@/context/StoreContext";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

const DeliveryTab = () => {
  const { deliverySettings, updateDeliverySettings } = useStore();
  const [form, setForm] = useState<DeliverySettings>({ ...deliverySettings });
  const [newMethod, setNewMethod] = useState("");

  const handleSave = () => {
    updateDeliverySettings(form);
    toast.success("Настройки доставки сохранены");
  };

  const addMethod = () => {
    const m = newMethod.trim();
    if (!m) return;
    if (form.paymentMethods.includes(m)) {
      toast.error("Такой способ уже есть");
      return;
    }
    setForm(prev => ({ ...prev, paymentMethods: [...prev.paymentMethods, m] }));
    setNewMethod("");
  };

  const removeMethod = (idx: number) => {
    setForm(prev => ({ ...prev, paymentMethods: prev.paymentMethods.filter((_, i) => i !== idx) }));
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6 font-body max-w-2xl">
      <h3 className="font-heading text-xl text-foreground">Настройки доставки</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm text-foreground font-medium">Бесплатная доставка от (₽)</label>
          <input
            type="number"
            value={form.freeDeliveryFrom}
            onChange={e => setForm({ ...form, freeDeliveryFrom: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-foreground font-medium">Стоимость доставки (₽)</label>
          <input
            type="number"
            value={form.deliveryCost}
            onChange={e => setForm({ ...form, deliveryCost: Number(e.target.value) })}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-foreground font-medium">Время доставки</label>
          <input
            value={form.deliveryTime}
            onChange={e => setForm({ ...form, deliveryTime: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-foreground font-medium">Часы работы доставки</label>
          <input
            value={form.deliveryHours}
            onChange={e => setForm({ ...form, deliveryHours: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-sm text-foreground font-medium">Стоимость за МКАД</label>
          <input
            value={form.outsideMkadCost}
            onChange={e => setForm({ ...form, outsideMkadCost: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
        </div>
      </div>

      {/* Payment methods */}
      <div className="space-y-3">
        <label className="text-sm text-foreground font-medium">Способы оплаты</label>
        <div className="flex flex-wrap gap-2">
          {form.paymentMethods.map((m, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 bg-muted text-foreground text-sm px-3 py-1.5 rounded-full">
              {m}
              <button onClick={() => removeMethod(i)} className="text-muted-foreground hover:text-destructive">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            placeholder="Новый способ оплаты"
            value={newMethod}
            onChange={e => setNewMethod(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addMethod()}
            className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
          />
          <button onClick={addMethod} className="p-2.5 rounded-lg border border-border text-muted-foreground hover:text-primary transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guarantee */}
      <div className="space-y-1.5">
        <label className="text-sm text-foreground font-medium">Гарантия свежести (текст)</label>
        <textarea
          value={form.freshnessGuarantee}
          onChange={e => setForm({ ...form, freshnessGuarantee: e.target.value })}
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm hover:bg-rose-dark transition-colors"
      >
        Сохранить настройки
      </button>
    </div>
  );
};

export default DeliveryTab;
