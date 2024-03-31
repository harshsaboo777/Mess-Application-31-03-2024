import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useState,useEffect } from "react";
import Cookies from "universal-cookie"
import "../ComponentStyles/itemCard2.css"
import "../ComponentStyles/messheading2.css"

function MessHeading2() {

  const cookies = new Cookies();
  const User_id = cookies.get("User").User_id;
  const [Mess_id,update_Mess_id] = useState(0);
  const [status,update_status] = useState(0);

  const fetch_status = async (e) => {
    await 
    axios
      .post("http://localhost:5000/Mess_owner/fetch_status/",
      {
        "Mess_id":Mess_id
      })
      .then((res) => {
        update_status(res.data.status);
      });
  };

  const toggle_status = async(e)=>{
    await 
    axios
      .post("http://localhost:5000/Mess_owner/toggle_status/",
      {
        "Mess_id":Mess_id
      })
      .then((res) => {
      });
      console.log("toggled");
      fetch_status();
  };

  const fetch_mess_id = async (e) => {
    await 
    axios
      .post("http://localhost:5000/Mess_owner/fetch_mess_id/",
      {
        "User_id":User_id
      })
      .then((res) => {
        update_Mess_id(res.data.mess_id);
        console.log(res.data.mess_id);
      });
  };

  useEffect(() => {
    fetch_mess_id();
	}, []);

  useEffect(() => {
    fetch_status();
	}, [Mess_id]);

  return (
    <section class="bg-center bg-no-repeat bg-[url('https://wallpapercave.com/wp/wp3105346.jpg')] bg-gray-500 bg-blend-multiply">
      <Navbar />
      <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-20">
        <h1 class={"mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-7xl"}>
          Healthy Mealz
        </h1>
        <p class="mb-8 text-lg font-normal text-gray-300 lg:text-3xl sm:px-16 lg:px-48">
          We Provide you the nearest healthy food at cheapest cost!
        </p>
        <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"></div>
        <button className={(status==0?"itemcard2_background":"itemcard2_background2")+" lg:text-2xl inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-cyan-900 rounded-lg focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"} onClick={toggle_status}>{status==0?"Open Mess":"Close Mess"}</button>
      </div>
    </section>
  );
}

export default MessHeading2;
