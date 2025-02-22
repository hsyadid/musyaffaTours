import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { FaTiktok } from "react-icons/fa6";
import logo_clear from '@/../public/logo_clear.png'
import fotoTrust1 from "@/../public/trustBlock/foto_trust1.webp";
import fotoTrust2 from "@/../public/trustBlock/foto_trust2.webp";
import fotoTrust3 from "@/../public/trustBlock/foto_trust3.webp";
import sertifikat from "@/../public/sertifikat_musyaffa/Sertifikat musyaffa.webp";
import foto1 from "@/../public/sertifikat_musyaffa/foto1.webp";
import foto2 from "@/../public/sertifikat_musyaffa/foto2.webp";
import { useInView } from "react-intersection-observer";
import Image from "next/image"

import PropTypes from 'prop-types';


export const RevealBento = () => {
    return (
        <section className="min-h-screen w-screen px-3  text-zinc-50 flex flex-col justify-center items-center overflow-hidden mb-6">


            <motion.div
                initial="initial"
                animate="animate"
                transition={{
                    staggerChildren: 0.05,
                }}
                className="mx-auto grid max-w-5xl grid-flow-dense grid-cols-12 grid-rows-4 gap-4 lg:gap-5 xl:grid-cols-20 lg:h-[1100px]"
            >
                <HeaderBlock />
                <SocialsBlock />
                <TrustBlock />
                <TimeBlock />
                <SertifikatBlock />
            </motion.div>
        </section>
    );
};

