import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Movie from './components/Movie/movie';
import ScrollingComponent from './components/Scrolling/scrollingPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ScrollingComponent",
    element: <ScrollingComponent />,
  },
  {
    path: "/Movie",
    element: <Movie />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);