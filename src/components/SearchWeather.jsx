import React, { useState } from "react";
import search from "../assets/search.png";
import axios from "axios";
import ShowWeather from "./ShowWeather";
import Loading from "./Loading";
import { Avatar, Button, Stack, TextField, Alert, Box } from "@mui/material";

const API_KEY = "ad5ffa54b5376b627bd76e98c8d5b375";

const SearchWeather = () => {
  const [inputError, setInputError] = useState(false);
  const [error, setError] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const value = e.target.value;
    setSearchText(value);
    setInputError(false);
    setError(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchText);
    setError(false);
    let city = searchText;
    if (!searchText) {
      setInputError(true);
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      console.log("city ", response);
      setWeatherInfo(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setWeatherInfo(null);
    }
  };
  return (
    <>
      <Stack className=" absolute top-0 left-[50%] translate-x-[-50%]">
        {inputError && (
          <Alert variant="filled" severity="error">
            Please provide city name..
          </Alert>
        )}
      </Stack>
      <Box className={"w-full lg:w-[50%]"} margin={"auto"}>
        <form
          onSubmit={handleSubmit}
          className="flex w-[60%] mx-auto justify-center items-center gapx-[10px] mb-12"
        >
          <TextField
            id="outlined-search"
            type="search"
            size="small"
            fullWidth
            placeholder="Search for City..."
            // className="w-[calc(100%_-_80px)]  bg-[rgba(219,226,239,0.5)] px-5 py-0 rounded-[10px] text-[rgba(255,255,255,0.7)] focus:outline-none focus:border-2 focus:border-[rgba(255, 255, 255, 0.7)]"
            onChange={handleChange}
            sx={{
              backgroundColor: "rgba(219,226,239,0.5)",
              color: "white",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "rgba(219,226,239,0.66)",
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              width: 40,
              height: 40,
              minWidth: 40,
              padding: 0,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt="Search Icon"
              src={search}
              sx={{ width: 24, height: 24 }}
            />
          </Button>
        </form>

        {loading && <Loading />}
      </Box>
      {!loading && !error && weatherInfo && (
        <ShowWeather weatherInfo={weatherInfo} />
      )}
      <Stack className=" absolute  top-0 left-[50%] translate-x-[-50%]">
        {error && (
          <Alert variant="filled" severity="error">
            City not Found!
          </Alert>
        )}
      </Stack>
    </>
  );
};

export default SearchWeather;
