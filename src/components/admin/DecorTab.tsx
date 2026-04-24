import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, Upload, ImageIcon, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { DecorService, decorCategories } from "@/data/decorServices";
import { toast } from "sonner";

const DecorTab = () => {
  const { decorServices, addDecorService, updateDecorService, deleteDecorService } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "Свадьбы", image: "", customCategory: "",
    gallery: [] as string[],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ name: "", description: "", price: "", category: "Свадьбы", image: "", customCategory: "", gallery: [] });
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

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const valid = files.filter(f => {
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name}: больше 5 МБ`);
        return false;
      }
      return true;
    });
    Promise.all(
      valid.map(f => new Promise<string>((resolve) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.readAsDataURL(f);
      }))
    ).then(urls => {
      setForm(prev => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
    });
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  const removeGalleryItem = (idx: number) => {
    setForm(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== idx) }));
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.price) {
      toast.error("Заполните название и цену");
      return;
    }
    const cat = form.category === "__custom" ? form.customCategory.trim() || "Свадьбы" : form.category;
    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: cat,
      image: form.image || "/placeholder.svg",
      gallery: form.gallery,
    };
    if (editingId) {
      updateDecorService(editingId, data);
      toast.success("Услуга обновлена");
    } else {
      addDecorService(data);
      toast.success("Услуга добавлена");
    }
    resetForm();
  };

  const startEdit = (s: DecorService) => {
    const isCustom = !decorCategories.includes(s.category);
    setForm({
      name: s.name,
      description: s.description,
      price: String(s.price),
      category: isCustom ? "__custom" : s.category,
      customCategory: isCustom ? s.category : "",
      image: s.image,
      gallery: s.gallery ?? [],
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  return (
    <div>
      <button
        onClick={() => { resetForm(); setShowForm(true); }}
        className="mb-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-body text-sm hover:bg-rose-dark transition-colors"
      >
        <Plus className="w-4 h-4" /> Добавить услугу
      </button>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6 space-y-4 font-body">
          <h3 className="font-heading text-xl text-foreground">{editingId ? "Редактировать услугу" : "Новая услуга"}</h3>

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
              {decorCategories.map(c => <option key={c} value={c}>{c}</option>)}
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
          </div>

          <textarea
            placeholder="Описание услуги"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm resize-none"
          />

          <div className="space-y-3">
            <label className="text-sm text-foreground font-medium">Главное фото (обложка)</label>
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
            {form.image ? (
              <div className="relative w-24 h-24 rounded-lg border border-border overflow-hidden bg-muted">
                <img src={form.image} alt="Превью" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg border border-dashed border-border flex items-center justify-center bg-muted/50">
                <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-sm text-foreground font-medium">
              Галерея ({form.gallery.length})
              <span className="text-xs text-muted-foreground font-normal ml-2">— дополнительные фото</span>
            </label>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm hover:bg-muted transition-colors"
            >
              <Upload className="w-4 h-4" /> Добавить фото в галерею
            </button>
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="hidden"
            />
            {form.gallery.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.gallery.map((g, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg border border-border overflow-hidden bg-muted group">
                    <img src={g} alt={`Галерея ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryItem(i)}
                      className="absolute top-1 right-1 bg-background/80 hover:bg-destructive hover:text-destructive-foreground rounded-full p-1 transition-colors"
                      aria-label="Удалить"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {decorServices.map(s => (
          <div key={s.id} className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] bg-muted overflow-hidden">
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-1 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-heading text-base text-foreground">{s.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">{s.category}</span>
              </div>
              <p className="text-sm text-muted-foreground font-body line-clamp-3">{s.description}</p>
              {s.gallery && s.gallery.length > 0 && (
                <p className="text-xs text-muted-foreground">+ {s.gallery.length} фото в галерее</p>
              )}
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-heading text-lg text-foreground">{s.price.toLocaleString("ru-RU")} ₽</span>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(s)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { deleteDecorService(s.id); toast.success("Услуга удалена"); }}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecorTab;
