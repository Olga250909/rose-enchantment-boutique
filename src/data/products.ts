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
    image: "/src/assets/rose-bouquet-1.jpg",
    category: "Классические",
    inStock: true,
    roses: 15,
  },
  {
    id: "2",
    name: "Белый Шёпот",
    description: "Элегантный букет из 21 белой розы. Символ чистоты и нежности, оформлен в персиковую бумагу.",
    price: 4800,
    image: "/src/assets/rose-bouquet-2.jpg",
    category: "Премиум",
    inStock: true,
    roses: 21,
  },
  {
    id: "3",
    name: "Страсть Бордо",
    description: "Роскошный букет из 25 красных роз. Классика, которая не нуждается в словах.",
    price: 5500,
    image: "/src/assets/rose-bouquet-3.jpg",
    category: "Классические",
    inStock: true,
    roses: 25,
  },
  {
    id: "4",
    name: "Персиковый Рассвет",
    description: "Букет из 19 персиковых роз с зеленью эвкалипта. Свежесть весеннего утра в каждом лепестке.",
    price: 4200,
    image: "/src/assets/rose-bouquet-4.jpg",
    category: "Авторские",
    inStock: true,
    roses: 19,
  },
  {
    id: "5",
    name: "Лавандовые Грёзы",
    description: "Романтичный букет из 17 розово-сиреневых роз с веточками сирени. Аромат французского сада.",
    price: 4500,
    image: "/src/assets/rose-bouquet-5.jpg",
    category: "Авторские",
    inStock: true,
    roses: 17,
  },
  {
    id: "6",
    name: "Шляпная Коробка Шарм",
    description: "Микс из 25 роз в элегантной шляпной коробке пудрового цвета. Роскошный подарок.",
    price: 6500,
    image: "/src/assets/rose-bouquet-6.jpg",
    category: "Премиум",
    inStock: true,
    roses: 25,
  },
];
