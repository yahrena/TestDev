<template>
    <DefaultLayout>
      <div class="container mt-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">Liste des Utilisateurs</h5>
            <button class="btn btn-primary" @click="openModal">Ajouter</button>
          </div>
          <div class="card-body">
            <UserList />
          </div>
        </div>
      </div>
      <ModalAddUser ref="modalAddUser" />
    </DefaultLayout>
  </template>
  
  <script>
  import DefaultLayout from '../layouts/DefaultLayout.vue';
  import UserList from '@/views/UserList.vue';
  import ModalAddUser from '@/views/ModalAddUser.vue';
  
  export default {
    name: 'UserPage',
    components: {
      DefaultLayout,
      UserList,
      ModalAddUser
    },
    methods: {
      openModal() {
        this.$refs.modalAddUser.openModal();
      }
    }
  };
  </script>
  
  <style scoped>
  .card {
    margin-top: 20px;
  }
  </style>
  