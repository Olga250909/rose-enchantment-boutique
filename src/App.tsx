import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import CatalogPage from "./pages/CatalogPage";
import ProductPage from "./pages/ProductPage";
import DeliveryPage from "./pages/DeliveryPage";
import PrivacyPage from "./pages/PrivacyPage";
import OfferPage from "./pages/OfferPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import ChatWidget from "./components/chat/ChatWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <StoreProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <CartDrawer />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/delivery" element={<DeliveryPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/offer" element={<OfferPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
          </BrowserRouter>
        </CartProvider>
      </StoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
