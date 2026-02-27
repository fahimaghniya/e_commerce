import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getallproductaction } from '../redux/actions/productaction'

const Product = () => {
  const navigate=useNavigate()
const   dispatch=useDispatch()
const productList=useSelector(state=>state.product.productlist)
  useEffect(()=>{
    //rechercher les product from data base                 //use effect affiche le contenu  lors de l'ouverture de page//
    const getallproduct=async()=>{
      try {dispatch(getallproductaction())
      } catch (error) {
        console.error("erreur de récupération de la liste des produits",error)
      }
    }

getallproduct()
  },[])   //les crochets de tableau vide pour afficher une seule fois le contenu
  const handleaddtocart=async(productid)=>{
    try {
      const accesstoken=localStorage.getItem("token")  //récupérer la valeur de token depuis local storage
      const response=await axios.post("http://localhost:3001/cart/addtocart",{productid,quantity:1},{headers:{"Content-Type": "application/json",Authorization:`Bearer ${accesstoken}`}})
toast.success("produit ajouté au panier")
navigate("/Cartes")
    } catch (error) {
      toast.error("échec de l'ajout")
    }
  }
  return (
   <div> <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">Just Arrived</span></h2>
    </div>
    <div className="row px-xl-5 pb-3">
      {productList.map(i=>(
<div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div className="card product-item border-0 mb-4">
          
          <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
           <img className="img-fluid w-100" src={`http://localhost:3001/uploads/${i.image}`}  />
          </div>
          <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">{i.name }</h6>
            <div className="d-flex justify-content-center">
              <h6>{i.price}</h6><h6 className="text-muted ml-2"><del>{i.oldPrice}</del></h6>
            </div>
          </div>
          <div className="card-footer d-flex justify-content-between bg-light border">
            <Link to={`/Details/${i._id}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1" />View Detail</Link>
            <button onClick={()=>handleaddtocart(i._id)} className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1" />Add To Cart</button>
          </div>
        </div>
      </div>
      ))
      }
      
      
    </div>
  </div></div>

  )
}

export default Product