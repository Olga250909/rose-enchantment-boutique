export interface ColorOption {
  id: string;
  label: string;
  hex: string;
}

export interface AddonOption {
  id: string;
  label: string;
  price: number;
}

export interface PackagingOption {
  id: string;
  label: string;
  price: number;
  bg: string;
}

export interface RibbonOption {
  id: string;
  label: string;
  hex: string | null;
}

export const PRICE_PER_ROSE = 250;

export const COLORS: ColorOption[] = [
  { id: "red", label: "Красные", hex: "#B8243C" },
  { id: "white", label: "Белые", hex: "#F5F1E8" },
  { id: "pink", label: "Розовые", hex: "#E8A5B8" },
  { id: "cream", label: "Кремовые", hex: "#E8D5B7" },
  { id: "mix", label: "Микс", hex: "linear-gradient(135deg,#B8243C,#E8A5B8,#F5F1E8,#E8D5B7)" },
];

export const QUANTITY_PRESETS = [11, 15, 25, 35, 51, 75, 101];

export const ADDONS: AddonOption[] = [
  { id: "eucalyptus", label: "Эвкалипт", price: 500 },
  { id: "lavender", label: "Лаванда", price: 700 },
  { id: "gypsophila", label: "Гипсофила", price: 400 },
];

export const PACKAGING: PackagingOption[] = [
  { id: "kraft", label: "Крафт", price: 0, bg: "#C9A57B" },
  { id: "felt", label: "Фетр", price: 800, bg: "#7A8C7E" },
  { id: "hatbox", label: "Шляпная коробка", price: 1500, bg: "#3A2E2A" },
  { id: "premium", label: "Премиум-плёнка", price: 500, bg: "#E8D5B7" },
];

export const RIBBONS: RibbonOption[] = [
  { id: "white", label: "Белая атласная", hex: "#F5F1E8" },
  { id: "powder", label: "Пудровая шёлковая", hex: "#E8C5B8" },
  { id: "burgundy", label: "Бордовая бархатная", hex: "#5C1A2B" },
  { id: "none", label: "Без ленты", hex: null },
];
