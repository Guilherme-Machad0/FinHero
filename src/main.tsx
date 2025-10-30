// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css' // Certifique-se que o App.css também está sendo importado

ReactDOM.createRoot(document.getElementById('root')!).render(
  // Agora renderiza o App uma única vez, resolvendo a duplicação
  <App />
)