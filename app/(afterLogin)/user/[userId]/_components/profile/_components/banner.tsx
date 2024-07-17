"use client"

import Image from "next/image"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
import { useRef } from "react"
import { BannerProps } from "./type"

const Banner = ({ banner, onImageChange }: BannerProps) => {
    const bgImageInputRef = useRef<HTMLInputElement>(null)

    return (
        <div className="relative">
            <div className="w-full h-[440px] flex justify-center items-center overflow-hidden">
                <Image
                    width={1920}
                    height={440}
                    src={banner ? banner : DefaultBanner}
                    alt="banner image"
                    className="w-full"
                />
            </div>
            <div className="absolute inset-0 bg-black opacity-60" />
            <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
                onClick={() => bgImageInputRef.current?.click()}
            >
                <Image width={40} height={40} src={"/icons/photoIcon.svg"} alt="can change banner image" />
            </div>
            <input type="file" ref={bgImageInputRef} className="hidden" onChange={onImageChange} />
        </div>
    )
}
export default Banner
