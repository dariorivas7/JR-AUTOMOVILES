import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-al0mrubmqwzcw3y4.us.auth0.com" 
      clientId="8Dn6lhj3aCSVmxVQTo20kzKazfD0VEO7"
      authorizationParams={{
        redirect_uri: `${window.location.origin}/admin` // A dónde vuelve tras loguearse
      }}
      cacheLocation= "localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);

