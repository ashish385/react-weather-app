import React from 'react'
import error from "../assets/error 404.png";

const Error = () => {
  return (
    <div className=" w-11/12 mx-auto flex  justify-center">
            <img src={error} alt="" width="350px" height="200px" />
            
        </div>
  )
}

export default Error