import React, { useState } from 'react'
import Topbar from '../components/Topbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  //usestate pour stocker email et password et fullname//

  const [formData,setFormData]=useState({fullname:"",email:"",password:"",adresse:"",phonenumber:""})
const navigate=useNavigate()
//handlechange pour récuperer les valeurs écrites dans les input//

  const handleChange=(e)=>{
setFormData({...formData,[e.target.name]:e.target.value})
  }
  //handle register fonction globale pour l'inscription//

  const handleRegister=async(event)=>{
event.preventDefault()
try {
  const response= await axios.post("http://localhost:3001/user/inscriptionuser",formData)
  navigate("/Login")
//on va envoyer form data au backend ici//

console.log("les données de la formulaire sont",formData)
} catch (error) {
  console.log("erreur lors de l'inscription",error)
}

  }
  return (

    <div>
        <Topbar/>
       <div>
        
  {/* Page Header Start */}

  <div className="container-fluid bg-secondary mb-5">
    <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: 300}}>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Register Us</h1>
      <div className="d-inline-flex">
        <p className="m-0"><a href>Home</a></p>
        <p className="m-0 px-2">-</p>
        <p className="m-0">Register</p>
      </div>
    </div>
  </div>
  {/* Page Header End */}
  {/* Register Start */}
  <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5"><span className="px-2">Register For Any Queries</span></h2>
    </div>
    <div className="row px-xl-5">
      <div className="col-lg-7 mb-5">
        <div className="Register-form">
          <div id="success" />
          <form name="sentMessage" id="RegisterForm" noValidate="novalidate" onSubmit={handleRegister}>
            <div className="control-group">
              <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} className="form-control" id="name" placeholder="Your fullname" required="required" data-validation-required-message="Please enter your name" />
              <p className="help-block text-danger" />
            </div>
            <div className="control-group">
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
              <p className="help-block text-danger" />
            </div>
            <div className="control-group">
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="subject" placeholder="Your Password" required="required" data-validation-required-message="Please enter a subject" />
              <p className="help-block text-danger" />
            </div>
             <div className="control-group">
              <input type="number" name="phonenumber" value={formData.phonenumber} onChange={handleChange} className="form-control" id="subject" placeholder="Your Phonenumber" required="required" data-validation-required-message="Please enter a subject" />
              <p className="help-block text-danger" />
            </div>
             <div className="control-group">
              <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} className="form-control" id="subject" placeholder="Your adress" required="required" data-validation-required-message="Please enter a subject" />
              <p className="help-block text-danger" />
            </div>
            <div>
              <button className="btn btn-primary py-2 px-4" type="submit" id="sendMessageButton">Submit</button>
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
  {/* Register End */}
</div>

        <Footer/>
    </div>
  )
}

export default Register