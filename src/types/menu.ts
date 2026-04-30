export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  category: string;
  note?: string;
  image?: string;
}

export interface FlatMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  note?: string;
  sizeLabel?: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
