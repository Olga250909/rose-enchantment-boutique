import productBlushBouquet from "@/assets/product-blush-bouquet.jpg";
import productWhiteBox from "@/assets/product-white-box.jpg";
import productHeartRoses from "@/assets/product-heart-roses.png";
import productEditorialBouquet from "@/assets/product-editorial-bouquet.jpg";
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
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Нежность Прованса",
    description: "Букет из 15 пудровых роз в крафтовой упаковке с лентой из натурального шёлка. Идеальный подарок для романтического вечера.",
    price: 3500,
    image: productBlushBouquet,
    category: "Классические",
    inStock: true,
    roses: 15,
  },
  {
    id: "2",
    name: "Белый Шёпот",
    description: "Элегантный букет из 21 белой розы. Символ чистоты и нежности, оформлен в персиковую бумагу.",
    price: 4800,
    image: productWhiteBox,
    category: "Премиум",
    inStock: true,
    roses: 21,
  },
  {
    id: "3",
    name: "Страсть Бордо",
    description: "Роскошный букет из 25 красных роз. Классика, которая не нуждается в словах.",
    price: 5500,
    image: productHeartRoses,
    category: "Классические",
    inStock: true,
    roses: 25,
  },
  {
    id: "4",
    name: "Персиковый Рассвет",
    description: "Букет из 19 персиковых роз с зеленью эвкалипта. Свежесть весеннего утра в каждом лепестке.",
    price: 4200,
    image: productEditorialBouquet,
    category: "Авторские",
    inStock: true,
    roses: 19,
  },
  {
    id: "5",
    name: "Лавандовые Грёзы",
    description: "Романтичный букет из 17 розово-сиреневых роз с веточками сирени. Аромат французского сада.",
    price: 4500,
    image: productLavender,
    category: "Авторские",
    inStock: true,
    roses: 17,
  },
  {
    id: "6",
    name: "Шляпная Коробка Шарм",
    description: "Микс из 25 роз в элегантной шляпной коробке пудрового цвета. Роскошный подарок.",
    price: 6500,
    image: productMixRoses,
    category: "Премиум",
    inStock: true,
    roses: 25,
  },
];
