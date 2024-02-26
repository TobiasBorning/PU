import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ShowMovie from './components/Movie/ShowMovie';
import ScrollingComponent from './components/Scrolling/ScrollingComponent';
import Main from './components/Main';
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
    path: "/Main",
    element: <ScrollingComponent/>,
  },
  {
    path: "/movie",
    element: <ShowMovie/>,
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