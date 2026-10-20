import { useAppContext } from '../context/AppContext'

const Order = () => {
  const { orders } = useAppContext()

  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Orders</p>
        <h1 className="mt-2 text-3xl font-semibold text-gray-800">Customer orders</h1>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order._id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-gray-500">Order #</p>
                <h3 className="font-semibold text-gray-800">{order._id}</h3>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-semibold text-gray-800">{order.address?.firstName || 'Guest'} {order.address?.lastName || 'Customer'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold text-gray-800">₹{order.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{order.status}</span>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {order.items.map((item) => (
                <div key={item._id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.product?.image?.[0]} alt={item.product?.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div>
                      <p className="font-semibold text-gray-800">{item.product?.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
