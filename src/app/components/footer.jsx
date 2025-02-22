"use client";

import footer from '@/../public/footer.webp';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaTiktok } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image from "next/image";

function Footer() {
    const { ref, inView } = useInView({ threshold: 0.1 });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
            transition={{ duration: 0.1 }}
            className="w-screen min-h-min relative mt-28 overflow-hidden  ">
            <Image
                src={footer}
                alt='footer_image'
                width={800}
                height={600}
                className="w-full z-50"
                loading="lazy"
            />
            <div className="absolute left-1/2 bottom-4 sm:bottom-12 md:bottom-20 transform -translate-x-1/2 w-fit h-fit flex flex-col justify-center items-center gap-1 md:gap-5">
                <div>
                    <div className="h-fit flex justify-center items-center gap-1 sm:gap-3 md:gap-5">
                        <a href="https://www.instagram.com/musyaffatours/?hl=en" target="_blank" rel="noopener noreferrer">
                            <div className="flex justify-center items-center p-1 sm:p-2 rounded-full bg-gray-600 hover:bg-[#bc4d44] hover:scale-110 transition-all duration-300 group">
                                <FaInstagram className="size-2 sm:size-3 md:size-7 group-hover:text-white transition-all duration-300" />
                            </div>
                        </a>
                        <a href="#" onClick={() => window.open("https://api.whatsapp.com/send/?phone=6285281570559&text=Asallamualaikum+bapak%2Fibu%2C+terima+kasih+sudah+menghubungi+kami.+&type=phone_number&app_absent=0", "_blank")}>
                            <div className="flex justify-center items-center p-1 sm:p-2 rounded-full bg-gray-600 hover:bg-[#5e8f3b] hover:scale-110 transition-all duration-300 group">
                                <FaWhatsapp className="size-2 sm:size-3 md:size-7 group-hover:text-white transition-all duration-300" />
                            </div>
                        </a>
                        <div className="flex justify-center items-center p-1 sm:p-2 rounded-full bg-gray-600 hover:bg-[#2c666b] hover:scale-110 transition-all duration-300 group">
                            <MdOutlineEmail className="size-2 sm:size-3 md:size-7 group-hover:text-white transition-all duration-300" />
                        </div>
                        <a href="https://www.tiktok.com/@musyaffa.tours?_t=ZS-8taB8HoFhQI&_r=1" target="_blank" rel="noopener noreferrer">
                            <div className="flex justify-center items-center p-1 sm:p-2 rounded-full bg-gray-600 hover:bg-[#262626] hover:scale-110 transition-all duration-300 group">
                                <FaTiktok className="size-2 sm:size-3 md:size-7 group-hover:text-white transition-all duration-300" />
                            </div>
                        </a>
                    </div>
                </div>
                <h3 className="text-gray-600 text-[10px] sm:text-md md:text-xl bottom-20 ">© 2025 Musyaffa tour </h3>
            </div>
        </motion.section>
    )
}

export default Footer