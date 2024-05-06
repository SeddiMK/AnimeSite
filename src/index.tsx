import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './firebase';

import reportWebVitals from './reportWebVitals';

import App from './app/App';
import { RouterProvider } from 'react-router-dom';
import store from './store/index';

import { Provider } from 'react-redux';

const rootElem = document.getElementById('root');

//  {/* <RouterProvider router={router} /> */}

if (rootElem) {
  const root = createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
