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
import AdminBread from './admin/bread.jsx';
import Help from './pages/help.jsx';
import Bread from './pages/bread.jsx';

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter basename='/helpdesk'> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<App />} />
          <Route path="/help-desk" exact element={<Help />} />
          <Route path="/order-bread" exact element={<Bread />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin/dash" element={<Dashboard />} />
          <Route path="/admin/bread" element={<AdminBread />} />
          <Route path="/admin/management" element={<Manage />} />
          <Route path="/admin/:request" element={<General />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </ChakraProvider>
);
