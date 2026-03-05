<template>
  <div class="categories-page">
    <div class="container">
      <div class="page-header">
        <h1>Categories</h1>
        <button @click="openForm()" class="btn btn-primary">
          Add Category
        </button>
      </div>

      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
      </div>

      <div v-else-if="categories.length === 0" class="empty-state">
        <p>No categories yet. <button @click="openForm()" class="link-btn">Create one</button></p>
      </div>

      <div v-else class="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Parent</th>
              <th>Sort Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td>{{ category.name }}</td>
              <td><code>{{ category.slug }}</code></td>
              <td>{{ category.parent?.name || 'Root' }}</td>
              <td>{{ category.sort_order }}</td>
              <td>
                <div class="actions">
                  <button @click="editCategory(category)" class="btn btn-secondary btn-sm">
                    Edit
                  </button>
                  <button @click="deleteCategory(category.id)" class="btn btn-error btn-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <CategoryForm
        v-if="showForm"
        :category="selectedCategory"
        :categories="categories"
        @save="handleSave"
        @cancel="closeForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CategoryForm from '../components/CategoryForm.vue'
import { getAuthenticatedHeaders, getSupabaseConfig } from '../utils/supabaseAuth'

const loading = ref(true)
const showForm = ref(false)
const successMessage = ref('')
const categories = ref([])
const selectedCategory = ref(null)

const { supabaseUrl } = getSupabaseConfig()

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${supabaseUrl}/rest/v1/categories?select=id,name,slug,sort_order,parent:categories!parent_id(name)&order=sort_order.asc,name.asc`,
      {
        headers: getAuthenticatedHeaders(),
      }
    )
    categories.value = await res.json()
  } catch (err) {
    console.error('Error fetching categories:', err)
  } finally {
    loading.value = false
  }
}

const openForm = () => {
  selectedCategory.value = null
  showForm.value = true
}

const editCategory = (category) => {
  selectedCategory.value = category
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  selectedCategory.value = null
}

const handleSave = async () => {
  successMessage.value = selectedCategory.value ? 'Category updated successfully' : 'Category created successfully'
  closeForm()
  setTimeout(() => {
    successMessage.value = ''
  }, 3000)
  await fetchCategories()
}

const deleteCategory = async (id) => {
  if (!confirm('Are you sure you want to delete this category?')) return

  try {
    await fetch(`${supabaseUrl}/rest/v1/categories?id=eq.${id}`, {
      method: 'DELETE',
      headers: getAuthenticatedHeaders(),
    })
    successMessage.value = 'Category deleted successfully'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
    await fetchCategories()
  } catch (err) {
    console.error('Error deleting category:', err)
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.categories-page {
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

code {
  background-color: var(--color-bg-alt);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-family: monospace;
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
