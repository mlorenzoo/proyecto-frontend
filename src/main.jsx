import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id" : "Acr_1mrr4ADIEfZbTcZtpCK_C7qzIDBKDeoTh6ph2jqt2_splJOe6x9VQQBDkCSoGBy7g6ud40dKUPvH"
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>,
)
