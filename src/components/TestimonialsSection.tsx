import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Анна М.",
    text: "Заказывала букет на день рождения мамы. Розы были невероятно свежими, а оформление — как из журнала. Курьер приехал вовремя и прислал фото перед доставкой!",
    rating: 5,
  },
  {
    name: "Елена К.",
    text: "Уже третий раз заказываю здесь. Каждый букет — произведение искусства. Отдельное спасибо за внимание к деталям и упаковку.",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    text: "Хотел удивить жену — и удивил! Букет был настолько красивым, что она не могла поверить. Рекомендую всем!",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-24 md:py-32 bg-cream/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-body">
          Отзывы
        </span>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-4">
          Что говорят наши клиенты
        </h2>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-background border border-border p-10 flex flex-col items-center text-center transition-all hover:border-gold/40 hover:shadow-lg hover:shadow-rose-light/10"
          >
            {/* Quote icon */}
            <Quote size={28} className="text-gold/30 mb-6 rotate-180" />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8">
              «{t.text}»
            </p>

            {/* Divider */}
            <div className="w-8 h-px bg-gold/30 mb-6" />

            {/* Name */}
            <span className="font-heading text-base text-foreground tracking-wide">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
