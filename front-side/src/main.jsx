import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'

const pageModules = import.meta.glob('./Pages/**/*.jsx')

// Lê metadados do HTML
const rawPage = document.querySelector('meta[name="x-page"]')?.getAttribute('content') || 'Welcome'
const rawProps = document.querySelector('meta[name="x-props"]')?.getAttribute('content') || '{}'
const parsedProps = JSON.parse(rawProps)

// Caminhos candidatos
const possiblePaths = [
  `./Pages/${rawPage}.jsx`,
  `./Pages/${rawPage}/Index.jsx`,
]

// Tenta localizar
const match = possiblePaths.find((path) => path in pageModules)

const mountErrorPage = async () => {
  const mod = await pageModules['./Pages/errors/Error.jsx']()
  const ErrorPage = mod.default

  ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorPage
    errorMessage={`Component "${rawPage}" could not be loaded`}
    errorDetails="Check if the path and file name inside /Pages are correct"
    errorFile={`Pages/${rawPage}`}
    errorTrace={[]}
  />
  
  )
}

if (match) {
  pageModules[match]().then((mod) => {
    const Component = mod.default
    ReactDOM.createRoot(document.getElementById('root')).render(
      <Component {...parsedProps} />
    )
  }).catch(() => {
    mountErrorPage()
  })
} else {
  mountErrorPage()
}
