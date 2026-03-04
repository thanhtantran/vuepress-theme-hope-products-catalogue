/*
  # Product Catalogue Schema

  ## Overview
  Complete database schema for managing a product catalogue with categories, products, and inventory.

  ## New Tables

  ### 1. `categories`
  Product categories for organizing the catalogue
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text, not null) - Category name
  - `slug` (text, unique, not null) - URL-friendly identifier
  - `description` (text) - Category description
  - `parent_id` (uuid, nullable) - For hierarchical categories
  - `image_url` (text) - Category image
  - `sort_order` (integer, default 0) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `products`
  Main product information
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text, not null) - Product name
  - `slug` (text, unique, not null) - URL-friendly identifier
  - `description` (text) - Full product description
  - `short_description` (text) - Brief summary
  - `price` (numeric, not null) - Product price
  - `compare_at_price` (numeric) - Original price for discounts
  - `sku` (text, unique) - Stock keeping unit
  - `category_id` (uuid, foreign key) - Links to categories
  - `images` (jsonb, default []) - Array of image URLs
  - `featured_image` (text) - Main product image
  - `is_active` (boolean, default true) - Product visibility
  - `is_featured` (boolean, default false) - Featured products
  - `stock_quantity` (integer, default 0) - Available stock
  - `metadata` (jsonb, default {}) - Additional product data
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `product_tags`
  Tags for product categorization
  - `id` (uuid, primary key) - Unique tag identifier
  - `name` (text, unique, not null) - Tag name
  - `slug` (text, unique, not null) - URL-friendly identifier
  - `created_at` (timestamptz) - Creation timestamp

  ### 4. `product_tag_relations`
  Many-to-many relationship between products and tags
  - `product_id` (uuid, foreign key) - Links to products
  - `tag_id` (uuid, foreign key) - Links to product_tags
  - Primary key: (product_id, tag_id)
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  Row Level Security (RLS) is enabled on all tables with policies for:
  - Public read access to active products
  - Authenticated users can manage products (admin role recommended)

  ## Indexes
  - Products: slug, category_id, is_active, is_featured
  - Categories: slug, parent_id
  - Tags: slug
  - Full-text search on product names and descriptions
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  short_description text DEFAULT '',
  price numeric(10, 2) NOT NULL,
  compare_at_price numeric(10, 2),
  sku text UNIQUE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  images jsonb DEFAULT '[]'::jsonb,
  featured_image text DEFAULT '',
  is_active boolean DEFAULT true,
  is_featured boolean DEFAULT false,
  stock_quantity integer DEFAULT 0,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_tags table
CREATE TABLE IF NOT EXISTS product_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create product_tag_relations table
CREATE TABLE IF NOT EXISTS product_tag_relations (
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES product_tags(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (product_id, tag_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_product_tags_slug ON product_tags(slug);

-- Create full-text search index
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || description));

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_tag_relations ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (true);

-- Products policies
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Product tags policies
CREATE POLICY "Anyone can view tags"
  ON product_tags FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert tags"
  ON product_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON product_tags FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tags"
  ON product_tags FOR DELETE
  TO authenticated
  USING (true);

-- Product tag relations policies
CREATE POLICY "Anyone can view product tag relations"
  ON product_tag_relations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert product tag relations"
  ON product_tag_relations FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete product tag relations"
  ON product_tag_relations FOR DELETE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to auto-update updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();