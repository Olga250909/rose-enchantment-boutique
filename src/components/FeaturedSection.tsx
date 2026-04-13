import ProductCard from "./ProductCard";
import { useStore } from "@/context/StoreContext";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  const { products } = useStore();
  const featured = products.slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-14">
        <p className="text-xs font-body tracking-[0.4em] uppercase text-gold mb-3">Для особенных моментов</p>
        <h2 className="font-heading text-3xl md:text-5xl font-light text-foreground">Избранная коллекция</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product, i) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="text-center mt-14">
        <Link to="/catalog"
          className="inline-block border-2 border-gold text-gold font-body text-sm tracking-[0.2em] uppercase px-10 py-3 rounded-sm hover:bg-gold hover:text-white transition-all duration-300">
          Смотреть все
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
