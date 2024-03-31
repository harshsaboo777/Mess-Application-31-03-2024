import Navbar from "./Navbar";
import Cookies from "universal-cookie";
import styles from "../ComponentStyles/Profile.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {

  const cookies = new Cookies();
  const User = cookies.get("User");
  const [name, Update_name] = useState([]);
  
  const [coordinates, setCoordinates] = useState(null);

  const fetch_name = async (e) => {
    await axios
      .post("http://localhost:5000/Customer/fetch_profile/",{
        "User_id" :User.User_id,
      })
      .then((res) => {
        Update_name(res.data);
      });
      
  };
  // const update_address = ()=>{

      
  // navigator.geolocation.getCurrentPosition(
  //   (position) => {
  //     const { latitude, longitude } = position.coords;
  //     const formattedLatitude = latitude.toPrecision(6);
  //     const formattedLongitude = longitude.toPrecision(6);
  //     setCoordinates({ latitude: formattedLatitude, longitude: formattedLongitude },);
  //     console.log(
  //       Browser Geolocation: Latitude: ${formattedLatitude}, Longitude: ${formattedLongitude},
  //     );
  //     alert("address_updated");
  //   },
  //   (error) => {
  //     console.error('Error getting coordinates:', error.message);
  //   },
  //   { enableHighAccuracy: true,timeout: 5000, maximumAge: 0 }
  // ); };
 
  useEffect(()=>{
    fetch_name();
  },[]);


    return (
        <div >
            <Navbar/>
            <div className="hover:text-gray-200 ">
                <div class="images">
                        <img src="../images/img.jpeg"/>
                </div>
               
                <div>
                <div class="text">Name - {name.fname}</div>
                <div class="text">Contact Number - {name.phone_num}</div>
                <div class="text">Email- {name.email}</div>
                <div class="text">Address- {name.user_address}</div></div> 
                <div class="profile">
                    <button class="real" onClick={()=>{}} 
>Update Address </button>
                </div>

                <div>
                    <button class="real">Past Orders</button>
                </div>

                <div class="text3">
                    <button class="real" >View All</button>
                </div>
                <div class="card ">
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Prachi Mess</p>
                            <p>New Palasia</p>
                    </div>
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Upadhya Mess</p>
                            <p>Vallabh Nagar</p>
                    </div>
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Sharma Mess</p>
                            <p>Rani Sati</p>
                    </div>
                    <div class="box">
                    <img src="../images/img1.jpeg"/>
                        <p>Meenu Mess</p>
                        <p>AB Road</p>
                    </div>
                    </div>
                <div class="text4">
                    <button class="real">Your Favourites</button>
                </div>
                <div class="text5">
                    <button class="real">View All</button>
                </div>
                <div class="card">
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Prachi Mess</p>
                            <p>New Palasia</p>
                    </div>
                    <div class="box">
                        <img src="../images/img1.jpeg"/>
                            <p>Upadhaya Mess</p>
                            <p>Vallabh Nagar</p>
                    </div>
                    <div class="box" >
                        <img src="../images/img1.jpeg"/>
                            <p>Sharma Mess</p>
                            <p>Rani Sati</p>
                    </div>
                    <div class="box">
                    <img src="../images/img1.jpeg"/>
                        <p>Meenu Mess</p>
                        <p>AB Road</p>
                    </div>
                    </div>
            </div>
        </div>
    );
 }
export default Profile;