import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { AdminKitchenManager } from './components/AdminKitchenManager';
import { KitchenAIChatbot } from './components/KitchenAIChatbot';
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
      <div className="min-h-screen overflow-x-hidden flex flex-col bg-brand-50 text-noir-900 font-sans selection:bg-accent-gold selection:text-noir-950">
        <Navbar />
        <MainContent />
        <Footer />
        <Toast />
        <SettingsModal />
        <AuthModal />
        <AdminKitchenManager />
        <KitchenAIChatbot />
      </div>
    </ShopProvider>
  );
}
