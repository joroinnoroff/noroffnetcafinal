import React from 'react'

import Lottie from "lottie-react";
import NoImageAnimation from "../app/Images/Animations/NoImage.json";



const NoImage = () => {
  return (
    <div>
     <Lottie animationData={NoImageAnimation}/>
    </div>
  )
}

export default NoImage
