
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import React from 'react'
import NorOffLogo from '../../Images/NorOffLogo.png'
import Image from 'next/image'
const page = () => {
  return (
    <div className='flex flex-col mt-[10rem] items-center justify-center'>
 
      <div className='container text-center md:w-[75%] mx-auto '>
        <h1 className='text-3xl md:text-5xl'>Om NorOff</h1>
        <p className='text-foreground-muted text-md md:text-xl '>Næringslivet skriker etter folk med digital kompetanse og kreativitet. Mange av dagens jobber vil forsvinne, og altfor få jobbsøkere har kunnskapen og ferdighetene som trengs i dag og i fremtiden. Kompetansegapet må tettes, og utdanning er nøkkelen til det.</p>
        <br />
        <small>Digital omstilling er noe som skjer hele tiden, og er en like naturlig del av arbeidslivet som lunsjpausen. Derfor trengs jevnlig faglig påfyll for å forbli relevant i jobben. Noroff har utdanningstilbud for alle, uansett hvor du er i livet og karrieren. Noroff er en del av løsningen.</small>
        
        <p className='mt-3 text-foreground-muted text-md md:text-xl'>Vi har studier som ikke bare er fremtidsrettede, men også praktiske og etterspurt av dagens arbeidsgivere. Våre studenter skal lære det som trengs nå. Derfor har vi tett dialog med næringslivet for å sikre at studiene våre er mest mulig relevante.</p>
      </div>

      <div className='mt-5'>
        <Link href="https://www.noroff.no/?gclid=CjwKCAjws9ipBhB1EiwAccEi1LfZSRSvo8itMfA-Xg9LiyaMu4cC9QUR28oDBnRbYjRjcynBKKJNpBoCGroQAvD_BwE" target="_blank"><Button className='hover:text-3xl transition-all hover:p-10 hover:scale-100' size={"lg"}>Les Mer
        <Image src={NorOffLogo} alt="Logo" width={30} height={30} className="dark:invert" />
        </Button></Link>
        </div>
    </div>
  )
}

export default page


