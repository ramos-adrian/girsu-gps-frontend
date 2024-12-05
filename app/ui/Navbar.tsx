'use client';

import {useState} from 'react';
import Link from 'next/link';
import Image from "next/image";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <header>
            <nav className="container mx-auto w-screen py-6 px-8 flex items-center space-x-8 justify-between">

                {/* Logo */}
                <div className="w-auto">
                    <Link href="/">
                        <Image src="/Logo_SMT_pos_1.png" alt="Logo" width={245} height={26}/>
                    </Link>
                </div>

                {/* Links */}
                {/* TODO Highlight active link */}
                <div className="hidden md:flex w-full justify-evenly">
                    <Link href="/">
                        <div className="text-gray-400 hover:text-yellow-300">MAPA</div>
                    </Link>
                    <Link href="/horarios">
                        <div className="text-gray-400 hover:text-yellow-300">HORARIOS</div>
                    </Link>
                    <Link href="/alertas">
                        <div className="text-gray-400 hover:text-yellow-300">RECIBIR ALERTAS</div>
                    </Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-blue-500 focus:outline-none inset-0 right-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}></path>
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-gray-700">
                    <Link href="/">
                        <div className="block px-4 py-2 text-gray-300 hover:bg-gray-600">Mapa</div>
                    </Link>
                    <Link href="/horarios">
                        <div className="block px-4 py-2 text-gray-300 hover:bg-gray-600">Horarios</div>
                    </Link>
                    <Link href="/alertas">
                        <div className="block px-4 py-2 text-gray-300 hover:bg-gray-600">Recibir alertas</div>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
