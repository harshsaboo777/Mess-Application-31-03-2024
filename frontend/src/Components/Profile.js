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
 
  const navigate = useNavigate();
  const fetch_name = async (e) => {
    await axios
      .post("https://apnamess-11-04-24-1.onrender.com/Customer/fetch_profile/",{
        "User_id" :User.User_id,
      })
      .then((res) => {
        Update_name(res.data);
      });
      
  };
  
 
  function update_address (){
    navigate("/Updateaddress");
};

 
  useEffect(()=>{
    fetch_name();
  },[]);


    return (
        <div >
            <Navbar/>
            <div className="hover:text-gray-200 ">
                <div class="images">
                        <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjNrK36yrCd6DHKFr-x1dFrkk-49JBODBCBAjwBMZ4hCw2pzBRjpNH8K4Su7nu0cn-KeEkdwno3ELx9izvdJn3zIyR1zaVk7HaZvprBRQQOWMwkVtlKdWi-aieK56NrFyDBtpS1wOw1p0Y/s1600/Gaurav+sharma+Indian+Models+Fashion+Photographer09.jpg"/>
                </div>
               
                <div>
                <div class="text">Name - {name.fname}</div>
                <div class="text">Contact Number - {name.phone_num}</div>
                <div class="text">Email- {name.email}</div>
                <div class="text">Address- {name.user_address}</div></div> 
                <div class="profile">
                <button class="real" onClick={
  update_address
}>Update Address</button>
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



