import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { UserProvider } from './context/UserContext';
import { GoogleScriptProvider } from './context/GoogleScriptContext';

const theme = extendTheme({
  colors: {
    brand: {
      //dark teal
      100: '#006D77',
      //light teal
      200: '#83C5BE',
      //ice blue
      300: '#EDF6F9',
      //light peach
      400: '#FFDDD2',
      //dark terra cotta
      500: 'E29578',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <GoogleScriptProvider>
        <BrowserRouter>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </BrowserRouter>
      </GoogleScriptProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
