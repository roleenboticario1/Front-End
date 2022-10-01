import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    
    const [ loading, setLoading ] = useState(true);
    const [ productList, setProductList ] = useState([]);
    const [ total, setTotal ] = useState([]);
  
    useEffect(() => {
       
        axios.get(`/order-details`).then( res =>{
         if(res.status === 200)
         {
            setTotal(res.data.total)
            setProductList(res.data.data);
         }
         setLoading(false);
      });
  
    }, []);
  
    var HTML_TABLE  = '';
  
    if(loading){
       return <h2>Loading...</h2>;
    }else{  
      
     
      HTML_TABLE = productList.map((item) => {
         return(
           <tr key={item.id}>
             <td>{item.products.product_name}</td>
             <td>{item.products.product_price}</td>
             <td>{item.quantity}</td> 
             <td>{item.gross_sales}</td> 
           </tr>
             )
          });
    }
  
      return(
          <div className="container">
            <div className="card mt-5">
             <div className="card-header">
                <div className="cart-title">
                  <h4 className="mt-3">Product Details
                    <Link to="/order/add" className="btn btn-primary float-end btn-sm">Create Order</Link> 
                  </h4>
                 </div>
               </div>
               <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                          <tr>
                             <th>Product Name</th>
                             <th>Product Price</th>
                             <th>Product Quanity</th>
                             <th>Gross Sale</th>
                          </tr>
                        </thead>
                        <tbody>
                         { HTML_TABLE }
                         <tr>
                            <td colSpan="3" align='right'>Gross Sales</td> 
                            <td>{ total }</td> 
                            </tr>
                        </tbody>
                   </table>
                   <Link to="/order/details">Order Details</Link> 
                  </div>
               </div>
           </div>
          </div>
      )
  }
  

export default Product;