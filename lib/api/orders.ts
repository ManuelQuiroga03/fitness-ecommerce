import { CartItem, Order } from "@/types";
import { supabase } from "@/lib/supabase";

export async function createOrder(items: CartItem[], total: number): Promise<Order> {
  // We strictly require an active session for RLS to accept the INSERT
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("Debes iniciar sesión para finalizar la compra.");
  }

  // 1. Insert Order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total: total,
      status: 'pending'
    })
    .select()
    .single();

  if (orderError || !orderData) {
    console.error("Error creating order:", orderError);
    throw new Error("No se pudo registrar la orden en la base de datos.");
  }

  // 2. Insert Order Items
  const orderItems = items.map(item => ({
    order_id: orderData.id,
    product_id: item.id,
    quantity: item.quantity,
    selected_size: item.selectedSize || item.sizeOptions?.[0] || 'Unitalla',
    price_at_time: item.price
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error("Error inserting order items:", itemsError);
    throw new Error("No se pudo guardar el detalle de los productos.");
  }

  return {
    id: orderData.id,
    items,
    total: orderData.total,
    status: orderData.status,
    date: orderData.created_at || new Date().toISOString()
  };
}

export async function getUserOrders() {
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  if (!userId) return [];

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id,
      total,
      status,
      created_at,
      order_items (
        id,
        quantity,
        selected_size,
        price_at_time,
        products (
          name,
          image_url
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }

  // Transform output to clean JSON matching frontend types
  return data.map((order: any) => ({
    id: order.id,
    total: order.total,
    status: order.status,
    date: order.created_at,
    items: order.order_items.map((item: any) => ({
      id: item.id,
      quantity: item.quantity,
      selectedSize: item.selected_size,
      price: item.price_at_time,
      name: item.products?.name,
      imageUrl: item.products?.image_url
    }))
  }));
}
