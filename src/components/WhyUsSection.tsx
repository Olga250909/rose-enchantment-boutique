import { Flower2, Truck, Clock, Palette } from "lucide-react";

const features = [
  { icon: Flower2, title: "Только свежие розы", text: "Прямые поставки из лучших оранжерей Эквадора" },
  { icon: Palette, title: "Авторская флористика", text: "Каждый букет — ручная работа мастера" },
  { icon: Truck, title: "Бережная доставка", text: "Курьер в перчатках, фото перед отправкой" },
  { icon: Clock, title: "Без выходных", text: "Принимаем заказы с 8:00 до 22:00" },
];

const WhyUsSection = () => (
  <section className="bg-gradient-to-b from-cream to-rose-light/10 py-20">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold-light/40 flex items-center justify-center">
              <f.icon className="w-5 h-5 text-gold" />
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
