import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import {
  COLORS, QUANTITY_PRESETS, ADDONS, PACKAGING, RIBBONS, PRICE_PER_ROSE,
} from "@/data/constructorOptions";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

const ConstructorPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [color, setColor] = useState(COLORS[0]);
  const [quantity, setQuantity] = useState(25);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [pack, setPack] = useState(PACKAGING[0]);
  const [ribbon, setRibbon] = useState(RIBBONS[0]);

  const selectedAddons = ADDONS.filter(a => addonIds.includes(a.id));

  const totalPrice = useMemo(() => {
    return quantity * PRICE_PER_ROSE
      + selectedAddons.reduce((s, a) => s + a.price, 0)
      + pack.price;
  }, [quantity, selectedAddons, pack]);

  const toggleAddon = (id: string) =>
    setAddonIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleAddToCart = () => {
    const composition = [
      `${quantity} ${color.label.toLowerCase()} роз`,
      ...selectedAddons.map(a => a.label.toLowerCase()),
      `упаковка: ${pack.label.toLowerCase()}`,
      ribbon.hex ? `лента: ${ribbon.label.toLowerCase()}` : null,
    ].filter(Boolean).join(", ");

    const product: Product = {
      id: `custom-${Date.now()}`,
      name: `Авторский букет (${quantity} роз)`,
      description: `Состав: ${composition}.`,
      price: totalPrice,
      image: "/placeholder.svg",
      category: "Авторские",
      inStock: true,
      roses: quantity,
      badge: "Конструктор",
    };
    addToCart(product);
    toast({ title: "Букет добавлен в корзину", description: product.name });
    navigate("/");
  };

  const Step = ({ n, title, children }: { n: number; title: string; children: React.ReactNode }) => (
    <section className="border-t border-gold/20 pt-10">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-heading text-gold text-2xl italic">0{n}</span>
        <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );

  const petals = Array.from({ length: Math.min(quantity, 24) });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <p className="text-[11px] font-body tracking-[0.5em] uppercase text-gold mb-4">Магия Роз</p>
        <h1 className="font-heading text-4xl md:text-6xl font-light text-foreground">
          Конструктор <span className="italic text-primary">букета</span>
        </h1>
        <p className="font-body text-muted-foreground mt-4 max-w-xl mx-auto">
          Соберите букет под себя — от количества роз до цвета ленты.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-12">
        <div className="space-y-12">
          <Step n={1} title="Цвет роз">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setColor(c)}
                  className={`group flex flex-col items-center gap-3 p-4 border transition-all ${
                    color.id === c.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                  }`}
                >
                  <span
                    className="w-14 h-14 rounded-full border border-gold/20"
                    style={{ background: c.hex.startsWith("linear") ? c.hex : c.hex }}
                  />
                  <span className="font-body text-sm text-foreground">{c.label}</span>
                </button>
              ))}
            </div>
          </Step>

          <Step n={2} title="Количество">
            <div className="flex flex-wrap gap-2 mb-6">
              {QUANTITY_PRESETS.map(q => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={`min-w-14 px-4 py-2 font-body text-sm border transition-all ${
                    quantity === q ? "border-gold bg-gold text-white" : "border-border text-foreground hover:border-gold"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="px-2">
              <Slider
                value={[quantity]}
                onValueChange={([v]) => setQuantity(v)}
                min={5}
                max={151}
                step={2}
              />
              <p className="font-body text-sm text-muted-foreground mt-3">
                Выбрано: <span className="text-foreground font-medium">{quantity} роз</span>
              </p>
            </div>
          </Step>

          <Step n={3} title="Дополнения">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ADDONS.map(a => {
                const active = addonIds.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className={`flex items-center justify-between p-4 border text-left transition-all ${
                      active ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 border flex items-center justify-center ${active ? "bg-gold border-gold" : "border-border"}`}>
                        {active && <Check className="w-3 h-3 text-white" />}
                      </span>
                      <span className="font-body text-sm text-foreground">{a.label}</span>
                    </div>
                    <span className="font-body text-xs text-muted-foreground">+{a.price} ₽</span>
                  </button>
                );
              })}
            </div>
          </Step>

          <Step n={4} title="Упаковка">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PACKAGING.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPack(p)}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all ${
                    pack.id === p.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                  }`}
                >
                  <span className="w-14 h-14 rounded-sm border border-gold/20" style={{ background: p.bg }} />
                  <span className="font-body text-sm text-foreground text-center">{p.label}</span>
                  <span className="font-body text-xs text-muted-foreground">
                    {p.price === 0 ? "бесплатно" : `+${p.price} ₽`}
                  </span>
                </button>
              ))}
            </div>
          </Step>

          <Step n={5} title="Лента">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {RIBBONS.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRibbon(r)}
                  className={`flex flex-col items-center gap-3 p-4 border transition-all ${
                    ribbon.id === r.id ? "border-gold bg-gold/5" : "border-border hover:border-gold/50"
                  }`}
                >
                  <span
                    className="w-14 h-3 rounded-full border border-gold/20"
                    style={{ background: r.hex ?? "transparent" }}
                  />
                  <span className="font-body text-sm text-foreground text-center">{r.label}</span>
                </button>
              ))}
            </div>
          </Step>
        </div>

        {/* Preview */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-gold/30 bg-card p-6">
            <p className="text-[11px] font-body tracking-[0.4em] uppercase text-gold mb-4">Ваш букет</p>

            <div
              className="relative aspect-square rounded-sm flex items-center justify-center mb-6 overflow-hidden"
              style={{ background: pack.bg }}
            >
              <div className="relative w-3/4 aspect-square rounded-full flex flex-wrap items-center justify-center gap-1 p-4">
                {petals.map((_, i) => {
                  const angle = (i / petals.length) * 360;
                  const r = 70;
                  return (
                    <span
                      key={i}
                      className="absolute w-5 h-5 rounded-full border border-black/10"
                      style={{
                        background: color.hex.startsWith("linear") ? color.hex : color.hex,
                        transform: `translate(${Math.cos((angle * Math.PI) / 180) * r}px, ${Math.sin((angle * Math.PI) / 180) * r}px)`,
                        left: "50%",
                        top: "50%",
                        marginLeft: -10,
                        marginTop: -10,
                      }}
                    />
                  );
                })}
                <span
                  className="w-10 h-10 rounded-full border border-black/10 z-10"
                  style={{ background: color.hex.startsWith("linear") ? color.hex : color.hex }}
                />
              </div>
              {ribbon.hex && (
                <span
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-2 rounded-full"
                  style={{ background: ribbon.hex }}
                />
              )}
            </div>

            <ul className="font-body text-sm text-muted-foreground space-y-1 mb-6">
              <li><span className="text-foreground">{quantity}</span> {color.label.toLowerCase()} роз</li>
              {selectedAddons.map(a => <li key={a.id}>+ {a.label}</li>)}
              <li>Упаковка: <span className="text-foreground">{pack.label}</span></li>
              <li>Лента: <span className="text-foreground">{ribbon.label}</span></li>
            </ul>

            <div className="border-t border-gold/20 pt-4 mb-4">
              <div className="flex items-baseline justify-between">
                <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">Итого</span>
                <span className="font-heading text-3xl text-foreground">{totalPrice.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gold text-white font-body text-[11px] tracking-[0.3em] uppercase py-4 hover:bg-gold/90 transition-colors"
            >
              Добавить в корзину
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ConstructorPage;
