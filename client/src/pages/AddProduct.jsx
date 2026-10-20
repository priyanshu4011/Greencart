import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const initialForm = {
  name: '',
  category: 'Vegetables',
  price: '',
  offerPrice: '',
  description: '',
  inStock: true,
  image: '',
}

const AddProduct = () => {
  const navigate = useNavigate()
  const { addProduct } = useAppContext()
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.price) {
      return
    }

    addProduct({
      ...form,
      price: Number(form.price),
      offerPrice: Number(form.offerPrice || form.price),
      image: form.image ? [form.image] : [],
      description: form.description ? form.description.split(/\n|\s*[,;]\s*/).filter(Boolean) : ['Fresh and quality product'],
    })

    setForm(initialForm)
    navigate('/seller/products')
  }

  return (
    <div className="mx-auto max-w-4xl py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Products</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">Add product</h1>
        </div>
        <button onClick={() => navigate('/seller/products')} className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          View products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-700">Product name</span>
          <input name="name" value={form.name} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Farm Fresh Tomatoes" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
          <select name="category" value={form.category} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500">
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Drinks">Drinks</option>
            <option value="Instant">Instant</option>
            <option value="Dairy">Dairy</option>
            <option value="Bakery">Bakery</option>
            <option value="Grains">Grains</option>
          </select>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">In stock</span>
          <div className="flex h-[50px] items-center gap-2 rounded-2xl border border-gray-300 px-4">
            <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} className="h-4 w-4 accent-indigo-600" />
            <span className="text-sm text-gray-700">Available for purchase</span>
          </div>
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Price</span>
          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="49" />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-gray-700">Offer price</span>
          <input type="number" name="offerPrice" value={form.offerPrice} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="39" />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-700">Image URL</span>
          <input name="image" value={form.image} onChange={handleChange} className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="https://example.com/product.jpg" />
        </label>

        <label className="block md:col-span-2">
          <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4" className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500" placeholder="Fresh, organic, and packed for delivery" />
        </label>

        <div className="md:col-span-2">
          <button type="submit" className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Save product
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
