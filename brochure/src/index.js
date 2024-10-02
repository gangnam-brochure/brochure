import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/main.css';
import { GoogleOAuthProvider } from '@react-oauth/google'; // 구글 OAuth 프로바이더 가져오기

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* 구글 OAuth client ID 적용 */}
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);