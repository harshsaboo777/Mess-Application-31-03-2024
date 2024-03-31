import React, { useState } from "react";
import styles from "../ComponentStyles/SignUp.module.css";
// import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    Fname: "",
    Lname: "",
    Email: "",
    Phone_num: "",
    User_address: "",
    Password: "",
    User_type: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({
      ...user,
      [name]: value,
    });
  };

  const handleChangetype = (e) =>{
    const {value} = e.target;
    setuser({
      ...user,
      "User_type":value,
    })
  }

  const handleSubmit = (e) => {
    if (
      user.Fname !== "" &&
      user.Lname !== "" &&
      user.User_address !== "" &&
      user.Phone_num !== "" &&
      user.Email !== "" &&
      user.Password !== ""&& 
      user.User_type !== ""
    ) {
       console.log(user);
      e.preventDefault();
      axios
        .post("http://localhost:5000/auth/signUp", user)
        .then((res) => {
           console.log(res.data);
          alert(res.data);

          if(user.User_type==3)
          {
            const user_id = res.data.user_id;
            // console.log(user_id);
            navigate("/MessRegistration", { replace: true, state: {user_id} });
          }
          else{navigate("/login");}
        })
        .catch((err) => {
          alert("Email Already in use");
        });
    } else {
      alert("Invalid Inputs");
    }
  };
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.loginbox}>
          <div className={styles.loginemail}>
            <p className={styles.logintext}>SignUp with Email</p>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="First Name"
                name="Fname"
                value={user.Fname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={ styles.inputgroup} >
              <input className="signupinputs"
                type="text"
                placeholder="Last Name"
                name="Lname"
                value={user.Lname}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="Email"
                name="Email"
                value={user.Email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputgroup}>
              <input
                type="number"
                placeholder="Phone_number"
                name="Phone_num"
                value={user.Phone_num}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputgroup}>
              <input
                type="text"
                placeholder="User_address"
                name="User_address"
                value={user.User_address}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputgroup}>
              <input
                type="Password"
                placeholder="Password"
                name="Password"
                value={user.Password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="my-5">
            <input className="mx-3.5" type="radio" value={1} name="Customer" onChange={handleChangetype} checked={user.User_type === "1"}/> Customer
            <input className="mx-3.5" type="radio" value={2} name="Delivery Agent" onChange={handleChangetype} checked={user.User_type === "2"}/> Delivery Agent
            <input className="mx-3.5" type="radio" value={3} name="Mess Owner" onChange={handleChangetype} checked={user.User_type === "3"}/> Mess Owner
            </div>
            
            <div className={styles.inputgroup}>
              <button
                className={styles.btn}
                name="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
            </div>
            <p className={styles.loginregistertext}>
              Already have an account?{" "}
              <button onClick={() => navigate("/login")}> Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
