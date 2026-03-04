<template>
  <div class="app" v-if="isAuthenticated || $route.path === '/login'">
    <template v-if="isAuthenticated">
      <nav class="sidebar">
        <div class="sidebar-header">
          <h1>Admin</h1>
        </div>
        <ul class="nav-menu">
          <li>
            <RouterLink
              to="/"
              :class="{ active: $route.path === '/' }"
              class="nav-link"
            >
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/products"
              :class="{ active: $route.path === '/products' }"
              class="nav-link"
            >
              Products
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/categories"
              :class="{ active: $route.path === '/categories' }"
              class="nav-link"
            >
              Categories
            </RouterLink>
          </li>
        </ul>
        <div class="sidebar-footer">
          <button @click="handleLogout" class="btn btn-secondary btn-logout">
            Logout
          </button>
        </div>
      </nav>
      <main class="main-content">
        <RouterView />
      </main>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'

const router = useRouter()

const isAuthenticated = computed(() => {
  return !!localStorage.getItem('sb-auth-token')
})

const handleLogout = () => {
  localStorage.removeItem('sb-auth-token')
  router.push('/login')
}
</script>

<style scoped>
.app {
  display: flex;
  height: 100vh;
  background-color: var(--color-bg-alt);
}

.sidebar {
  width: 250px;
  background-color: white;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.sidebar-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.sidebar-header h1 {
  font-size: 24px;
  margin: 0;
  color: var(--color-primary);
}

.nav-menu {
  list-style: none;
  padding: var(--spacing-md) 0;
  flex: 1;
}

.nav-link {
  display: block;
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text-secondary);
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
}

.nav-link.active {
  background-color: var(--color-bg-alt);
  color: var(--color-primary);
  border-left-color: var(--color-primary);
  font-weight: 600;
}

.sidebar-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
}

.btn-logout {
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .app {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    max-height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar-header {
    padding: var(--spacing-md);
    border-bottom: none;
    border-right: 1px solid var(--color-border);
  }

  .sidebar-header h1 {
    font-size: 18px;
  }

  .nav-menu {
    display: flex;
    padding: 0;
    flex: 1;
    margin: 0;
  }

  .nav-link {
    padding: var(--spacing-md) var(--spacing-lg);
    border-left: none;
    border-bottom: 3px solid transparent;
  }

  .nav-link.active {
    border-left: none;
    border-bottom-color: var(--color-primary);
  }

  .sidebar-footer {
    padding: var(--spacing-md);
    border-top: none;
    border-left: 1px solid var(--color-border);
  }

  .btn-logout {
    width: auto;
  }
}
</style>
