import './globals.css'
 
import Navbar from './Header/Navbar'

 
import { ThemeProvider } from '@/components/theme-provider'
import { ToasterProvider } from '@/components/ui/toast-provider'
import Footer from '@/components/Footer'
import Head from 'next/head'
 


export const metadata = {
  title: 'NorOff-NET ',
  description: 'Generated by create next app',
  icons: {
    icon: '/Images/NorOffLogo.png',
 
  },
 
}
interface RootLayoutProps {
  children: React.ReactNode; 
}


export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning
    >
         <Head>
         <link rel="icons" href="/Images/NorOffLogo.png" />
 
        </Head>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <ToasterProvider />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}