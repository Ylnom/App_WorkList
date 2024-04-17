import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css'
import App from './App';
import SignIn from './component/signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RootComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <React.StrictMode>
     
      {isLoggedIn ? <App /> : <SignIn onLoginSuccess={handleLoginSuccess} />}
      <ToastContainer />
    </React.StrictMode>
    
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);