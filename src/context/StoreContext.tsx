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

interface StoreContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);

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

  return (
    <StoreContext.Provider value={{
      products, orders, addProduct, updateProduct, deleteProduct, addOrder, updateOrderStatus,
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
