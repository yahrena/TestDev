import { defineStore } from 'pinia';
import baseURL from '../baseUrl/baseUrl';
import { useAuthStore } from './auth';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    error: null,
  }),
  actions: {
    async fetchTasks() {
      const authStore = useAuthStore(); // Utiliser le store d'authentification
      const userRole = authStore.user.role; // Récupérer le rôle de l'utilisateur connecté

      if (userRole === 'admin') {
        // Si l'utilisateur est un admin, récupérer toutes les tâches
        await this.fetchAllTasks();
      } else {
        // Si l'utilisateur est normal, récupérer les tâches assignées à l'utilisateur
        await this.fetchTasksByUserId();
      }
    },
    async fetchAllTasks() {
      try {
        const response = await baseURL.get('/tasks');
        this.tasks = response.data;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch tasks';
      }
    },
    async fetchTasksByUserId() {
      const authStore = useAuthStore(); // Utiliser le store d'authentification
      const userId = authStore.user.id; // Récupérer l'ID de l'utilisateur connecté

      if (!userId) {
        this.error = 'User ID is not available';
        return;
      }

      try {
        const response = await baseURL.get(`/tasks/byUserId/${userId}`);
        this.tasks = response.data;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch tasks';
      }
    },
    async createTask(taskData) {
      try {
        const response = await baseURL.post('/tasks', taskData);
        this.tasks.push(response.data);
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create task';
      }
    },
    async updateTask(id, updatedData) {
      try {
        const response = await baseURL.put(`/tasks/${id}`, updatedData);
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update task';
      }
    },
    async deleteTask(id) {
      try {
        await baseURL.delete(`/tasks/${id}`);
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.error = null;
        fetchTasks();
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete task';
      }
    },
  },
});
