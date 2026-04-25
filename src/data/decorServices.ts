import decorArchWhite from "@/assets/decor-arch-white.jpg";
import decorArchPastel from "@/assets/decor-arch-pastel.jpg";
import decorTablePinkRoses from "@/assets/decor-table-pink-roses.jpg";
import decorTableWhiteRoses from "@/assets/decor-table-white-roses.jpg";
import decorEntrance1 from "@/assets/decor-entrance-roses-1.jpg";
import decorEntrance2 from "@/assets/decor-entrance-roses-2.jpg";
import decorEntrance3 from "@/assets/decor-entrance-roses-3.jpg";
import decorEntrance4 from "@/assets/decor-entrance-roses-4.jpg";

export interface DecorService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  gallery?: string[];
}

export const decorCategories = ["Свадьбы", "Офисы, салоны, шоурумы", "Юбилеи", "Корпоративы", "Детские праздники"];

export const initialDecorServices: DecorService[] = [
  {
    id: "decor-1",
    name: "Свадебная арка «Белоснежная нежность»",
    description:
      "Романтичная арка из белых роз и облаков гипсофилы с акцентами нежно-розовых бутонов. Идеальное обрамление для церемонии и фотозоны.",
    price: 85000,
    category: "Свадьбы",
    image: decorArchWhite,
    gallery: [decorArchWhite, decorArchPastel],
  },
  {
    id: "decor-2",
    name: "Свадебная арка «Пастельный рассвет»",
    description:
      "Воздушная арка из пастельных кремовых и пудрово-розовых роз с гипсофилой. Утончённое оформление церемонии в романтичной палитре.",
    price: 95000,
    category: "Свадьбы",
    image: decorArchPastel,
    gallery: [decorArchPastel, decorArchWhite],
  },
  {
    id: "decor-3",
    name: "Романтическая фотозона «Облако роз»",
    description:
      "Уютная фотозона из живых роз, гипсофилы и пышной зелени для свадебной церемонии, выездной регистрации или семейного торжества. Подбираем палитру под ваш стиль и сочетаем с декоративным освещением.",
    price: 65000,
    category: "Свадьбы",
    image: decorArchWhite,
    gallery: [decorArchWhite, decorArchPastel],
  },
  {
    id: "decor-4",
    name: "Цветочная композиция на стол молодожёнов «Пудровые розы»",
    description:
      "Длинная флористическая композиция из пудрово-розовых роз, облака гипсофилы и свежего эвкалипта для президиума молодожёнов. Свечи и сервировка подбираются под стиль свадьбы.",
    price: 45000,
    category: "Свадьбы",
    image: decorTablePinkRoses,
    gallery: [decorTablePinkRoses, decorTableWhiteRoses],
  },
  {
    id: "decor-5",
    name: "Цветочная композиция на стол молодожёнов «Белоснежные розы»",
    description:
      "Торжественная белая композиция из крупных роз и пышного облака гипсофилы с зеленью для свадебного президиума. Создаёт лёгкий, воздушный и аристократичный образ торжества.",
    price: 48000,
    category: "Свадьбы",
    image: decorTableWhiteRoses,
    gallery: [decorTableWhiteRoses, decorTablePinkRoses],
  },
  {
    id: "decor-6",
    name: "Цветочные колонны у входа «Розовый бутик»",
    description:
      "Парные флористические колонны из пудрово-розовых и кремовых роз с облаком гипсофилы и свежей зеленью. Создают торжественную входную группу для салона красоты, бутика или шоурума.",
    price: 75000,
    category: "Офисы, салоны, шоурумы",
    image: decorEntrance1,
    gallery: [decorEntrance1, decorEntrance2, decorEntrance3, decorEntrance4],
  },
  {
    id: "decor-7",
    name: "Арка-портал «Цветущий вход»",
    description:
      "Каскад роз и зелени, обрамляющий стеклянные двери офиса или шоурума. Эффектное оформление для открытия, презентации новой коллекции или брендового мероприятия.",
    price: 90000,
    category: "Офисы, салоны, шоурумы",
    image: decorEntrance2,
    gallery: [decorEntrance2, decorEntrance1, decorEntrance3, decorEntrance4],
  },
  {
    id: "decor-8",
    name: "Композиция входной группы «Сияние»",
    description:
      "Пышные пастельные розы с декоративной подсветкой и свежей зеленью у входа. Подчёркивает премиальный статус салона и встречает гостей атмосферой праздника.",
    price: 85000,
    category: "Офисы, салоны, шоурумы",
    image: decorEntrance3,
    gallery: [decorEntrance3, decorEntrance1, decorEntrance2, decorEntrance4],
  },
  {
    id: "decor-9",
    name: "Флористическое оформление шоурума «Утренний свет»",
    description:
      "Нежные пастельные розы и полевые цветы в воздушной композиции для дневного оформления шоурума или офиса. Лёгкий, светлый образ для презентаций и фотосъёмок.",
    price: 70000,
    category: "Офисы, салоны, шоурумы",
    image: decorEntrance4,
    gallery: [decorEntrance4, decorEntrance1, decorEntrance2, decorEntrance3],
  },
];
