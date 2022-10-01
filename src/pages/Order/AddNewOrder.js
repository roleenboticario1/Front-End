import React, {useState, useEffect} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import OrderServices from '../../services/OrderServices';

const AddNewOrder = () => {
    
    const [ productList, setProductList ] = useState([]);
    const [ customerList, setCustomerList ] = useState([]);
    
    const [ newOrder, setNewOrder ] = useState({
        "customer_id" : '',
        "product_id" : '',
        "quantity" : '',
        error_list : []
    });

    const handleInput = (e) => {
      e.persist()
      setNewOrder({ ...newOrder, [e.target.name] : e.target.value });
      console.log(newOrder)
    }

    useEffect(() => {

      OrderServices.getProduct().then( product_response => {
          if(product_response.status === 200)
          {
            setProductList(product_response.data.products);
          }
      });

      OrderServices.getCategories().then( customer_response => {
        if(customer_response.status === 200)
        {
            setCustomerList(customer_response.data.customers);
        }
    });

    }, []);

    const submitProduct = (e) => {
      e.preventDefault();

      const data = {
        "customer_id" : newOrder.customer_id,
        "product_id" :  newOrder.product_id,
        "quantity" : newOrder.quantity
      }

      OrderServices.createOrder(data).then( res => {
  
        if(res.status === 201)
        {
            swal("Success", res.data.message,"success");
            document.getElementById('ORDER_FORM_RESET').reset();
        }
        else
        {
          setNewOrder({...newOrder, error_list: res.data.validation_errors });
        }

      });
   }

    return (
      <div className="container mt-5">
        <div className="card">
            <div className="card-header">
                <h6>Create New Order
                <Link to={`/`}  className="float-end">Product Details</Link>
                </h6>
            </div>
            <div className="card-body">
              <form onSubmit={submitProduct} encType="multipart/form-data" id="ORDER_FORM_RESET">
                      <div className="form-group mb-3">
                          <label>Select Customer</label>
                          <select name="customer_id" className="form-control" onChange={handleInput} value={newOrder.customer_id}>
                            <option value="">Select Customer</option>
                            {
                                customerList.map( (items) => {
                                    return(
                                      <option value={items.id} key={items.id} className="text-dark">{ items.customer_name }</option>
                                    )
                                })
                            }
                          </select>
                          <span className="text-danger">{newOrder.error_list.customer_id ? 'The Customer name field is required' : ''}</span>
                      </div>
                      <div className="form-group mb-3">
                          <label>Select Product</label>
                          <select name="product_id" className="form-control" onChange={handleInput} value={newOrder.product_id}>
                            <option value="">Select Product</option>
                            {
                                productList.map( (item) => {
                                    return(
                                      <option value={item.id} key={item.id} className="text-dark">{ item.product_name }</option>
                                    )
                                })
                            }
                          </select>
                          <span className="text-danger">{newOrder.error_list.product_id ? 'Product name field is required' : ''}</span>
                      </div>
                      <div className="form-group mb-3">
                        <label>Product Quantity</label>
                        <input type="number" name="quantity" className="form-control"onChange={handleInput} value={newOrder.quantity} />
                        <span className="text-danger">{newOrder.error_list.quantity}</span>
                      </div>
                  <button type="submit" className="btn btn-primary px-4 float-end mt-4">Submit</button>
                </form>
          </div>
        </div>
      </div>
    );

}

export default AddNewOrder;