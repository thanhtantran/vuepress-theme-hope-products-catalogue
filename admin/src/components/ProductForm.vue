<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditMode ? 'Edit Product' : 'Add Product' }}</h2>
        <button @click="$emit('cancel')" class="close-btn">×</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>

        <div class="form-group">
          <label for="name">Product Name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter product name"
          />
        </div>

        <div class="form-group">
          <label for="slug">Slug *</label>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            required
            placeholder="product-slug"
          />
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select id="category" v-model="form.category_id">
            <option :value="null">None</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="short_description">Short Description</label>
          <input
            id="short_description"
            v-model="form.short_description"
            type="text"
            placeholder="Brief product summary"
          />
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Full product description"
            rows="4"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Price *</label>
            <input
              id="price"
              v-model.number="form.price"
              type="number"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div class="form-group">
            <label for="compare_at_price">Compare at Price</label>
            <input
              id="compare_at_price"
              v-model.number="form.compare_at_price"
              type="number"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="sku">SKU</label>
            <input
              id="sku"
              v-model="form.sku"
              type="text"
              placeholder="Stock keeping unit"
            />
          </div>

          <div class="form-group">
            <label for="stock">Stock Quantity</label>
            <input
              id="stock"
              v-model.number="form.stock_quantity"
              type="number"
              min="0"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="featured_image">Featured Image URL</label>
          <input
            id="featured_image"
            v-model="form.featured_image"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="form.is_active" type="checkbox" />
            Active
          </label>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input v-model="form.is_featured" type="checkbox" />
            Featured
          </label>
        </div>
      </form>

      <div class="modal-footer">
        <button @click="$emit('cancel')" class="btn btn-secondary">
          Cancel
        </button>
        <button @click="handleSubmit" class="btn btn-primary" :disabled="saving">
          <span v-if="saving" class="spinner"></span>
          {{ saving ? 'Saving...' : 'Save Product' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'

const props = defineProps({
  product: Object,
  categories: Array,
})

const emit = defineEmits(['save', 'cancel'])

const error = ref('')
const saving = ref(false)

const form = reactive({
  name: '',
  slug: '',
  description: '',
  short_description: '',
  price: 0,
  compare_at_price: null,
  sku: '',
  category_id: null,
  featured_image: '',
  is_active: true,
  is_featured: false,
  stock_quantity: 0,
})

const isEditMode = computed(() => !!props.product)

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

onMounted(() => {
  if (props.product) {
    Object.assign(form, props.product)
  }
})

const handleSubmit = async () => {
  error.value = ''
  saving.value = true

  try {
    const url = isEditMode.value
      ? `${SUPABASE_URL}/functions/v1/products/${form.slug}`
      : `${SUPABASE_URL}/functions/v1/products`

    const response = await fetch(url, {
      method: isEditMode.value ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Failed to save product')
    }

    emit('save')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--color-text-primary);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin: 0;
  cursor: pointer;
  font-weight: 400;
}

.checkbox-label input {
  width: auto;
  margin: 0;
}

.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
</style>
