import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import theme from './config/theme';
import * as serviceWorker from './serviceWorker';

const GlobalStyle = createGlobalStyle`
body, html{
  max-width: 100vw;
  background-color: ${p => p.theme.backgroundColor};
  color: ${p => p.theme.strokeColor};
  font-family: ${p => p.theme.textFont};
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  cursor: pointer;
  :visited {
    color: ${p => p.theme.strokeColor};
  }
}
`;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
