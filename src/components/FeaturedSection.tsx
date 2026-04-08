import ProductCard from "./ProductCard";
import { useStore } from "@/context/StoreContext";
import { Link } from "react-router-dom";

const FeaturedSection = () => {
  const { products } = useStore();
  const featured = products.slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-2">Коллекция</p>
        <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground">Наши букеты</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((product, i) => (
          <div key={product.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link to="/catalog"
          className="inline-block border border-primary text-primary font-body text-sm tracking-wider uppercase px-8 py-3 rounded-sm hover:bg-primary hover:text-primary-foreground transition-colors">
          Смотреть все
        </Link>
      </div>
    </section>
  );
};

export default FeaturedSection;
