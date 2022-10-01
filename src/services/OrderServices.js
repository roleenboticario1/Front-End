
import axios from 'axios';

class OrderServices {
  
  createOrder(data){
    return   axios.post('/order',data);
  }

  getProduct(){
    return axios.get('/products');
  }

  getCategories(){
   return axios.get('/customers');
  }
  
  customerOrder(){
    return axios.get(`/customer-order`);
  }

  cancelOrder(id){
    return axios.get(`/order/cancel/${id}`)
  }

}

export default new OrderServices();