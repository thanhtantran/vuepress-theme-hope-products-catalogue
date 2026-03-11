<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ isEditMode ? 'Edit Category' : 'Add Category' }}</h2>
        <button @click="$emit('cancel')" class="close-btn">×</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>

        <div class="form-group">
          <label for="name">Category Name *</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter category name"
          />
        </div>

        <div class="form-group">
          <label for="slug">Slug *</label>
          <input
            id="slug"
            v-model="form.slug"
            type="text"
            required
            placeholder="category-slug"
          />
        </div>

        <div class="form-group">
          <label for="parent_id">Parent Category</label>
          <select id="parent_id" v-model="form.parent_id">
            <option :value="null">None (Root)</option>
            <option
              v-for="cat in availableParents"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Category description"
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label for="image_url">Image URL</label>
          <input
            id="image_url"
            v-model="form.image_url"
            type="url"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div class="form-group">
          <label for="sort_order">Sort Order</label>
          <input
            id="sort_order"
            v-model.number="form.sort_order"
            type="number"
            min="0"
          />
        </div>
      </form>

      <div class="modal-footer">
        <button @click="$emit('cancel')" class="btn btn-secondary">
          Cancel
        </button>
        <button @click="handleSubmit" class="btn btn-primary" :disabled="saving">
          <span v-if="saving" class="spinner"></span>
          {{ saving ? 'Saving...' : 'Save Category' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { getAuthenticatedHeaders, getSupabaseConfig } from '../utils/supabaseAuth'

const props = defineProps({
  category: Object,
  categories: Array,
})

const emit = defineEmits(['save', 'cancel'])

const error = ref('')
const saving = ref(false)

const form = reactive({
  name: '',
  slug: '',
  description: '',
  parent_id: null,
  image_url: '',
  sort_order: 0,
})

const isEditMode = computed(() => !!props.category)

const availableParents = computed(() => {
  return props.categories.filter(cat => cat.id !== props.category?.id)
})

const { supabaseUrl } = getSupabaseConfig()

onMounted(() => {
  if (props.category) {
    Object.assign(form, props.category)
  }
})

const handleSubmit = async () => {
  error.value = ''
  saving.value = true

  try {
    const url = isEditMode.value
      ? `${supabaseUrl}/rest/v1/categories?id=eq.${props.category?.id}`
      : `${supabaseUrl}/rest/v1/categories`

    const response = await fetch(url, {
      method: isEditMode.value ? 'PATCH' : 'POST',
      headers: {
        ...getAuthenticatedHeaders(true),
        Prefer: 'return=representation',
      },
      body: JSON.stringify(form),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      const message =
        (data && (data.message || data.error || data.error_description)) ||
        `Failed to save category (${response.status})`
      throw new Error(message)
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
