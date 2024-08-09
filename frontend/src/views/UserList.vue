<template>
    <div>
      <h1>Utilisateurs</h1>
      <table class="table table-striped table-hover mt-4">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">Prénom</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Modifier</th>
            <th scope="col" v-if="isAdmin">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.lastname }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="openEditModal(user)">Modifier</button>
            </td>
            <td v-if="isAdmin">
              <button @click="confirmDelete(user.id)" class="btn btn-danger btn-sm">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal Edit User -->
      <ModalEditUser
        :show="isEditModalOpen"
        :userToEdit="userToEdit"
        :close="closeEditModal"
      />
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  import { useUserStore } from '../stores/user';
  import { useAuthStore } from '../stores/auth';
  import ModalEditUser from './ModalEditUser.vue';
  
  export default {
    name: 'UserList',
    components: {
      ModalEditUser
    },
    setup() {
      const userStore = useUserStore();
      const authStore = useAuthStore();
      
      const isAdmin = ref(authStore.user.role === 'admin'); // Vérifier si l'utilisateur est admin
      const isEditModalOpen = ref(false);
      const userToEdit = ref(null);
  
      onMounted(async () => {
        await userStore.fetchUsers();  // Récupérer les utilisateurs au montage du composant
      });
  
      const confirmDelete = (id) => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (confirmed) {
          deleteUser(id);
        }
      };
  
      const deleteUser = async (id) => {
        try {
          await userStore.deleteUser(id);
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      };
  
      const openEditModal = (user) => {
        userToEdit.value = user;
        isEditModalOpen.value = true;
      };
  
      const closeEditModal = () => {
        isEditModalOpen.value = false;
        userToEdit.value = null;
      };
  
      return {
        users: userStore.users,  // Lier les utilisateurs au store
        isAdmin,  // Passer la variable de rôle à la vue
        confirmDelete,  // Passer la fonction de confirmation à la vue
        openEditModal,  // Passer la fonction pour ouvrir le modal à la vue
        closeEditModal,  // Passer la fonction pour fermer le modal à la vue
        isEditModalOpen,  // État du modal d'édition
        userToEdit  // Utilisateur à éditer
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
  