<template>
    <div class="modal-overlay" v-if="show">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Modifier l'Utilisateur</h5>
          <button class="modal-close" @click="close">X</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editUser">
            <div class="form-group">
              <label for="lastname">Nom</label>
              <input type="text" id="lastname" v-model="user.lastname" class="form-control" required />
            </div>
            <div class="form-group">
              <label for="name">Prénom</label>
              <input type="text" id="name" v-model="user.name" class="form-control" required />
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
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import { useUserStore } from '../stores/user';
  
  export default {
    name: 'ModalEditUser',
    props: {
      show: {
        type: Boolean,
        required: true
      },
      userToEdit: {
        type: Object,
        default: () => null
      },
      close: {
        type: Function,
        required: true
      }
    },
    setup(props) {
      const userStore = useUserStore();
      const user = ref({ ...props.userToEdit });
  
      watch(() => props.userToEdit, (newUser) => {
        user.value = { ...newUser };
      });
  
      const editUser = async () => {
        try {
          if (user.value.id) {
            await userStore.updateUser(user.value.id, user.value);
            props.close();
          } else {
            console.error('User ID is required to update the user');
          }
        } catch (error) {
          console.error('Failed to update user:', error);
        }
      };
  
      return {
        user,
        editUser
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
  