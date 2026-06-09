import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AuthProvider } from "./context/AuthContext.jsx";

// 1. Importamos el Provider que acabamos de crear
import { CartProvider } from './context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Envolvemos el componente App con el Provider */}
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)