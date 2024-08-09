<template>
    <DefaultLayout>
      <div class="container mt-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">Liste des Tâches</h5>
            <!-- Condition pour afficher le bouton seulement pour l'admin -->
            <button v-if="isAdmin" class="btn btn-primary" @click="openModal">Ajouter</button>
          </div>
          <div class="card-body">
            <TaskList />
          </div>
        </div>
      </div>
      <ModalAddTask :show="modalVisible" :close="closeModal" />
    </DefaultLayout>
  </template>
  
  <script>
  import TaskList from '@/views/TaskList.vue';
  import DefaultLayout from '../layouts/DefaultLayout.vue';
  import ModalAddTask from '@/views/ModalAddTask.vue';
  import { ref, computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  
  export default {
    name: 'TaskPage',
    components: {
      DefaultLayout,
      TaskList,
      ModalAddTask
    },
    setup() {
      const modalVisible = ref(false);
      const authStore = useAuthStore();
  
      const openModal = () => {
        modalVisible.value = true;
      };
  
      const closeModal = () => {
        modalVisible.value = false;
      };
  
      // Déterminer si l'utilisateur est un administrateur
      const isAdmin = computed(() => authStore.user?.role === 'admin');
  
      return {
        modalVisible,
        openModal,
        closeModal,
        isAdmin
      };
    }
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    margin-top: 20px;
  }
  </style>
  