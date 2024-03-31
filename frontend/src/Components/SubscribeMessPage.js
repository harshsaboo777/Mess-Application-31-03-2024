import React from 'react'
import MessHeading from './MessHeading';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';

function SubscribeMessPage(props) {
    
    const navigate = useNavigate();
    const cookies = new Cookies();
    const { state } = useLocation();
    const {mess_id,price,name}= state;
    console.log(price);

    const subscribe = async(e) =>{
        const {name} = e.target;
        const user_id = cookies.get("User").User_id;

        await axios
            .post("http://localhost:5000/Customer/Subscribe_mess", 
            {
                "customer_id":user_id, 
                "Mess_id":mess_id, 
                "Remaining_token": name*30,
                "subscription_validity": name
            })
            .then((res) => {
              alert("You are now Subscribed to mess.");
              navigate("/tiffin");
            })
            .catch((err) => {
              alert("Incorrect Email or Password ");
            });

    }

  return (
    <div className='bg-cyan-600'>
    <MessHeading/>    
    <p class="mt-8 text-lg font-bold text-cyan-100 lg:text-5xl sm:px-16 lg:px-48 mx-auto max-w-screen-xl text-center fontkanit">
          Subscribe {name}
    </p>
<div class='flex pt-[30px] px-[40px]'>
   <div class="min-w-full">

        <div class="mt-[20px] grid grid-cols-3 gap-[20px]">
            <div key="1" class="bg-cyan-100 w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                <div class="pt-[15px] px-[25px] pb-[25px]">
                    <div class="flex justify-end">
                        <div class="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                            <p class="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                Starter
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="text-[#00153B] text-[19px] leading-[24px] font-bold">
                            1 Month
                        </p>
                        <p class="text-[#00153B] text-[50px] leading-[63px] font-bold">
                            {price} INR
                        </p>
                    </div>

                    <div>
                        <p class="text-[#717F87] text-[18px] leading-[28px] font-medium">
                            30 Credits
                        </p>
                    </div>
                </div>

                <div class="pt-[25px] px-[25px] pb-[35px]">
                    <div>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Direct Phone Numbers
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Landline Phone Numbers
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Corporate email addresses
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Propsetcs
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Chrome Extension
                        </p>
                    </div>

                    <div class="mt-[25px]">
                        <button onClick={subscribe} name="1" class="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>

            <div key="2" class="bg-cyan-100 w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                <div class="pt-[15px] px-[25px] pb-[25px]">
                    <div class="flex justify-end">
                        <div class="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                            <p class="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                Value
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="text-[#00153B] text-[19px] leading-[24px] font-bold">
                        3 Month
                        </p>
                        <p class="text-[#00153B] text-[50px] leading-[63px] font-bold">
                        {3*price-500} INR
                        </p>
                    </div>

                    <div>
                        <p class="text-[#717F87] text-[18px] leading-[28px] font-medium">
                            90 Credits + 5 Free Credits
                        </p>
                    </div>
                </div>

                <div class="pt-[25px] px-[25px] pb-[35px]">
                    <div>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Direct Phone Numbers
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Landline Phone Numbers
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Corporate email addresses
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Propsetcs
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Chrome Extension
                        </p>
                    </div>

                    <div class="mt-[25px]">
                        <button onClick={subscribe} name="3" class="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>

            <div key="3" class="bg-cyan-100 w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
                <div class="pt-[15px] px-[25px] pb-[25px]">
                    <div class="flex justify-end">
                        <div class="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                            <p class="text-[#00153B] text-[12px] leading-[28px] font-bold">
                                Pro
                            </p>
                        </div>
                    </div>

                    <div>
                        <p class="text-[#00153B] text-[19px] leading-[24px] font-bold">
                        6 Month
                        </p>
                        <p class="text-[#00153B] text-[50px] leading-[63px] font-bold">
                        {6*price-1500} INR
                        </p>
                    </div>

                    <div>
                        <p class="text-[#717F87] text-[18px] leading-[28px] font-medium">
                         180 Credits + 20 Free Credits
                        </p>
                    </div>
                </div>

                <div class="pt-[25px] px-[25px] pb-[35px]">
                    <div>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Direct Phone Numbers
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Landline Phone Numbers
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Corporate email addresses
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Propsetcs
                        </p>
                        <p class="text-[#717F87] text-[14px] leading-[24px] font-medium">
                            Chrome Extension
                        </p>
                    </div>

                    <div class="mt-[25px]">
                        <button onClick={subscribe} name="6" class="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
   </div>
</div>
<Footer/>  
    </div>
  )
}

export default SubscribeMessPage;
