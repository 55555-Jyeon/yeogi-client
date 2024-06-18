import { fetchFormAPI } from "../utils/fetchFormAPI"
import { getPinProps, postPinProps } from "./type"

const MAP_API_URL = "/pins"

/**
 * @function
 * @param {getPinProps} string - user email
 * @description 사용된 핀을 가져오는 api
 */
export const getPin = async ({ email }: getPinProps) => {
    const response = await fetchFormAPI(MAP_API_URL, `pins/${email}`, { method: "GET" })
    const data = await response.json()
    return data
}

/**
 * @function
 * @param {postPinProps} props.postPinProps - pin
 * @description 사용된 핀을 가져오는 api
 */
export const postPin = async (pin: postPinProps) => {
    const response = await fetchFormAPI(MAP_API_URL, "pin", {
        method: "POST",
        body: JSON.stringify(pin),
    })
    try {
        const data = await response.json()
        return data
    } catch {
        throw new Error("json 파싱 오류입니다...🥹")
    }
}
