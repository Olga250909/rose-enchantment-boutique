import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Upload, ImageIcon } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/data/products";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const categories = ["Классические", "Премиум", "Авторские", "Мини"];

const ProductsTab = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "Классические",
    roses: "", image: "", inStock: true, customCategory: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", category: "Классические", roses: "", image: "", inStock: true, customCategory: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Файл слишком большой (макс. 5 МБ)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price) {
      toast.error("Заполните название и цену");
      return;
    }
    const cat = form.category === "__custom" ? form.customCategory.trim() || "Классические" : form.category;
    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: cat,
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

  const startEdit = (p: Product) => {
    const isCustom = !categories.includes(p.category);
    setForm({
      name: p.name, description: p.description, price: String(p.price),
      category: isCustom ? "__custom" : p.category,
      customCategory: isCustom ? p.category : "",
      roses: String(p.roses), image: p.image, inStock: p.inStock,
    });
    setEditingId(p.id);
    setShowForm(true);
  };

  return (
    <div>
      <button
        onClick={() => { resetForm(); setShowForm(true); }}
        className="mb-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body text-sm hover:bg-rose-dark transition-colors"
      >
        <Plus className="w-4 h-4" /> Добавить товар
      </button>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4 font-body">
          <h3 className="font-heading text-xl text-foreground">{editingId ? "Редактировать товар" : "Новый товар"}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Название *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            />
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
              <option value="__custom">Своя категория…</option>
            </select>
            {form.category === "__custom" && (
              <input
                placeholder="Название категории"
                value={form.customCategory}
                onChange={e => setForm({ ...form, customCategory: e.target.value })}
                className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
              />
            )}
            <input
              placeholder="Цена *"
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            />
            <input
              placeholder="Кол-во роз"
              type="number"
              value={form.roses}
              onChange={e => setForm({ ...form, roses: e.target.value })}
              className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
            />
          </div>

          <textarea
            placeholder="Описание товара"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm resize-none"
          />

          {/* Photo upload */}
          <div className="space-y-3">
            <label className="text-sm text-foreground font-medium">Фото товара</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm hover:bg-muted transition-colors"
              >
                <Upload className="w-4 h-4" /> Загрузить с устройства
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <input
                placeholder="или вставьте URL изображения"
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm"
              />
            </div>
            {form.image && (
              <div className="relative w-24 h-24 rounded-lg border border-border overflow-hidden bg-muted">
                <img src={form.image} alt="Превью" className="w-full h-full object-cover" />
              </div>
            )}
            {!form.image && (
              <div className="w-24 h-24 rounded-lg border border-dashed border-border flex items-center justify-center bg-muted/50">
                <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
              </div>
            )}
          </div>

          {/* In stock toggle */}
          <div className="flex items-center gap-3">
            <Switch checked={form.inStock} onCheckedChange={v => setForm({ ...form, inStock: v })} />
            <span className="text-sm text-foreground">{form.inStock ? "В наличии" : "Нет в наличии"}</span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg text-sm hover:bg-rose-dark transition-colors"
            >
              {editingId ? "Сохранить" : "Добавить"}
            </button>
            <button
              onClick={resetForm}
              className="border border-border text-muted-foreground px-6 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Products list */}
      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className="flex items-center gap-4 bg-card border border-border rounded-xl p-4">
            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-heading text-base text-foreground truncate">{p.name}</h4>
                {!p.inStock && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Нет в наличии</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground font-body">{p.price.toLocaleString("ru-RU")} ₽ · {p.roses} роз · {p.category}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => { deleteProduct(p.id); toast.success("Товар удалён"); }}
                className="p-2 text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsTab;
