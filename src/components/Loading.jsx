import React from 'react'
import Loader from "../assets/loading.gif"
import { Box, Typography } from '@mui/material'




const Loading = () => {
  return (
    <Box className="flex flex-col items-center ">
      <img src={Loader} alt="" width="200" height="200" />
      <Typography className=' text-xl text-center leading-3 text-gray-200'>Loading....</Typography>
    </Box>
  );
}

export default Loading