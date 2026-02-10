import { create } from "zustand"
import api from "../api/axios"

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    try {
      set({ loading: true, error: null })
      const res = await api.get("/tasks")
      set({ tasks: res.data, loading: false })
    } catch (err) {
      set({ error: err.response?.data?.message, loading: false })
    }
  },

  createTask: async (data) => {
    try {
      const res = await api.post("/tasks", data)
      set((state) => ({ tasks: [res.data, ...state.tasks] }))
    } catch (err) {
      set({ error: err.response?.data?.message })
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
      }))
    } catch (err) {
      set({ error: err.response?.data?.message })
    }
  },
}))
