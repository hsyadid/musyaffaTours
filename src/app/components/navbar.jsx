'use client'
import '@/app/globals.css';
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import logo from '@/../public/logo.webp';
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FiAlignJustify } from "react-icons/fi";

function Navbar() {


    return (

        <nav
            className='relative'>
            <SlideTabs />

        </nav>
    );
}


const SlideTabs = () => {
    const tabRef = useRef(null);
    const pathname = usePathname();

    const [position, setPosition] = useState({ left: 0, opacity: 1 });
    const [clickedPosition, setClickedPosition] = useState({ left: 0, opacity: 0 });
    const [selectedBefore, setSelectedBefore] = useState("Produk");
    const [selectInitial, setSelectInitial] = useState("Produk");
    const [selectedButton, setSelectedButton] = useState("Produk");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const path = pathname;

        if (path === "/" && selectInitial !== "Produk") {
            setSelectInitial("Produk");
        } else if (path === "/Artikel" && selectInitial !== "Artikel") {
            setSelectInitial("Artikel");
        } else if (path === "/TentangKami" && selectInitial !== "Tentang kami") {
            setSelectInitial("Tentang kami");
        }

        setSelectedButton(selectInitial);

        const tabNow = document.getElementById(`${selectInitial}`);

        if (tabNow) {
            const initialPosition = {
                left: tabNow.offsetLeft,
                width: tabNow.offsetWidth,
                opacity: 1,
            };
            setPosition(initialPosition);
            setClickedPosition(initialPosition);
        }

    }, [pathname, selectInitial]);

    return (
        <div className='absolute'>
            <div
                onMouseLeave={() => {
                    setPosition(clickedPosition)
                }}
                className="flex absolute mt-9 left-1/2 transform -translate-x-1/2 h-fit md:w-[700px] sm:w-[550px] w-[350px] min-w-64 rounded-2xl shadow-xl bg-[#f1e7d1]  px-2 py-1 items-center justify-between z-[110] "
            >
                <div className='logo_container size-[50px] md:size-[55px] flex justify-center items-center relative'>
                    <Image src={logo} alt='logo_picture' className='object-cover rounded-full' fill priority />
                </div>

                <div className="hidden sm:flex sm:gap-3 lg:gap-0">
                    <Link
                        ref={tabRef}
                        className='selected'
                        id='Produk'
                        href={"/"}

                    >
                        <Tab
                            setPosition={setPosition}
                            setSelectedButton={setSelectedButton}
                            setClickedPosition={setClickedPosition}
                            setSelectedBefore={setSelectedBefore}
                            selectedBefore={selectedBefore}
                            isSelected={selectedButton === "Produk"}
                            setIsDropdownOpen={setIsDropdownOpen}
                        >
                            Produk
                        </Tab>
                    </Link>
                    <Link
                        id='Artikel'
                        href={"/Artikel"}

                    >
                        <Tab
                            setPosition={setPosition}
                            setSelectedButton={setSelectedButton}
                            setClickedPosition={setClickedPosition}
                            setSelectedBefore={setSelectedBefore}
                            selectedBefore={selectedBefore}
                            isSelected={selectedButton === "Artikel"}
                            setIsDropdownOpen={setIsDropdownOpen}

                        >
                            Artikel
                        </Tab>
                    </Link>
                    <Link
                        id={"Tentang kami"}
                        href={"/TentangKami"}
                    >
                        <Tab

                            setPosition={setPosition}
                            setSelectedButton={setSelectedButton}
                            setClickedPosition={setClickedPosition}
                            setSelectedBefore={setSelectedBefore}
                            selectedBefore={selectedBefore}
                            isSelected={selectedButton === "Tentang kami"}
                            setIsDropdownOpen={setIsDropdownOpen}

                        >
                            Tentang kami
                        </Tab>
                    </Link>
                </div>

                <div className='whatsapp_icon hidden sm:flex justify-center items-center md:w-24 sm:w-18 sm:h-11 md:h-full box-border '>
                    <button
                        className='button_WA w-full h-full flex justify-center items-center'
                        aria-label="Hubungi kami melalui WhatsApp"
                        onClick={() => window.open("https://api.whatsapp.com/send/?phone=6285281570559&text=Assalamualaikum+Admin+Musyaffa+Tours%2C+bisa+bantu+saya+untuk+informasi+terkait+keberangkatan+umrah+di+musyaffatours", "_blank")}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="sm:size-[18] md:size-[24px] ml-1" viewBox="0 0 50 50">
                            <path d="M 25 2 C 12.318 2 2 12.318 2 25 C 2 28.96 3.0228906 32.853062 4.9628906 36.289062 L 2.0371094 46.730469 C 1.9411094 47.073469 2.03325 47.440312 2.28125 47.695312 C 2.47225 47.892313 2.733 48 3 48 C 3.08 48 3.1612344 47.989703 3.2402344 47.970703 L 14.136719 45.271484 C 17.463719 47.057484 21.21 48 25 48 C 37.682 48 48 37.682 48 25 C 48 12.318 37.682 2 25 2 z M 16.642578 14 C 17.036578 14 17.428437 14.005484 17.773438 14.021484 C 18.136437 14.039484 18.624516 13.883484 19.103516 15.021484 C 19.595516 16.189484 20.775875 19.058563 20.921875 19.351562 C 21.069875 19.643563 21.168656 19.984047 20.972656 20.373047 C 20.776656 20.762047 20.678813 21.006656 20.382812 21.347656 C 20.086813 21.688656 19.762094 22.107141 19.496094 22.369141 C 19.200094 22.660141 18.892328 22.974594 19.236328 23.558594 C 19.580328 24.142594 20.765484 26.051656 22.521484 27.597656 C 24.776484 29.583656 26.679531 30.200188 27.269531 30.492188 C 27.859531 30.784188 28.204828 30.734703 28.548828 30.345703 C 28.892828 29.955703 30.024969 28.643547 30.417969 28.060547 C 30.810969 27.477547 31.204094 27.572578 31.746094 27.767578 C 32.288094 27.961578 35.19125 29.372062 35.78125 29.664062 C 36.37125 29.956063 36.766062 30.102703 36.914062 30.345703 C 37.062062 30.587703 37.062312 31.754234 36.570312 33.115234 C 36.078313 34.477234 33.717984 35.721672 32.583984 35.888672 C 31.565984 36.037672 30.277281 36.10025 28.863281 35.65625 C 28.006281 35.38625 26.907047 35.028734 25.498047 34.427734 C 19.575047 31.901734 15.706156 26.012047 15.410156 25.623047 C 15.115156 25.234047 13 22.46275 13 19.59375 C 13 16.72475 14.524406 15.314469 15.066406 14.730469 C 15.608406 14.146469 16.248578 14 16.642578 14 z"></path>
                        </svg>
                        <span className="sr-only">Hubungi kami</span>
                    </button>
                </div>

                <FiAlignJustify className='text-[#672222] block sm:hidden' size={"35px"}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />

                <Cursor position={position} />
            </div >

            {isDropdownOpen && (
                <motion.div
                    id="menuList"
                    className='dropdown-navbar absolute flex  sm:hidden rounded-2xl  flex-col w-[340px] text-[#672222] shadow-xl bg-[#ebdebf] gap-3 left-1/2 transform -translate-x-1/2 top-20 pt-10 pb-5 z-[100]'
                    initial={{ maxHeight: 0 }}
                    animate={{ maxHeight: "300px" }}
                    exit={{ maxHeight: 0 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                    style={{ overflow: "hidden" }}
                >
                    <Link className='selected select-none w-full h-8 text-center hover:bg-[#d7ccb3]' id='Produk' href={"/"} onClick={() => setIsDropdownOpen(false)}>Produk</Link>
                    <Link id='Artikel' href={"/Artikel"} className='w-full select-none h-8 text-center hover:bg-[#d7ccb3]' onClick={() => setIsDropdownOpen(false)}>Artikel</Link>
                    <Link id='Tentang kami' href={"/TentangKami"} className='w-full select-none h-8 text-center hover:bg-[#d7ccb3]' onClick={() => setIsDropdownOpen(false)}>Tentang kami</Link>
                    <Link id='Hubungin Kami' href="#" className='w-full h-8 text-center select-none hover:bg-[#d7ccb3]' onClick={() => {
                        setIsDropdownOpen(false);
                        window.open("https://api.whatsapp.com/send/?phone=6285281570559&text=Assalamualaikum+Admin+Musyaffa+Tours%2C+bisa+bantu+saya+untuk+informasi+terkait+keberangkatan+umrah+di+musyaffatours", "_blank")
                    }}>Hubungin Kami</Link>
                </motion.div>
            )}

        </div>
    );
};

const Tab = ({ children, setPosition, setSelectedButton, setClickedPosition, setSelectedBefore, selectedBefore, setSelectInitial, isSelected, setIsDropdownOpen }) => {
    const ref = useRef(null);

    return (
        <div
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;
                const { width } = ref.current.getBoundingClientRect();
                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                });
                setSelectedButton(children);
            }}
            onMouseLeave={() => {
                setSelectedButton(selectedBefore);
            }}

            onClick={() => {
                if (!ref?.current) return;
                const { width } = ref.current.getBoundingClientRect();

                const newPos = {
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                };
                setPosition(newPos);
                setClickedPosition(newPos);
                setSelectedBefore(children);
                if (setSelectInitial) {
                    setSelectInitial(children);
                }
            }}
            className={`relative select-none z-10 block cursor-pointer sm:px-2 sm:py-1.5 text-xs uppercase ${isSelected ? 'text-[#ece1b5] font-bold' : 'text-black'} hover:text-[#ece1b5] md:px-5 md:py-3 sm:text-[12px] md:text-[14px]`}
        >
            {children}
        </div>
    );
};

Tab.propTypes = {
    children: PropTypes.node.isRequired,
    setPosition: PropTypes.func.isRequired,
    setSelectedButton: PropTypes.func.isRequired,
    setClickedPosition: PropTypes.func.isRequired,
    setSelectedBefore: PropTypes.func.isRequired,
    selectedBefore: PropTypes.string.isRequired,
    setSelectInitial: PropTypes.func,
    isSelected: PropTypes.bool.isRequired,
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={position}
            className="absolute z-0 sm:h-7 rounded-full bg-[#9A3B3B] sm:w-20 md:w-[108px] md:h-10 hidden sm:block"
        />
    );
};

Cursor.propTypes = {
    position: PropTypes.shape({
        left: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        opacity: PropTypes.number.isRequired,
    }).isRequired,
};

export default Navbar;