import productBlushBouquet from "@/assets/product-blush-bouquet.jpg";
import productProvenceTenderness from "@/assets/product-provence-tenderness.jpg";
import productWhiteBox from "@/assets/product-white-box.jpg";
import productHeartRoses from "@/assets/product-heart-roses.png";
import productFantasyBouquet from "@/assets/product-fantasy-bouquet.jpg";
import productLavender from "@/assets/product-lavender.jpg";
import productMixRoses from "@/assets/product-mix-roses.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  roses: number;
  badge?: string;
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Нежность Прованса",
    description: "Букет из 15 пудровых роз в крафтовой упаковке с лентой из натурального шёлка. Идеальный подарок для романтического вечера.",
    price: 15000,
    image: productProvenceTenderness,
    category: "Классические",
    inStock: true,
    roses: 15,
    badge: "Хит",
  },
  {
    id: "2",
    name: "Белый Шёпот",
    description: "Элегантный букет из 21 белой розы. Символ чистоты и нежности, оформлен в персиковую бумагу.",
    price: 18500,
    image: productWhiteBox,
    category: "Премиум",
    inStock: true,
    roses: 21,
  },
  {
    id: "3",
    name: "Страсть Бордо",
    description: "Роскошный букет из 25 красных роз. Классика, которая не нуждается в словах.",
    price: 35000,
    image: productHeartRoses,
    category: "Классические",
    inStock: true,
    roses: 25,
    badge: "Премиум",
  },
  {
    id: "4",
    name: "Розовая Фантазия",
    description: "Эксклюзивный букет из 31 розы с художественной подачей — лепестки, прорывающиеся сквозь бумагу. Настоящее произведение флористического искусства.",
    price: 24500,
    image: productFantasyBouquet,
    category: "Премиум",
    inStock: true,
    roses: 31,
    badge: "Новинка",
  },
  {
    id: "5",
    name: "Лавандовые Грёзы",
    description: "Романтичный букет из 17 розово-сиреневых роз с веточками сирени. Аромат французского сада.",
    price: 16500,
    image: productLavender,
    category: "Авторские",
    inStock: true,
    roses: 17,
  },
  {
    id: "6",
    name: "Шляпная Коробка Шарм",
    description: "Микс из 25 роз в элегантной шляпной коробке пудрового цвета. Роскошный подарок.",
    price: 27000,
    image: productMixRoses,
    category: "Премиум",
    inStock: true,
    roses: 25,
    badge: "Хит",
  },
  {
    id: "7",
    name: "Пампасный Шик",
    description: "Стильная композиция из 19 сухоцветов: пампасная трава, лагурус и стабилизированные розы. Долговечная красота без воды.",
    price: 19000,
    image: productLavender,
    category: "Сухоцветы",
    inStock: true,
    roses: 19,
  },
  {
    id: "8",
    name: "Сухоцветный Вальс",
    description: "Нежный букет из 15 сухоцветов в пастельных тонах. Лаванда, хлопок и эвкалипт — природная гармония.",
    price: 17500,
    image: productBlushBouquet,
    category: "Сухоцветы",
    inStock: true,
    roses: 15,
    badge: "Новинка",
  },
];
