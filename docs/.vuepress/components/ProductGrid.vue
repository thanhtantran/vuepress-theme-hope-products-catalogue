<template>
  <div class="product-grid-wrapper">
    <div v-if="showFilters" class="filters">
      <div class="filter-group">
        <label>Category:</label>
        <select v-model="selectedCategory" @change="loadProducts">
          <option value="">All Categories</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.slug"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div class="filter-group">
        <label>
          <input
            type="checkbox"
            v-model="showFeaturedOnly"
            @change="loadProducts"
          />
          Featured Only
        </label>
      </div>
      <div class="filter-group search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          @input="debouncedSearch"
        />
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Error loading products: {{ error }}</p>
      <button @click="loadProducts" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="products.length === 0" class="empty">
      <p>No products found.</p>
    </div>

    <div v-else class="product-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useProducts, useCategories } from '../composables/useProducts';
import ProductCard from './ProductCard.vue';

const props = defineProps<{
  category?: string;
  featured?: boolean;
  limit?: number;
  showFilters?: boolean;
}>();

const { products, loading, error, fetchProducts } = useProducts();
const { categories, fetchCategories } = useCategories();

const selectedCategory = ref(props.category || '');
const showFeaturedOnly = ref(props.featured || false);
const searchQuery = ref('');
let searchTimeout: ReturnType<typeof setTimeout>;

const loadProducts = async () => {
  await fetchProducts({
    category: selectedCategory.value || undefined,
    featured: showFeaturedOnly.value || undefined,
    search: searchQuery.value || undefined,
    limit: props.limit || 50,
  });
};

const debouncedSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    loadProducts();
  }, 300);
};

onMounted(async () => {
  if (props.showFilters) {
    await fetchCategories();
  }
  await loadProducts();
});
</script>

<style scoped>
.product-grid-wrapper {
  margin: 32px 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group.search {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.filter-group select,
.filter-group input[type="text"] {
  padding: 8px 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  min-width: 180px;
  transition: border-color 0.2s ease;
}

.filter-group input[type="text"] {
  flex: 1;
}

.filter-group select:focus,
.filter-group input[type="text"]:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.filter-group input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 48px 24px;
  color: var(--vp-c-text-2);
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 16px;
  border: 4px solid var(--vp-c-divider);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error p {
  color: #f56c6c;
  margin-bottom: 16px;
}

.retry-btn {
  padding: 8px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-btn:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .filter-group select,
  .filter-group input[type="text"] {
    width: 100%;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
}
</style>
