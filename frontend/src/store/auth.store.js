import { create } from "zustand"
import api from "../api/axios"

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  register: async (data) => {
    try {
      set({ loading: true, error: null })
      const res = await api.post("/auth/register", data)
      set({ loading: false })
      return res.data
    } catch (err) {
      set({ error: err.response?.data?.message, loading: false })
    }
  },

  login: async (data) => {
    try {
      set({ loading: true, error: null })
      const res = await api.post("/auth/login", data)

      localStorage.setItem("token", res.data.token)

      set({
        token: res.data.token,
        user: res.data.user,
        loading: false,
      })
    } catch (err) {
      set({ error: err.response?.data?.message, loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ token: null, user: null })
  },
}))
