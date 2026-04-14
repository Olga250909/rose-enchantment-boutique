import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-roses.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-gradient-hero">
    <div className="container mx-auto px-6 py-24 md:py-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div className="animate-fade-in-up max-w-xl">
          <p className="font-body text-[11px] tracking-[0.5em] uppercase text-gold mb-8">
            Авторская флористика во французском стиле
          </p>

          {/* Gold decorative line */}
          <div className="w-12 h-[1px] bg-gold/60 mb-8" />

          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-[1.1] mb-6">
            Розы, которые
            <br />
            <span className="italic text-primary">говорят за вас</span>
          </h1>

          <p className="font-heading text-xl md:text-2xl text-muted-foreground font-light mb-3">
            Премиальная доставка роз по Москве и&nbsp;МО
          </p>

          <p className="font-body text-base text-muted-foreground/80 leading-relaxed mb-12">
            Букеты, которые действительно производят впечатление
          </p>

          <Link
            to="/catalog"
            className="inline-block border border-gold/70 bg-transparent text-foreground font-body text-[11px] tracking-[0.3em] uppercase px-12 py-4 rounded-none hover:bg-gold hover:text-background transition-all duration-500"
          >
            Выбрать букет
          </Link>

          {/* Trust block — text only */}
          <p className="mt-14 font-body text-[11px] tracking-[0.15em] uppercase text-muted-foreground/60">
            Фото перед отправкой{" "}
            <span className="text-gold/50 mx-2">·</span>{" "}
            Свежесть гарантирована{" "}
            <span className="text-gold/50 mx-2">·</span>{" "}
            Доставка от 2 часов
          </p>
        </div>

        {/* Image */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroImage}
            alt="Премиальный букет роз во французском стиле"
            className="rounded-3xl shadow-2xl shadow-rose-light/30 w-full object-cover aspect-[3/4]"
            width={900}
            height={1200}
          />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
