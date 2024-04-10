import React from "react";
import "../ComponentStyles/itemCard.css";
import "../ComponentStyles/itemCard2.css"
import Ratings from "./Ratings"
import UpdateDailyTokens from "./UpdateDailyTokens";
import Menu from "./Menu";

function ItemCard2(props) {
  const { User_id,tiffin_details,name, rating, daily_tokens,remaining_token,mess_id,validity,status,image,setTrigger,trigger} = props;

  return (
    <div className="bg-cyan-50 border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
            <span className={(status===0?"itemcard2_background ":"itemcard2_background2 ")+" rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 "}>{status===1?"Open":"Currently Unavailable"}</span>
            <img className="w-64 mx-auto transform transition duration-300 hover:scale-105" src={image} alt="" />
            <div className="flex flex-col items-center my-3 space-y-2">
                <h1 className="text-gray-900 poppins text-2xl font-bold">{name}</h1>
                <Ratings  rats={rating} User_id={User_id} mess_id={mess_id}/>
                <p className="text-gray-500 poppins text-sm text-center">Remaining tokens: {remaining_token}</p>
                <h2 className="text-gray-900 poppins text-xl ">Daily Tokens : {daily_tokens}</h2>
                <Menu tiffin_details={tiffin_details}/>
                <UpdateDailyTokens mess_id={mess_id} setTrigger={setTrigger} trigger={trigger}/>
                <a
            className="ml-3 text-xl inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-cyan-900">Contact  </a>
            </div>

        </div>
  );
}

export default ItemCard2;
