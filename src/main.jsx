import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import {ReactQueryDevTools}
import Login from './admin/login.jsx'
import Dashboard from './admin/dashboard.jsx'
import Manage from './admin/manage.jsx'
import General from './admin/generalRequests.jsx'
import NotFound from './admin/404.jsx'

const queryClient = new QueryClient({})

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
    path: "/admin/:request",
    element: <General />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* < */}
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>,
)
