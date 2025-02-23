'use client'
import { useEffect, useState, useCallback } from "react";
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Artikel {
    artikelID: string;
    judul: string;
    konten: string;
    gambar: string;
    tanggal: string;
}

const ArtikelDetail = () => {
    const params = useParams();
    const router = useRouter();
    const [artikel, setArtikel] = useState<Artikel | null>(null);
    const [lastIndex, setLastIndex] = useState<number>(1);
    const pageNumber = parseInt(params.id as string, 10);

    const getBerita = useCallback(async () => {
        try {
            const response = await fetch(`${window.location.origin}/api/berita`);
            const data = await response.json();
            
            const currentArtikel = data.data.find((item: Artikel) => 
                item.artikelID === params.id
            );

            setLastIndex(data.data.length);
            
            if (currentArtikel) {
                setArtikel(currentArtikel);
            } else {
                router.push('/Artikel');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [params.id, router]);

    useEffect(() => {
        getBerita();
    }, [getBerita]);

    const handleNext = () => {
        if (pageNumber < lastIndex) {
            router.push(`/Artikel/${pageNumber + 1}`);
        }
    }

    const handlePrev = () => {
        if (pageNumber > 1) {
            router.push(`/Artikel/${pageNumber - 1}`);
        }
    }

    if (!artikel) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <p className="text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-start">
            <div className="relative bg-black w-screen h-[350px] sm:h-[450px] top-0">
                <Image 
                    src={artikel.gambar} 
                    alt="foto_cover" 
                    className="w-screen object-cover z-0 object-center" 
                    fill
                    loading="lazy"
                    quality={100}
                />
                <div className="w-[85%] sm:w-[600px] lg:w-[800px] h-fit bg-[#ece1b5] pt-10 pb-2 px-14 rounded-sm z-[999] absolute bottom-0 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center justify-center mb-10">
                        <h1 className="text-[4.5vw] sm:text-4xl lg:text-5xl font-bold tracking-wide sm:tracking-[15px] text-center">
                            {artikel.judul}
                        </h1>
                        <div className="w-[300px] relative mt-4 mb-2">
                            <div className="w-[300px] h-[1px] bg-gray-500 flex justify-center items-center"></div>
                            <div className="size-[5px] bg-gray-500 rotate-[45deg] absolute -translate-y-1/2 -translate-x-1/2 left-1/2"></div>
                        </div>
                        <h2 className="text-[3vw] sm:text-lg lg:text-xl text-[#8f672a] text-center tracking-wide">
                            {artikel.tanggal}
                        </h2>
                    </div>
                </div>
            </div>

            <div className="w-[70%] sm:w-[500px] lg:w-[700px] h-fit text-left text-[3vw] sm:text-sm lg:text-lg">
                <p dangerouslySetInnerHTML={{ __html: artikel.konten }} />
            </div>

            <div className="w-[100px] h-[1px] bg-gray-500 m-auto my-5"></div>

            <div className="w-[70%] h-fit px-5 mt-36 flex justify-between items-center gap-5">
                <button
                    disabled={pageNumber === 1}
                    onClick={handlePrev}
                    className={`flex justify-center items-center gap-5 bg-[#542116] w-[50px] sm:w-[100px] sm:h-[70px] z-[9999] ${pageNumber === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <GrFormPrevious className="size-10 sm:size-14 text-[#ece1b5] cursor-pointer" />
                </button>

                <button
                    disabled={pageNumber === lastIndex}
                    onClick={handleNext}
                    className={`flex justify-center items-center gap-5 bg-[#542116] w-[50px] sm:w-[100px] sm:h-[70px] z-[9999] ${pageNumber === lastIndex ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <GrFormNext className="size-10 sm:size-14 text-[#ece1b5] cursor-pointer" />
                </button>
            </div>
        </div>
    );
};


export default ArtikelDetail;
