import React, { useState } from "react";
import { Link } from "react-scroll";
import { SiCoffeescript } from "react-icons/si";
import logo from "../../assets/img/classlogo.png";
import Button from "../../layouts/Button";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const handleChange = () => {
    setMenu(!menu);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <div className="fixed w-full z-10">
      <div>
        <div className=" flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className=" flex flex-row items-center cursor-pointer gap-2" 
            onClick={()=>navigate('/')}
          >
            <span>
            <img className="rounded w-10 h-10" src={logo} alt="img1" />
              {/* <SiCoffeescript size={25} /> */}
            </span>
            <h1 className=" text-xl font-semibold">SMART CLASS</h1>
          </div>

          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-[#007BFF]"
            >
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>

            <Link
              to="menu"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-[#007BFF]"
            >
              Menu
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>

            <Link
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-[#007BFF]"
            >
              About Us
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>

            <Link
              to="products"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-[#007BFF]"
            >
              Products
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>

            <Link
              to="review"
              spy={true}
              smooth={true}
              duration={500}
              className="group relative inline-block cursor-pointer hover:text-[#007BFF]"
            >
              Reviews
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></span>
            </Link>
          </nav>

          <div className=" hidden lg:flex">
            {/* <Button title="Login" methodName="handleOnClick"  /> */}
            <button className="px-6 py-1 border-2 border-white bg-[#007BFF] text-white
             hover:text-white hover:bg-[#0056b3] 
             transition-all rounded-full" onClick={()=>navigate("/login")}>Login</button>
          </div>

          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>
        <div
          className={` ${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-16 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300`}
        >
          <Link
            to="home"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#007BFF] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="menu"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#007BFF] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#007BFF] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About Us
          </Link>
          <Link
            to="products"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:text-[#007BFF] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Products
          </Link>
          <Link
            to="review"
            spy={true}
            smooth={true}
            duration={500}
            className=" hover:text-[#007BFF] transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Reviews
          </Link>

          <Button title="login" />

        </div>
      </div>
    </div>
  );
};

export default Navbar;