const Block = ({ children, ...rest }) => {
    const [ref, inView] = useInView({
        threshold: 0.001,
        triggerOnce: true,
    });

    return (
        <motion.div
            ref={ref}
            variants={{
                initial: {
                    scale: 0.5,
                    y: 50,
                    opacity: 0,
                },
                animate: {
                    scale: inView ? 1 : 0.5,
                    y: inView ? 0 : 50,
                    opacity: inView ? 1 : 0,
                },
            }}
            transition={{
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={twMerge(
                "col-span-4 rounded-[32px] bg-[#7a3d36] p-6",
                rest.className
            )}
        >
            {children}
        </motion.div>
    );
};

Block.propTypes = {
    children: PropTypes.node.isRequired,
};



const HeaderBlock = () => (
    <Block className="col-span-12 row-span-2 md:col-span-6 flex flex-col justify-center items-center ">
        <Image
            src={logo_clear}
            alt="logo"
            className=" size-[120px] rounded-full lg:size-[350px]"
        />
        <h1 className="mb-3 text-4xl font-medium leading-tight text-center">
            PT Musyaffa Cahaya Hati{" "}
        </h1>
        <h2 className="text-zinc-400">
            Travel agency
        </h2>

    </Block>
);

const SocialsBlock = () => (
    <>
        <Block
            whileHover={{
                rotate: "2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-[#bc4d44] md:col-span-3"
        >
            <a
                href="https://www.instagram.com/musyaffatours/?hl=en"
                className="grid h-full place-content-center text-3xl text-white"
            >
                <FaInstagram className="lg:size-20" />
            </a>
        </Block>
        <Block
            whileHover={{
                rotate: "-2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-[#5e8f3b] md:col-span-3"
        >
            <a
                href="#"
                onClick={() => window.open("https://api.whatsapp.com/send/?phone=6285281570559&text=Asallamualaikum+bapak%2Fibu%2C+terima+kasih+sudah+menghubungi+kami.+&type=phone_number&app_absent=0", "_blank")}
                className="grid h-full place-content-center text-3xl text-white"
            >
                <FaWhatsapp className="lg:size-20" />
            </a>
        </Block>
        <Block
            whileHover={{
                rotate: "-2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-[#262626] md:col-span-3 "
        >
            <a
                href="https://www.tiktok.com/@musyaffa.tours?_t=ZS-8taB8HoFhQI&_r=1 "
                className="grid h-full place-content-center text-3xl text-white tiktok_icon"
            >
                <FaTiktok className="lg:size-20" />
            </a>
        </Block>
        <Block
            whileHover={{
                rotate: "2.5deg",
                scale: 1.1,
            }}
            className="col-span-6 bg-[#2c666b] md:col-span-3"
        >
            <a
                href="#"
                className="grid h-full place-content-center text-3xl text-white"
            >
                <MdOutlineEmail className="lg:size-20" />
            </a>
        </Block>
    </>
);

const TrustBlock = () => (
    <Block className="col-span-12 text-3xl leading-snug flex items-center p-9 w-full h-full overflow-hidden relative overflow- group">
        <div className="w-full sm:w-4 z-50 sm:block flex flex-col justify-center items-center">
            <strong className="text-white text-3xl ">
                Sudah terpecaya
            </strong>
            <button onClick={() => document.getElementById('container_Testimoni').scrollIntoView({ behavior: 'smooth' })} className="button_artikel mt-3 text-sm text-[#672222] bg-[#f1e7d1] py-1 px-10 rounded-full cursor-pointer active:shadow active:top-2 active:relative  "> Testimoni </button>

        </div>

        <div className="w-[1000px] h-full bg-black z-40 absolute -ml-11 backdrop-blur-sm bg-opacity-10 lg:hidden ">

        </div>

        <div className="flex gap-3 items-start justify-center h-[410px] absolute right-0 rotate-[-15deg] z-30 ">
            <div className="-translate-y-44  group-hover:-translate-y-20 duration-300 flex flex-col gap-4">
                <Image
                    src={fotoTrust1}
                    alt="foto_testimoni"
                    className="h-[350px] w-[250px] rounded-2xl "
                />
                <Image
                    src={fotoTrust3}
                    alt="foto_testimoni"
                    className="h-[350px] w-[250px] rounded-2xl "
                />
            </div>

            <div className="translate-y-7 group-hover:-translate-y-4 duration-300 flex flex-col gap-4">

                <Image
                    src={fotoTrust2}
                    alt="foto_testimoni"
                    className="h-[350px] w-[250px] rounded-2xl "
                />

                <Image
                    src={fotoTrust3}
                    alt="foto_testimoni"
                    className="h-[350px] w-[250px] rounded-2xl "
                />
            </div>


            <div className="-translate-y-9 group-hover:translate-y-14 duration-300 flex flex-col gap-4 ">
                <Image
                    src={fotoTrust3}
                    alt="foto_testimoni"
                    className="h-[350px] w-[250px] rounded-2xl "
                />
                <Image
                    src={fotoTrust1}
                    alt="foto_testimoni"
                    className="h-[350px] w-[250px] rounded-2xl "
                />
            </div>



        </div>
    </Block>

);

const TimeBlock = () => (
    <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
        <SlCalender className="size-8" />
        <p className="text-center text-[35px] text-zinc-300 w-1 flex justify-center items-center">Senin s/d Sabtu</p>
    </Block>
);

const SertifikatBlock = () => (
    <Block className="col-span-12 md:col-span-9 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col justify-center mb-10 ">
            <h1 className="text-4xl font-bold text-center sm:text-left">Terdaftar</h1>
            <p className="w-60 text-[15px] text-center sm:text-left text-zinc-300">karena ibadah Anda adalah tanggung jawab kami.</p>
        </div>
        <div className="flex w-[500px] justify-center relative">
            <motion.div
                whileHover={{
                    scale: 1.1,
                }}
                className="relative z-50 peer"
            >
                <Image
                    src={sertifikat}
                    alt="sertifikat"
                    className="sm:w-[200px] sm:h-[250px] rounded-md z-50 fill"
                    width={150}
                    height={170}
                    style={{ objectFit: 'cover' }}
                />
            </motion.div>
            <Image
                src={foto1}
                alt="foto1"
                className="h-[170px] sm:w-[140px] sm:h-[220px] object-cover absolute rotate-[35deg] translate-x-20 sm:translate-x-28 rounded-md peer-hover:rotate-[45deg] peer-hover:translate-x-28 peer-hover:translate-y-5  duration-300"
                width={110}
                height={220}
            />
            <Image
                src={foto2}
                alt="foto2"
                className="h-[170px] sm:w-[140px] sm:h-[220px] object-cover absolute rotate-[-35deg] -translate-x-20 sm:-translate-x-28 peer-hover:rotate-[-45deg] peer-hover:-translate-x-28 peer-hover:translate-y-5 rounded-md  duration-300"
                width={110}
                height={220}
            />
        </div>
    </Block>
);



