export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Hombres' | 'Mujeres' | 'Accesorios';
  sizeOptions: string[];
  imageUrl: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed';
  date: string;
}
