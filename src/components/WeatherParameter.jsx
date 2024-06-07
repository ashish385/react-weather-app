import { Card, Typography, styled } from '@mui/material';
import React from 'react'

const Parameter = styled(Card)({
  display: "flex",
  backgroundColor: "rgba(219, 226, 239, 0.5)",
  borderRadius: "5px",
  padding: "1rem",
  flexDirection: "column",
  gap: "5px 0",
  justifyContent: "center",
  alignContent: "center",
  color: "#312e2e",
});

const WeatherParameter = ({name, image, data}) => {
  return (
    <Parameter className=' w-[60%] lg:w-[20%] mx-auto items-center '>
      <img
        src={image}
        width={"50px"}
        height={"50px"}
        className=" object-contain"
        alt=""
      />
          <Typography className="text-[1.15rem] font-semibold uppercase">{ name}</Typography>
      <Typography>{data}</Typography>
    </Parameter>
  );
}

export default WeatherParameter