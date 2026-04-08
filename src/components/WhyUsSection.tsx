import { Flower2, Truck, Clock, Heart } from "lucide-react";

const features = [
  { icon: Flower2, title: "Свежесть", text: "Розы напрямую из лучших оранжерей" },
  { icon: Heart, title: "Ручная сборка", text: "Каждый букет создаётся флористом" },
  { icon: Truck, title: "Доставка", text: "По Москве и области от 2 часов" },
  { icon: Clock, title: "Ежедневно", text: "Работаем с 8:00 до 22:00" },
];

const WhyUsSection = () => (
  <section className="bg-muted/50 py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-rose-light/50 flex items-center justify-center">
              <f.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading text-lg font-medium text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
