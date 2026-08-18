import React from 'react';
import { useShop } from '../context/ShopContext';

// 1. Classic theme (Parisian Boutique)
import { HomePage } from './HomePage';
import { CatalogPage } from './CatalogPage';
import { ProductDetailPage } from './ProductDetailPage';
import { CartPage } from './CartPage';
import { DeliveryPage } from './DeliveryPage';
import { OrderSummaryPage } from './OrderSummaryPage';

// 2. Dark Glamour theme (Obsidian Luxe Editorial)
import { DarkHomePage } from './themes/dark/DarkHomePage';
import { DarkCatalogPage } from './themes/dark/DarkCatalogPage';
import { DarkProductDetailPage } from './themes/dark/DarkProductDetailPage';
import { DarkCartPage } from './themes/dark/DarkCartPage';
import { DarkDeliveryPage } from './themes/dark/DarkDeliveryPage';
import { DarkOrderSummaryPage } from './themes/dark/DarkOrderSummaryPage';

// 3. Rose Blush theme (Rose Velvet Minimalist)
import {
  RoseHomePage,
  RoseCatalogPage,
  RoseProductDetailPage,
  RoseCartPage,
  RoseDeliveryPage,
  RoseOrderSummaryPage,
} from './themes/rose/RoseThemePages';

// 4. Ocean Coastal theme (Mediterranean Sapphire Riviera)
import {
  OceanHomePage,
  OceanCatalogPage,
  OceanProductDetailPage,
  OceanCartPage,
  OceanDeliveryPage,
  OceanOrderSummaryPage,
} from './themes/ocean/OceanThemePages';

// 5. Artisanal Heritage theme (Craft & Terracotta)
import {
  HeritageHomePage,
  HeritageCatalogPage,
  HeritageProductDetailPage,
  HeritageCartPage,
  HeritageDeliveryPage,
  HeritageOrderSummaryPage,
} from './themes/heritage/HeritageThemePages';

// 6. Cyber Luxe theme (Futuristic Cyber Neon)
import {
  CyberHomePage,
  CyberCatalogPage,
  CyberProductDetailPage,
  CyberCartPage,
  CyberDeliveryPage,
  CyberOrderSummaryPage,
} from './themes/cyber/CyberThemePages';

const PAGE_MAP = {
  classic: {
    home: HomePage,
    catalog: CatalogPage,
    'product-detail': ProductDetailPage,
    cart: CartPage,
    delivery: DeliveryPage,
    summary: OrderSummaryPage,
  },
  'dark-glamour': {
    home: DarkHomePage,
    catalog: DarkCatalogPage,
    'product-detail': DarkProductDetailPage,
    cart: DarkCartPage,
    delivery: DarkDeliveryPage,
    summary: DarkOrderSummaryPage,
  },
  'rose-blush': {
    home: RoseHomePage,
    catalog: RoseCatalogPage,
    'product-detail': RoseProductDetailPage,
    cart: RoseCartPage,
    delivery: RoseDeliveryPage,
    summary: RoseOrderSummaryPage,
  },
  'ocean-coastal': {
    home: OceanHomePage,
    catalog: OceanCatalogPage,
    'product-detail': OceanProductDetailPage,
    cart: OceanCartPage,
    delivery: OceanDeliveryPage,
    summary: OceanOrderSummaryPage,
  },
  'artisanal-heritage': {
    home: HeritageHomePage,
    catalog: HeritageCatalogPage,
    'product-detail': HeritageProductDetailPage,
    cart: HeritageCartPage,
    delivery: HeritageDeliveryPage,
    summary: HeritageOrderSummaryPage,
  },
  'cyber-luxe': {
    home: CyberHomePage,
    catalog: CyberCatalogPage,
    'product-detail': CyberProductDetailPage,
    cart: CyberCartPage,
    delivery: CyberDeliveryPage,
    summary: CyberOrderSummaryPage,
  },
};

/**
 * ThemedRouter: Reads 'theme' from ShopContext and dispatches to the correct 
 * themed layout component for the current active page.
 */
export const ThemedRouter = ({ page }) => {
  const { theme } = useShop();

  const themeMap = PAGE_MAP[theme] ?? PAGE_MAP['classic'];
  const PageComponent = themeMap[page] ?? themeMap['home'];

  const getWrapperStyle = () => {
    switch (theme) {
      case 'dark-glamour':
        return { background: '#0D0C0B', color: '#F4EFEA', minHeight: '100vh' };
      case 'rose-blush':
        return { background: '#FDF6F6', color: '#36121D', minHeight: '100vh' };
      case 'ocean-coastal':
        return { background: '#EDF5F9', color: '#0B2545', minHeight: '100vh' };
      case 'artisanal-heritage':
        return { background: '#F7F4EE', color: '#2A2421', minHeight: '100vh' };
      case 'cyber-luxe':
        return { background: '#060709', color: '#E2E8F0', minHeight: '100vh' };
      default:
        return { background: '#FDFBF7', color: '#161513', minHeight: '100vh' };
    }
  };

  return (
    <div style={getWrapperStyle()}>
      <PageComponent />
    </div>
  );
};
