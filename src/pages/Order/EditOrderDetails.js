import React, {useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const  EditOrderDetails =  () =>  {
   
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split("/")[3];

    const [ newOrder, setNewOrder ] = useState({
        "order_number" : "",
        "quantity" : '',
        error_list : []
    });

    const handleInput = (e) => {
      e.persist()
      setNewOrder({ ...newOrder, [e.target.name] : e.target.value });
      console.log(newOrder)
    }

    const submitProduct = (e) => {
        e.preventDefault();
  
        const data = {
          "order_number" : id,
          "quantity" : newOrder.quantity
        }
        
        console.log(data)

        axios.post('/order/update',data).then( res => {
    
          if(res.status === 200)
          {
              swal("Success", res.data.message,"success");
              document.getElementById('ORDER_FORM_RESET').reset();
              navigate("/order/details");
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
                <h6>Create New Order</h6>
            </div>
            <div className="card-body">
              <form onSubmit={submitProduct} encType="multipart/form-data" id="ORDER_FORM_RESET">
                      <div className="form-group mb-3">
                        <label>Product Quantity</label>
                        <input type="number" name="quantity" className="form-control"onChange={handleInput} value={newOrder.quantity} />
                        <span className="text-danger">{newOrder.error_list.quantity}</span>
                      </div>
                  <button type="submit" className="btn btn-primary px-4 float-end mt-4">Save</button>
                </form>
          </div>
        </div>
      </div>
    );

}

export default EditOrderDetails;