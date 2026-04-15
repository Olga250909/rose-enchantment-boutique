import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";

type SortOption = "default" | "price-asc" | "price-desc";

const CatalogPage = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sort, setSort] = useState<SortOption>("default");
  const categories = ["Все", ...Array.from(new Set(products.map(p => p.category)))];

  let filtered = activeCategory === "Все" ? [...products] : products.filter(p => p.category === activeCategory);

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-2">Коллекция</p>
        <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground">Каталог</h1>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex justify-center gap-3 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-none text-sm font-body transition-colors border ${
                activeCategory === cat
                  ? "border-gold bg-gold/10 text-foreground"
                  : "border-gold/30 bg-transparent text-muted-foreground hover:border-gold/60 hover:text-foreground"
              }`}>
              {cat}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="px-4 py-2 border border-border bg-background text-foreground text-sm font-body rounded-sm focus:ring-1 focus:ring-gold outline-none cursor-pointer"
        >
          <option value="default">По умолчанию</option>
          <option value="price-asc">Сначала дешёвые</option>
          <option value="price-desc">Сначала дорогие</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map((product, i) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;
