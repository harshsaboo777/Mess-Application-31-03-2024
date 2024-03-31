import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { LocationMarkerIcon } from '@heroicons/react/outline';

const ProfileMess = () => {
  const cookies = new Cookies();
  const User = cookies.get('User');
  const [profile, setProfile] = useState({});
  const [menu, setMenu] = useState('');
  const [newMenu, setNewMenu] = useState('');

  const fetchProfile = async () => {
    try {
      const res = await axios.post('http://localhost:5000/Customer/fetch_profile', {
        User_id: User.User_id,
      });
      setProfile(res.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await axios.post('http://localhost:5000/Mess_owner/fetch_menu', {
        User_id: User.User_id,
      });
      setMenu(res.data.tiffin_details);
    } catch (error) {
      console.error('Error fetching menu:', error);
    }
  };

  const updateAddress = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const formattedLatitude = latitude.toPrecision(6);
        const formattedLongitude = longitude.toPrecision(6);
        // Update address logic here
        alert('Address updated successfully!');
      },
      (error) => {
        console.error('Error getting coordinates:', error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const updateMenu = async () => {
    try {
      const res = await axios.post('http://localhost:5000/Mess_owner/update_menu', {
        User_id: User.User_id,
        newMenu: newMenu,
      });
      setMenu(res.data.tiffin_details);
      alert('Menu updated successfully!');
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchMenu();
  }, []);

  return (
    <div className="bg-cyan-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-cyan-50 shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <img
              src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
              alt="Profile Picture"
              className="h-24 w-24 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{profile.fname}</h2>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            
          </div>
          <div className='flex items-center justify-center'><button className=""
              onClick={updateAddress}
              class="bg-green-400 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600 flex items-center justify-center"
            >
              <LocationMarkerIcon className="h-6 w-6 mr-2 text-red-500" />
              Get Current Location
            </button></div>
          
          <div className="mb-6 text-center">
            
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <p className="text-gray-600">Contact: {profile.phone_num}</p>
            <p className="text-gray-600">Address: {profile.user_address}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mess Menu</h3>
            <p className="text-gray-600">{menu}</p>
            <input
              type="text"
              value={newMenu}
              onChange={(e) => setNewMenu(e.target.value)}
              placeholder="Enter new menu details"
              className="w-full py-2 px-4 rounded-md border border-cyan-300 mt-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={updateMenu}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-blue-600"
            >
              Update Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMess;
