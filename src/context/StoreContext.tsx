import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, initialProducts } from "@/data/products";

export interface Order {
  id: string;
  items: { product: Product; quantity: number }[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  comment: string;
  createdAt: string;
  status: "new" | "processing" | "delivered";
}

export interface DeliverySettings {
  freeDeliveryFrom: number;
  deliveryCost: number;
  deliveryTime: string;
  deliveryHours: string;
  outsideMkadCost: string;
  paymentMethods: string[];
  freshnessGuarantee: string;
}

const defaultDeliverySettings: DeliverySettings = {
  freeDeliveryFrom: 5000,
  deliveryCost: 500,
  deliveryTime: "2-3 часа",
  deliveryHours: "8:00 до 22:00",
  outsideMkadCost: "от 500 ₽",
  paymentMethods: ["Банковской картой онлайн", "Наличными курьеру", "Переводом на карту"],
  freshnessGuarantee: "Мы гарантируем свежесть каждого букета. Если вы не довольны качеством цветов, мы заменим букет бесплатно в день доставки.",
};

interface StoreContextType {
  products: Product[];
  orders: Order[];
  deliverySettings: DeliverySettings;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  updateDeliverySettings: (settings: Partial<DeliverySettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>(defaultDeliverySettings);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
  }, []);

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  }, []);

  const addOrder = useCallback((order: Omit<Order, "id" | "createdAt" | "status">) => {
    setOrders(prev => [...prev, {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString("ru-RU"),
      status: "new",
    }]);
  }, []);

  const updateOrderStatus = useCallback((id: string, status: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  }, []);

  const updateDeliverySettings = useCallback((updates: Partial<DeliverySettings>) => {
    setDeliverySettings(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <StoreContext.Provider value={{
      products, orders, deliverySettings,
      addProduct, updateProduct, deleteProduct,
      addOrder, updateOrderStatus, updateDeliverySettings,
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
};
