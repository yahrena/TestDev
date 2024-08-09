<template>
    <div>
      <Navbar />
      <main>
        <slot></slot>  <!-- Utilisation du slot ici -->
      </main>
    </div>
  </template>
  
  <script>
  import Navbar from '../components/Navbar.vue';
  
  export default {
    name: 'DefaultLayout',
    components: {
      Navbar,
    },
  };
  </script>
  
  <style>
  main {
    padding: 20px;
  }
  </style>
  