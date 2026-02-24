import React, { useState } from "react";
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import axios from "axios";
import { toast } from "react-toastify"; // afficher les tost de notification
import { useNavigate } from "react-router-dom"; //bibliothèque de navigation de page à autre
import { useDispatch } from "react-redux";
import { login_action } from "../redux/actions/useraction";

const Login = () => {
    const [email, setEmail]=useState("")
    const [password, setpassword]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogin=async(e)=>{
      e.preventDefault()
      try {
        dispatch(login_action({email,password}))
       

toast.success("connexion réussie") //notification de connexion de l'utilisateur 
navigate("/")


      //url de backend//
     // console.log("l'émail saisi est",email)
     // console.log("le mot de passe saisi est",password)
      } catch (error) {
        toast.error("erreur lors de connexion")
        console.log("erreur lors de connexion")
      }
    
    }
  return (
    <div>
          <div>
        <Topbar/>
       <div>
  {/* Page Header Start */}
  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Login Us</h1>
      <div className="d-inline-flex">
        <p className="m-0"><a href>Home</a></p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Login</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Login Start */}
  <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">Login For Any Queries</span></h2>
    </div>
    <div className="row px-xl-5">
      <div className="col-lg-7 mb-5">
        <div className="Login-form">
          <div id="success" />
          <form name="sentMessage" id="LoginForm" noValidate="novalidate">
            <div className="control-group">
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}   className="form-control" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
              <p className="help-block text-danger" />
            </div>
            <div className="control-group">
              <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}   className="form-control" id="subject" placeholder="Your Password" required="required" data-validation-required-message="Please enter a subject" />
              <p className="help-block text-danger" />
            </div>
            <div>
              <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton" onClick={handleLogin}>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-lg-5 mb-5">
        <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
        <p>Justo sed diam ut sed amet duo amet lorem amet stet sea ipsum, sed duo amet et. Est elitr dolor elitr erat sit sit. Dolor diam et erat clita ipsum justo sed.</p>
        <div className="d-flex flex-column mb-3">
          <h5 className="font-weight-semi-bold mb-3">Store 1</h5>
          <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 Street, New York, USA</p>
          <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />info@example.com</p>
          <p className="mb-2"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
        </div>
        <div className="d-flex flex-column">
          <h5 className="font-weight-semi-bold mb-3">Store 2</h5>
          <p className="mb-2"><i className="fa fa-map-marker-alt text-primary mr-3" />123 Street, New York, USA</p>
          <p className="mb-2"><i className="fa fa-envelope text-primary mr-3" />info@example.com</p>
          <p className="mb-0"><i className="fa fa-phone-alt text-primary mr-3" />+012 345 67890</p>
        </div>
      </div>
    </div>
  </div>
  {/* Login End */}
</div>

        <Footer/>
    </div>
    </div>
  )
}

export default Login