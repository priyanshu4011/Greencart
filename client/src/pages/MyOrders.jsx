import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const { orders } = useAppContext()

  if (!orders.length) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">No orders yet</h1>
        <p className="mt-3 text-sm text-gray-500">Your order history will appear here once you place a purchase.</p>
        <Link to="/products" className="mt-6 inline-block rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Shop now
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Orders</p>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800">My orders</h1>
        </div>
        <Link to="/add-address" className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Add address
        </Link>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order._id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-800">#{order._id.slice(-6)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">{order.status}</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold text-gray-800">₹{order.amount}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {order.items.map((item) => (
                <div key={item._id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.product?.image?.[0]} alt={item.product?.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.product?.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-indigo-50 p-4 text-sm text-gray-700">
              <p><span className="font-semibold">Delivery:</span> {order.address?.street}, {order.address?.city}</p>
              <p><span className="font-semibold">Payment:</span> {order.paymentType} {order.isPaid ? '(Paid)' : '(Cash on delivery)'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders
