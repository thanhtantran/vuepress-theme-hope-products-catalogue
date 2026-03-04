<template>
  <div class="products-page">
    <div class="container">
      <div class="page-header">
        <h1>Products</h1>
        <button @click="openForm()" class="btn btn-primary">
          Add Product
        </button>
      </div>

      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="products.length === 0" class="empty-state">
        <p>No products yet. <button @click="openForm()" class="link-btn">Create one</button></p>
      </div>

      <div v-else class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>{{ product.name }}</td>
              <td>{{ product.category?.name || 'Uncategorized' }}</td>
              <td>${{ product.price.toFixed(2) }}</td>
              <td>{{ product.stock_quantity }}</td>
              <td>
                <span :class="{ 'badge-success': product.is_active, 'badge-error': !product.is_active }" class="badge">
                  {{ product.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <div class="actions">
                  <button @click="editProduct(product)" class="btn btn-secondary btn-sm">
                    Edit
                  </button>
                  <button @click="deleteProduct(product.id)" class="btn btn-error btn-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ProductForm
        v-if="showForm"
        :product="selectedProduct"
        :categories="categories"
        @save="handleSave"
        @cancel="closeForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductForm from '../components/ProductForm.vue'

const loading = ref(true)
const showForm = ref(false)
const successMessage = ref('')
const products = ref([])
const categories = ref([])
const selectedProduct = ref(null)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const fetchProducts = async () => {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,name,price,stock_quantity,is_active,category:categories(name)&order=created_at.desc`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      }
    )
    products.value = await res.json()
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=id,name&order=name.asc`,
      {
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
      }
    )
    categories.value = await res.json()
  } catch (err) {
    console.error('Error fetching categories:', err)
  }
}

const openForm = () => {
  selectedProduct.value = null
  showForm.value = true
}

const editProduct = (product) => {
  selectedProduct.value = product
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedProduct.value = null
}

const handleSave = async () => {
  successMessage.value = selectedProduct.value ? 'Product updated successfully' : 'Product created successfully'
  closeForm()
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
  await fetchProducts()
}

const deleteProduct = async (id) => {
  if (!confirm('Are you sure you want to delete this product?')) return

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    })
    successMessage.value = 'Product deleted successfully'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    await fetchProducts()
  } catch (err) {
    console.error('Error deleting product:', err)
  }
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
.products-page {
  flex: 1;
  padding: var(--spacing-lg);
  overflow-y: auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.page-header h1 {
  font-size: 28px;
  margin: 0;
}

.table-wrapper {
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  overflow-x: auto;
}

.actions {
  display: flex;
  gap: var(--spacing-sm);
}

.empty-state {
  text-align: center;
  padding: var(--spacing-xl);
  background: white;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
}

.link-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  cursor: pointer;
  font-weight: 500;
  padding: 0;
}

.link-btn:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: flex-start;
  }

  .page-header button {
    width: 100%;
  }

  .table {
    font-size: 12px;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
