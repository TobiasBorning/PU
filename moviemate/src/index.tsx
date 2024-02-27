import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Movie from './pages/Movie/Movie';
import MainPage from './pages/Main/mainPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/main",
    element: <MainPage/>,
  },
  {
    path: "/movie",
    element: <Movie/>,
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);