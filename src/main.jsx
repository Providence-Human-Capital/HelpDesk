import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import {ReactQueryDevTools}
import Login from './admin/login.jsx';
import Dashboard from './admin/dashboard.jsx';
import Manage from './admin/manage.jsx';
import General from './admin/generalRequests.jsx';
import NotFound from './admin/404.jsx';

const queryClient = new QueryClient({});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/admin",
//     element: <Login />,
//   },
//   {
//     path: "/admin/dash",
//     element: <Dashboard />,
//   },
//   {
//     path: "/admin/management",
//     element: <Manage />,
//   },
//   {
//     path: "/admin/:request",
//     element: <General />,
//   },
//   {
//     path: '*',
//     element: <NotFound />,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename='/helpdesk'>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dash" element={<Dashboard />} />
          <Route path="/admin/management" element={<Manage />} />
          <Route path="/admin/:request" element={<General />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);
