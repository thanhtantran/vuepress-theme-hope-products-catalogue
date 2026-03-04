# Product Catalogue Backend

A complete product catalogue backend system built with Supabase for the VuePress Theme Hope documentation site.

## Features

- Full-featured product management system
- Category organization with hierarchical support
- Product tagging system
- RESTful API via Supabase Edge Functions
- Row Level Security for data protection
- Vue 3 components for front-end integration
- Responsive product display with filtering and search

## Database Schema

### Tables

1. **categories**
   - Hierarchical category structure
   - Custom sorting and organization
   - Parent-child relationships

2. **products**
   - Complete product information
   - Price management with compare pricing
   - Stock tracking
   - Featured products support
   - Multi-image support
   - Custom metadata storage

3. **product_tags**
   - Flexible tagging system
   - Tag-based product filtering

4. **product_tag_relations**
   - Many-to-many relationship between products and tags

### Security

All tables use Row Level Security (RLS):
- Public users can view active products
- Authenticated users have full CRUD access
- Products can be hidden via the `is_active` flag

## API Endpoints

### Products API (`/functions/v1/products`)

**GET /products**
- List all products with filtering
- Query parameters:
  - `category`: Filter by category slug
  - `featured`: Show only featured products (true/false)
  - `search`: Full-text search
  - `limit`: Results per page (default: 50)
  - `offset`: Pagination offset

**GET /products/:slug**
- Get single product by slug
- Includes category and tags

**POST /products**
- Create new product
- Requires authentication

**PUT /products/:slug**
- Update existing product
- Requires authentication

**DELETE /products/:slug**
- Delete product
- Requires authentication

### Categories API (`/functions/v1/categories`)

**GET /categories**
- List all categories with hierarchical data

**GET /categories/:slug**
- Get single category by slug

**POST /categories**
- Create new category
- Requires authentication

**PUT /categories/:slug**
- Update existing category
- Requires authentication

**DELETE /categories/:slug**
- Delete category
- Requires authentication

## Vue Components

### ProductCard
Display individual product with:
- Product image
- Name and description
- Price (with discount display)
- Featured badge
- Tags
- View details link

**Usage:**
```vue
<ProductCard :product="productObject" />
```

### ProductGrid
Grid layout for multiple products with:
- Filtering by category
- Featured products filter
- Search functionality
- Loading states
- Empty state handling

**Usage:**
```markdown
<ProductGrid :show-filters="true" :limit="12" />
```

### FeaturedProducts
Showcase featured products on any page:

**Usage:**
```markdown
<FeaturedProducts :limit="4" title="Featured Products" />
```

## Frontend Integration

The components are automatically registered globally and can be used in any markdown file:

```markdown
# Products Page

Browse our products:

<ProductGrid :show-filters="true" />
```

## Environment Variables

The following environment variables are automatically configured:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Public API key

For Edge Functions, these are also available:
- `SUPABASE_URL`: Project URL
- `SUPABASE_ANON_KEY`: Public key
- `SUPABASE_SERVICE_ROLE_KEY`: Admin key (use carefully)

## Navigation

Product catalogue pages have been added to the navigation:
- English: `/products/`
- Chinese: `/zh/products/`

## Usage Examples

### Adding a Product via API

```bash
curl -X POST https://your-project.supabase.co/functions/v1/products \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Widget",
    "slug": "premium-widget",
    "description": "High-quality widget for professionals",
    "short_description": "Professional widget",
    "price": 99.99,
    "compare_at_price": 149.99,
    "sku": "WIDGET-001",
    "featured_image": "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    "is_active": true,
    "is_featured": true,
    "stock_quantity": 50
  }'
```

### Displaying Products in Markdown

```markdown
---
title: Our Products
---

# Product Catalogue

## Featured Items

<FeaturedProducts :limit="4" />

## All Products

<ProductGrid :show-filters="true" />
```

## Development

### Running Locally

The dev server will automatically pick up the Supabase configuration from `.env`:

```bash
pnpm run docs:dev
```

### Building for Production

```bash
pnpm run docs:build
```

## File Structure

```
docs/.vuepress/
├── components/
│   ├── ProductCard.vue       # Individual product card
│   ├── ProductGrid.vue       # Product grid with filters
│   └── FeaturedProducts.vue  # Featured products showcase
├── composables/
│   └── useProducts.ts        # API integration composables
└── client.ts                 # Component registration

supabase/
└── functions/
    ├── products/
    │   └── index.ts          # Products API
    └── categories/
        └── index.ts          # Categories API
```

## Next Steps

1. Add product data to your database using the API or Supabase dashboard
2. Create categories to organize your products
3. Add tags for better product discovery
4. Customize the Vue components to match your design
5. Add product detail pages for individual products
6. Consider adding cart functionality for e-commerce

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- VuePress Theme Hope: https://theme-hope.vuejs.press/
