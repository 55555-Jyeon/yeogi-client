import kakaoIcon from "@/public/icons/kakao.svg"
import naverIcon from "@/public/icons/naver_icon 1.svg"
import googleIcon from "@/public/icons/google.svg"
import SocialLoginButton from "./socialLoginButton"
import { useState } from "react"
import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"

interface LoginLayoutProps {
    kakaoURL: string
    naverURL: string
    googleURL: string
    handleMoveSocialLogin: (url: string, provider: "kakao" | "google" | "naver") => void
}

const SocialLoginLayout = ({ kakaoURL, googleURL, handleMoveSocialLogin }: LoginLayoutProps) => {
    const [isStillWorkingModalOpen, setIsStillWorkingModalOpen] = useState(false)

    const handleNaverLoginClick = () => {
        setIsStillWorkingModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsStillWorkingModalOpen(false)
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center w-[496px] h-[454px] top-[308px] left-[712px] rounded-2xl bg-SYSTEM-else p-12">
                <div>
                    <div className="flex justify-center h-[64px] text-[44px] text-BRAND-70 font-myeongjo items-center">
                        Login
                    </div>
                    <div className="flex justify-center text-center pt-10 pb-8">
                        <div className="flex items-center w-full">
                            <div className="flex-grow h-[1px] bg-BRAND-30"></div>
                            <div className="flex-shrink-0 px-[10px] text-BRAND-70 font-myeongjo text-xs text-center justify-center items-center">
                                SNS로 간편하게 로그인하세요.
                            </div>
                            <div className="flex-grow h-[1px] bg-BRAND-30"></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <SocialLoginButton
                        icon={kakaoIcon}
                        text={"카카오톡으로 간편하게 로그인"}
                        bgColor="bg-SNS-kakao"
                        onClick={() => handleMoveSocialLogin(kakaoURL, "kakao")}
                    />
                    <SocialLoginButton
                        icon={naverIcon}
                        text={"네이버로 간편하게 로그인"}
                        bgColor="bg-SNS-naver"
                        // onClick={() => handleMoveSocialLogin(naverURL, "naver")}
                        onClick={handleNaverLoginClick}
                    />
                    <SocialLoginButton
                        icon={googleIcon}
                        text={"GOOGLE로 간편하게 로그인"}
                        bgColor="bg-SYSTEM-white"
                        onClick={() => handleMoveSocialLogin(googleURL, "google")}
                    />
                </div>
            </div>
            <StillWorkingOverlay isOpen={isStillWorkingModalOpen} onClick={handleCloseModal} />
        </div>
    )
}

export default SocialLoginLayout
