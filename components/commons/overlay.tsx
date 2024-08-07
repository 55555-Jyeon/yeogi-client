"use client"

import clsx from "clsx"
import Image from "next/image"
import { useEffect } from "react"
import { OverlayProps } from "./type"

/**
 * Overlay Component
 * @author: Gang
 * @param {boolean} isOpen - 오버레이의 표시 여부 제어
 * @param {Function} props.onClick - 오버레이를 닫을 때 호출되는 콜백함수 닫기 or 오버레이 바깥 클릭 시 닫힘
 * @param {ReactNode} props.children - 오버레이 내부에 표시될 내용
 * @param {string} props.text - 오른쪽 버튼에 표시될 텍스트
 * @param {string} props.imageUrl - 오른쪽 버튼에 표시될 이미지 URL
 * @param {string} props.textColor - 오른쪽 버튼 텍스트 색상
 * @param {string} props.leftText - 왼쪽 버튼에 표시될 텍스트
 * @param {string} props.leftImageUrl - 왼쪽 버튼에 표시될 이미지 URL
 * @param {string} props.leftTextColor - 왼쪽 버튼 텍스트 색상
 */

const Overlay = ({
    isOpen,
    onClick,
    handleOverlaySubmit,
    children,
    text,
    imageUrl,
    textColor,
    onLeftClick,
    leftText,
    leftImageUrl,
    title,
    rounded = "rounded-lg",
    isStillWorkingModal,
}: OverlayProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    if (!isOpen) return null

    const contentCss = clsx("bg-transparent shadow-xl w-auto mx-auto my-auto flex justify-center items-center")

    return (
        <div
            className={`font-pretendard fixed inset-0 flex justify-center items-center z-[999] ${isStillWorkingModal ? "bg-SYSTEM-beige bg-opacity-70" : "bg-SYSTEM-black bg-opacity-70"}`}
            onClick={onClick}
            aria-modal="true"
            role="dialog"
        >
            <div onClick={e => e.stopPropagation()} className="flex flex-col items-center">
                {leftImageUrl && <p className="text-sm font-bold text-SYSTEM-white pb-[30px]">{title}</p>}
                <div className={`${contentCss} ${rounded}`}>{children}</div>
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="w-1/2 flex flex-row items-center pt-2">
                        <div className="pt-2.5 pr-1">
                            {leftImageUrl && (
                                <Image src={leftImageUrl} alt="icon" width={24} height={24} className="pb-2.5" />
                            )}
                        </div>
                        <button onClick={onLeftClick} className={`text-sm ${textColor}`}>
                            {leftText}
                        </button>
                    </div>
                    <div onClick={handleOverlaySubmit} className="w-1/2 flex flex-row items-center justify-end pt-2">
                        <div className="pt-2.5 pr-1">
                            {imageUrl && <Image src={imageUrl} alt="icon" width={24} height={24} className="pb-2.5" />}
                        </div>
                        <button onClick={onClick} className={`text-sm ${textColor}`}>
                            {text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overlay
