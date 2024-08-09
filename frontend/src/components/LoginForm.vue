<template>
    <div class="d-flex justify-content-center align-items-center min-vh-100">
      <div class="login-form p-4 bg-light border rounded shadow-sm">
        <h1 class="text-center mb-4">Login</h1>
        <form @submit.prevent="login" class="needs-validation" novalidate>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input v-model="email" type="email" id="email" class="form-control" placeholder="Email" required />
            <div class="invalid-feedback">Please enter a valid email.</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input v-model="password" type="password" id="password" class="form-control" placeholder="Password" required />
            <div class="invalid-feedback">Please enter your password.</div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'LoginForm',
    setup() {
      const email = ref('');
      const password = ref('');
      const authStore = useAuthStore();
      const router = useRouter();
  
      const login = async () => {
        const success = await authStore.login(email.value, password.value);
  
        if (success) {
          if (authStore.user.role === 'admin') {
            router.push('/tasks');
          } else {
            router.push('/tasks');
          }
        }
      };
  
      return { email, password, login, error: authStore.error };
    }
  };
  </script>
  
  <style scoped>
  /* Centrage du formulaire */
  .d-flex {
    display: flex;
  }
  
  .justify-content-center {
    justify-content: center;
  }
  
  .align-items-center {
    align-items: center;
  }
  
  .min-vh-100 {
    min-height: 100vh;
  }
  
  .login-form {
    max-width: 400px;
    width: 100%;
  }
  </style>
  