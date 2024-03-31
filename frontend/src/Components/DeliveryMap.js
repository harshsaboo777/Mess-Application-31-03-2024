import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";


const containerStyle = {
  width: '100%',
  height: '800px'
};

const center = {
  lat: 22.710,
  lng: 75.8577
};

const DeliveryMap = () => {
  const [waypoints, setWaypoints] = useState([]);
  const [response, setResponse] = useState(null);
  const [routeFetched, setRouteFetched] = useState(false);
  const [Mess_id, update_Mess_id] = useState(null);
  const [mess_users, update_mess_users] = useState([]);
  const [showRoute, setShowRoute] = useState(false);
  const cookies = new Cookies();
  let deliver_id = cookies.get("User").User_id;
  

  const fetch_mess_id = async () => {
    await 
    axios
      .post("http://localhost:5000/Delivery_boy/fetch_mess_id/",
      {
        "deliver_id":deliver_id
      })
      .then((res) => {
        update_Mess_id({
          id: res.data.mess_id,
          location: {
            lat: parseFloat(res.data.lat),
            lng: parseFloat(res.data.log)
          }
        });
      });
  };

  const fetch_mess_users = async () => {
    await 
    axios
      .post("http://localhost:5000/Delivery_boy/fetch_mess_users/",
      {
        "Mess_id":Mess_id.id
      })
      .then((res) => {
        update_mess_users(res.data)
      });
  };


  useEffect(() => {
    fetch_mess_id();
  }, []);

  useEffect(() => {
    if (Mess_id) {
      fetch_mess_users();
    }
  }, [Mess_id]);

  useEffect(() => {
    setWaypoints(mess_users.map(user => ({ location: { lat: parseFloat(user.lat), lng: parseFloat(user.log) }, stopover: false })));
  }, [mess_users]);

  useEffect(() => {
    setWaypoints();
  }, []);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setResponse(response);
        setRouteFetched(true);
      } else {
        console.log('response: ', response)
      }
    }
  }

  const handleOnClick = () => {
    if (!routeFetched) {
      setRouteFetched(true);
    }
  }

  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13.5}
      >
        {
          routeFetched && (
            <DirectionsService
              options={{
                destination: center,
                origin: center,
                travelMode: 'DRIVING',
                waypoints: waypoints
              }}
              callback={directionsCallback}
            />
          )
        }

        {
          response !== null && (
            <DirectionsRenderer
              options={{
                directions: response
              }}
            />
          )
        }
      </GoogleMap>
      <button onClick={handleOnClick}>Show Route</button>
    </LoadScript>
  )
}

export default DeliveryMap;