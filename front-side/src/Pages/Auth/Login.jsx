import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === 'admin@fractal.dev' && password === '123456') {
      setMessage('✅ Login realizado com sucesso!')
    } else {
      setMessage('❌ E-mail ou senha inválidos.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-violet-800 px-4">
      <div className="w-full max-w-md rounded-3xl bg-black/20 backdrop-blur-md p-10 shadow-2xl shadow-purple-500/10 border border-violet-500/20">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Welcome Backt
          </h2>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-violet-500/30 px-4 py-3 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl bg-black/30 border border-violet-500/30 px-4 py-3 text-white placeholder-violet-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <div className="mt-2 flex justify-end">
              <a href="#" className="text-sm text-pink-300 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes('✅') ? 'text-emerald-300' : 'text-pink-300'}`}>
            {message}
          </p>
        )}

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-violet-500/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent text-violet-300">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center gap-5">
          {[
            { icon: 'fab fa-google', color: 'bg-red-500 hover:bg-red-600' },
            { icon: 'fab fa-apple', color: 'bg-gray-700 hover:bg-gray-800' },
            { icon: 'fab fa-github', color: 'bg-gray-800 hover:bg-gray-900' }
          ].map((social, i) => (
            <button
              key={i}
              className={`h-10 w-10 rounded-full ${social.color} text-white flex items-center justify-center transition-all hover:scale-110`}
            >
              <i className={`${social.icon} text-lg`}></i>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-violet-300">
          Don't have an account?{' '}
          <a href="/register" className="text-pink-300 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}