import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ScrollingPage from './components/Scrolling/ScrollingPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Movie from './components/Movie/movie';

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
    element: <ScrollingPage/>,
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