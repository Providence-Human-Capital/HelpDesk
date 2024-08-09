import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from '../admin/login.jsx'
import Dashboard from '../admin/dashboard.jsx'
import Manage from '../admin/manage.jsx'
import General from '../admin/generalRequests.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/admin/dash",
    element: <Dashboard />,
  },
  {
    path: "/admin/management",
    element: <Manage />,
  },
  {
    path: "/admin/general",
    element: <General />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
