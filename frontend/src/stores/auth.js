import { defineStore } from 'pinia';
import baseURL from '../baseUrl/baseUrl';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        error: null,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await baseURL.post('/auth/login', { email, password });
                this.user = response.data.user;
                this.isAuthenticated = true;
                this.error = null;
                console.log(this.user);
                console.log(response);

                return true; 
            } catch (error) {
                this.error = error.response.data.message;
                return false; 
            }
        },
        async logout() {
            try {
                await baseURL.post('/auth/logout');
                this.user = null;
                this.isAuthenticated = false;
                this.error = null;
                
            } catch (error) {
                this.error = error.response.data.message;
            }
        },
        async fetchCurrentUser() {
            try {
                const response = await baseURL.get('/auth/current-user');
                console.log("Fetched current user:", response.data);
                this.user = response.data;
                this.isAuthenticated = true;
            } catch (error) {
                console.error("Failed to fetch current user:", error);
                this.user = null;
                this.isAuthenticated = false;
            }
        }

    }
});
