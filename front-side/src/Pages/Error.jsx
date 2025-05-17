export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-800 text-white">
      {/* Navbar futurista */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/30 backdrop-blur-md border-b border-violet-500/20">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse"></div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fractal
          </span>
        </div>
        <div className="space-x-6">
          <a
            href="/login"
            className="text-sm font-medium hover:text-purple-300 transition-colors duration-300"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Conteúdo principal */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-2xl rounded-3xl bg-black/20 backdrop-blur-md p-10 shadow-2xl shadow-purple-500/10 border border-violet-500/20 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
            Bem-vindo ao Fractall
          </h1>
          <p className="text-violet-200 mb-8 text-lg">
            Sua plataforma modular, rápida e escalável — ideal para projetos modernos com React e Python.
          </p>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-2 mt-8 text-left">
            {/* Card 1 */}
            <div className="rounded-2xl bg-gradient-to-br from-violet-900/70 to-purple-900/70 p-6 border border-violet-500/20 hover:border-pink-400/30 transition-all hover:scale-[1.02]">
              <div className="mb-2 text-xs uppercase font-semibold text-pink-300">Documentação</div>
              <h3 className="text-xl font-bold mb-3">Documentação Completa</h3>
              <p className="text-sm mb-4 text-violet-200">
                Saiba como estruturar projetos com o Fractal Framework usando React e FastAPI.
              </p>
              <a href="#" className="text-pink-300 font-medium text-sm hover:underline flex items-center gap-1">
                ACESSAR <span className="text-lg">→</span>
              </a>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-gradient-to-br from-cyan-900/70 to-teal-900/70 p-6 border border-cyan-500/20 hover:border-cyan-400/30 transition-all hover:scale-[1.02]">
              <div className="mb-2 text-xs uppercase font-semibold text-cyan-300">Guias rápidos</div>
              <h3 className="text-xl font-bold mb-3">Primeiros Passos</h3>
              <p className="text-sm mb-4 text-cyan-200">
                Comece seu primeiro projeto com rotas, componentes e estrutura integrada.
              </p>
              <a href="#" className="text-cyan-300 font-medium text-sm hover:underline flex items-center gap-1">
                COMEÇAR <span className="text-lg">→</span>
              </a>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-900/70 to-green-900/70 p-6 border border-emerald-500/20 hover:border-emerald-400/30 transition-all hover:scale-[1.02]">
              <div className="mb-2 text-xs uppercase font-semibold text-emerald-300">Atualizações</div>
              <h3 className="text-xl font-bold mb-3">Novas Funcionalidades</h3>
              <p className="text-sm mb-4 text-emerald-200">
                Veja as últimas features implementadas no framework e contribua com ideias.
              </p>
              <a href="#" className="text-emerald-300 font-medium text-sm hover:underline flex items-center gap-1">
                EXPLORAR <span className="text-lg">→</span>
              </a>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-gradient-to-br from-amber-900/70 to-yellow-900/70 p-6 border border-amber-500/20 hover:border-amber-400/30 transition-all hover:scale-[1.02]">
              <div className="mb-2 text-xs uppercase font-semibold text-amber-300">Visão técnica</div>
              <h3 className="text-xl font-bold mb-3">Mais Detalhes</h3>
              <p className="text-sm mb-4 text-amber-200">
                Entenda a filosofia por trás do Fractal, estrutura MVC e uso de DAGs.
              </p>
              <a href="#" className="text-amber-300 font-medium text-sm hover:underline flex items-center gap-1">
                SABER MAIS <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          <a
            href="/login"
            className="inline-block mt-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105"
          >
            Começar agora
          </a>
        </div>
      </div>
    </div>
  )
}