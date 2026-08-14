import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SettingsModal } from './components/SettingsModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { OrderSummaryPage } from './pages/OrderSummaryPage';

const MainContent = () => {
  const { activePage } = useShop();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'summary':
        return <OrderSummaryPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <main className="flex-1">
      {renderPage()}
    </main>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-brand-50 text-noir-900 font-sans">
        <Navbar />
        <MainContent />
        <Footer />
        <Toast />
        <SettingsModal />
      </div>
    </ShopProvider>
  );
}
