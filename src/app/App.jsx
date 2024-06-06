import './Null.scss';
import './App.scss';
import { RouterProvider, BrowserRouter as Router } from 'react-router-dom';

// router
import { router } from '../router/router';

const App = () => {
  // useScript('./particles.js');

  return <RouterProvider router={router} />;
};

export default App;
