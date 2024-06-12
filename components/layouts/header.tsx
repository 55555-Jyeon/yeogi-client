"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import searchIcon from "@/public/icons/search.svg"
import writeIcon from "@/public/icons/write.svg"
import SearchBar from "../commons/searchBar"
import LogoText from "@/public/icons/logo_text.svg"

const Header = () => {
    const [isShowHeader, setIsShowHeader] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isSearchbarClicked, setIsSearchbarClicked] = useState(false)

    const handleScroll = () => {
        if (typeof window !== "undefined") {
            if (window.scrollY > lastScrollY) {
                setIsSearchbarClicked(false)
                setIsShowHeader(false)
            } else {
                setIsShowHeader(true)
            }
            setLastScrollY(window.scrollY)
        }
    }

    const handleKeyword = (keyword: string) => {
        console.log(keyword)
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [lastScrollY])

    return (
        <header
            className={`w-full fixed top-0 left-0 transition-transform duration-300 ${isShowHeader ? "translate-y-0" : "-translate-y-full"} z-50 bg-SYSTEM-beige`}
        >
            <div className="mx-auto bg-SYSTEM-beige px-[120px] h-[90px] flex items-center justify-between border-b border-GREY-20 font-pretendard text-sm">
                <div className="flex items-center">
                    <Link href="/">
                        <Image src={LogoText} width={90} height={60} alt="yeogi logo" />
                    </Link>
                    <nav className="ml-8">
                        <Link href="/community" className="text-SYSTEM-black px-4 font-bold">
                            커뮤니티
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center">
                    <div className="ml-4 flex items-center space-x-12 font-medium">
                        <button onClick={() => setIsSearchbarClicked(true)}>
                            {isSearchbarClicked ? (
                                <SearchBar text="" size="sm" onChange={e => handleKeyword(e.target.value)} />
                            ) : (
                                <Image src={searchIcon} alt="search_icon" width={24} height={24} />
                            )}
                        </button>
                        <Link href="/login" className="text-SYSTEM-black">
                            로그인
                        </Link>
                        <Link href="/signup" className="text-SYSTEM-black">
                            회원가입
                        </Link>
                        <Link href="/createPost">
                            <button className="bg-SYSTEM-black text-SYSTEM-white w-[120px] h-[46px] rounded-full flex items-center justify-center px-[20px] py-[13.5px]">
                                <Image src={writeIcon} alt="write_icon" width={24} height={24} className="mr-[8px]" />
                                글쓰기
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
