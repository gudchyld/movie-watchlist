import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MovieSearch from './pages/MovieSearch';
import Watchlist from './pages/Watchlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieSearch />,
  },
  {
    path: "Watchlist",
    element: <Watchlist />,
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
