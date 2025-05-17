import { useEffect, useState } from 'react'

const pageModules = import.meta.glob('./Pages/**/*.jsx')

export default function App() {
  const [Component, setComponent] = useState(null)

  useEffect(() => {
    const raw = document.querySelector("meta[name='x-page']")?.getAttribute("content") || "Welcome"
    const possiblePaths = [
      `./Pages/${raw}.jsx`,
      `./Pages/${raw}/Index.jsx`
    ]
    const match = possiblePaths.find((path) => path in pageModules)

    if (match) {
      pageModules[match]().then((mod) => setComponent(() => mod.default))
    } else {
      setComponent(() => () => <h1>Componente "{raw}" não encontrado</h1>)
    }
  }, [])

  return Component ? <Component /> : <p>Carregando...</p>
}
