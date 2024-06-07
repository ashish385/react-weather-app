import { useState } from "react";
import "./App.css";
import { Box, Paper, Stack, Typography, styled } from "@mui/material";
import YourWeather from "./components/YourWeather";
import SearchWeather from "./components/SearchWeather";

const Component = styled(Paper)({
  textAlign: "center",
  minHeight: "100vh",
  width: "100%",
});

const TabButton = styled(Typography)({
  padding: "8px 16px", 
  fontWeight: "500", 
  color: "whitesmoke",
  letterSpacing:"0.75px"
});

function App() {
  const [currentTab, setCurrentTab] = useState(true);

  function yourWeather() {
    setCurrentTab(true);
  }
  function searchWeather() {
    setCurrentTab(false);
  }

  return (
    <Component className="App">
      <Box component="header" color={"#F9F7F7"} padding={"10px"}>
        <h1 className=" text-3xl md:text-4xl font-bold">Weather App</h1>
      </Box>
      <Stack
        direction={"row"}
        className=" items-center justify-around mt-3 w-full lg:w-11/12 lg:mx-auto"
      >
        <Box
          onClick={yourWeather}
          className={`${currentTab ? "current-tab" : "tab"}`}
        >
          <TabButton>My Weather</TabButton>
        </Box>
        <Box
          onClick={searchWeather}
          className={`${!currentTab ? "current-tab" : "tab"}`}
        >
          <TabButton >Search Weather</TabButton>
        </Box>
      </Stack>
      <Box className="mt-10">
        {currentTab ? <YourWeather />:
        <SearchWeather/>}
      </Box>

      <Box height={"60px"}></Box>
    </Component>
  );
}

export default App;
