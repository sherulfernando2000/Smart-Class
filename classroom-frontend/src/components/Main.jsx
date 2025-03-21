import React from 'react'
import Hero from "./MainComponents/Hero";
import Menu from "./MainComponents/Menu";
import About from "./MainComponents/About";
import Product from "./MainComponents/Product";
import Navbar from "./MainComponents/Navbar";
import Review from "./MainComponents/Review";
import Footer from "./MainComponents/Footer";

function Main() {
  return (
    <main className='homebody'>
    {/* Navbar is outside Routes so it appears on all pages */}
    <Navbar/>

    
                <div id="hero">
                  <Hero />
                </div>
                {/* <div id="menu">
                  <Menu />
                </div>
                <div id="about">
                  <About />
                </div>
                <div id="products">
                  <Product />
                </div> */}
                <div id="review">
                  <Review />
                </div>
   
     {/* Footer is outside Routes so it appears on all pages */}
     <Footer />
     </main>
     
  )
}

export default Main
