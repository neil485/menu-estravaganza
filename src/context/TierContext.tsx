import { createContext, useContext, useState, type ReactNode } from 'react';

export type TierLevel = 'basico' | 'profesional' | 'premium';

export interface TierConfig {
  name: string;
  price: number;
  priceLabel: string;
  features: string[];
  showImages: boolean;
  showItemModal: boolean;
  showReservation: boolean;
  showWhatsApp: boolean;
  showAdminBanner: boolean;
}

export const TIERS: Record<TierLevel, TierConfig> = {
  basico: {
    name: 'Basico',
    price: 60,
    priceLabel: 'pago unico',
    features: [
      'Menu con categorias',
      'Buscador',
      'Dark mode',
    ],
    showImages: false,
    showItemModal: false,
    showReservation: false,
    showWhatsApp: false,
    showAdminBanner: false,
  },
  profesional: {
    name: 'Profesional',
    price: 110,
    priceLabel: 'pago unico',
    features: [
      'Todo en Basico',
      'Imagenes en tarjetas',
      'Modal de detalle',
      'Reservaciones',
      'WhatsApp FAB',
    ],
    showImages: true,
    showItemModal: true,
    showReservation: true,
    showWhatsApp: true,
    showAdminBanner: false,
  },
  premium: {
    name: 'Premium',
    price: 700,
    priceLabel: 'pago unico + $30/actualizacion',
    features: [
      'Todo en Profesional',
      'Panel de Administracion',
    ],
    showImages: true,
    showItemModal: true,
    showReservation: true,
    showWhatsApp: true,
    showAdminBanner: true,
  },
};

interface TierContextValue {
  tier: TierLevel;
  tierConfig: TierConfig;
  setTier: (tier: TierLevel) => void;
}

const TierContext = createContext<TierContextValue | null>(null);

export function TierProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<TierLevel>('profesional');

  return (
    <TierContext.Provider value={{ tier, tierConfig: TIERS[tier], setTier }}>
      {children}
    </TierContext.Provider>
  );
}

export function useTier() {
  const ctx = useContext(TierContext);
  if (!ctx) throw new Error('useTier must be used within TierProvider');
  return ctx;
}
