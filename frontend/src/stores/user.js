import { defineStore } from 'pinia';
import baseURL from '../baseUrl/baseUrl';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    error: null,
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await baseURL.get('/users');
        this.users = response.data;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch users';
      }
    },
    async fetchUserById(id) {
        try {
          const response = await baseURL.get(`/users/${id}`);
          return response.data;
        } catch (error) {
          this.error = error.response?.data?.message || 'Failed to fetch user';
          throw error; // Propagate the error for handling in the component
        }
      },
    async createUser(userData) {
      try {
        const response = await baseURL.post('/users', userData);
        this.users.push(response.data);
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create user';
      }
    },
    async updateUser(id, updatedData) {
      try {
        const response = await baseURL.put(`/users/${id}`, updatedData);
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
          this.users[index] = response.data;
        }
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update user';
      }
    },
    async deleteUser(id) {
      try {
        await baseURL.delete(`/users/${id}`);
        this.users = this.users.filter(user => user.id !== id);
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete user';
      }
    },
  },
});
