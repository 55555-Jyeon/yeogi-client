import { Post } from "@/utils/type"

export type getPostProps = {
    searchType: "CONTENT" | "NICKNAME" | "REGION"
    searchString?: string
    sortCondition: "LIKES" | "VIEWS" | "RECENT"
}

export const initialFormData: Post = {
    continent: "",
    region: "",
    tripStarDate: "",
    tripEndDate: "",
    title: "",
    content: "",
    shortPosts: undefined,
    postId: 0,
    author: "",
    likeCount: 0,
    viewCount: 0,
    createdAt: "",
    modifiedAt: "",
}

export type postCommentProps = {
    content: string
    postId: number
}

export type getCommentProps = {
    postId: number
}

export type deleteCommentProps = {
    commentId: number
}

export type putCommentProps = {
    commentId: number
    content: string
    postId: number
}

export type commentIdProps = {
    commentId: number
}

export type fetchCommentProps = {
    postIds: number[]
}

export type postPinProps = {
    x: string
    y: string
    email: string
    postId: number
}

export type getPinProps = {
    email: string
}
