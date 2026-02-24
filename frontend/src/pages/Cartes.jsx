import React, { useEffect, useState } from 'react'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'

const Cartes = () => {
  const [cartesItems,setcartesItems]=useState([])
  useEffect(()=>{
    const getcart=async()=>{
      try {
        const accesstoken=localStorage.getItem("token")
        const response= await axios.get("http://localhost:3001/cart/getusercart",{headers:{Authorization:`Bearer ${accesstoken}`}})
        console.log("les données de la carte:",response.data.data.items)
        setcartesItems(response.data.data.items)
      } catch (error) {
        toast.error("failed to get cartdata")
      }
    }
    getcart()
  },[])
  const handleremove=async(productid)=>{
    try {
      const accesstoken=localStorage.getItem("token")
       const response= await axios.delete(`http://localhost:3001/cart/deleteproductfromcart/${productid}`,{headers:{Authorization:`Bearer ${accesstoken}`}})
toast.success("product removed from cart")
    } catch (error) {
      toast.error("failed to remove the product")
    }
  }
  const handleincrease=async({productid,quantity})=>{
    try {
       const accesstoken=localStorage.getItem("token")
       const response= await axios.put(`http://localhost:3001/cart/updatecartitems/${productid}`,{quantity},{headers:{Authorization:`Bearer ${accesstoken}`}})
       toast.success("quantity increased")
    } catch (error) {
      toast.error("failed to update quantity")
    }}
     const handledecrease=async({productid,quantity})=>{
    try {
       const accesstoken=localStorage.getItem("token")
       const response= await axios.put(`http://localhost:3001/cart/updatecartitems/${productid}`,{quantity},{headers:{Authorization:`Bearer ${accesstoken}`}})
       toast.success("quantity decreased")
    } catch (error) {
      toast.error("failed to update quantity")
    }}
    const subtotal=cartesItems.reduce((acc,j)=>acc+j.productid.price*j.quantity,0)   //reduce est une fonction prédefinie qui parcourt le tableau et calcule la somme
    const total=subtotal+10
  return (
    <div>
        <Topbar/>

       <div>
  {/* Page Header Start */}
  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
      <div className="d-inline-flex">
        <p className="m-0"><a href>Home</a></p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Shopping Cart</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Cart Start */}
  <div className="container-fluid pt-5">
    <div className="row px-xl-5">
      <div className="col-lg-8 table-responsive mb-5">
        <table className="table table-bordered text-center mb-0">
          <thead className="bg-secondary text-dark">
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {cartesItems.map(i=>(<tr>
              <td className="align-middle"><img src={`http://localhost:3001/uploads/${i.productid?.image}`} alt style={{width: 50}} /> {i.productid?.name}</td>
              <td className="align-middle">{i.productid?.price}</td>
              <td className="align-middle">
                <div className="input-group quantity mx-auto" style={{width: 100}}>
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-minus" onClick={()=>handledecrease({productid:i.productid?._id,quantity:i.quantity-1})}>
                      <i className="fa fa-minus" />
                    </button>
                  </div>
                  <input type="text" className="form-control form-control-sm bg-secondary text-center" Value={i.quantity} />
                  <div className="input-group-btn">
                    <button className="btn btn-sm btn-primary btn-plus" onClick={()=>handleincrease({productid:i.productid?._id,quantity:i.quantity+1})}>
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                </div>
              </td>
              <td className="align-middle">{i.productid?.price*i.quantity}dt</td>
              <td className="align-middle"><button onClick={()=>handleremove(i.productid?._id)} className="btn btn-sm btn-primary"><i className="fa fa-times" /></button></td>
            </tr>))}
            
          </tbody>
        </table>
      </div>
      <div className="col-lg-4">
        <form className="mb-5" action>
          <div className="input-group">
            <input type="text" className="form-control p-4" placeholder="Coupon Code" />
            <div className="input-group-append">
              <button className="btn btn-primary">Apply Coupon</button>
            </div>
          </div>
        </form>
        <div className="card border-secondary mb-5">
          <div className="card-header bg-secondary border-0">
            <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3 pt-1">
              <h6 className="font-weight-medium">Subtotal</h6>
              <h6 className="font-weight-medium">{subtotal}dt</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-medium">Shipping</h6>
              <h6 className="font-weight-medium">10dt</h6>
            </div>
          </div>
          <div className="card-footer border-secondary bg-transparent">
            <div className="d-flex justify-content-between mt-2">
              <h5 className="font-weight-bold">Total</h5>
              <h5 className="font-weight-bold">{total}dt</h5>
            </div>
            <button className="btn btn-block btn-primary my-3 py-3">Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Cart End */}
</div>
<Footer/>
    </div>
    
  )
}

export default Cartes