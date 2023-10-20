"use client"
import React, { useState } from 'react';

import Image from 'next/image';
import NorOffLogo from '../../Images/NorOffLogo.png';
 
import LoginButton from '@/components/LoginButton';
import SignInButton from '@/components/SignInButton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { setLoginFormListener} from '../../(auth)/(routes)/api/handlers/index'
import { redirect, useRouter } from 'next/navigation';
import { login } from '@/app/(auth)/login';
import { save } from '@/app/(auth)/(routes)/api/storage';
 

const LoginPage = () => {
const SignIn= async (event) => {
  event.preventDefault();
  const form = event?.target;
  const formData = new FormData(form);
  formData.get("email")
  formData.get("password")

  const profile = {
    
    email: formData.get("email"),
    password: formData.get("password")
  }

  await login(profile);

  router.push('/post');
  

}


  
  
 

  const router = useRouter();

 


  return (
    <div className='mt-[10rem] flex items-center justify-center border my-10 p-10 shadow-md'>
     <div className='flex items-center justify-center align-center mx-auto flex-col text-center'>

      <div className='bg-yellow-500 mb-10 rounded-md p-2'>
          <Image src={NorOffLogo} width={300} height={300} alt="logo"/>
        </div>
        <h1 className='font-semibold mb-2'>Sign in to your account</h1>
      <div className='h-full w-full'>
      <form
  onSubmit={SignIn}
  id='loginForm'
  method='post'
  action="/auth/login"
  className='flex flex-col'
>

 
              <input type="email" name='email' placeholder='Email' required className='border m-3 p-2' pattern='^[\w\-.]+@(stud\.)?noroff\.no$' title='Email must Be Noroff affiliated'/>
              <input type="password" name='password' placeholder='Password' required className='border m-3 p-2' minLength={8}/>

      


              <Button
  title="Login"
  placeholder="Login"
  id="submit"
  type="submit"
  className="border hover:bg-black hover:text-white"
  
>
  Login
</Button>


 


              <p className="mb-0 mt-5 pt-1 text-sm font-semibold">
              Dont have an account?</p>

        <SignInButton />

         
              </form>
     
      </div>
      </div>
    </div>
  )
}

export default LoginPage
