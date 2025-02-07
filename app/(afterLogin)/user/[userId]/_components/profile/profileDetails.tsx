"use client"

import StillWorkingOverlay from "@/components/commons/stillWorkingOverlay"
import { ProfileDetailsProps } from "./type"
import { useState } from "react"
import { usePinsQuery } from "@/libs/queryClient/pinQuery"
import { SelectedGender } from "@/app/auth/_components/signup/type"

const ProfileDetails = ({ ageRange, gender }: ProfileDetailsProps) => {
    const [isInProgress, setIsInProgress] = useState<boolean>(false)
    const displayGender = (gender: SelectedGender) => {
        if (gender === "M") return "남성"
        if (gender === "F") return "여성"
        return ""
    }

    const { data, isLoading } = usePinsQuery()

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <div className=" w-[1800px] flex items-center justify-end mr-[120px] mt-10 mb-[120px]">
                <div className="flex justify-end text-bg">
                    <button
                        onClick={() => setIsInProgress(true)}
                        className="bg-SYSTEM-white p-5 mr-6 rounded-2xl w-24 h-[120px] text-center"
                    >
                        취향 수정
                    </button>
                    <span className="bg-SYSTEM-white p-5 mr-6 rounded-2xl w-24 h-[120px] text-center">
                        {ageRange && <span>{ageRange}&nbsp;대</span>}
                        {gender && <span>{displayGender(gender)}</span>}
                    </span>
                    <span className="bg-SYSTEM-white p-5 rounded-2xl w-[156px] h-[120px] text-center">
                        나의 기록 핀 <br />
                        <span className="text-BRAND-50 font-semibold">{data?.length} 개</span>
                    </span>
                </div>
            </div>
            <StillWorkingOverlay isOpen={isInProgress} onClick={() => setIsInProgress(false)} />
        </>
    )
}

export default ProfileDetails
