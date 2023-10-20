import React from 'react'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
const ContactPage = () => {
  return (
    <div className='flex flex-col mt-[10rem] items-center justify-center'>
      
    <div className='container md:w-[75%] mx-auto '>
      <h1 className='text-3xl md:text-5xl text-center'>Send oss en Melding</h1>

      <form action="" className='flex items-center flex-col justify-center mt-5'>
      <div className='flex flex-col'>
        <label htmlFor="">Ditt Navn</label>
        <input type="text" name='name' placeholder='Name' required className='border m-3 p-2 w-[330px] md:w-[400px]' pattern='^[\w]+$' title='User name must only contain lowercase and uppercase letters, numbers and underscore...'/>
      </div>
                <div className='flex flex-col '>
                  <label htmlFor="">Din Epost</label>
                  <input type="email" name='email' placeholder='Email' required className='border m-3 p-2 w-[330px] md:w-[400px]' pattern='^[\w\-.]+@(stud\.)?noroff\.no$' title='Email must Be Noroff affiliated'/>
                  </div>

           <textarea name="" id="" cols="10" rows="5" className='resize-none w-full md:w-[400px] p-2 rounded-sm'
           placeholder='Skriv meldingen her...'>

           </textarea>

      </form>

    </div>

    <div className='mt-5'>
      <Button className='' size={"lg"}>Send <Send /></Button>
      </div>
  </div>
  )
}

export default ContactPage