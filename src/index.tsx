import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './firebase';

import reportWebVitals from './reportWebVitals';

import App from './app/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store/index';

import Error from './pages/error/Error';
import { Provider } from 'react-redux';

// router
// import { router } from './router/router';
const router = createBrowserRouter([
  { path: '*', Component: App, errorElement: <Error /> },
]);

const rootElem = document.getElementById('root');

if (rootElem) {
  const root = createRoot(rootElem);
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
