"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 ${isScrolled ? 'bg-white shadow-md shadow-opacity-40 shadow-black' : 'bg-white'} transition duration-300`}>
            <div className="container mx-auto flex justify-between items-center px-2 md:px-10 py-2">
                <div className='flex justify-start items-center'>
                    <Link href="/" className="text-sm md:text-2xl font-bold text-redCustom duration-300 hover:text-orangeCustom flex">
                        <Image src="/logo.png" alt="AaharAlly" width={30} height={30} className='rounded-full' />
                        <span className="ml-2">AaharAlly</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex justify-center min-w-[30px] md:min-w-[360px] lg:min-w-[30vw] min-h-10 !max-w-[180px] sm:!max-w-[300px] md:!max-w-[360px] lg:!max-w-[10vw]">
                    <div className="flex bg-peachCustom py-1.5 px-2 rounded-l-lg items-center gap-1.5 min-w-[40px]">
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
                        Search
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
