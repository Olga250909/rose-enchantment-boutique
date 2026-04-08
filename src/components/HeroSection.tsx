import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-roses.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in-up">
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-4">
            Москва и Московская область
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-light text-foreground leading-tight mb-6">
            Магия<br />
            <span className="italic text-primary">Роз</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-md mb-8">
            Свежие розы во французской выкладке с доставкой. Каждый букет — маленькое произведение искусства, созданное с любовью.
          </p>
          <Link
            to="/catalog"
            className="inline-block bg-primary text-primary-foreground font-body text-sm tracking-wider uppercase px-8 py-4 rounded-sm hover:bg-rose-dark transition-colors"
          >
            Выбрать букет
          </Link>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-rose-light/30 rounded-3xl -rotate-3" />
            <img
              src={heroImage}
              alt="Букет роз во французском стиле"
              className="relative rounded-2xl shadow-lg w-full object-cover aspect-[16/10]"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
