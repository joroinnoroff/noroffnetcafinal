"use client";
import Link from "next/link";
import React, {  useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {  LogOut, MenuIcon, User, X } from "lucide-react";
import { ModeToggle } from "@/components/ToggleButton";
 
import NorOffLogo from '../Images/NorOffLogo.png'


import LoginButton from "@/components/LoginButton";
 
import SignInButton from "@/components/SignInButton";
import { Button } from "@/components/ui/button";
 
import toast from "react-hot-toast";
const currentPath = window.location.pathname; 


const navLinks = [
  { title: "Om NorOff", href: "/pages/about" },
  { title: "Hvordan siden fungerer", href: "/pages/how-it-works" },
  { title: "Kontakt", href: "/pages/contact" },
];
const Navbar = () => {
  const [user, setUser] = useState(null); 

 
  useEffect(() => {
    const storedUser = localStorage.getItem('profile');

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user from local storage:', error);
      }
    }
  }, []);
  const hasStoredUser = true;
  const linkUrl = hasStoredUser ? '/post' : '/';
  const a = (userData) => {
    setUser(userData);  
    localStorage.setItem('profile', JSON.stringify(userData));
    localStorage.setItem('token', 'yourAuthTokenHere');
  };


  const handleLogout = () => {
     
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    setUser(null);  
    toast.success("Signed Out");
   
    window.location.href = '/';
  };


 

  
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className="fixed bg-white top-0 left-0 right-0 z-10 dark:bg-transparent   ">
      <nav className="flex justify-between items-center py-8 lg:py-4 px-2">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-5 h-5 bg-yellow-400 rounded-full p-10 flex" />
          <a href={linkUrl}>
          <span className="text-sm font-semibold tracking-widest uppercase flex items-center">
 
  <Image src={NorOffLogo} alt="Logo" width={50} height={50} className="absolute left-6 right-0 dark:invert" />
 </span>

          </a>

     
          <div className="flex place-items-end">   <ModeToggle  /></div>
        <div className="flex flex-row gap-2">
      
        {user ? (
              <>
                <div className="flex flex-col-reverse-end items-center text-sm">
                  <User />
                  {user.name}
                </div>
                <div>
                  <Button
                    size={"sm"}
                    className="text-muted-foreground"
                    onClick={handleLogout}
                    variant={"secondary"}
                    title="Sign Out"
                  >
                    <LogOut width={12} className="hover:w-20 transition-all"  />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex justify-between gap-1 items-center ">
                <LoginButton />
                <span className="text-muted-foreground text-sm">Or</span>
                <SignInButton  />
              </div>
            )}
        </div>

        </div>


        <div
          className="cursor-pointer text-md text-black pr-5 hover:text-zinc-500 transition-all dark:invert"
          onClick={toggleMenu}
        >
          
          
          <MenuIcon size={35} />
        </div>

        
      </nav>

      <AnimatePresence>
        
        {open && (
          
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed z-10 left-0 top-0 w-full h-screen origin-top bg-yellow-400 text-black p-10"
          >
            
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
              <Image src={NorOffLogo} alt="Logo" width={50} height={50} className="dark:invert" />
                <h1 className="text-lg text-black font-semibold uppercase">NorOff-Net</h1>
                <p
                  className="cursor-pointer text-md text-black mt-2"
                  onClick={toggleMenu}
                >
                  <X size={35} />
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center text-center items-center gap-4 "
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden" key={index}
                    onClick={toggleMenu}>
                      <MobileNavLink
                        key={index}
                        title={link.title}
                        href={link.href}
                   
                      />
                    </div>
                  );
                })}
              </motion.div>
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
   
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className={`text-5xl uppercase ${currentPath === navLinks.toString.title ? 'text-gray-700' : 'text-black'}`}
    >
      
      <Link className="" href={href}>{title}</Link>
    </motion.div>
  );
};
