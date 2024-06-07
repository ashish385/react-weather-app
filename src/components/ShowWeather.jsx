import { Box, Stack, styled } from "@mui/material";
import React from "react";
import Wind from "../assets/wind.png";
import Humidity from "../assets/humidity.png";
import Cloud from "../assets/cloud.png";
import WeatherParameter from "./WeatherParameter";

const ParameterContainer = styled(Box)({
  width: "90%",
  gap: "10px 20px",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "2rem",
});


const ShowWeather = ({ weatherInfo }) => {
  let weatherInCelisus = weatherInfo?.main?.temp<100?weatherInfo?.main?.temp: weatherInfo?.main?.temp - 273.13;
  let temp = parseFloat(weatherInCelisus.toFixed(1));
  return (
    <>
      <Stack direction={"column"} alignItems={"center"} color={"white"}>
        {/* city name and flag code  */}
        <Box className="flex items-center  justify-center gap-[0_0.5rem] mb-4">
          <p className="text-3xl  text-white font-[400]">
            {" "}
            {weatherInfo?.name}
          </p>
          <img
            src={`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`}
            className="w-[30px] h-[30px] object-contain mt-2 "
            alt=""
          />
        </Box>
        {/* weather description */}
        <p className="text-2xl font-[400]">
          {weatherInfo?.weather?.[0]?.description}
        </p>

        {/* weather icon */}
        <img
          src={`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`}
          alt=""
          width={"90px"}
          height={"90px"}
        />

        {/* temperature  */}
        <p className=" text-xl lg:text-3xl font-[400]">{`${temp} °C `}.</p>

        <ParameterContainer className=" flex flex-col md:flex-row">
          <WeatherParameter
            name="windspeed"
            image={Wind}
            data={`${weatherInfo?.wind?.speed} m/s`}
          />
          <WeatherParameter
            name="Humidity"
            image={Humidity}
            data={`${weatherInfo?.main?.humidity}%`}
          />
                  <WeatherParameter
                      name="clouds"
            image={Cloud}
            data={`${weatherInfo?.clouds?.all}%`}
          />
        </ParameterContainer>
      </Stack>
    </>
  );
};

export default ShowWeather;
