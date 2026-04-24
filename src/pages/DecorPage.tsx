import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import DecorCard from "@/components/DecorCard";

const DecorPage = () => {
  const { decorServices } = useStore();
  const [activeCategory, setActiveCategory] = useState("Все");

  const categories = ["Все", ...Array.from(new Set(decorServices.map(s => s.category)))];
  const filtered = activeCategory === "Все" ? decorServices : decorServices.filter(s => s.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-10 max-w-2xl mx-auto">
        <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-2">Услуги</p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground">Оформление праздников</h1>
        <p className="text-muted-foreground font-body mt-4 leading-relaxed">
          Свадебные арки, фотозоны и флористическое оформление мероприятий. Создаём атмосферу,
          которая останется в памяти. Выберите услугу и оставьте заявку — наш флорист свяжется с вами,
          чтобы обсудить детали.
        </p>
      </div>

      {categories.length > 1 && (
        <div className="flex justify-center gap-3 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-none text-sm font-body transition-colors border ${
                activeCategory === cat
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-gold/30 bg-transparent text-muted-foreground hover:border-gold/60 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground font-body py-20">
          В этой категории пока нет услуг.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((service, i) => (
            <div key={service.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
              <DecorCard service={service} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecorPage;
