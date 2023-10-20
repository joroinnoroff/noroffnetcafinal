"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const SignInButton = () => {
  const router = useRouter();
 

  const onRegister = () => {
    router.push('/profile/register'); 
  };

  return (
    <div>
      <Button size={"sm"} className="hover:text-2xl transition-all text-xs" variant={"secondary"} onClick={onRegister}>Register</Button>
    </div>
  )
}

export default SignInButton
