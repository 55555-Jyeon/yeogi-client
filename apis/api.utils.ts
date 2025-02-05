import { getSession, signOut } from "next-auth/react"
import { reissueTokens } from "./auth/oauthApi"

export const fetchFormAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const session = await getSession()

    const response = await fetch(`${api}${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
            ...options.headers,
        },
        credentials: "include",
    })
    return response
}

export const fetchFormAPINotToken = async (api: string, endPoint: string, options: RequestInit) => {
    const response = await fetch(`${api}${endPoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    })
    return response
}

export const fetchFormMultipartAPI = async (api: string, endPoint: string, options: RequestInit) => {
    const token = await getSession()
    const headers = new Headers(options.headers)
    headers.set("Authorization", `Bearer ${token?.accessToken}`)
    headers.delete("Content-Type")
    const url = `/${api}${endPoint ? `/${endPoint}` : ""}`.replace(/\/+/g, "/")
    const response = await fetch(url, {
        ...options,
        headers: headers,
        credentials: "include",
    })
    if (!response.ok) {
        throw new Error("유저의 이미지가 변경되지 못했어요...🥹")
    }
    return response
}

export const fetchWithTokenRefresh = async (url: string, options: RequestInit) => {
    const token = await getSession()
    let response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token?.accessToken}`,
        },
    })

    if (response.status === 401) {
        try {
            const newTokens = await reissueTokens()
            response = await fetch(url, {
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: `Bearer ${newTokens.accessToken}`,
                },
            })
        } catch {
            await signOut({ redirect: false })
            throw new Error("이런! 인증에 실패했습니다, 다시 로그인해주세요. 😔")
        }
    }

    return response
}

export const fetchServerSide = async (endPoint: string, options: RequestInit = {}, queryParams?: URLSearchParams) => {
    if (typeof window === "undefined") {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

        if (!baseUrl) {
            throw new Error("어라라, window의 타입이 뭔가 이상해요! 🫣")
        }
        let fullUrl = `${baseUrl}${endPoint}`

        if (queryParams) {
            fullUrl += `?${queryParams.toString()}`
        }
        const response = await fetch(fullUrl, options)
        return response
    }
    return null
}
