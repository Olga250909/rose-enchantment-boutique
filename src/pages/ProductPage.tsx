import { useParams, Link } from "react-router-dom";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl text-foreground mb-4">Товар не найден</h1>
        <Link to="/catalog" className="text-primary font-body hover:underline">Вернуться в каталог</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`«${product.name}» добавлен в корзину`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-body text-sm mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Назад в каталог
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="relative rounded-sm overflow-hidden bg-[#1a1a1a] aspect-[4/5]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={800} height={1000} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
          {product.badge && (
            <span className="absolute top-4 left-4 bg-gold/90 text-background font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5">
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-body tracking-[0.2em] uppercase text-primary mb-2">{product.category}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-4">{product.name}</h1>
          <p className="text-muted-foreground font-body leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-center gap-4 mb-2">
            <span className="font-heading text-3xl text-foreground tracking-wide">{product.price.toLocaleString("ru-RU")} ₽</span>
          </div>
          <p className="text-sm text-muted-foreground font-body mb-8">{product.roses} роз в букете</p>
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center gap-3 border border-gold/70 bg-transparent text-foreground font-body text-sm tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-gold hover:text-background transition-colors w-full sm:w-auto"
          >
            <ShoppingBag className="w-4 h-4" />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
