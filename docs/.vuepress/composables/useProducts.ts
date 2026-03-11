import { ref, computed } from 'vue';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price?: number;
  sku?: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  images: string[];
  featured_image: string;
  is_active: boolean;
  is_featured: boolean;
  stock_quantity: number;
  metadata: Record<string, any>;
  tags?: Array<{
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
}

export function useProducts() {
  const products = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async (params?: {
    category?: string;
    featured?: boolean;
    search?: string;
    limit?: number;
    offset?: number;
  }) => {
    loading.value = true;
    error.value = null;

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
      }

      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.featured) queryParams.append('featured', 'true');
      if (params?.search) queryParams.append('search', params.search);
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());

      const qs = queryParams.toString();
      const url = `${SUPABASE_URL}/functions/v1/products${qs ? `?${qs}` : ''}`;

      const response = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Failed to fetch products (${response.status})`);
      }

      const result = await response.json();
      products.value = result?.data ?? result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  const fetchProductBySlug = async (slug: string) => {
    loading.value = true;
    error.value = null;

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
      }

      const url = `${SUPABASE_URL}/functions/v1/products/${encodeURIComponent(slug)}`;

      const response = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Failed to fetch product (${response.status})`);
      }

      const product = await response.json();
      return product ?? null;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error fetching product:', err);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const featuredProducts = computed(() =>
    products.value.filter(p => p.is_featured)
  );

  return {
    products,
    loading,
    error,
    featuredProducts,
    fetchProducts,
    fetchProductBySlug,
  };
}

export function useCategories() {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY');
      }

      const url = `${SUPABASE_URL}/functions/v1/categories`;

      const response = await fetch(url, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Failed to fetch categories (${response.status})`);
      }

      const result = await response.json();
      categories.value = result?.data ?? result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
      console.error('Error fetching categories:', err);
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
}
