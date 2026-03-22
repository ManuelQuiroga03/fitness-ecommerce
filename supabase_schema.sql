-- Copia y ejecuta todo esto en el SQL Editor de Supabase
-- Esto limpiará las versiones anteriores y aplicará las políticas de seguridad rigurosas RLS.

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS variants CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TYPE IF EXISTS product_category CASCADE;

-- 1. Create Product Category Enum
CREATE TYPE product_category AS ENUM ('Hombres', 'Mujeres', 'Accesorios');

-- 2. PRODUCTS
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null,
  category product_category not null default 'Accesorios',
  image_url text,
  created_at timestamp with time zone default now()
);

-- Habilitar RLS en Products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public products view" ON products FOR SELECT USING (true);

-- 3. VARIANTS (tallas, stock)
create table variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  size text,
  stock integer default 0
);

-- Habilitar RLS en Variants
ALTER TABLE variants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public variants view" ON variants FOR SELECT USING (true);

-- 4. ORDERS
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  total numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default now()
);

-- Habilitar RLS en Orders (Solo Inserts logueados y dueños)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. ORDER ITEMS
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity integer not null,
  selected_size text not null,
  price_at_time numeric not null
);

-- Habilitar RLS en Order Items (Depende de la orden del usuario)
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own order items" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);
CREATE POLICY "Users can insert their own order items" ON order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- 6. Insertar Datos de Prueba
INSERT INTO products (id, name, description, price, category, image_url)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Playera Oversize Esencial', 'Algodón de alto gramaje con corte oversize. Perfecta para entrenamientos intensos debido a que absorbe muy bien el sudor y no roza la piel.', 35, 'Hombres', 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'),
  ('22222222-2222-2222-2222-222222222222', 'Leggings Esculpidos', 'Ajuste contorneado de cintura alta. Fabricados para hacerte sentir confiada en cada squat o movimiento que decidas hacer en tu día.', 60, 'Mujeres', 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800'),
  ('33333333-3333-3333-3333-333333333333', 'Shorts de Entrenamiento Elite', 'Material ultra ligero y transpirable para entrenamientos intensos. Llevan cordón ajustable para una libertad de movimiento incomparable.', 45, 'Hombres', 'https://images.unsplash.com/photo-1611004144177-8cbf6ee0dc28?auto=format&fit=crop&q=80&w=800'),
  ('44444444-4444-4444-4444-444444444444', 'Top Deportivo Transpirable', 'Soporte de impacto medio ideal para gimnasio y running, con forro que da la sujeción exacta durante todo el circuito.', 40, 'Mujeres', 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800'),
  ('55555555-5555-5555-5555-555555555555', 'Sudadera Heavy Duty', 'Sudadera gruesa para calentar o el pre-entrenamiento. Su diseño oversize y tejido resistente evitarán que el frío te detenga antes de iniciar.', 65, 'Hombres', 'https://plus.unsplash.com/premium_photo-1664110691115-790e20a40020?auto=format&fit=crop&q=80&w=800'),
  ('66666666-6666-6666-6666-666666666666', 'Mochila Táctica LIFT', 'Gran espacio, múltiples compartimentos para correas cruzadas, e impermeable para guardar tus snacks y zapatillas sin mezclarlos.', 80, 'Accesorios', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800'),
  ('77777777-7777-7777-7777-777777777777', 'Muñequeras de Potencia', 'Protección óptima para levantamientos pesados (Press de banca, Overhead). Cierre con velcro duradero y la rigidez perfecta.', 15, 'Accesorios', 'https://images.unsplash.com/photo-1584735174965-48c48d4eff6a?auto=format&fit=crop&q=80&w=800');

-- 7. Insertar Variantes (Tallas) para los productos
INSERT INTO variants (product_id, size, stock)
VALUES 
  -- Oversize Esencial
  ('11111111-1111-1111-1111-111111111111', 'S', 10),
  ('11111111-1111-1111-1111-111111111111', 'M', 15),
  ('11111111-1111-1111-1111-111111111111', 'L', 5),
  ('11111111-1111-1111-1111-111111111111', 'XL', 2),
  -- Leggings
  ('22222222-2222-2222-2222-222222222222', 'XS', 8),
  ('22222222-2222-2222-2222-222222222222', 'S', 12),
  ('22222222-2222-2222-2222-222222222222', 'M', 3),
  -- Shorts Elite
  ('33333333-3333-3333-3333-333333333333', 'S', 20),
  ('33333333-3333-3333-3333-333333333333', 'M', 25),
  ('33333333-3333-3333-3333-333333333333', 'L', 15),
  -- Top Deportivo
  ('44444444-4444-4444-4444-444444444444', 'S', 15),
  ('44444444-4444-4444-4444-444444444444', 'M', 5),
  ('44444444-4444-4444-4444-444444444444', 'L', 0),
  -- Sudadera
  ('55555555-5555-5555-5555-555555555555', 'M', 10),
  ('55555555-5555-5555-5555-555555555555', 'L', 10),
  ('55555555-5555-5555-5555-555555555555', 'XL', 5),
  -- Mochila
  ('66666666-6666-6666-6666-666666666666', 'Unitalla', 50),
  -- Muñequeras
  ('77777777-7777-7777-7777-777777777777', 'Unitalla', 100);
