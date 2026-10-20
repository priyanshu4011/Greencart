import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const SellerLogin = () => {
  const navigate = useNavigate()
  const { setIsSeller } = useAppContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter seller email and password')
      return
    }

    setIsSeller(true)
    toast.success('Seller login successful')
    navigate('/seller/products')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Seller access</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">Seller login</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="seller@greencart.com"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Enter password"
            />
          </label>

          <button type="submit" className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Login as seller
          </button>
        </form>
      </div>
    </div>
  )
}

export default SellerLogin
