import { createBrowserRouter } from 'react-router-dom';

// pages
import App from '../app/App';
// import Main from '../components/main/Main';
import Contacts from '../pages/contacts/Contacts';
import Error from '../pages/error/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);
