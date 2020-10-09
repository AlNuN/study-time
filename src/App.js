import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Watch from './components/Watch';

const theme = {
  bg: '#D1BCE3',
  source: '#655',
  inner: '#F0DDEC',
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Watch />
    </ThemeProvider>
  );
}

export default App;
