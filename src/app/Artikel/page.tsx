"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import supabase from "@/../libs/supabaseConnect"

interface Artikel {
    id: string;
    tanggal: string;
    judul: string;
    gambar: string;
    konten: string;
}

export default function Article() {


    const [news, setNews] = useState<Artikel[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await supabase.from('artikel_berita').select()

                if (data) {
                    setNews(data)
                }


            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    return (
        <div className=" flex flex-col items-center justify-center">
            <div className="backdrop_hero ripped_paper w-screen min-h-fit sm:py-9 flex-col flex justify-center items-center relative ">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="font-bold text-7xl sm:text-[10vw] text-center text-[#ece1b5] mb-20 mt-32">THE ARTICLE</motion.h1>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className=" w-[90%]  py-16 px-8 flex gap-6 flex-wrap justify-center ">
                {loading ? (
                    <div className='w-full h-full flex justify-center items-center'>
                        <div className="loader z-[999]">
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
                    </div>
                ) : news.length > 0 ? (
                    news.map((blog, index) => <CardArticle key={index} blog={blog} />)
                ) : (
                    <p className="text-[7vw] text-center text-[#672222] font-semibold py-2 mt-28">BELUM ADA ARTIKEL</p>
                )}
            </motion.div>
        </div>
    );
}

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

const CardArticle = ({ blog }: { blog: { id: string; gambar: string; tanggal: string; judul: string } }) => {
    return (
        <div className="w-full h-auto md:w-[230px] md:h-[370px] xl:w-[300px] bg-[#521f13] rounded-[24px] flex flex-col  p-4 shadow-2xl">
            <div>
                <Image
                    src={blog.gambar}
                    alt='Header_Artikel'
                    width={273}
                    height={200}
                    loading="lazy"
                    className="w-full h-[200px] xl:w-[273px] xl:h-[200px] bg-red-600 rounded-[20px] object-cover"
                />
            </div>

            <div className=" w-full min-h-fit p-2  flex flex-col items-center justify-center ">
                <h3 className="date_artikel text-[10px] text-[#f1e9c9]">{blog.tanggal}</h3>
                <h1 className="title_artikel text-[17px] xl:text-xl pb-3 text-center text-[#ece1b5] ">{truncateText(blog.judul, 30)}</h1>
                <Link href={`/Artikel/${blog.id}`} className="button_artikel text-xs xl:text-sm text-[#672222] bg-[#f1e7d1] py-[2px] px-2  xl:py-1 xl:px-2 rounded-full cursor-pointer active:shadow active:top-2 active:relative  "> selengkapnya</Link>
            </div>

        </div>
    );
}



