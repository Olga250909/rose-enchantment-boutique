import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";
import { toast } from "sonner";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { addOrder } = useStore();
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", comment: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    addOrder({
      items: items.map(i => ({ product: i.product, quantity: i.quantity })),
      total: totalPrice,
      customerName: form.name,
      customerPhone: form.phone,
      customerAddress: form.address,
      comment: form.comment,
    });
    clearCart();
    setCheckout(false);
    setForm({ name: "", phone: "", address: "", comment: "" });
    toast.success("Заказ оформлен! Мы свяжемся с вами в ближайшее время.");
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-background shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading text-xl font-medium">{checkout ? "Оформление заказа" : "Корзина"}</h2>
          <button onClick={() => { setIsCartOpen(false); setCheckout(false); }} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!checkout ? (
            items.length === 0 ? (
              <p className="text-muted-foreground text-center font-body mt-10">Корзина пуста</p>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex gap-4 p-3 rounded-lg bg-muted/50">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading text-sm font-medium truncate">{item.product.name}</h4>
                      <p className="text-foreground font-body text-sm font-semibold mt-1">
                        {item.product.price.toLocaleString("ru-RU")} ₽
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted text-foreground">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-body w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted text-foreground">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => removeFromCart(item.product.id)}
                          className="ml-auto text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <form onSubmit={handleSubmit} id="checkout-form" className="space-y-4 font-body">
              <div>
                <label className="text-sm text-muted-foreground">Ваше имя *</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Телефон *</label>
                <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Адрес доставки *</label>
                <input value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Комментарий</label>
                <textarea value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={3}
                  className="w-full mt-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-1 focus:ring-primary outline-none resize-none" />
              </div>
            </form>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-border">
            <div className="flex justify-between items-center mb-4 font-body">
              <span className="text-muted-foreground">Итого:</span>
              <span className="text-xl font-semibold text-foreground">{totalPrice.toLocaleString("ru-RU")} ₽</span>
            </div>
            {!checkout ? (
              <button onClick={() => setCheckout(true)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body text-sm tracking-wider uppercase hover:bg-rose-dark transition-colors">
                Оформить заказ
              </button>
            ) : (
              <button type="submit" form="checkout-form"
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-body text-sm tracking-wider uppercase hover:bg-rose-dark transition-colors">
                Подтвердить заказ
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
