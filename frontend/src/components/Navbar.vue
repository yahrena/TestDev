<template>
    <nav class="navbar d-flex justify-content-between navbar-expand-lg navbar-secondary bg-secondary">
      <span v-if="isAdmin" class="navbar-brand text-light">Admin</span>
      <div class="collapse navbar-collapse container-fluid" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item text-uppercase mx-2" :class="{ 'active': isActive('/tasks') }">
            <router-link class="nav-link text-light" to="/tasks">Tâches</router-link>
          </li>
          <li v-if="isAdmin" class="nav-item text-uppercase mx-2" :class="{ 'active': isActive('/users') }">
            <router-link class="nav-link text-light" to="/users">Utilisateurs</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button class="btn btn-outline-light" @click="confirmLogout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useRouter, useRoute } from 'vue-router';
  
  export default {
    name: 'Navbar',
    setup() {
      const authStore = useAuthStore();
      const router = useRouter();
      const route = useRoute();
      const isAdmin = computed(() => authStore.user?.role === 'admin');
  
      const isActive = (path) => route.path === path;
  
      const confirmLogout = async () => {
        if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
          await authStore.logout();
          router.push('/login');
        }
      };
  
      return { isAdmin, isActive, confirmLogout };
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    padding: 0.75rem 1rem;
    background-color: #343a40; /* Dark background color */
    border-bottom: 2px solid #495057; /* Bottom border for the navbar */
  }
  
  .navbar .nav-link {
    color: #f8f9fa; /* Light color for nav links */
    padding: 0.75rem 1rem; /* Add some padding to the links */
    border-radius: 0.25rem; /* Rounded corners for the links */
    transition: background-color 0.3s ease; /* Smooth transition for background color */
  }
  
  
  
  .navbar .navbar-brand {
    color: #f8f9fa; /* Light color for brand text */
  }
  
  .navbar .btn-outline-light {
    color: #f8f9fa; /* Light color for button text */
    border-color: #f8f9fa; /* Light color for button border */
  }
  
  .navbar .btn-outline-light:hover {
    background-color: #f8f9fa; /* Light color for button background on hover */
    color: #343a40; /* Darker color for text on hover */
  }
  
  .navbar .nav-item.active .nav-link {
    border-bottom: 3px solid #f8f9fa; /* Bottom border for the active item */
    padding-bottom: 0.25rem; /* Space between text and underline */
    font-weight: bold; /* Make the active item bold */
    color: #f8f9fa; /* Light color for active item text */
  }
  </style>
  