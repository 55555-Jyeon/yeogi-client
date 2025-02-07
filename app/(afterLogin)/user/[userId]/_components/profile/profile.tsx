import Image from "next/image"
import { ProfileProps } from "./type"
import DefaultProfile from "@/public/images/user/sampleProfile.svg"
import DefaultBanner from "@/public/images/user/defaultBanner.svg"
const Profile = ({ userInfo, onEdit }: ProfileProps) => {
    return (
        <div className="w-full flex justify-center items-center relative">
            <div className="max-w-[2000px] w-full relative flex justify-center items-center">
                <div className="relative  w-full h-[440px] flex justify-center items-center overflow-hidden">
                    <Image
                        fill
                        src={userInfo.banner ? userInfo.banner : DefaultBanner}
                        alt="banner image"
                        className="object-cover"
                    />
                </div>
                <button
                    className="absolute top-[60px] right-[120px] bg-SYSTEM-black text-SYSTEM-white py-2 px-4 rounded-xl text-md font-medium"
                    onClick={onEdit}
                >
                    프로필 수정
                </button>
            </div>
            <div className="absolute max-w-[2000px] w-full top-[360px] flex flex-col items-center">
                <div className="absolute left-[120px] w-[240px] h-[240px] rounded-full border-[5px] bg-SYSTEM-white border-SYETEM-white shadow-profile overflow-hidden">
                    <Image
                        fill
                        src={userInfo.profile || DefaultProfile}
                        alt="profile image"
                        className="object-cover"
                        sizes="240"
                    />
                </div>
                <div className="w-full px-[400px] mt-36">
                    <h1 className="text-4xl font-semibold mb-4">{userInfo.nickname}</h1>
                    <p className="text-lg">{userInfo.motto}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile
