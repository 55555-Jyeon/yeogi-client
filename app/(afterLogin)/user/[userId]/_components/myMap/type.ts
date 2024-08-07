import { MouseEvent as ReactMouseEvent } from "react"

export type MapProps = {
    user: UserInfo
    movingPins: WorldPost[]
    setMovingPins: (pins: WorldPost[]) => void
    pinCount: number
    setPinCount: (count: number) => void
}

export type UserInfo = {
    email: string
    nickname: string
}

export type WorldPostPin = {
    pin: Pin
    email: string
    nickname: string
    postId: number
}

export type Pin = {
    x: string
    y: string
    email: string
    postId: number
}

export type WorldPost = {
    id: number
    title: string
    content: string
    thumbnail: string
    pin: Pin
}

export type PinProps = {
    post: WorldPost
    isUpdate: boolean
    selectedPin: WorldPost | null
    onClick: (post: WorldPost, e: ReactMouseEvent<HTMLImageElement>) => void
}

export type HandleMapClickProps = {
    e: ReactMouseEvent<HTMLImageElement>
    isUpdate: boolean
    pinCount: number
    movingPins: WorldPost[]
    pins: WorldPost[]
    setSelectedPin: (pin: WorldPost | null) => void
    setPins: (pins: WorldPost[]) => void
    setMovingPins: (pins: WorldPost[]) => void
    userInfo: UserInfo
}
