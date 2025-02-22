'use client';
import React from 'react'
import Image from "next/image"
import waIcon from "@/../public/icon whatsapp.webp"


const IconWhatsapp = () => {
    return (
        <div
            onClick={() => window.open("https://api.whatsapp.com/send/?phone=6285281570559&text=Asallamualaikum+bapak%2Fibu%2C+terima+kasih+sudah+menghubungi+kami.+&type=phone_number&app_absent=0", "_blank")}
            className='fixed flex justify-center items-center gap-2 right-4 bottom-4 z-[9999] bg-[#3eec5f] group h-fit rounded-full w-fit '>
            <Image
                src={waIcon}
                alt='wa_icon'
                className='size-[50px]  '
            />

            <h1 className='text-[#fbfefc] text-lg pr-5 select-none #fbfefc hidden group-hover:block'>Hubungi kami</h1>

        </div>
    )
}

export default IconWhatsapp