import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: 'IN',
}

const AddAddress = () => {
  const { addAddress, addresses } = useAppContext()
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.firstName || !form.lastName || !form.street || !form.city || !form.state || !form.zipcode || !form.phone) {
      toast.error('Please fill all required address fields')
      return
    }

    addAddress(form)
    setForm(initialForm)
  }

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Address</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">Add a delivery address</h1>
        </div>
        <Link to="/my-orders" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Back to orders
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">First name</span>
              <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="John" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Last name</span>
              <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Doe" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">Email</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="you@example.com" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">Phone</span>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="9876543210" />
            </label>
            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-medium text-gray-700">Street address</span>
              <input name="street" value={form.street} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="123 Market Road" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">City</span>
              <input name="city" value={form.city} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Bengaluru" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">State</span>
              <input name="state" value={form.state} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Karnataka" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Zip code</span>
              <input name="zipcode" value={form.zipcode} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="560001" />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">Country</span>
              <input name="country" value={form.country} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="IN" />
            </label>
          </div>

          <button type="submit" className="mt-6 w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Save address
          </button>
        </form>

        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Saved addresses</h2>
          <div className="mt-5 space-y-4">
            {addresses.length === 0 ? (
              <p className="text-sm text-gray-500">No saved addresses yet.</p>
            ) : (
              addresses.map((address) => (
                <div key={address._id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-gray-800">{address.firstName} {address.lastName}</p>
                  <p className="mt-2 text-sm text-gray-600">{address.street}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipcode}</p>
                  <p className="text-sm text-gray-600">{address.country}</p>
                  <p className="mt-2 text-sm text-gray-600">{address.phone}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAddress
