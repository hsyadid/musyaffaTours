import { useState } from 'react';
import { MdOutlineClose } from "react-icons/md";
import PropTypes from 'prop-types';
import Image from "next/image";


function ProductList({ filterMonth, dataFilter, loading }) {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setcurrentProduct] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);


    const openModal = (product) => {
        setIsModalOpen(true);
        setcurrentProduct(product);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };



    const loaderProp = ({ src }) => {
        return src;
    };

    return (
        <div className="flex justify-center ">
            <div className="product_filtered  w-[350px]  sm:w-[520px]  md:w-[700px] lg:w-[1000px]  sm:min-h-[435px] max-h-fit flex justify-center flex-wrap gap-5 mt-6 ">
                {loading ? (
                    <div className="loader mt-32">
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
                ) : (<>
                    {dataFilter.map((product, index) => {
                        return <Ticket
                            key={`${product._id}-${product.bulan}-${index}`}
                            openModal={() => openModal(product)}
                            product={product}
                        />;
                    })}

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center backdrop-blur z-[999] overflow-hidden">
                            <div className="relative max-w-screen max-h-screen flex justify-center ">
                                <Image
                                    src={currentProduct.gambar}
                                    alt="gambar_paket"
                                    className="w-[92%] h-[92%] sm:w-[500px] sm:h-[500px] object-cover border-[25px]  border-white"
                                    loading='lazy'
                                    width={600}
                                    height={600}
                                    unoptimized={true}
                                />
                                <button onClick={closeModal} className="absolute p-1 -top-2 -right-2 size-7 bg-white rounded-full flex justify-center items-center">
                                    <MdOutlineClose className='fill-red-500 text-2xl font-semibold' />
                                </button>
                            </div>
                        </div>
                    )}
                </>)}
            </div>
        </div>
    );
}

ProductList.propTypes = {
    filterMonth: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export const Ticket = ({ openModal, product }) => {
    const { gambar } = product;

    const loaderProp = ({ src }) => {
        return src;
    };

    const handleButtonClick = (e) => {
        e.stopPropagation();
        window.open("https://api.whatsapp.com/send/?phone=6285281570559&text=Assalamualaikum+Admin+Musyaffa+Tours%2C+bisa+bantu+saya+untuk+informasi+terkait+keberangkatan+umrah+di+musyaffatours", "_blank")
    };

    return (
        <div
            onClick={openModal}
            className="hover:scale-105 duration-500 max-w-fit">
            <div className="container first w-[160px] h-[130px] sm:w-[145px] sm:h-[140px] md:w-[200px] md:h-[210px] lg:w-[260px] lg:h-[255px]  ">
                <div className="top left corner"></div>
                <div className="top right corner"></div>
                <div className="bottom left corner"></div>
                <div className="bottom right corner"></div>
                <div className="spacer flex justify-center items-center">
                    <div className="relative size-[90px] sm:size-[100px] md:size-[170px] lg:size-[200px]  overflow-hidden">
                        <Image
                            src={gambar}
                            alt={`paket - ${product.bulan}`}
                            className="object-cover object-top z-10 peer"
                            layout="fill"
                            fill
                            loader={loaderProp}
                        />
                        <button onClick={openModal} className="py-2 px-3 w-20 md:w-32 border-2 border-[#9A3B3B] bg-[#f1e7d1] absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[24px] cursor-pointer transition-opacity duration-300 opacity-0 peer-hover:opacity-100 hover:opacity-100">
                            <p className="text-[6px] sm:text-[0.8vw] text-[#9A3B3B] font-extrabold">Lihat Brosur</p>
                        </button>
                    </div>
                </div >
            </div >
            <div className="container second w-[160px] h-[105px] sm:w-[145px] sm:h-[100px] md:w-[200px] md:h-[115px] lg:w-[260px] lg:h-[125px] ">
                <div className="top left corner"></div>
                <div className="top right corner"></div>
                <div className="bottom left corner"></div>
                <div className="bottom right corner"></div>
                <div className="spacer2 flex-col flex justify-center items-center">
                    <div className="rounded-[10px] px-2 py-1  bg-[#f1e7d1]">
                        <h3 className="text-[7px] md:text-[9px]  text-[#672222]"> {product.tanggal}</h3>
                    </div>
                    <h1 className="font-bold mt-1 sm:mt-0 text-[15px] sm:text-[15px] md:text-xl lg:text-3xl text-[#f1e7d1]">{product.harga} Juta <span className=" text-[11px] sm:text-[9px] md:text-sm text-[#eaeaea]">/PAX</span></h1>
                    <button
                        onClick={handleButtonClick}
                        disabled={product.selesai}
                        className={`${product.selesai
                            ? "button_paket_sold text-[#f1e7d1] bg-[#b62c25] w-32"
                            : "button_paket_avail text-[#672222] bg-[#bfe0c3] w-32"
                            } mt-1 text-[9px] sm:text-[10px] md:text-[12px] py-[1px] md:py-[3px]  rounded-full cursor-pointer active:shadow active:top-2 active:relative`}
                    >
                        {product.selesai ? 'Sold Out' : 'Pesan sekarang'}
                    </button>
                </div>
            </div>
        </div >
    );
}

export default ProductList