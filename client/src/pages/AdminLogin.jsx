import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const AdminLogin = () => {
  const navigate = useNavigate()
  const { setIsAdmin } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter admin email and password')
      return
    }

    if (email.toLowerCase() !== 'admin@greencart.com' || password !== 'admin123') {
      toast.error('Invalid admin credentials')
      return
    }

    setIsAdmin(true)
    toast.success('Admin login successful')
    navigate('/admin/products')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Admin access</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">Admin login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="admin@greencart.com"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="admin123"
            />
          </label>

          <button type="submit" className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Login as admin
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
