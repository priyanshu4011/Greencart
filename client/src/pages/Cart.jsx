import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Cart = () => {
  const { products, cartItems, currency, addToCart, decreaseCartItem, removeFromCart, getCartAmount, setCartItems, user, addresses, orders, setOrders } = useAppContext()
  const [selectedMethod, setSelectedMethod] = useState('cod')
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?._id || '')
  const [deliveryLocation, setDeliveryLocation] = useState(null)

  const cartProducts = products.filter((product) => cartItems[product._id])
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0)
  const totalAmount = getCartAmount()

  const selectedAddress = addresses.find((address) => address._id === selectedAddressId)

  const saveOrder = (paymentType, isPaid) => {
    const order = {
      _id: `order_${Date.now()}`,
      items: cartProducts.map((product) => ({ product, quantity: cartItems[product._id] })),
      amount: totalAmount,
      address: { ...selectedAddress, location: deliveryLocation },
      status: 'Order Placed',
      paymentType,
      isPaid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setOrders([order, ...orders])
    setCartItems({})
  }

  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Location is not supported by this browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setDeliveryLocation({ latitude: coords.latitude, longitude: coords.longitude })
        toast.success('Delivery location selected')
      },
      () => toast.error('Please allow location access to use delivery location'),
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const handleCheckout = (method = selectedMethod) => {
    if (!cartProducts.length) {
      toast.error('Your cart is empty')
      return
    }

    if (!selectedAddress) {
      toast.error('Select or add a delivery address first')
      return
    }

    if (method === 'cod') {
      saveOrder('COD', false)
      toast.success('Order placed for cash on delivery')
      return
    }

    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
      toast.error('Online payment is not configured. Add VITE_RAZORPAY_KEY_ID to client/.env')
      return
    }

    const amountInPaise = Math.round(totalAmount * 100)

    if (!window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => openRazorpay(amountInPaise, method)
      script.onerror = () => toast.error('Unable to load Razorpay right now')
      document.body.appendChild(script)
      return
    }

    openRazorpay(amountInPaise, method)
  }

  const openRazorpay = (amountInPaise, method) => {
    const methods = {
      all: { card: true, netbanking: true, wallet: true, upi: true },
      upi: { upi: true },
      card: { card: true },
      netbanking: { netbanking: true },
      wallet: { wallet: true },
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: 'INR',
      name: 'GreenCart',
      description: 'Order payment',
      image: assets.logo,
      handler: (response) => {
        saveOrder('Online', true)
        toast.success('Payment successful and order placed')
      },
      prefill: {
        name: user?.name || 'Guest User',
        email: user?.email || 'guest@example.com',
        contact: user?.phone || '9999999999',
      },
      notes: {
        address: selectedAddress,
        paymentMethod: method,
      },
      theme: {
        color: '#4f46e5',
      },
      method: methods[method] || methods.all,
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  if (cartProducts.length === 0) {
    return (
      <div className='mt-16 flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center'>
        <div className='mb-4 rounded-full bg-indigo-100 p-4'>
          <img src={assets.cart_icon} alt='Cart' className='h-8 w-8' />
        </div>
        <h2 className='text-2xl font-semibold text-gray-800'>Your cart is empty</h2>
        <p className='mt-2 max-w-md text-sm text-gray-500'>Add products from the shop to see them here.</p>
        <Link
          to='/products'
          className='mt-6 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700'
        >
          Browse products
        </Link>
      </div>
    )
  }

  return (
    <div className='mt-16 flex flex-col gap-8 px-1 py-2 md:px-0'>
      <div className='flex flex-col gap-2'>
        <p className='text-sm font-semibold uppercase tracking-wide text-indigo-500'>Cart</p>
        <h1 className='text-2xl font-semibold text-gray-800 md:text-3xl'>Your selected products</h1>
      </div>

      <div className='grid gap-6 lg:grid-cols-[1.3fr_0.7fr]'>
        <div className='space-y-4'>
          {cartProducts.map((product) => {
            const quantity = cartItems[product._id] || 0
            const unitPrice = product.offerPrice || product.price
            const subtotal = unitPrice * quantity

            return (
              <div key={product._id} className='flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center'>
                <img src={product.image?.[0]} alt={product.name} className='h-24 w-24 rounded-xl object-cover' />
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
                  <p className='mt-1 text-sm text-gray-500'>{product.category}</p>
                  <div className='mt-3 flex items-center gap-2'>
                    <span className='text-lg font-semibold text-indigo-600'>₹{unitPrice}</span>
                    <span className='text-sm text-gray-400 line-through'>₹{product.price}</span>
                  </div>
                </div>

                <div className='flex flex-col gap-3 sm:items-end'>
                  <div className='flex items-center rounded-full border border-gray-300'>
                    <button onClick={() => decreaseCartItem(product._id)} className='px-3 py-1 text-lg text-gray-600'>−</button>
                    <span className='min-w-8 text-center font-semibold text-gray-800'>{quantity}</span>
                    <button onClick={() => addToCart(product._id)} className='px-3 py-1 text-lg text-gray-600'>+</button>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='text-sm font-semibold text-gray-700'>Subtotal: ₹{subtotal}</span>
                    <button onClick={() => removeFromCart(product._id)} className='text-sm font-medium text-red-500'>Remove</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className='rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm'>
          <h2 className='text-lg font-semibold text-gray-800'>Order summary</h2>
          <div className='mt-4 flex items-center justify-between text-sm text-gray-600'>
            <span>Items</span>
            <span>{totalItems}</span>
          </div>
          <div className='mt-2 flex items-center justify-between text-sm text-gray-600'>
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className='mt-4 border-t border-gray-200 pt-4'>
            <div className='flex items-center justify-between text-base font-semibold text-gray-800'>
              <span>Total</span>
              <span>{currency} {getCartAmount()}</span>
            </div>
          </div>
          <div className='mt-4 rounded-xl border border-indigo-100 bg-white p-4'>
            <div className='flex items-center justify-between gap-3'>
              <h3 className='text-sm font-semibold text-gray-800'>Delivery address</h3>
              <Link to='/add-address' className='text-xs font-semibold text-indigo-600 hover:underline'>Add address</Link>
            </div>
            {addresses.length > 0 ? (
              <select value={selectedAddressId} onChange={(event) => setSelectedAddressId(event.target.value)} className='mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500'>
                {addresses.map((address) => <option key={address._id} value={address._id}>{address.firstName} {address.lastName} - {address.city}, {address.street}</option>)}
              </select>
            ) : <p className='mt-2 text-sm text-gray-500'>No saved address yet.</p>}
            <button onClick={detectLocation} type='button' className='mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50'>
              {deliveryLocation ? 'Location selected' : 'Use current location'}
            </button>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {[
              { id: 'cod', label: 'Cash on delivery' },
              { id: 'all', label: 'Online payment' },
              { id: 'upi', label: 'UPI' },
              { id: 'card', label: 'Card' },
              { id: 'netbanking', label: 'Netbanking' },
              { id: 'wallet', label: 'Wallet' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedMethod(option.id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${selectedMethod === option.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-300 hover:text-indigo-600'}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleCheckout(selectedMethod)}
            className='mt-4 w-full rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700'
          >
            {selectedMethod === 'cod' ? 'Place COD order' : `Pay with ${selectedMethod === 'all' ? 'UPI / Card' : selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)}`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
