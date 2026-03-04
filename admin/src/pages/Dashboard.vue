<template>
  <div class="dashboard">
    <div class="container">
      <div class="page-header">
        <h1>Dashboard</h1>
        <p>Welcome to the product catalogue admin panel</p>
      </div>

      <div class="grid-3">
        <div class="stat-card">
          <h3>Total Products</h3>
          <div class="value">{{ stats.totalProducts }}</div>
        </div>
        <div class="stat-card">
          <h3>Active Products</h3>
          <div class="value">{{ stats.activeProducts }}</div>
        </div>
        <div class="stat-card">
          <h3>Categories</h3>
          <div class="value">{{ stats.totalCategories }}</div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <RouterLink to="/products" class="action-card">
            <h3>Manage Products</h3>
            <p>Add, edit, or delete products</p>
          </RouterLink>
          <RouterLink to="/categories" class="action-card">
            <h3>Manage Categories</h3>
            <p>Organize your product categories</p>
          </RouterLink>
        </div>
      </div>

      <div class="recent-products">
        <h2>Recent Products</h2>
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
        </div>
        <table v-else-if="recentProducts.length > 0" class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in recentProducts" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category?.name || 'Uncategorized' }}</td>
              <td>${{ product.price.toFixed(2) }}</td>
              <td>
                <span :class="{ 'badge-success': product.is_active, 'badge-error': !product.is_active }" class="badge">
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="empty-state">
          <p>No products yet. <RouterLink to="/products">Create your first product</RouterLink></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

const loading = ref(true)
const stats = reactive({
  totalProducts: 0,
  activeProducts: 0,
  totalCategories: 0,
})
const recentProducts = ref([])

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const fetchStats = async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/products?select=count()`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      }),
      fetch(`${SUPABASE_URL}/rest/v1/categories?select=count()`, {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      }),
    ])

    const productsData = await productsRes.json()
    const categoriesData = await categoriesRes.json()

    stats.totalProducts = productsData.length > 0 ? productsData[0].count : 0
    stats.totalCategories = categoriesData.length > 0 ? categoriesData[0].count : 0

    // Fetch active products
    const activeRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?is_active=eq.true&select=count()`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      }
    )
    const activeData = await activeRes.json()
    stats.activeProducts = activeData.length > 0 ? activeData[0].count : 0

    // Fetch recent products
    const recentRes = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,price,is_active,category:categories(name)&order=created_at.desc&limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      }
    )
    recentProducts.value = await recentRes.json()
  } catch (err) {
    console.error('Error fetching stats:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.dashboard {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.page-header {
  margin-bottom: var(--spacing-xl);
}

.page-header h1 {
  font-size: 32px;
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-primary);
}

.page-header p {
  color: var(--color-text-secondary);
  font-size: 16px;
}

.quick-actions {
  margin: var(--spacing-xl) 0;
}

.quick-actions h2,
.recent-products h2 {
  font-size: 20px;
  margin-bottom: var(--spacing-lg);
  color: var(--color-text-primary);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.action-card {
  padding: var(--spacing-lg);
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.action-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.action-card h3 {
  margin-bottom: var(--spacing-sm);
  color: var(--color-primary);
}

.action-card p {
  color: var(--color-text-secondary);
  font-size: 14px;
}

.recent-products {
  margin-top: var(--spacing-xl);
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
}

.empty-state {
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--color-text-secondary);
}
</style>
