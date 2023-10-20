import { Heart } from 'lucide-react'
import React from 'react'

const HowWorks = () => {
  return (
    <div className='flex flex-col mt-[10rem] items-center justify-center'>
    <div className='container text-center md:w-[75%] mx-auto '>
      <h1 className='text-3xl md:text-5xl'>Sosial Media Platform </h1>
      <p className='text-foreground-muted text-md md:text-xl '>Ønsker du deg Studie gruppe, planlegge aktiviteter utenfor skole, dele tanker rundt å gå på noroff eller bare ventilere?</p>
      <br />
      <small>Her på NorOff-NET har du muligheten til akkurat dette! her kan du legge ut poster som du vil om emner og aktiviter akkurat som du vil.</small>
   
      <p className='mt-3 text-foreground-muted text-sm md:text-xl flex flex-col items-center'>   <Heart />NorOFF-NET er en trygg sosial media nettside, hvor vi har omtanke for hverandre og andres tanker. Vi tolerer ikke hatfulle ytringer, rasisme eller hetsing. 
      </p>
      <small>Poster som ikke er hyggelig blir fjernet.</small>
    </div>

 
  </div>
  )
}

export default HowWorks