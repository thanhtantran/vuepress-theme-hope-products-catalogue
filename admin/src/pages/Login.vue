<template>
  <div class="login-container">
    <div class="login-card">
      <h1>Admin Dashboard</h1>
      <p>Sign in to manage your products</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div v-if="error" class="alert alert-error">
          {{ error }}
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="admin@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          <span v-if="loading" class="spinner"></span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="login-footer">
        <p>Use a real Supabase Auth user account.</p>
        <p>Create user in Supabase Dashboard → Authentication → Users.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSupabaseConfig } from '../utils/supabaseAuth'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  email: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig()

    const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error_description || 'Login failed')
    }

    localStorage.setItem('sb-auth-token', data.access_token)
    localStorage.setItem('sb-user-id', data.user.id)
    router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-md);
}

.login-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  max-width: 400px;
  width: 100%;
}

.login-card h1 {
  font-size: 28px;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
  text-align: center;
}

.login-card p {
  color: var(--color-text-secondary);
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.login-form {
  margin-bottom: var(--spacing-lg);
}

.login-form button {
  width: 100%;
  padding: var(--spacing-md);
  font-size: 16px;
}

.login-footer {
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-text-secondary);
}

.login-footer p {
  margin: var(--spacing-xs) 0;
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
