import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar onSearch={isHomePage ? handleSearch : undefined} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
