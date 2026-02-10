import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store"
import { useTaskStore } from "../store/task.store"

export default function Dashboard() {
  const navigate = useNavigate()
  const { token, logout, user } = useAuthStore()
  const { tasks, fetchTasks, createTask, deleteTask, loading, error } =
    useTaskStore()

  const [title, setTitle] = useState("")

  useEffect(() => {
    if (!token) navigate("/")
    else fetchTasks()
  }, [token, navigate, fetchTasks])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await createTask({ title })
    setTitle("")
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      <div className="flex justify-between items-center px-8 py-4 bg-white border-b border-[#e8dfd8]">
        <h1 className="text-xl font-semibold text-[#5a3e2b]">Dashboard</h1>

        <div className="flex items-center gap-4">
          {user && (
            <p className="text-sm text-[#6b4f3a]">Hi, {user.username}</p>
          )}

          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-[#6b4f3a] text-white rounded-lg hover:bg-[#5a3e2b]"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <form
          onSubmit={handleCreate}
          className="flex gap-2 mb-6 bg-white p-4 rounded-xl border border-[#e8dfd8]"
        >
          <input
            type="text"
            placeholder="New task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-[#d6c7b8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6a4e]"
          />
          <button
            type="submit"
            className="px-4 bg-[#6b4f3a] text-white rounded-lg hover:bg-[#5a3e2b]"
          >
            Add
          </button>
        </form>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="space-y-3">
          {loading ? (
            <p className="text-center text-[#6b4f3a]">Loading...</p>
          ) : tasks.length === 0 ? (
            <p className="text-center text-[#6b4f3a]">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center bg-white px-4 py-3 rounded-lg border border-[#e8dfd8]"
              >
                <p className="text-[#5a3e2b]">{task.title}</p>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-sm px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
