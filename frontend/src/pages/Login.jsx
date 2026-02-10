import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"

export default function Login() {
  const navigate = useNavigate()
  const { login, token, loading, error } = useAuthStore()

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(form)
  }

  useEffect(() => {
    if (token) navigate("/dashboard")
  }, [token, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5f2]">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8 border border-[#e8dfd8]">
        <h2 className="text-2xl font-semibold text-center text-[#5a3e2b] mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-[#6b4f3a] mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#d6c7b8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6a4e]"
            />
          </div>

          <div>
            <label className="block text-sm text-[#6b4f3a] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#d6c7b8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6a4e]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6b4f3a] text-white py-2 rounded-lg hover:bg-[#5a3e2b] transition"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-[#6b4f3a] mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
