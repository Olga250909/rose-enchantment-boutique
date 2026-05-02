import { DecorService } from "@/data/decorServices";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";

interface DecorCardProps {
  service: DecorService;
}

const DecorCard = ({ service }: DecorCardProps) => {
  const { openChat } = useStore();
  const allImages = [service.image, ...(service.gallery?.filter(g => g !== service.image) ?? [])];
  const [activeImage, setActiveImage] = useState(service.image);

  const handleRequest = () => {
    openChat(`Здравствуйте! Хочу оставить заявку на услугу: ${service.name} (от ${service.price.toLocaleString("ru-RU")} ₽).`);
  };

  return (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden rounded-sm bg-[#1a1a1a] aspect-[4/5] mb-3 transition-shadow duration-500 group-hover:shadow-lg group-hover:shadow-rose-light/20">
        <img
          src={activeImage}
          alt={service.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          width={800}
          height={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
        <span className="absolute top-4 left-4 bg-gold/90 text-background font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5">
          {service.category}
        </span>
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 mb-4">
          {allImages.slice(0, 4).map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative w-16 h-16 overflow-hidden rounded-sm border transition-all ${
                activeImage === img ? "border-gold" : "border-gold/20 hover:border-gold/60"
              }`}
              aria-label={`Фото ${idx + 1}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <h3 className="font-heading text-lg font-medium text-foreground">{service.name}</h3>
      <p className="text-sm text-muted-foreground font-body mt-2 leading-relaxed flex-1">
        {service.description}
      </p>
      <div className="flex items-center justify-between mt-4 gap-3">
        <p className="text-foreground font-heading text-xl font-semibold tracking-wide">
          от {service.price.toLocaleString("ru-RU")} ₽
        </p>
        <button
          onClick={handleRequest}
          className="border border-gold bg-gold/10 text-foreground font-body text-xs tracking-[0.2em] uppercase px-5 py-3 rounded-sm hover:bg-gold hover:text-background transition-all"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  );
};

export default DecorCard;
