import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, initialProducts } from "@/data/products";
import { DecorService, initialDecorServices } from "@/data/decorServices";

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

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface ChatSession {
  id: string;
  customerName: string;
  customerPhone: string;
  messages: ChatMessage[];
  hasTicket: boolean;
  createdAt: string;
}

export interface DecorRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  customerName: string;
  customerPhone: string;
  eventDate: string;
  comment: string;
  createdAt: string;
  status: "new" | "processing" | "completed";
}

const defaultDeliverySettings: DeliverySettings = {
  freeDeliveryFrom: 15000,
  deliveryCost: 1500,
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
  chatSessions: ChatSession[];
  decorServices: DecorService[];
  decorRequests: DecorRequest[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addDecorService: (service: Omit<DecorService, "id">) => void;
  updateDecorService: (id: string, service: Partial<DecorService>) => void;
  deleteDecorService: (id: string) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  addDecorRequest: (req: Omit<DecorRequest, "id" | "createdAt" | "status">) => void;
  updateDecorRequestStatus: (id: string, status: DecorRequest["status"]) => void;
  updateDeliverySettings: (settings: Partial<DeliverySettings>) => void;
  addChatSession: (name: string, phone: string) => string;
  addMessageToChat: (sessionId: string, message: ChatMessage) => void;
  createTicket: (sessionId: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliverySettings, setDeliverySettings] = useState<DeliverySettings>(defaultDeliverySettings);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [decorServices, setDecorServices] = useState<DecorService[]>(initialDecorServices);
  const [decorRequests, setDecorRequests] = useState<DecorRequest[]>([]);

  const addDecorRequest = useCallback((req: Omit<DecorRequest, "id" | "createdAt" | "status">) => {
    setDecorRequests(prev => [...prev, {
      ...req,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleString("ru-RU"),
      status: "new",
    }]);
  }, []);

  const updateDecorRequestStatus = useCallback((id: string, status: DecorRequest["status"]) => {
    setDecorRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }, []);

  const addDecorService = useCallback((service: Omit<DecorService, "id">) => {
    setDecorServices(prev => [...prev, { ...service, id: Date.now().toString() }]);
  }, []);

  const updateDecorService = useCallback((id: string, updates: Partial<DecorService>) => {
    setDecorServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  }, []);

  const deleteDecorService = useCallback((id: string) => {
    setDecorServices(prev => prev.filter(s => s.id !== id));
  }, []);

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

  const addChatSession = useCallback((name: string, phone: string): string => {
    const id = crypto.randomUUID();
    setChatSessions(prev => [...prev, {
      id,
      customerName: name,
      customerPhone: phone,
      messages: [],
      hasTicket: false,
      createdAt: new Date().toLocaleString("ru-RU"),
    }]);
    return id;
  }, []);

  const addMessageToChat = useCallback((sessionId: string, message: ChatMessage) => {
    setChatSessions(prev => prev.map(s => {
      if (s.id !== sessionId) return s;
      const existing = s.messages.findIndex(m => m.id === message.id);
      if (existing >= 0) {
        // Update existing message (for streaming)
        const updated = [...s.messages];
        updated[existing] = message;
        return { ...s, messages: updated };
      }
      return { ...s, messages: [...s.messages, message] };
    }));
  }, []);

  const createTicket = useCallback((sessionId: string) => {
    setChatSessions(prev => prev.map(s =>
      s.id === sessionId ? { ...s, hasTicket: true } : s
    ));
  }, []);

  return (
    <StoreContext.Provider value={{
      products, orders, deliverySettings, chatSessions, decorServices, decorRequests,
      addProduct, updateProduct, deleteProduct,
      addDecorService, updateDecorService, deleteDecorService,
      addOrder, updateOrderStatus, updateDeliverySettings,
      addDecorRequest, updateDecorRequestStatus,
      addChatSession, addMessageToChat, createTicket,
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
