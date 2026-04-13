import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Анна М.",
    initials: "АМ",
    text: "Заказывала букет на день рождения мамы. Розы были невероятно свежими, а оформление — как из журнала. Курьер приехал вовремя и прислал фото перед доставкой!",
    rating: 5,
  },
  {
    name: "Елена К.",
    initials: "ЕК",
    text: "Уже третий раз заказываю здесь. Каждый букет — произведение искусства. Отдельное спасибо за внимание к деталям и упаковку.",
    rating: 5,
  },
  {
    name: "Дмитрий В.",
    initials: "ДВ",
    text: "Хотел удивить жену — и удивил! Букет был настолько красивым, что она не могла поверить. Рекомендую всем!",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section className="py-20 md:py-28 bg-cream/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-gold font-body">
          Отзывы
        </span>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-3">
          Что говорят наши клиенты
        </h2>
        <div className="w-12 h-px bg-gold/40 mx-auto mt-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="bg-background border border-border rounded-2xl p-8 flex flex-col items-center text-center transition-shadow hover:shadow-lg hover:shadow-rose-light/20"
          >
            {/* Avatar */}
            <div className="w-14 h-14 rounded-full border-2 border-gold/60 flex items-center justify-center mb-5">
              <span className="font-heading text-lg text-gold">{t.initials}</span>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={16} className="fill-gold text-gold" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-muted-foreground font-body text-sm leading-relaxed italic mb-6">
              «{t.text}»
            </p>

            {/* Name */}
            <span className="font-heading text-base text-foreground">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
