<template>
  <div class="product-card">
    <div class="product-image">
      <img
        :src="product.featured_image || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600'"
        :alt="product.name"
        loading="lazy"
      />
      <span v-if="product.is_featured" class="badge featured">Featured</span>
      <span v-if="hasDiscount" class="badge discount">
        -{{ discountPercentage }}%
      </span>
    </div>
    <div class="product-content">
      <h3 class="product-name">{{ product.name }}</h3>
      <p v-if="product.short_description" class="product-description">
        {{ product.short_description }}
      </p>
      <div class="product-footer">
        <div class="product-price">
          <span v-if="hasDiscount" class="price-original">
            ${{ product.compare_at_price?.toFixed(2) }}
          </span>
          <span class="price-current">${{ product.price.toFixed(2) }}</span>
        </div>
        <a :href="`/products/${product.slug}.html`" class="btn-view">
          View Details
        </a>
      </div>
      <div v-if="product.tags && product.tags.length > 0" class="product-tags">
        <span
          v-for="tagRel in product.tags"
          :key="tagRel.tag.id"
          class="tag"
        >
          {{ tagRel.tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Product {
  id: string;
  name: string;
  slug: string;
  short_description?: string;
  price: number;
  compare_at_price?: number;
  featured_image?: string;
  is_featured: boolean;
  tags?: Array<{
    tag: {
      id: string;
      name: string;
      slug: string;
    };
  }>;
}

const props = defineProps<{
  product: Product;
}>();

const hasDiscount = computed(() =>
  props.product.compare_at_price && props.product.compare_at_price > props.product.price
);

const discountPercentage = computed(() => {
  if (!hasDiscount.value || !props.product.compare_at_price) return 0;
  return Math.round(
    ((props.product.compare_at_price - props.product.price) /
      props.product.compare_at_price) *
      100
  );
});
</script>

<style scoped>
.product-card {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.product-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: var(--vp-c-bg-soft);
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 12px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.badge.featured {
  left: 12px;
  background: var(--vp-c-brand);
}

.badge.discount {
  right: 12px;
  background: #f56c6c;
}

.product-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.product-description {
  margin: 0 0 16px 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--vp-c-divider);
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.price-original {
  font-size: 14px;
  color: var(--vp-c-text-3);
  text-decoration: line-through;
}

.price-current {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-brand);
}

.btn-view {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn-view:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-1px);
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tag {
  padding: 2px 8px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}
</style>
