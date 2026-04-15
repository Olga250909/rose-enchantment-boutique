import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-heading text-xl font-medium text-foreground mb-4">Магия Роз</h3>
          <p className="text-muted-foreground text-sm font-body leading-relaxed">
            Доставка свежих роз по Москве и Московской области. Каждый букет создаётся с любовью во французском стиле.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium text-foreground mb-4">Навигация</h4>
          <nav className="flex flex-col gap-2 text-sm font-body">
            <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">Каталог</Link>
            <Link to="/delivery" className="text-muted-foreground hover:text-primary transition-colors">Доставка и оплата</Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</Link>
            <Link to="/offer" className="text-muted-foreground hover:text-primary transition-colors">Публичная оферта</Link>
          </nav>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium text-foreground mb-4">Контакты</h4>
          <div className="text-sm font-body text-muted-foreground space-y-3">
            <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-gold" /> +7(921) 314-74-08</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold" /> hello@magiarose.ru</p>
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /> Москва и МО</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> Ежедневно 8:00 — 22:00</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground font-body">
        © {new Date().getFullYear()} Магия Роз. Все права защищены.
      </div>
    </div>
  </footer>
);

export default Footer;
