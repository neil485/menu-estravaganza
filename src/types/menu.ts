export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  category: string;
  note?: string;
  image?: string;
  subcategory?: string;
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
  subcategory?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
