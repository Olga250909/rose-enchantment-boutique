import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-roses.jpg";

const useScrollReveal = (delay = 0, threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return { ref, className: `transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}` };
};

const HeroSection = () => {
  const label = useScrollReveal(0);
  const heading = useScrollReveal(150);
  const subtitle = useScrollReveal(300);
  const button = useScrollReveal(450);
  const trust = useScrollReveal(600);

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Full-width background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Премиальный букет роз"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-24 md:py-40 relative z-10">
        <div className="max-w-2xl">
          <div ref={label.ref} className={label.className}>
            <p className="font-body text-[11px] tracking-[0.5em] uppercase text-gold mb-8">
              Авторская флористика во французском стиле
            </p>
            <div className="w-12 h-[1px] bg-gold/60 mb-8" />
          </div>

          <div ref={heading.ref} className={heading.className}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-light text-white leading-[1.1] mb-6">
              Розы, которые
              <br />
              <span className="italic text-primary">говорят за вас</span>
            </h1>
          </div>

          <div ref={subtitle.ref} className={subtitle.className}>
            <p className="font-heading text-xl md:text-2xl text-white/80 font-light mb-3">
              Премиальная доставка роз по Москве и&nbsp;МО
            </p>
            <p className="font-body text-base text-white/60 leading-relaxed mb-12">
              Букеты, которые действительно производят впечатление
            </p>
          </div>

          <div ref={button.ref} className={`${button.className} flex flex-wrap gap-4`}>
            <Link
              to="/catalog"
              className="inline-block border border-gold bg-transparent text-white font-body text-[11px] tracking-[0.3em] uppercase px-12 py-4 rounded-none hover:bg-gold hover:text-background transition-all duration-500"
            >
              Выбрать букет
            </Link>
            <Link
              to="/constructor"
              className="inline-block border border-gold bg-gold text-background font-body text-[11px] tracking-[0.3em] uppercase px-12 py-4 rounded-none hover:bg-transparent hover:text-white transition-all duration-500"
            >
              Собери букет сам
            </Link>
          </div>

          <div ref={trust.ref} className={trust.className}>
            <p className="mt-14 font-body text-[11px] tracking-[0.15em] uppercase text-white/50">
              Фото перед отправкой{" "}
              <span className="text-gold/50 mx-2">·</span>{" "}
              Свежесть гарантирована{" "}
              <span className="text-gold/50 mx-2">·</span>{" "}
              Доставка от 2 часов
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
