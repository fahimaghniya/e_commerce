import React from 'react'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'
import Product from '../components/Product'
import Footer from '../components/Footer'
import Offers from '../components/Offers'

const Home = () => {
  return (
    <div>
        <Topbar/>
        <Navbar/>
        <Offers/>
        <Product/>
        <Footer/>
    </div>
  )
}

export default Home