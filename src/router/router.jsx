import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

// pages
import App from '../app/App';
import Layout from '../pages/layout/Layout';
import Main from '../components/main/Main';
import Contacts from '../pages/contacts/Contacts';
import Error from '../pages/error/Error';

// export const router = createBrowserRouter([
//   // {
//   //   path: '/',
//   //   element: <App />,
//   // },
//   // {
//   //   path: '/contacts',
//   //   element: <Contacts />,
//   // },
//   {
//     path: '*',
//     Component: <App />,
//   },
// ]);
// export const router = createBrowserRouter([
//   createRoutesFromElements(
//     <Route path="/" element={<Layout />}>
//       <Route index element={<Main />} />
//       <Route path="contacts" element={<Contacts />} />
//       <Route path="*" element={<Error />} />
//     </Route>
//   ),
// ]);

// export const router = createBrowserRouter([{ path: '*', Component: App }]);
