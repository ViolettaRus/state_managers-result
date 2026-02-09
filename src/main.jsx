import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { rootStore } from './store'

rootStore.contacts.load()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
