import { useState } from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import toast from 'react-hot-toast'

const Login = () => {
  const { setUser, setShowUserLogin, navigate } = useAppContext()
  const [method, setMethod] = useState('email')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [devOtp, setDevOtp] = useState('')

  const apiUrl = import.meta.env.VITE_API_URL || ''

  const handleEmailLogin = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      toast.error('Enter both email and password')
      return
    }

    setUser({ email })
    setShowUserLogin(false)
    toast.success('Logged in successfully')
    navigate('/')
  }

  const handleOtpLogin = async (event) => {
    event.preventDefault()

    if (!otpSent) {
      if (!/^\d{10}$/.test(phone.replace(/\D/g, '').slice(-10))) {
        toast.error('Enter a valid 10-digit phone number')
        return
      }

      try {
        const response = await fetch(`${apiUrl}/api/users/otp/request`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone }),
        })
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.message)
        setOtpSent(true)
        setDevOtp(payload.devOtp || '')
        toast.success(payload.devOtp ? `Development OTP: ${payload.devOtp}` : 'OTP sent successfully')
      } catch (error) {
        toast.error(error.message || 'Unable to send OTP')
      }
      return
    }

    if (!/^\d{6}$/.test(otp)) {
      toast.error('Enter the 6-digit OTP')
      return
    }

    try {
      const response = await fetch(`${apiUrl}/api/users/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload.message)
      localStorage.setItem('greencart_token', payload.token)
      setUser(payload.user)
      setShowUserLogin(false)
      toast.success('Logged in successfully')
      navigate('/')
    } catch (error) {
      toast.error(error.message || 'Unable to verify OTP')
    }
  }

  const handleGoogleLogin = () => {
    setUser({ email: 'google.user@example.com', provider: 'google' })
    setShowUserLogin(false)
    toast.success('Logged in with Google')
    navigate('/')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-semibold">Welcome back</h2>
            <p className="text-sm text-gray-500">Enter your details to continue shopping.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowUserLogin(false)}
            className="text-gray-500 hover:text-gray-900"
          >
            Close
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => setMethod('otp')}
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Login with OTP
          </button>
        </div>

        <div className="my-6 flex items-center gap-3 text-sm text-gray-400">
          <span className="h-px flex-1 bg-gray-200"></span>
          <span>Or continue with email</span>
          <span className="h-px flex-1 bg-gray-200"></span>
        </div>

        {method === 'email' ? (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-primary/20"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-primary/20"
                placeholder="Enter your password"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-4 py-3 text-white hover:bg-primary-dull transition"
            >
              Continue with Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpLogin} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Phone number</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-primary/20"
                placeholder="Enter your phone number"
              />
            </label>

            {otpSent && (
              <label className="block">
                <span className="text-sm font-medium text-gray-700">OTP</span>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="mt-1 w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-primary focus:ring-primary/20"
                  placeholder="Enter 6-digit OTP"
                />
                {devOtp && <p className="mt-2 text-xs text-amber-600">Development OTP: {devOtp}</p>}
              </label>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-primary px-4 py-3 text-white hover:bg-primary-dull transition"
            >
              {otpSent ? 'Verify OTP' : 'Send OTP'}
            </button>

            <button
              type="button"
              onClick={() => { setMethod('email'); setOtpSent(false); setOtp(''); setDevOtp('') }}
              className="w-full rounded-full border border-gray-300 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50 transition"
            >
              Back to email login
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login
