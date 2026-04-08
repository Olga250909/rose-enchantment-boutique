import { useStore, Order } from "@/context/StoreContext";
import { useState } from "react";
import { Package, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

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

const AdminPage = () => {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus } = useStore();
  const [tab, setTab] = useState<"orders" | "products">("orders");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "", roses: "", image: "", inStock: true });

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", category: "", roses: "", image: "", inStock: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error("Заполните название и цену");
      return;
    }
    const data = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category || "Классические",
      roses: Number(form.roses) || 0,
      image: form.image || "/placeholder.svg",
      inStock: form.inStock,
    };
    if (editingId) {
      updateProduct(editingId, data);
      toast.success("Товар обновлён");
    } else {
      addProduct(data);
      toast.success("Товар добавлен");
    }
    resetForm();
  };

  const startEdit = (p: typeof products[0]) => {
    setForm({ name: p.name, description: p.description, price: String(p.price), category: p.category, roses: String(p.roses), image: p.image, inStock: p.inStock });
    setEditingId(p.id);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-heading text-4xl font-light text-foreground mb-8">Админ-панель</h1>

      <div className="flex gap-3 mb-8">
        <button onClick={() => setTab("orders")}
          className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${tab === "orders" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          Заказы ({orders.length})
        </button>
        <button onClick={() => setTab("products")}
          className={`px-5 py-2 rounded-full text-sm font-body transition-colors ${tab === "products" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          Товары ({products.length})
        </button>
      </div>

      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-10">Заказов пока нет</p>
          ) : (
            orders.map(order => (
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
                  <select value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value as Order["status"])}
                    className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground font-body">
                    <option value="new">Новый</option>
                    <option value="processing">В обработке</option>
                    <option value="delivered">Доставлен</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "products" && (
        <div>
          <button onClick={() => { resetForm(); setShowForm(true); }}
            className="mb-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body text-sm hover:bg-rose-dark transition-colors">
            <Plus className="w-4 h-4" /> Добавить товар
          </button>

          {showForm && (
            <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4 font-body">
              <h3 className="font-heading text-xl text-foreground">{editingId ? "Редактировать товар" : "Новый товар"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Название" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm" />
                <input placeholder="Категория" value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm" />
                <input placeholder="Цена" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm" />
                <input placeholder="Кол-во роз" type="number" value={form.roses} onChange={e => setForm({...form, roses: e.target.value})}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm" />
                <input placeholder="URL изображения" value={form.image} onChange={e => setForm({...form, image: e.target.value})}
                  className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm md:col-span-2" />
              </div>
              <textarea placeholder="Описание" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm resize-none" />
              <div className="flex gap-3">
                <button onClick={handleSave}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm hover:bg-rose-dark transition-colors">
                  {editingId ? "Сохранить" : "Добавить"}
                </button>
                <button onClick={resetForm}
                  className="border border-border text-muted-foreground px-6 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors">
                  Отмена
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {products.map(p => (
              <div key={p.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-base text-foreground truncate">{p.name}</h4>
                  <p className="text-sm text-muted-foreground font-body">{p.price.toLocaleString("ru-RU")} ₽ · {p.roses} роз</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="p-2 text-muted-foreground hover:text-primary">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => { deleteProduct(p.id); toast.success("Товар удалён"); }}
                    className="p-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
