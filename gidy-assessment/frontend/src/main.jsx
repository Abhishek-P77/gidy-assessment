import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react' // 1. Import Auth0 Provider
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Wrap App with Auth0Provider */}
    <Auth0Provider
      domain="dev-xjj41n8pztjkvujb.us.auth0.com"       // e.g., "dev-xxxxxx.us.auth0.com"
      clientId="pqaoV1DU40lT6A9w5Rkm0848Svh8COFy"   // e.g., "aBcdEfGhIjkLmnOpQrStUvWxYz"
      authorizationParams={{
        redirect_uri: window.location.origin // Returns the user back to your app after login
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)