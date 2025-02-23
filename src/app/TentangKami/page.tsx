'use client'
import { useState, useEffect } from "react";
import { RevealBento } from '@/app/components/bento';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import obj1 from "@/../public/obj1.webp";
import obj2 from "@/../public/obj2.webp";
import obj3 from "@/../public/obj3.webp";
import obj4 from "@/../public/obj4.webp";
import obj6 from "@/../public/obj6.webp";

import img1 from "@/../public/testimoni/IMG_1.webp"
import img2 from "@/../public/testimoni/IMG_2.webp"
import img3 from "@/../public/testimoni/IMG_3.webp";
import img4 from "@/../public/testimoni/IMG_4.webp";
import img5 from "@/../public/testimoni/IMG_5.webp";
import img6 from "@/../public/testimoni/IMG_6.webp";
import img7 from "@/../public/testimoni/IMG_7.webp";
import img8 from "@/../public/testimoni/IMG_8.webp";
import img9 from "@/../public/testimoni/IMG_9.webp";
import img10 from "@/../public/testimoni/IMG_10.webp";
import img11 from "@/../public/testimoni/IMG_11.webp";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

function AboutUS() {

    const { ref: refAbout, inView: inViewHeader } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: refTesti, inView: inViewTesti } = useInView({ threshold: 0.3, triggerOnce: true });
    const { ref: refSlider, inView: inViewSlider } = useInView({ threshold: 0.1, triggerOnce: true });

    const { ref: refHeadLocation, inView: inViewHeadLocation } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: refloc, inView: inViewloc } = useInView({ threshold: 0.3, triggerOnce: true });

    useEffect(() => {
        const container = document.querySelector(".hook_aboutUs");
        const obj = document.querySelectorAll(".obj_container");

        if (container) {
            const handleMouseMove = (e: MouseEvent) => {
                obj.forEach((item ) => {
                    const speed = parseFloat(item.getAttribute("data-speed") || "0");
                    const x = (window.innerWidth - e.pageX * speed) / 75;
                    const y = (window.innerHeight - e.pageY * speed) / 75;
                    const itemElement = item as HTMLElement;
                    itemElement.style.transform = `translate(${-x}px, ${-y}px)`;
                });
            };

            container.addEventListener("mousemove", handleMouseMove as EventListener);

            // Cleanup listener saat komponen unmount
            return () => {
                container.removeEventListener("mousemove", handleMouseMove as EventListener);
            };
        }
    }, []);

    // about animation
    const [mainImage, setMainImage] = useState({
        src: img1,
        width: 600,
        height: 600
    });

    const [smallImages, setSmallImages] = useState([
        {
            src: img2,
            width: 300,
            height: 300
        },        
        {
            src: img3,
            width: 300,
            height: 300
        },        
        {
            src: img4,
            width: 300,
            height: 300
        },
        {
            src: img5,
            width: 300,
            height: 300
        },
        {
            src: img6,
            width: 300,
            height: 300
        },
        {
            src: img7,
            width: 300,
            height: 300
        },
        {
            src: img8,
            width: 300,
            height: 300
        },
        {
            src: img9,
            width: 300,
            height: 300
        },
        {
            src: img10,
            width: 300,
            height: 300
        },
        {
            src: img11,
            width: 300,
            height: 300
        },
    ]);

    const handleImageClick = (smallImage: { src: StaticImageData; width: number; height: number }) => {
        setMainImage({
            src: smallImage.src, 
            width: smallImage.width,
            height: smallImage.height
        });

        setSmallImages((prevImages) =>
            prevImages.map((image) => 
                image.src === smallImage.src ? { ...image, isActive: true } : { ...image, isActive: false }
            )
        );
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 640 ? 3 : 4);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleNext = () => {
        if (currentIndex + itemsPerPage < smallImages.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="w-screen h-fit flex flex-col justify-center items-center overflow-hidden">

            <div className="hook_aboutUs w-screen h-screen md:h-[115vw] lg:h-[100vw] xl:h-screen 2xl:h-[78vh] lg:pt-24 flex flex-col justify-center lg:justify-start items-center relative  ">
                <h3 className="text-[#3b1918] font-light text-center text-sm lg:pt-24 ">Tentang kami</h3>
                <h1 className="text-[#3b1918] font-bold text-center text-[8vw] sm:text-[5.9vw] lg:text-7xl min-w-[40%] sm:max-w-[60%] xl:max-w-[60%] 2xl:max-w-[40%] ">Kami menghadirkan umroh yang lebih bermakna.</h1>

                <div className=' absolute w-[1500px] lg:w-[1200px] xl:w-[1500px] h-[700px] '>
 
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        data-speed="5"
                        className="obj_container bg-[#C08261] size-[180px] sm:size-[205px] absolute rounded-3xl bottom-20 left-[500px] sm:-bottom-14 sm:left-[500px]  xl:bottom-20  2xl:bottom-28  flex items-center justify-center">

                        <Image className='all_object w-[150px]' src={obj1} alt="sticker 1" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        data-speed="3"
                        className="obj_container bg-[#9A3B3B] size-[135px] absolute rounded-3xl bottom-7 right-[500px] lg:bottom-40 lg:right-[200px] flex items-center justify-center">
                        <Image className='all_object w-[100px]' src={obj2} alt="sticker 1" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        data-speed="2"
                        className="obj_container bg-[#bd827d] size-[195px] absolute rounded-3xl  bottom-[460px] right-[430px] sm:right-[340px]  lg:bottom-[460px] lg:right-16 flex items-center justify-center">
                        <Image className='all_object w-[170px]' src={obj3} alt="sticker 1" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        data-speed="2.5"
                        className="obj_container bg-[#00755f] size-[135px] absolute rounded-3xl bottom-[450px] left-[480px] sm:left-[350px]  lg:bottom-[250px] lg:left-[80px] flex items-center justify-center">
                        <Image className='all_object w-[70px] ' src={obj4} alt="sticker 1" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                        data-speed="4"
                        className="obj_container bg-[#bc4d44] size-[80px] sm:size-[115px] absolute rounded-3xl top-10 sm:-top-16 left-[700px] lg:top-8 lg:left-[180px] flex items-center justify-center">
                        <Image className='all_object w-[60px] sm:w-[90px]' src={obj6} alt="sticker 1" />
                    </motion.div>

                </div>

            </div>

            <div className="bento mt-32 md:mt-0 xl:mt-48 2xl:mt-20">
                <RevealBento />
            </div>

            <div
                className="testimoni w-screen h-fit my-52 flex flex-col items-center gap-10 justify-center ">
                <motion.div
                    ref={refAbout}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: inViewHeader ? 1 : 0, scale: inViewHeader ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-[#672222] select-none text-center text-[10vw] sm:text-7xl font-bold leading-none">
                    Testimoni <br className="md:hidden" /> Umroh
                </motion.div>

                {/* Gambar besar */}
                <motion.div
                    ref={refTesti}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: inViewTesti ? 1 : 0, scale: inViewTesti ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                    id="container_Testimoni"
                    className="bg-[#542116] h-[500px] w-full max-w-[90%] md:max-w-[630px] flex justify-center items-center rounded-md p-4">
                    <Image
                        className="w-full h-full object-cover object-bottom "
                        src={mainImage.src}
                        width={mainImage.width}
                        height={mainImage.height}
                        alt="Gambar Utama"
                    />
                </motion.div>

                {/* Gambar kecil */}
                <div className="flex justify-center items-center gap-1 md:gap-5 h-fit">
                    <div
                        className={`h-[100px] w-8 md:h-[135px] md:w-10 bg-[#542116] flex items-center justify-center cursor-pointer ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        onClick={handlePrev}
                    >
                        <GrFormPrevious className="size-8 md:size-10 font-black text-[#ece1b5]" />
                    </div>

                    {/* Container Gambar */}
                    <motion.div
                        ref={refSlider}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: inViewSlider ? 1 : 0, scale: inViewSlider ? 1 : 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden w-[332px] md:w-[600px] flex justify-center-">
                        <div
                            className="flex gap-4 transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                                width: `${(smallImages.length / itemsPerPage) * 100 + ((itemsPerPage - 1) * 16)}%`,
                            }}
                        >
                            {smallImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="flex-none size-[100px] md:size-[135px] bg-red-400 cursor-pointer"
                                    onClick={() => handleImageClick(image)}
                                >
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={image.src}
                                        width={image.width}
                                        height={image.height}
                                        alt={`Small Image ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Tombol Selanjutnya */}
                    <div
                        className={`h-[100px] w-8 md:h-[135px] md:w-10 bg-[#542116] flex items-center justify-center cursor-pointer ${currentIndex + itemsPerPage >= smallImages.length
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                            }`}
                        onClick={handleNext}
                    >
                        <GrFormNext className=" size-8 md:size-10 font-black text-[#ece1b5]" />
                    </div>
                </div>
            </div>


            <div className="location pt-3 mb-20 w-screen">

                <motion.h1
                    ref={refHeadLocation}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: inViewHeadLocation ? 1 : 0, scale: inViewHeadLocation ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-[#672222] select-none font-bold text-center text-[10vw] md:text-7xl mb-7 ">Alamat kami</motion.h1>

                <motion.div
                    ref={refloc}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: inViewloc ? 1 : 0, scale: inViewloc ? 1 : 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#542116] w-[80%] h-auto flex justify-center items-center rounded-lg p-4 mx-auto">
                    <iframe
                        className="w-full min-h-[400px] max-h-[500px] border-2 border-black"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.9158082507693!2d106.72240127280858!3d-6.274800161419958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f10eb67b438f%3A0xd469ae800e0cb9c5!2sMusyaffa%20Tours%20(PT%20Musyaffa%20Cahaya%20Hati)!5e0!3m2!1sen!2sid!4v1737112712345!5m2!1sen!2sid"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </motion.div>

                <h2 className=" text-[#672222] w-[80%] font-light text-center mx-auto text-[3vw] md:text-xl my-3">Ruko Sentra Menteng Blok MN No. 23 Bintaro Sektor 7, Jl. Dr. Samratulangi 13, Pd. Jaya, <br />Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15220</h2>
            </div>

        </div>
    );
}

export default AboutUS