<!-- /views/ModalEditTask.vue -->
<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modifier la Tâche</h5>
        <button class="modal-close" @click="close">X</button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="editTask">
          <div class="form-group">
            <label for="name">Nom</label>
            <input type="text" id="name" v-model="task.name" class="form-control" required />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea id="description" v-model="task.description" class="form-control" required></textarea>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="task.status" class="form-control" required>
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminé">Terminé</option>
            </select>
          </div>
          <div class="form-group">
            <label for="pid_person">Utilisateur</label>
            <input type="number" id="pid_person" v-model="task.Pid_person" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useTaskStore } from '../stores/tasks';

export default {
  name: 'ModalEditTask',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    taskToEdit: {
      type: Object,
      default: () => null
    },
    close: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const taskStore = useTaskStore();
    const task = ref({ ...props.taskToEdit });

    // Watch for changes in taskToEdit prop
    watch(() => props.taskToEdit, (newTask) => {
      task.value = { ...newTask };
    });

    const editTask = async () => {
      try {
        if (task.value.id) {
          await taskStore.updateTask(task.value.id, task.value);
          props.close();
        } else {
          console.error('Task ID is required to update the task');
        }
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    };

    return {
      task,
      editTask
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
</style>
