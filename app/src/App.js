import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

function App() {
  const [password, setPassword] = useState('');

  const generatePassword = () => {
      // Implement your password generation logic here
      const newPassword = 'newRandomPassword';
      setPassword(newPassword);
  };

  return (
    <div className="container">
      <div className="box">
          <h1>Password Generator</h1>
          <button onClick={generatePassword}>Generate Password</button>
          {password && (
              <div>
                  <h2>Your New Password</h2>
                  <p>{password}</p>
              </div>
          )}
      </div>
    </div>
  );
}

export default App;
