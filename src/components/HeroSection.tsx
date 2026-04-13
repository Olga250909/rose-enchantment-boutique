import { Link } from "react-router-dom";
import { Camera, ShieldCheck, Truck } from "lucide-react";
import heroImage from "@/assets/hero-roses.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-in-up">
          <p className="text-xs font-body tracking-[0.4em] uppercase text-gold mb-6">
            Премиальная флористика
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground leading-tight mb-4">
            Розы, которые<br />
            <span className="italic text-primary">говорят за вас</span>
          </h1>
          <p className="text-muted-foreground font-body text-xl leading-relaxed max-w-md mb-10">
            Букеты, которые вызывают <span className="font-semibold text-foreground">ВАУ</span>
          </p>
          <Link
            to="/catalog"
            className="inline-block border-2 border-gold bg-transparent text-foreground font-body text-sm tracking-[0.2em] uppercase px-10 py-4 rounded-sm hover:bg-gold hover:text-white transition-all duration-300"
          >
            Выбрать букет
          </Link>

          {/* Trust block */}
          <div className="flex flex-wrap gap-6 mt-10">
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
              <Camera className="w-4 h-4 text-gold" />
              <span>Фото перед отправкой</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Свежесть гарантирована</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-body">
              <Truck className="w-4 h-4 text-gold" />
              <span>Доставка от 2 часов</span>
            </div>
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroImage}
            alt="Букет роз во французском стиле"
            className="rounded-2xl shadow-2xl shadow-rose-light/20 w-full object-cover aspect-[16/10]"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
