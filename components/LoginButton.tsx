"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const SignInButton = () => {
  const router = useRouter();
 

  const onSignIn = () => {
    router.push('/profile/login'); 
  };
  

  return (
    <div>
      <Button onClick={onSignIn} className='hover:bg-black hover:text-white'>Login</Button>
    </div>
  )
}

export default SignInButton
