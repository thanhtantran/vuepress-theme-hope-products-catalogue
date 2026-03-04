<template>
  <div class="featured-products">
    <h2 class="section-title">{{ title }}</h2>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="featuredProducts.length === 0" class="empty">
      <p>No featured products available.</p>
    </div>
    <div v-else class="products-carousel">
      <ProductCard
        v-for="product in featuredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useProducts } from '../composables/useProducts';
import ProductCard from './ProductCard.vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    limit?: number;
  }>(),
  {
    title: 'Featured Products',
    limit: 4,
  }
);

const { featuredProducts, loading, error, fetchProducts } = useProducts();

onMounted(async () => {
  await fetchProducts({
    featured: true,
    limit: props.limit,
  });
});
</script>

<style scoped>
.featured-products {
  margin: 48px 0;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 32px;
  text-align: center;
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
  margin: 0 auto;
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

.products-carousel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .products-carousel {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
}
</style>
