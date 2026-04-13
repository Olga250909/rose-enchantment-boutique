import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-muted aspect-[4/5] mb-4 transition-shadow duration-500 group-hover:shadow-lg group-hover:shadow-rose-light/20">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={800}
            height={1000}
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>
      </Link>
      <div className="flex items-start justify-between gap-2">
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-heading text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground font-body mt-1">{product.roses} роз · {product.category}</p>
          <p className="text-foreground font-heading text-xl font-semibold mt-2">{product.price.toLocaleString("ru-RU")} ₽</p>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="mt-1 p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-gold transition-colors flex-shrink-0"
          aria-label="В корзину"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
