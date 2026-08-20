import React from 'react';
import { useShop } from '../context/ShopContext';

// Core Components
import { HomePage } from './HomePage';
import { CatalogPage } from './CatalogPage';
import { ProductDetailPage } from './ProductDetailPage';
import { CartPage } from './CartPage';
import { DeliveryPage } from './DeliveryPage';
import { OrderSummaryPage } from './OrderSummaryPage';
import { KitchenCalculator } from '../components/KitchenCalculator';
import { Kitchen3DViewer } from '../components/Kitchen3DViewer';

// Theme-specific page components
import { DarkHomePage } from './themes/dark/DarkHomePage';
import { DarkCatalogPage } from './themes/dark/DarkCatalogPage';
import { DarkProductDetailPage } from './themes/dark/DarkProductDetailPage';
import { DarkCartPage } from './themes/dark/DarkCartPage';
import { DarkDeliveryPage } from './themes/dark/DarkDeliveryPage';
import { DarkOrderSummaryPage } from './themes/dark/DarkOrderSummaryPage';

import {
  RoseHomePage,
  RoseCatalogPage,
  RoseProductDetailPage,
  RoseCartPage,
  RoseDeliveryPage,
  RoseOrderSummaryPage,
} from './themes/rose/RoseThemePages';

import {
  OceanHomePage,
  OceanCatalogPage,
  OceanProductDetailPage,
  OceanCartPage,
  OceanDeliveryPage,
  OceanOrderSummaryPage,
} from './themes/ocean/OceanThemePages';

import {
  HeritageHomePage,
  HeritageCatalogPage,
  HeritageProductDetailPage,
  HeritageCartPage,
  HeritageDeliveryPage,
  HeritageOrderSummaryPage,
} from './themes/heritage/HeritageThemePages';

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
    calculator: KitchenCalculator,
    studio3d: Kitchen3DViewer,
    cart: CartPage,
    delivery: DeliveryPage,
    summary: OrderSummaryPage,
  },
  'dark-glamour': {
    home: DarkHomePage,
    catalog: DarkCatalogPage,
    'product-detail': DarkProductDetailPage,
    calculator: KitchenCalculator,
    studio3d: Kitchen3DViewer,
    cart: DarkCartPage,
    delivery: DarkDeliveryPage,
    summary: DarkOrderSummaryPage,
  },
  'rose-blush': {
    home: RoseHomePage,
    catalog: RoseCatalogPage,
    'product-detail': RoseProductDetailPage,
    calculator: KitchenCalculator,
    studio3d: Kitchen3DViewer,
    cart: RoseCartPage,
    delivery: RoseDeliveryPage,
    summary: RoseOrderSummaryPage,
  },
  'ocean-coastal': {
    home: OceanHomePage,
    catalog: OceanCatalogPage,
    'product-detail': OceanProductDetailPage,
    calculator: KitchenCalculator,
    studio3d: Kitchen3DViewer,
    cart: OceanCartPage,
    delivery: OceanDeliveryPage,
    summary: OceanOrderSummaryPage,
  },
  'artisanal-heritage': {
    home: HeritageHomePage,
    catalog: HeritageCatalogPage,
    'product-detail': HeritageProductDetailPage,
    calculator: KitchenCalculator,
    studio3d: Kitchen3DViewer,
    cart: HeritageCartPage,
    delivery: HeritageDeliveryPage,
    summary: HeritageOrderSummaryPage,
  },
  'cyber-luxe': {
    home: CyberHomePage,
    catalog: CyberCatalogPage,
    'product-detail': CyberProductDetailPage,
    calculator: KitchenCalculator,
    studio3d: Kitchen3DViewer,
    cart: CyberCartPage,
    delivery: CyberDeliveryPage,
    summary: CyberOrderSummaryPage,
  },
};

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
