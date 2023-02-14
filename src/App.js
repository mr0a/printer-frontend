import './App.css';
import React from 'react';
import ErrorPage from './error-page';
import Header from './components/header/Header';
import Root from './Root';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import UserFiles from './components/user_files/UserFiles';
import UserDetailsProvider from './state/UserDetailsProvider';
import List from './components/order/list.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import CartProvider from './state/cartProvider';
import NewOrderCheckout from './components/order/create_order';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Header />,
      },
      {
        path: "/files",
        element: <UserFiles />
      },
      {
        path: "/orders",
        element: <List />
      },
      {
        path: "/orders/new",
        element: <NewOrderCheckout />
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
  },
]);

function App() {
  return (
    <div className='App'>
      <React.StrictMode>
        <UserDetailsProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </UserDetailsProvider>
      </React.StrictMode>
      <NotificationContainer />
    </div>
  );
}

export default App;
