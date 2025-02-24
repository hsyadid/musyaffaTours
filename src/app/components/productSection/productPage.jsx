'use client'
import { useState, useEffect } from 'react';
import ProductList from "@/app/components/productSection/productList";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import supabase from "@/../libs/supabaseConnect"



function ProductPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await supabase.from('paket_umrah').select()

                if (data) {
                    setProducts(data)
                }

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // filter button
    const [filterMonth, setFilterMonth] = useState("Semua bulan");

    let availableMonth = new Set(["Semua bulan"]);
    products.forEach((product) => {
        availableMonth.add(product.bulan)
    })
    availableMonth = [...availableMonth];

    let dataFilter = null
    if (filterMonth != 'Semua bulan') {
        dataFilter = products.filter((product) => product.bulan === filterMonth);
    } else {
        dataFilter = products
    }

    // pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [itemperpage, setItemPerPage] = useState(3);

    const numberPage = Math.ceil(dataFilter.length / itemperpage)
    const lastIndex = currentPage * itemperpage
    const firstPostIndex = lastIndex - itemperpage
    const currentPost = dataFilter.slice(firstPostIndex, lastIndex)


    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemPerPage(4);
            } else {
                setItemPerPage(3);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const buttonFilter = document.querySelectorAll(".button_filter");

        const handleButtonClick = (e) => {
            e.stopPropagation();
            setCurrentPage(1);
            buttonFilter.forEach(button => {
                button.classList.remove("box_filter_select");
                button.classList.add("box_filter");
            });
            e.target.classList.remove("box_filter");
            e.target.classList.add("box_filter_select");
            setFilterMonth(e.target.textContent);
        };

        buttonFilter.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });

        return () => {
            buttonFilter.forEach(button => {
                button.removeEventListener('click', handleButtonClick);
            });
        };
    }, [products]);

    const { ref: ref1, inView: inView1 } = useInView({ threshold: 0.2, triggerOnce: true });
    const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2, triggerOnce: true });

    return (
        <motion.section
            className="mt-32 relative sm:max-w-[1990px] sm:min-w-fit max-h-fit flex justify-center items-center gap-2 xl:gap-10 overflow-visible sm:px-3 px-20">



            <button
                disabled={currentPage <= 1}
                className={`nav_button hidden sm:size-10 md:size-12 xl:size-14 bg-[#542116] rounded-full cursor-pointer sm:flex justify-center items-center ${(currentPage <= 1) ? 'opacity-50' : ''}`}>
                <GrFormPrevious
                    onClick={prevPage}
                    className="fill-[#ece1b5]  text-2xl xl:text-4xl font-bold text-[#ece1b5]" />
                <span className="sr-only">next</span>
            </button>

            <div className=" min-w-[400px] max-w-[600px] md:min-w-[600px] md:max-w-[1000px] min-h-min p-4  flex flex-col justify-center items-center ">
                <div className="header_product w-[115%] lg:w-full min-h-min flex flex-col justify-center items-center sm:flex-row sm:justify-between sm:items-end gap-3 sm:gap-0 px-4 box-border relative ">
                    <motion.div
                        ref={ref2}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: inView2 ? 1 : 0.5, opacity: inView2 ? 1 : 0 }}
                        transition={{
                            type: "spring", mass: 0.5, stiffness: 100, duration: 0.5
                        }} className="text-[#672222]  sm:w-10 font-semibold text-7xl text-center sm:text-[40px] md:text-[47px] leading-[1] lg:text-5xl pr-2">All <br /> Product
                    </motion.div>

                    <div
                        className="flex justify-center items-center flex-wrap gap-6">
                        {availableMonth.map((month) => (
                            <motion.button
                                ref={ref1}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: inView1 ? 1 : 0.5, opacity: inView1 ? 1 : 0 }}
                                transition={{
                                    type: "spring", mass: 0.5, stiffness: 100, duration: 0.5
                                }}
                                key={month}
                                className={`button_filter  select-none cursor-pointer caret-transparent text-sm p-1 sm:text-[10px] sm:p-[5px]  md:p-[7px] rounded-[10px] md:text-[14px]  ${filterMonth === month ? "box_filter_select" : "box_filter"}`}
                            >
                                {month}
                            </motion.button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center ">
                    <ProductList
                        dataFilter={currentPost}
                        data={currentPost}
                        loading={loading}
                    />
                </div>

                <div className='flex w-[85%] justify-between mt-5 -ml-3 sm:hidden'>
                    <button
                        disabled={currentPage === 1}
                        className={`nav_button h-10 bg-[#542116] cursor-pointer flex justify-center items-center ${(currentPage === 1) ? 'opacity-50' : ''}`}>
                        <GrFormPrevious
                            onClick={prevPage}
                            className="fill-[#ece1b5] text-2xl xl:text-4xl font-bold text-[#ece1b5]" />
                        <span className="sr-only">prev</span>

                    </button>

                    <div className="flex items-center">
                        {Array.from({ length: numberPage }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`mx-1 h-10 w-10 flex items-center justify-center bg-[#542116] text-[#ece1b5] rounded-full ${currentPage === index + 1 ? 'opacity-100' : 'opacity-50'}`}>
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === numberPage}
                        className={`nav_button bg-[#542116] cursor-pointer flex justify-center items-center ${(currentPage === numberPage) ? 'opacity-50' : ''}`}>
                        <GrFormNext
                            onClick={nextPage}
                            className="fill-[#ece1b5] text-2xl xl:text-4xl font-bold text-[#ece1b5]" />
                        <span className="sr-only">next</span>

                    </button>
                </div>

            </div>

            <button
                disabled={currentPage >= numberPage}
                className={`nav_button hidden sm:size-10 md:size-12 xl:size-14 bg-[#542116] rounded-full cursor-pointer sm:flex justify-center items-center ${(currentPage === numberPage) ? 'opacity-50' : ''}`}>
                <GrFormNext
                    onClick={nextPage}
                    className="fill-[#ece1b5] text-2xl xl:text-4xl font-bold text-[#ece1b5]" />
                <span className="sr-only">next</span>
            </button>
        </motion.section>
    );
}

export default ProductPage;