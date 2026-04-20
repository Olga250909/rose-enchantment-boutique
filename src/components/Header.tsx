import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gold/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="font-heading text-3xl font-medium tracking-wide text-foreground">
          Магия Роз
        </Link>

        <nav className="hidden md:flex items-center gap-10 font-body text-sm tracking-wider">
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors story-link">Главная</Link>
          <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors story-link">Каталог</Link>
          <Link to="/constructor" className="text-gold hover:text-primary transition-colors story-link">Конструктор</Link>
          <Link to="/delivery" className="text-muted-foreground hover:text-primary transition-colors story-link">Доставка</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-body">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-3 font-body text-sm">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-primary py-2">Главная</Link>
            <Link to="/catalog" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-primary py-2">Каталог</Link>
            <Link to="/constructor" onClick={() => setMobileOpen(false)} className="text-gold hover:text-primary py-2">Конструктор</Link>
            <Link to="/delivery" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-primary py-2">Доставка</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
