import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect} from 'react';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function App() {
  const [password, setPassword] = useState('Pa55W0rD');
  const [alertOpen, setAlertOpen] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);

  const generatePassword = () => {
    const newPassword = createPassword(passwordLength, includeUppercase, includeSymbols, includeNumbers);
    setPassword(newPassword);
  };

  function createPassword(length, includeUppercase, includeSymbols, includeNumbers) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const symbols = '!@#$%^&*()_+=-{}[]|:;<>,.?/~`';
    const numbers = '0123456789';
  
    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeSymbols) characters += symbols;
    if (includeNumbers) characters += numbers;
  
    let password = '';
    for (let i = 0; i < length; i++) {
      password += characters[Math.floor(Math.random() * characters.length)];
    }
  
    return password;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password).then(() => {
      setAlertOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <div className="container">
      <h1 id = 'header'>
        Pasword Generator
      </h1>
      <div className = 'box'>
        {password}
        <FileCopyIcon id = 'FileCopyIcon' onClick = {handleCopy} style = {{cursor : 'pointer'}}></FileCopyIcon>
      </div>
      <div>
      </div>
      <div className ="box" id = "generate-box">
        <div className="slider-container">
          <p>Password Length: {passwordLength}</p>
          <Slider
            defaultValue={passwordLength}
            onChange={(event, newValue) => setPasswordLength(newValue)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="off"
            step={1}
            min={1}
            max={20}
          />
        </div>
        <div className="checkbox-container">
          <FormControlLabel
            control={<Checkbox checked={includeUppercase} onChange={(event) => setIncludeUppercase(event.target.checked)} />}
            label="Include Uppercase"
          />
          <FormControlLabel
            control={<Checkbox checked={includeSymbols} onChange={(event) => setIncludeSymbols(event.target.checked)} />}
            label="Include Symbols"
          />
          <FormControlLabel
            control={<Checkbox checked={includeNumbers} onChange={(event) => setIncludeNumbers(event.target.checked)} />}
            label="Include Numbers"
          />
        </div>
        <div className="generate-button-container">
          <button id='generate-button' onClick={generatePassword}>Generate Password</button>
        </div>
      </div>
      <Snackbar open={alertOpen} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Password successfully copied to clipboard!
        </Alert>
      </Snackbar>
      
    </div>
  );
}

export default App;
