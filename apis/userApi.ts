import { fetchFormAPI, fetchFormMultipartAPI, fetchServerSide } from "./api.utils"
import { MyUserInfoType, EditUserInfoType } from "@/types/user"

const USER_API_URL = "/member"

export const getUserInfo = async () => {
    const serverResponse = await fetchServerSide("/api/member/me", { method: "GET" })
    if (serverResponse) {
        return serverResponse.json()
    }

    const response = await fetchFormAPI(USER_API_URL, "/me", { method: "GET" })
    if (!response.ok) {
        throw new Error("response not ok")
    }
    const data = await response.json()
    return data as MyUserInfoType
}

/**
 * @function putUserInfo
 * @param userInfo 수정되지 않을 유저의 정보
 * @param editedUserInfo 수정될 유저의 정보 (nickname & motto)
 * @returns 수정된 유저의 정보
 */
export const putUserInfo = async (
    userInfo: MyUserInfoType,
    editedUserInfo: EditUserInfoType,
): Promise<MyUserInfoType> => {
    const updatedInfo = {
        ...userInfo,
        ...editedUserInfo,
        id: userInfo.id,
        image: typeof editedUserInfo.profile === "string" ? editedUserInfo.profile : userInfo.profile,
        banner: typeof editedUserInfo.banner === "string" ? editedUserInfo.banner : userInfo.banner,
    }
    const response = await fetchFormAPI(USER_API_URL, "", {
        method: "PUT",
        body: JSON.stringify(updatedInfo),
    })
    if (!response.ok) throw new Error("유저 정보 수정에 실패했어요...🥹")
    const responseData = await response.json()
    return responseData
}

/**
 * @function putUserProfileImage
 * @param profileImage 수정될 유저의 프로필 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserProfileImage = async (image: File): Promise<{ image: string }> => {
    const formData = new FormData()
    formData.append("image", image)
    const response = await fetchFormMultipartAPI(USER_API_URL, "profileImage", {
        method: "PUT",
        body: formData,
    })
    if (!response.ok) throw new Error("유저의 프로필 이미지가 변경되지 못했어요...🥹")
    const responseText = await response.text()

    // 응답이 JSON인지 확인
    try {
        const updatedProfile = JSON.parse(responseText)
        if (typeof updatedProfile.image === "string") {
            return { image: updatedProfile.image }
        } else {
            throw new Error("서버에서 잘못된 형식의 이미지 URL을 반환했습니다...")
        }
    } catch (error) {
        // JSON이 아니라면, 텍스트가 URL인지 확인
        if (responseText.startsWith("http")) {
            return { image: responseText }
        } else {
            throw new Error("서버에서 예상치 못한 응답 형식을 반환했습니다...")
        }
    }
}

/**
 * @function putUserBannerImage
 * @param image 수정될 유저의 배너 이미지 url
 * @returns 수정된 유저의 정보
 */
export const putUserBannerImage = async (image: File): Promise<{ image: string }> => {
    const formData = new FormData()
    formData.append("image", image)
    const response = await fetchFormMultipartAPI(USER_API_URL, "banner", {
        method: "PUT",
        body: formData,
    })
    if (!response.ok) throw new Error("유저의 배너 이미지가 변경되지 못했어요...🥹")
    const responseText = await response.text()
    try {
        const updatedBanner = JSON.parse(responseText)
        if (typeof updatedBanner.image === "string") {
            return { image: updatedBanner.image }
        } else {
            throw new Error("서버에서 잘못된 형식의 이미지 URL을 반환했습니다...")
        }
    } catch (error) {
        if (responseText.startsWith("http")) {
            return { image: responseText }
        } else {
            throw new Error("서버에서 예상치 못한 응답 형식을 반환했습니다...")
        }
    }
}
