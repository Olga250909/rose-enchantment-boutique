import productBlushBouquet from "@/assets/product-blush-bouquet.jpg";
import productProvenceTenderness from "@/assets/product-provence-tenderness.jpg";
import productWhiteBox from "@/assets/product-white-box.jpg";
import productHeartRoses from "@/assets/product-heart-roses.png";
import productFantasyBouquet from "@/assets/product-fantasy-bouquet.jpg";
import productLavender from "@/assets/product-lavender.jpg";
import productMixRoses from "@/assets/product-mix-roses.jpg";
import productProvenceLuxe from "@/assets/product-provence-luxe.jpg";
import productPinkProvence from "@/assets/product-pink-provence.jpg";
import productParisAtelier from "@/assets/product-paris-atelier.jpg";
import productRoseVelvetBox from "@/assets/product-rose-velvet-box.jpg";
import productDriedMimosa from "@/assets/product-dried-mimosa.jpg";
import productDriedPinkPampas from "@/assets/product-dried-pink-pampas.jpg";
import productDriedCottonBox from "@/assets/product-dried-cotton-box.jpg";
import productDriedPastelBox from "@/assets/product-dried-pastel-box.jpg";
import productDriedCraftBouquet from "@/assets/product-dried-craft-bouquet.jpg";
import productPampasChic from "@/assets/product-pampas-chic.jpg";
import productDriedWaltz from "@/assets/product-dried-waltz.jpg";

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
    description: "Изысканная композиция из пампасной травы, лагуруса, сухих злаков и стабилизированных роз пастельно-розовой палитры в нежной упаковке Atelier Floral с шёлковой лентой. 19 элементов природной красоты без срока увядания.",
    price: 19000,
    image: productPampasChic,
    category: "Сухоцветы",
    inStock: true,
    roses: 19,
  },
  {
    id: "8",
    name: "Сухоцветный Вальс",
    description: "Роскошная композиция из пампасной травы, лагуруса, розовых и кремовых сухоцветов, гипсофилы и сухих злаков в нежно-персиковой упаковке с шёлковой лентой. Природная палитра в романтичном исполнении.",
    price: 17500,
    image: productDriedWaltz,
    category: "Сухоцветы",
    inStock: true,
    roses: 15,
    badge: "Новинка",
  },
  {
    id: "9",
    name: "Прованс Люкс",
    description: "Роскошная авторская композиция из 51 цветка: премиальные розы, пионовидные ранункулюсы, эустома и полевые акценты в дизайнерской упаковке Provence Lavande с шёлковой лентой.",
    price: 45000,
    image: productProvenceLuxe,
    category: "Премиум",
    inStock: true,
    roses: 51,
    badge: "Люкс",
  },
  {
    id: "10",
    name: "Розовый Прованс",
    description: "Изысканный букет из 25 нежно-розовых роз премиум-сорта в дизайнерской крафт-упаковке Fleurs de Provence с шёлковой лентой пудрового оттенка. Французская элегантность в каждой детали.",
    price: 28000,
    image: productPinkProvence,
    category: "Классические",
    inStock: true,
    roses: 25,
    badge: "Новинка",
  },
  {
    id: "11",
    name: "Парижский Ателье",
    description: "Авторская композиция из 35 роз пастельных оттенков с лавандой и эвкалиптом в винтажной упаковке Atelier Floral Paris с шёлковой пудровой лентой. Атмосфера парижского цветочного бутика.",
    price: 32000,
    image: productParisAtelier,
    category: "Авторские",
    inStock: true,
    roses: 35,
    badge: "Новинка",
  },
  {
    id: "12",
    name: "Розовый Бархат",
    description: "Роскошная композиция в бархатной шляпной коробке пудрового цвета: пионовидные розы персикового и кремового оттенков, розовые розы, белые герберы, вереск и эвкалипт. Перевязана шёлковой пудровой лентой.",
    price: 38000,
    image: productRoseVelvetBox,
    category: "Премиум",
    inStock: true,
    roses: 45,
    badge: "Новинка",
  },
  {
    id: "13",
    name: "Солнечная Мимоза",
    description: "Жизнерадостный букет из пушистой мимозы, сухих злаков и лагуруса в крафтовой упаковке. Солнечная палитра, которая сохранит весеннее настроение надолго.",
    price: 14000,
    image: productDriedMimosa,
    category: "Сухоцветы",
    inStock: true,
    roses: 21,
    badge: "Новинка",
  },
  {
    id: "14",
    name: "Розовая Дымка",
    description: "Воздушная композиция из розовой пампасной травы, лагуруса и сухих злаков пастельных тонов. Романтика в природной палитре.",
    price: 16500,
    image: productDriedPinkPampas,
    category: "Сухоцветы",
    inStock: true,
    roses: 19,
  },
  {
    id: "15",
    name: "Хлопковая Шкатулка",
    description: "Уютная композиция в шляпной коробке: коробочки хлопка, эвкалипт, лаванда и сухие колоски. Долговечный подарок с природным шармом.",
    price: 22000,
    image: productDriedCottonBox,
    category: "Сухоцветы",
    inStock: true,
    roses: 35,
    badge: "Хит",
  },
  {
    id: "16",
    name: "Пастельный Сад",
    description: "Премиальная композиция в розовой шляпной коробке: пампасная трава, гипсофила, лаванда, хлопок и стабилизированные розы пастельных оттенков. Изысканный декор интерьера.",
    price: 24500,
    image: productDriedPastelBox,
    category: "Сухоцветы",
    inStock: true,
    roses: 41,
    badge: "Премиум",
  },
  {
    id: "17",
    name: "Полевой Романс",
    description: "Натуральный букет из полевых сухоцветов: лагурус, гипсофила, эвкалипт и сухие злаки в крафтовой упаковке с шёлковой лентой. Тёплая природная гармония.",
    price: 15500,
    image: productDriedCraftBouquet,
    category: "Сухоцветы",
    inStock: true,
    roses: 25,
    badge: "Новинка",
  },
];
