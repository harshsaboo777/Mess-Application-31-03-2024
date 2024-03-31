/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import ContactUs from "./ContactUs";
import axios from "axios";

function Navbar() {
  
  // console.log(profile);
  const cookies = new Cookies();
  const User = cookies.get("User");
  const navigate = useNavigate();
  const [profile,Update_profile] = useState([]);

  const Navigate_profile = ()=>{
    if(User.User_type==3){
        navigate("/profilemess");
    }else{
    navigate("/profile");
    }
  }

  const fetch_profile = async (e) => {
    await axios
      .post("http://localhost:5000/Customer/fetch_profile/",{
        "User_id" :User.User_id,
      })
      .then((res) => {
        Update_profile(res.data);
      });
  };

  useEffect(() => {
    if (!cookies.get("User")) {
      console.log("User");
      navigate("/login");
    }
    console.log("cookies");
    
  });

  useEffect(()=>{
    fetch_profile();
    console.log(profile);
  },[]);

  const Logout = () => {
    cookies.remove("User");
    navigate("/login");
  }

  const Navigate_SubscribeMess = ()=>{
    navigate("/UserSubscriptionPage")
  }

  const Navigate_Home = () =>{
    if(User.User_type==1)
    {
      navigate("/tiffin")
    }else if(User.User_type==2)
    {
      navigate("/UserSubscriptionPa?ge")
    }else if(User.User_type==3)
    {
      navigate("/mess")
    }
  }

  const ContactUs = ()=>
  {
    navigate("/ContactUs");
  }

  return (
    <div>
      <div class="flex flex-wrap place-items-center">
        <section class="relative mx-auto">
          <nav class="flex justify-between bg-cyan-700 text-white w-screen">
            <div class="px-5 xl:px-12 py-6 flex w-full items-center">
              {/* <!-- Nav Links --> */}
              <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-10">
                <li>
                  <button class="hover:text-gray-200" onClick={Navigate_Home}>
                    Home
                  </button>
                </li>
                <li>
                  <button class="hover:text-gray-200">
                    Category
                  </button>
                </li>
                <li>
                  <button class="hover:text-gray-200" onClick={ContactUs}>
                    Contact Us
                  </button>
                </li>
                
              </ul>
              {/* <!-- Header Icons --> */}
              <div class="hidden xl:flex items-center space-x-5 items-center">

                {User.User_type =='1'&&
                (<button class="flex items-center hover:text-gray-200" onClick={Navigate_SubscribeMess}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span class="flex absolute -mt-5 ml-4">
                    <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </button>)}
                {/* <!-- Sign In / Register      --> */}
                <button class="flex items-center hover:text-gray-200" onClick={Navigate_profile}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 hover:text-gray-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <p className="text-white poppins hidden md:block lg:block">{profile.fname}</p>
                <FiLogOut className="cursor-pointer w-6 h-6 text-white" onClick={Logout} />
              </div>
            </div>
            {/* <!-- Responsive navbar --> */}
            <a class="xl:hidden flex mr-6 items-center" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 hover:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span class="flex absolute -mt-5 ml-4">
                <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
          </nav>
        </section>
      </div>
      {/* <!-- Does this resource worth a follow? --> */}
    </div>
  );
}

export default Navbar;
