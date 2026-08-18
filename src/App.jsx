import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SettingsModal } from './components/SettingsModal';
import { ThemedRouter } from './pages/ThemedRouter';

const MainContent = () => {
  const { activePage } = useShop();

  return (
    <main className="flex-1">
      <ThemedRouter page={activePage} />
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
