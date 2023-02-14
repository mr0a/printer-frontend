import './App.css';
import React from 'react';
import ErrorPage from './error-page';
import Header from './components/header/Header';
import Root from './Root';
import Login from './components/login/login';
import Signup from './components/signup/signup';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Header />,
      }
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
]);

function App() {
  return (
    <div className='App'>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
      <NotificationContainer />
    </div>
  );
}

export default App;
