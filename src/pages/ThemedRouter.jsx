import React from 'react';
import { useShop } from '../context/ShopContext';

// Classic theme (existing pages)
import { HomePage } from './HomePage';
import { CatalogPage } from './CatalogPage';
import { ProductDetailPage } from './ProductDetailPage';
import { CartPage } from './CartPage';
import { DeliveryPage } from './DeliveryPage';
import { OrderSummaryPage } from './OrderSummaryPage';

// Dark Glamour theme
import { DarkHomePage } from './themes/dark/DarkHomePage';
import { DarkCatalogPage } from './themes/dark/DarkCatalogPage';
import { DarkProductDetailPage } from './themes/dark/DarkProductDetailPage';
import { DarkCartPage } from './themes/dark/DarkCartPage';
import { DarkDeliveryPage } from './themes/dark/DarkDeliveryPage';
import { DarkOrderSummaryPage } from './themes/dark/DarkOrderSummaryPage';

// Rose Blush theme
import {
  RoseHomePage,
  RoseCatalogPage,
  RoseProductDetailPage,
  RoseCartPage,
  RoseDeliveryPage,
  RoseOrderSummaryPage,
} from './themes/rose/RoseThemePages';

// Ocean Coastal theme
import {
  OceanHomePage,
  OceanCatalogPage,
  OceanProductDetailPage,
  OceanCartPage,
  OceanDeliveryPage,
  OceanOrderSummaryPage,
} from './themes/ocean/OceanThemePages';

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
};

/**
 * ThemedRouter: Given the current page key and theme from ShopContext,
 * renders the appropriate themed page component.
 */
export const ThemedRouter = ({ page }) => {
  const { theme } = useShop();

  // Resolve theme key, fallback to classic
  const themeMap = PAGE_MAP[theme] ?? PAGE_MAP['classic'];
  const PageComponent = themeMap[page] ?? themeMap['home'];

  // Wrap dark-glamour in a dark background wrapper
  const wrapperStyle = theme === 'dark-glamour'
    ? { background: '#0D0C0B', minHeight: '100vh' }
    : theme === 'rose-blush'
    ? { background: '#FDF6F6', minHeight: '100vh' }
    : theme === 'ocean-coastal'
    ? { background: '#EDF5F9', minHeight: '100vh' }
    : {};

  return (
    <div style={wrapperStyle}>
      <PageComponent />
    </div>
  );
};
