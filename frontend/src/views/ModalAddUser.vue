<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ajouter un Utilisateur</h5>
          <button class="modal-close" @click="closeModal">X</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addUser">
            <div class="form-group">
              <label for="name">Nom</label>
              <input type="text" id="name" v-model="user.name" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="lastname">Prénom</label>
              <input type="text" id="lastname" v-model="user.lastname" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="user.email" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="role">Rôle</label>
              <select id="role" v-model="user.role" class="form-control" required>
                <option value="admin">Admin</option>
                <option value="normal">Normal</option>
              </select>
            </div>
            <div class="form-group">
              <label for="password">Mot de Passe</label>
              <div class="password-container">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  id="password"
                  v-model="user.password"
                  class="form-control"
                  required
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="password-toggle"
                >
                  {{ passwordVisible ? 'Masquer' : 'Afficher' }}
                </button>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useUserStore } from '../stores/user';
  
  export default {
    name: 'ModalAddUser',
    setup() {
      const userStore = useUserStore();
      const isVisible = ref(false);
      const user = ref({
        name: '',
        lastname: '',
        email: '',
        role: 'normal',
        password: ''
      });
      const passwordVisible = ref(false);
  
      const openModal = () => {
        isVisible.value = true;
      };
  
      const closeModal = () => {
        isVisible.value = false;
        user.value = { name: '', lastname: '', email: '', role: 'normal', password: '' };
      };
  
      const addUser = async () => {
        try {
          await userStore.createUser(user.value);
          closeModal();
        } catch (error) {
          console.error('Failed to add user:', error);
        }
      };
  
      const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value;
      };
  
      return {
        isVisible,
        user,
        openModal,
        closeModal,
        addUser,
        passwordVisible,
        togglePasswordVisibility
      };
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .modal-title {
    font-size: 1.25rem;
  }
  
  .modal-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
  }
  
  .modal-body {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .password-container {
    position: relative;
  }
  
  .password-toggle {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  