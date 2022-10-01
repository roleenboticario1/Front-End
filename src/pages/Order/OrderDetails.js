import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import OrderServices from '../../services/OrderServices';

const OrderDetails = () => {
    
    const [ loading, setLoading ] = useState(true);
    const [ productList, setProductList ] = useState([]);
  
    useEffect(() => {
       
      OrderServices.customerOrder().then( res =>{
         if(res.status === 200)
         {
            setProductList(res.data.data);
         }
         setLoading(false);
      });
  
    }, []);

    const cancelOrder = (e, id) => {
        e.preventDefault();

        // const thisCliked = e.currentTarget;
        // thisCliked.innerText = "Cancelling";

        OrderServices.cancelOrder(id).then( res => {
            if(res.status === 200)
            {
                swal("Success",res.data.message,"success");
                // thisCliked.innerText = "Cancelled";
            }
        });
        setLoading(false);
     }
  
    var HTML_TABLE  = '';
  
    if(loading){
       return <h2>Loading...</h2>;
    }else{  
      
      HTML_TABLE = productList.map((item) => {
         return(
           <tr key={item.id}>
             <td>{item.customers.customer_name}</td>
             <td>{item.order_number}</td> 
             {
                item.order_details.map((order_detail) =>(
                   <td key={order_detail.id}>{order_detail.gross_sales}</td> 
                ))
             }
             <td>
                <Link to={`/order/details/${item.id}`} className="btn btn-warning btn-sm text-white">Edit</Link> |&nbsp; 
                {
                  item.order_details.map((order_detail) =>(
                    <button type="button" onClick={ (e) => cancelOrder(e, order_detail.order_number) }className="btn btn-danger btn-sm" key={order_detail.id}  disabled={item.status === 'Cancel' }
                    >Cancel</button>
                  ))
                }
                </td>
           </tr>
             )
          });
    }
  
      return(
          <div className="container">
            <div className="card mt-5">
             <div className="card-header">
                <div className="cart-title">
                  <h4 className="mt-3">Orther Details
                    <Link to="/order/add" className="btn btn-primary float-end btn-sm">Create Order</Link>
                  </h4>
                 </div>
               </div>
               <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                          <tr>
                             <th>Customer Name</th>
                             <th>Order Number Price</th>
                             <th>Gross Sale</th>
                             <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                         { HTML_TABLE }
                        </tbody>
                   </table>
                   <Link to="/">Product Details</Link> 
                  </div>
               </div>
           </div>
          </div>
      )
  }
  

export default OrderDetails;