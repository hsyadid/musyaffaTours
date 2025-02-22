"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import PropTypes from "prop-types";
import Image from "next/image";
import { useRef } from "react";
import mekkah from "@/../public/mekkah.webp";

function Hero() {
    const backdropRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: backdropRef,
        offset: ["start start", "end start"],
        layoutEffect: false,
    });

    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

    return (
        <Backdrop ref={backdropRef} backgroundY={backgroundY}>
            <motion.div
                className="flex flex-col items-center -mt-52 sm:-mt-40 overflow-hidden"
                style={{ y: textY }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="nama_brand leading-[180px] text-[42px] sm:text-6xl md:text-[60px] whitespace-nowrap text-[#ffca4f] tracking-tight font-[950]">
                        Musyaffa Tours
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hook w-[350px] sm:w-[400px] md:w-[900px] text-center mb-8 -mt-10 sm:mt-6 text-[#d6cbb2]"
                >
                    <h2 className="font-black leading-none tracking-wider text-3xl sm:text-4xl md:text-6xl">
                        Umrah Hemat dan Amanah.
                    </h2>
                </motion.div>
            </motion.div>
        </Backdrop>
    );
}

export const Backdrop = ({ children, backgroundY }) => {
    return (
        <section className="w-full overflow-hidden">
            <div className="backdrop_hero w-full h-[700px] rounded-b-[100px] relative flex flex-row items-center justify-center overflow-hidden">
                <div className="hidden sm:block z-40">
                    <div className="eclipse eclipse-1 hidden sm:block md:w-[1558px] md:h-[1558px] top-1/2 opacity-50"></div>
                    <div className="eclipse eclipse-2 hidden sm:block sm:size-[950px] md:size-[1224px] top-1/2 opacity-40"></div>
                    <div className="eclipse eclipse-3 size-[400px] sm:size-[604px] md:size-[904px] top-1/2 opacity-30"></div>
                </div>

                <motion.div
                    className="absolute -bottom-[340px] sm:-bottom-[230px] md:-bottom-[430px] z-50 w-[1200px] h-[1100px] sm:w-[800px] sm:h-[850px] md:w-[1500px] md:h-[1100px] overflow-hidden"
                    style={{ y: backgroundY }}
                >
                    <Image
                        fetchPriority="high"
                        src={mekkah}
                        alt="Mekkah"
                        fill
                        className="object-fill w-full h-full"
                    />
                </motion.div>

                {children}
            </div>
        </section>
    );
};

Backdrop.propTypes = {
    children: PropTypes.node.isRequired,
    backgroundY: PropTypes.object.isRequired,
};

export default Hero;
