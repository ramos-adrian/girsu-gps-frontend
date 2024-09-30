import React from 'react';
import Image from 'next/image';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';
import {facebookLink, instagramLink, websiteLink, twitterLink, youtubeLink} from "@/app/config";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#647197] text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-8">
                {/* Left side image */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                    <Image src="/Logo_SMT_neg_1.png" alt="Logo" width={245} height={0} style={{height: 'auto'}}/>
                </div>

                {/* Right side text */}
                <div className="text-xs md:text-base text-center flex flex-col md:flex-col md:text-right font-normal md:font-semibold leading-loose">
                    <div className="mb-2 flex flex-row space-x-3 justify-evenly md:justify-end items-center">
                        <div>Seguinos en</div>
                        <a href={facebookLink}><FontAwesomeIcon icon={faFacebook} height="1.2em"/></a>
                        <a href={instagramLink}><FontAwesomeIcon icon={faInstagram} height="1.2em"/></a>
                        <a href={twitterLink}><FontAwesomeIcon icon={faTwitter} height="1.2em"/></a>
                        <a href={youtubeLink}><FontAwesomeIcon icon={faYoutube} height="1.2em"/></a>
                        <a href={websiteLink}>
                            <Image src="/logoMuni-sm.png" alt="Logo Muni" width={22} height={22} />
                        </a>
                    </div>
                    <p>Municipalidad de San Miguel de Tucumán</p>
                    <p>9 de Julio 598, Tucumán. República Argentina</p>
                    <p>Municipalidad: 0381-4516500</p>
                    <p>Asistencia Pública: 107</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;