"use client"

import '@/app/components/monthly_offer/monthly.css';
import { useState, useEffect, useRef } from 'react';
import pedestal from '@/../public/pedestal.webp';
import tiraiKiri from '@/../public/tirai_kiri.webp';
import tiraiKanan from '@/../public/tirai_kanan.webp';
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { motion } from 'framer-motion';
import Image from "next/image"
import metallic from "@/../public/metallic-board-background.webp"
import bgMonth from "@/../public/bg_month.svg"




async function getPaket() {
    try {
        const response = await fetch(`${window.location.origin}/api/paket`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

function Month_offer() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const itemsRef = useRef([]);
    let countItem = 0;
    const [refTop, inViewTop] = useInView({ threshold: 0.2, triggerOnce: true });
    const [refBot, inViewBot] = useInView({ threshold: 0.1, triggerOnce: true });
    const [tiraiAnimation, setTiraiAnimation] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPedestalAnimating, setIsPedestalAnimating] = useState(false);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getPaket();
                const sortedProducts = data.data.sort((a, b) => a.harga - b.harga).slice(0, 3);
                setProducts(sortedProducts);
            } catch (err) {
                setError("Gagal mengambil data produk.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            itemsRef.current = document.querySelectorAll('.tiketMontly');
            countItem = itemsRef.current.length;



            let next = document.getElementById('next');
            let prev = document.getElementById('prev');

            let active = 1;
            let other_1 = null;
            let other_2 = null;

            next.addEventListener('click', () => {
                if (isAnimating) return;
                active = (active + 1) % countItem;
                other_1 = (active - 1 + countItem) % countItem;
                other_2 = (active + 1) % countItem;
                setTimeout(() => setIsAnimating(false), 500);
                changeSlider();
                handleNavClick();
            });

            prev.addEventListener('click', () => {
                if (isAnimating) return;
                active = (active - 1 + countItem) % countItem;
                other_1 = (active - 1 + countItem) % countItem;
                other_2 = (active + 1) % countItem;
                setTimeout(() => setIsAnimating(false), 500);
                changeSlider();
                handleNavClick();
            });

            const handleNavClick = () => {
                setIsAnimating(true);
                setTiraiAnimation(true);
                setIsPedestalAnimating(true);
                setTimeout(() => {
                    setTiraiAnimation(false);
                    setIsPedestalAnimating(false);
                    setIsAnimating(false);
                }, 1000);
            };

            const changeSlider = () => {
                let itemOldActive = document.querySelector('.carousel .tiketMontly.active');
                if (itemOldActive) itemOldActive.classList.remove('active');

                let itemOldOther_1 = document.querySelector('.carousel .tiketMontly.other1');
                if (itemOldOther_1) itemOldOther_1.classList.remove('other1');

                let itemOldOther_2 = document.querySelector('.carousel .tiketMontly.other2');
                if (itemOldOther_2) itemOldOther_2.classList.remove('other2');

                if (itemsRef.current[active]) {
                    itemsRef.current[active].classList.add('active');
                }
                if (itemsRef.current[other_1]) {
                    itemsRef.current[other_1].classList.add('other1');
                }
                if (itemsRef.current[other_2]) {
                    itemsRef.current[other_2].classList.add('other2');
                }
            }
        }, 100);
    }, [products]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedproduct, setSelectedproduct] = useState(null);

    const openModal = (product) => {
        setSelectedproduct(product);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedproduct(null);
        document.body.style.overflow = 'auto';
    };



    return (
        <section
            className="w-screen flex justify-center items-center flex-col mt-32 "
        >
            <motion.div
                style={{ backgroundImage: `url(${bgMonth.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                className="backdrop_offer w-[95%] sm:w-[85%] min-h-[350px] p-16 rounded-[40px] flex justify-center relative">
                <h2 className="text-[#381308] select-none font-black text-5xl sm:text-[45px] text-center absolute top-5">Harga Spesial!</h2>
            </motion.div>


            <div className='flex relative w-screen h-fit justify-center items-center'>

                <button
                    className={`nav_button absolute -top-7 left-[25px] sm:left-[12%] bg-[#542116] rounded-full cursor-pointer flex justify-center items-center z-[60] group ${isAnimating ? 'opacity-50' : ''}`}
                    id='prev'
                    disabled={isAnimating}
                >
                    <GrFormPrevious className="fill-[#ece1b5] text-5xl sm:text-6xl font-bold text-[#ece1b5]" />
                    <span className="sr-only">previous</span>

                </button>

                <motion.div
                    className={`container_month_offer w-[340px] sm:w-[65%] max-h-[490px] min-h-[480px] rounded-[40px] p-4 -mt-64 overflow-hidden shadow-2xl flex justify-center items-center group-hover:scale-105 transition-transform duration-300 relative`}
                >
                    <div
                        style={{ backgroundImage: `url(${metallic.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        className="absolute inset-0 bg-black opacity-10 z-1"></div>

                    <div className="h-[320px] w-[230px] ml-10 sm:ml-0 relative carousel next" >
                        {loading ? (
                            <div className="loader mt-28 mx-auto z-[999]">
                                <div className="bar1"></div>
                                <div className="bar2"></div>
                                <div className="bar3"></div>
                                <div className="bar4"></div>
                                <div className="bar5"></div>
                                <div className="bar6"></div>
                                <div className="bar7"></div>
                                <div className="bar8"></div>
                                <div className="bar9"></div>
                                <div className="bar10"></div>
                                <div className="bar11"></div>
                                <div className="bar12"></div>
                            </div>
                        ) : (
                            <>
                                {products.map((product, index) => (
                                    <div key={product._id}>
                                        <TicketMontly
                                            product={product}
                                            openModal={() => openModal(product)}
                                            className={
                                                index === 0 ? 'other1' : index === 1 ? 'active' : index === 2 ? 'other2' : ''
                                            }
                                        />
                                    </div>
                                ))}
                            </>
                        )}

                        {/* Modal */}
                        {isModalOpen && selectedproduct && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur z-[100]">
                                <div className="relative max-w-fit max-h-screen  flex justify-center items-center">
                                    <Image
                                        src={selectedproduct.gambar}
                                        alt="gambar_modal_termurah"
                                        className="w-[90%] h-[90%] sm:w-[500px] sm:h-[500px] left-1/2 object-cover border-[20px] border-white"
                                        loading="lazy"
                                        width={350}
                                        height={350}
                                        layout="intrinsic"
                                    />

                                    <div
                                        onClick={closeModal}
                                        className="absolute -top-3  right-3 size-6 bg-white rounded-full flex justify-center items-center"
                                    >
                                        <MdOutlineClose className="fill-red-500 text-2xl font-semibold" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>



                    <div className='size-80 border-2 border-[#c2902f] rounded-full absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center group-hover:top-[45%] duration-1000'>
                        <div className='size-[280px] bg-[#c2902f] rounded-full'></div>
                    </div>

                    <Image
                        src={tiraiKiri}
                        alt="tirai1"
                        className={`hidden sm:block w-[360px] left-0 top-0 object-cover absolute filter brightness-[.8] duration-500 z-40 group-hover:-translate-x-10 ${tiraiAnimation ? 'animate-tirai-kiri' : ''
                            }`}
                    />
                    <Image
                        src={tiraiKanan}
                        alt="tirai2"
                        className={`hidden sm:block md:block w-[360px] h-[600px] right-0 top-0 object-cover absolute aspect-[3/4] filter brightness-[.8] duration-500 z-40 group-hover:translate-x-10 ${tiraiAnimation ? 'animate-tirai-kanan' : ''
                            }`}
                    />
                    <Image
                        src={pedestal}
                        alt="batu1"
                        className={`size-60 object-cover absolute -bottom-[180px] aspect-[16/9] filter brightness-[.9] group-hover:-bottom-[200px] duration-500 z-50 ${isPedestalAnimating ? 'animate-padestal' : ''}`}
                    />


                </motion.div>


                <button
                    className={`nav_button absolute -top-7 right-[25px] sm:right-[12%] bg-[#542116] rounded-full cursor-pointer flex justify-center items-center z-[60] group ${isAnimating ? 'opacity-50' : ''}`}
                    id='next'
                    disabled={isAnimating}
                >
                    <GrFormNext className="fill-[#ece1b5] text-5xl sm:text-6xl  font-bold text-[#ece1b5]" />
                    <span className="sr-only">next</span>

                </button>

            </div>

            <div
                className=" w-[60%] h-20  rounded-[30px] border-2 border-[#672222] -mt-14">
            </div>
        </section >
    )
}


export const TicketMontly = ({ product, className, openModal }) => {

    const { gambar } = product;

    const loaderProp = ({ src }) => {
        return src;
    };

    return (
        <div
            onClick={openModal}
            className={`absolute max-w-fit tiketMontly ${className}`}>
            <div className="container_montly first_montly w-[200px] h-[180px] sm:w-[230px] sm:h-[210px]">
                <div className="top_montly left_montly top_color corner"></div>
                <div className="top_montly right_montly top_color corner"></div>
                <div className="bottom_corner left_corner "></div>
                <div className="bottom_corner right_corner "></div>
                <div className="spacer flex justify-center items-center">
                    <div className="relative w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] overflow-hidden">
                        <Image
                            src={gambar}
                            alt="Gambar_paket_termurah"
                            className="object-cover object-top z-40 peer"
                            loading="lazy"
                            fill
                            loader={loaderProp}
                        />
                        <button onClick={openModal} className="py-2 px-2 border-2 border-[#9A3B3B] bg-[#f1e7d1] absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[24px] cursor-pointer transition-opacity duration-300 opacity-0 peer-hover:opacity-100 hover:opacity-100">
                            <p className="text-[10px] text-[#9A3B3B] font-extrabold">Lihat Brosur</p>
                        </button>
                    </div>
                </div >
            </div >
            <div className="container_montly second_montly w-[200px] h-[110px]  sm:w-[230px] sm:h-[110px]">
                <div className="top_corner left_corner"></div>
                <div className="top_corner right_corner"></div>
                <div className="bottom_montly bottom_color left_montly"></div>
                <div className="bottom_montly bottom_color right_montly"></div>
                <div className="spacer2 flex-col flex justify-center items-center">
                    <div className="rounded-[10px] px-2 py-1  bg-[#f1e7d1]">
                        <h3 className="text-[8px] text-[#672222]">program {product.durasi} hari</h3>
                    </div>
                    <h1 className="font-bold text-[22px] text-[#f1e7d1]">{product.harga} <span className="text-sm text-[#eaeaea]">/PAX</span></h1>
                    <h2 className="text-[#f1e7d1] text-sm">{product.tanggal}</h2>
                </div>
            </div>
        </div >
    );
}


export default Month_offer