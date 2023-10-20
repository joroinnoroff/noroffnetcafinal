

 
 
import Image from 'next/image'
 
import React from 'react';
 
import NorOffLogo from './Images/NorOffLogo.png'
const HomePage = async () => {
 
  return (
    <div className='flex items-center justify-center flex-col mt-20'>
      <h1 className='text-[22px] md:text-[32px] mt-20'>Velkommen til NOROFF-NET</h1>
            <h1 className='font-semibold text-muted-foreground text-md md:text-xl mb-10 text-center'>Deltag og skap nettverket ditt med andre studenter</h1>
   
        <div className='bg-yellow-500 mt-10 rounded-md p-2'>
          <Image src={NorOffLogo} width={500} height={500} alt="logo"/>
        </div>
    </div>
  )
};

export default HomePage;