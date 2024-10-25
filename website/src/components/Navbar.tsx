"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import { Search } from 'lucide-react';
import Input from '@/components/Search';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
=======
import Image from 'next/image';
>>>>>>> 1ee6f567ce23f72e63073fd6f244e11e49d59b33

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useUser();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    const handleResize = () => {
        if (window.innerWidth >= 800) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        console.log("User:", user);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };

    }, [user]);

    return (
        <nav className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-white shadow-md shadow-opacity-40 shadow-black' : 'bg-white'} transition duration-300`}>
            <div className="container mx-auto flex justify-between items-center px-2 md:px-10 py-2">
                <div className='flex justify-start items-center'>
                    <Link href="/" className="text-sm md:text-2xl font-bold text-redCustom duration-300 hover:text-orangeCustom flex">
                        <Image src="/logo.png" alt="AaharAlly" width={30} height={30} className='rounded-full' />
                        <span className="ml-2">AaharAlly</span>
                    </Link>
                </div>
<<<<<<< HEAD
                <div className="hidden lg:flex space-x-6 items-center">
                    {MenuLinks.map((link) => (
                        <Link key={link.id} href={link.link} className="text-slate-950 text-md md:text-lg duration-300 hover:text-redCustom font-semibold">
                            {link.name}
                        </Link>
                    ))}
                </div>
                {/* <div className="hidden lg:flex items-center px-2">
                    <Input />
                </div> */}
                {
                    user ? <UserButton /> : <SignInButton />
                }
                <div className="lg:hidden">
                    <button onClick={toggleMenu} className={`text-slate-950 focus:outline-none ${!isOpen ? 'block justify-between' : 'hidden'}`}>
=======

                {/* Search Bar */}
                <div className="flex justify-center min-w-[30px] md:min-w-[360px] lg:min-w-[30vw] min-h-10 !max-w-[180px] sm:!max-w-[300px] md:!max-w-[360px] lg:!max-w-[10vw]">
                    <div className="flex bg-peachCustom py-1.5 px-2 rounded-l-lg items-center gap-1.5 min-w-[40px]">
>>>>>>> 1ee6f567ce23f72e63073fd6f244e11e49d59b33
                        <svg
                            className="text-redCustom min-w-[20px] min-h-[20px] fill-redCustom"
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                        <input
                            type="text"
                            className="outline-none bg-transparent text-black placeholder:text-xs sm:placeholder:text-sm"
                            placeholder="."
                        />
                    </div>
                    <button
                        className="bg-redCustom px-4 text-sm md:text-base font-semibold text-white rounded-r-lg shadow-md"
                        type="submit"
                    >
<<<<<<< HEAD
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="flex flex-col justify-items-start items-center mt-10">
                    {MenuLinks.map((link) => (
                        <Link
                            key={link.id}
                            href={link.link}
                            className="text-slate-950 text-lg sm:text-2xl duration-300 hover:bg-slate-100 p-2 rounded"
                            onClick={toggleMenu}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {
                        user ? <UserButton /> : <SignInButton />
                    }
=======
                        Search
                    </button>
>>>>>>> 1ee6f567ce23f72e63073fd6f244e11e49d59b33
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
