import decorArchWhite from "@/assets/decor-arch-white.jpg";
import decorArchPastel from "@/assets/decor-arch-pastel.jpg";

export interface DecorService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const decorCategories = ["Свадьбы", "Юбилеи", "Корпоративы", "Детские праздники"];

export const initialDecorServices: DecorService[] = [
  {
    id: "decor-1",
    name: "Свадебная арка «Белоснежная нежность»",
    description:
      "Романтичная арка из белых роз и облаков гипсофилы с акцентами нежно-розовых бутонов. Идеальное обрамление для церемонии и фотозоны.",
    price: 85000,
    category: "Свадьбы",
    image: decorArchWhite,
  },
  {
    id: "decor-2",
    name: "Свадебная арка «Пастельный рассвет»",
    description:
      "Воздушная арка из пастельных кремовых и пудрово-розовых роз с гипсофилой. Утончённое оформление церемонии в романтичной палитре.",
    price: 95000,
    category: "Свадьбы",
    image: decorArchPastel,
  },
];
