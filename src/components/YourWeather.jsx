import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import { Box, Typography } from "@mui/material";
import locationImage from "../assets/location.png";
import ShowWeather from "./ShowWeather";
import axios from "axios";
import Error from "./Error";

const API_KEY = "ad5ffa54b5376b627bd76e98c8d5b375";

const YourWeather = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCoordinate, setUserCoordinate] = useState(null);
  const [renderWeatherInfo, setRenderWeatherInfo] = useState(null);

  const fetchUserWeatherInfo = async (coordinates) => {
    const { lat, lon } = coordinates;
    // make grantcontainer invisible
    // console.log("lat lon", lat, lon);
    setUserCoordinate(coordinates);
    //make loader visible
    setLoading(true);
    setError(false);

    //API CALL using axios
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      console.log("weather data", response);

      setLoading(false);
      setRenderWeatherInfo(response?.data);
    } catch (err) {
      console.log(err.message);
      console.log("api not calling");
      setLoading(false);
      // setError("Geolocation is not supported by this browser.");
      setError(true);
      //HW
    }
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      //HW - show an alert for no gelolocation support available
    }
  }

  function showPosition(position) {
    const userCoordinates = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    };

    console.log("user coordinate", userCoordinates);

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
  }


  useEffect(() => {
    const getfromSessionStorage = () => {
      const localCoordinates = JSON.parse(
        sessionStorage.getItem("user-coordinates")
      );
      if (localCoordinates) {
        //agar local coordinates nahi mile
        // grant access
        console.log("local", localCoordinates);
        setUserCoordinate(null);
        fetchUserWeatherInfo(localCoordinates);
      }
    };
    getfromSessionStorage();
  }, []);
  return (
    <>
      {error && <Error />}
      {loading ? (
        <Loading />
      ) : (
        <>
          {!userCoordinate && (
            <Box className="flex flex-col items-center text-gray-100 ">
              <img
                src={locationImage}
                className=" mb-[2rem]"
                width="80"
                height="80"
                loading="lazy"
                alt=""
              />
              <Typography
                variant="body1"
                gutterBottom
                fontWeight={400}
                letterSpacing={"0.75px"}
              >
                Grant Location Access
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                fontWeight={400}
                letterSpacing={"0.75px"}
                marginTop={"5px"}
              >
                Allow Access to get weather Information
              </Typography>
              <Typography
                onClick={getLocation}
                marginTop={"15px"}
                className="text-[0.85rem] uppercase bg-[#3F72AF] hover:bg-[#539bf3] cursor-pointer mb-2.5 px-[30px] py-2.5 rounded-[5px] "
              >
                Grant Access
              </Typography>
            </Box>
          )}

          {userCoordinate && <ShowWeather weatherInfo={renderWeatherInfo} />}
        </>
      )}
    </>
  );
};

export default YourWeather;
