 
"use client"
import { register } from '@/app/(auth)/(routes)/api/js/templates/register';
import { Button } from '@/components/ui/button';
import React from 'react'
import toast, { Toast } from 'react-hot-toast';
const RegisterPage = () => {
 
  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    const action = form.action;
    const method = form.method;

    try {
      await register(profile, action, method);
      // Registration was successful, show a toast and then redirect
      toast.success('User Registered', { appearance: 'success' });
      window.location.href = '/'; // Redirect to /post
    } catch (error) {
      // Handle registration failure, show an error toast or other UI feedback
      console.error(error);
      toast.error('Registration Failed', { appearance: 'error' });
    }
  };


 
  return (
    <div>

      <div className='flex items-center justify-center container mt-20'>
        <div className='flex items-center justify-center border my-10 p-10 mt-20 shadow-md'>
          <div className='flex flex-col items-center justify-center my-3 mt-10'>
      <h1 className='text-center font-semibold text-xl md:text-2xl'>RegisterPage</h1>
              <form 
                         onSubmit={handleRegisterFormSubmit}
              id='registerForm' method='post' action="/auth/register" className='flex flex-col'>

                <input type="text" name='name' placeholder='Name' required className='border m-3 p-2 w-[300px] md:w-[400px]' pattern='^[\w]+$' title='User name must only contain lowercase and uppercase letters, numbers and underscore...'/>
                <input type="email" name='email' placeholder='Email' required className='border m-3 p-2 w-[300px] md:w-[400px]' pattern='^[\w\-.]+@(stud\.)?noroff\.no$' title='Email must Be Noroff affiliated'/>
                <input type="password" name='password' placeholder='Password' required className='border m-3 p-2 w-[300px]md:w-[400px]' minLength={8}/>
                <input type="url" name='banner' placeholder='Banner' className='border m-3 p-2 w-[300px] md:w-[400px]'/>
                <input type="url" name='avatar' placaeholder='Avatar'  className='border m-3 p-2 w-[300px] md:w-[400px]'/>
              



            <Button title='Register' placeholder='Register' id='submit' type='submit' className='border hover:bg-black hover:text-white'>Register</Button>
              </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RegisterPage;
