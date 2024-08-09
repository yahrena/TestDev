<template>
    <div>
      <h1>Tâches</h1>
      <table class="table table-striped table-hover mt-4">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Utilisateur</th>
            <th scope="col">Creation</th>
            <th scope="col">Mise à jour</th>
            <th scope="col">Modifier</th>
            <th scope="col" v-if="isAdmin">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.name }}</td>
            <td>{{ task.description }}</td>
            <td>{{ task.status }}</td>
            <td>{{ task.Pid_person }}</td>
            <td>{{ formatDate(task.createdAt) }}</td>
            <td>{{ formatDate(task.updatedAt) }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="openEditModal(task)">Modifier</button>
            </td>
            <td v-if="isAdmin">
              <button @click="confirmDelete(task.id)" class="btn btn-danger btn-sm ">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Edit Task -->
      <ModalEditTask
        :show="isEditModalOpen"
        :taskToEdit="taskToEdit"
        :close="closeEditModal"
      />
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useTaskStore } from '../stores/tasks';
import { useAuthStore } from '../stores/auth';
import ModalEditTask from './ModalEditTask.vue';

export default {
  name: 'TaskList',
  components: {
    ModalEditTask
  },
  setup() {
    const taskStore = useTaskStore();
    const authStore = useAuthStore();
    
    const isAdmin = ref(authStore.user.role === 'admin'); // Vérifier si l'utilisateur est admin
    const isEditModalOpen = ref(false);
    const taskToEdit = ref(null);

    onMounted(async () => {
      taskStore.fetchTasks();  // Récupérer les tâches au montage du composant
    });

    const confirmDelete = (id) => {
      const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?');
      if (confirmed) {
        deleteTask(id);
      }
    };

    const deleteTask = async (id) => {
      try {
        await taskStore.deleteTask(id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    };

    const openEditModal = (task) => {
      taskToEdit.value = task;
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      taskToEdit.value = null;
    };

    // Fonction pour formater la date avec l'heure
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      const hours = ('0' + date.getHours()).slice(-2);
      const minutes = ('0' + date.getMinutes()).slice(-2);
      const seconds = ('0' + date.getSeconds()).slice(-2);
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    return {
      tasks: taskStore.tasks,  // Lier les tâches au store
      isAdmin,  // Passer la variable de rôle à la vue
      confirmDelete,  // Passer la fonction de confirmation à la vue
      openEditModal,  // Passer la fonction pour ouvrir le modal à la vue
      closeEditModal,  // Passer la fonction pour fermer le modal à la vue
      isEditModalOpen,  // État du modal d'édition
      taskToEdit,  // Tâche à éditer
      formatDate  // Fonction de formatage de la date
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
