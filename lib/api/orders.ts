import { CartItem, Order } from "@/types";

export async function createOrder(items: CartItem[], total: number): Promise<Order> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const newOrder: Order = {
    id: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
    items,
    total,
    status: 'completed',
    date: new Date().toISOString(),
  };

  return newOrder;
}
