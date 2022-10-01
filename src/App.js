
import { BrowserRouter, Routes, Route } from  'react-router-dom';
import axios from 'axios';
import Product from "./pages/Products/Product";
import EditOrderDetails from "./pages/Order/EditOrderDetails";
import AddNewOrder from "./pages/Order/AddNewOrder";
import OrderDetails  from "./pages/Order/OrderDetails";


axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Product/>} />
         <Route path="/order/add" element={<AddNewOrder/>} />
         <Route path="/order/details" element={<OrderDetails/>} />
         <Route path="/order/details/:id" element={<EditOrderDetails/>} exact/>
         /order/cancel
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
