import { ThemeProps } from "@/app/_components/type"
import { Continent } from "@/constants/continents"
import { CreatePost, ShortPosts } from "@/utils/type"
import { Dayjs } from "dayjs"

export type CreatePostState = {
    // formData 관련 상태
    formData: CreatePost
    posts: CreatePost[]
    quillEditors: ShortPosts[]
    setFormData: (data: CreatePost) => void
    setPosts: (posts: CreatePost[]) => void
    setQuillEditors: (editors: ShortPosts[]) => void
    resetFormData: () => void

    // selection 관련 상태
    selectedContinent: Continent | null
    selectedCountry: string | null
    startDate: Dayjs | null
    endDate: Dayjs | null
    selectedTheme: ThemeProps[]
    selectedAddress: string | null
    setSelectedContinent: (continent: Continent | null) => void
    setSelectedCountry: (country: string | null) => void
    setStartDate: (date: Dayjs | null) => void
    setEndDate: (date: Dayjs | null) => void
    setSelectedTheme: (themeList: ThemeProps[]) => void
    setSelectedAddress: (address: string) => void

    // 전체 상태 초기화 함수
    resetAll: () => void
}

export type PostDataState = {
    postId: string | null
    postDetail: CreatePost | null
    setPostId: (postId: string | null) => void
    setPostDetail: (postDetail: CreatePost | null) => void
}

export type MapStore = {
    pinCount: number
    incrementPinCount: () => void
    decrementPinCount: () => void
}

export type CommentState = {
    saveCommentId: number
    setSaveCommentId: (saveCommentId: number) => void
}

export type ModalStore = {
    showLoginModal: boolean
    openLoginModal: () => void
    closeModal: () => void
    isDelete: boolean
    setIsDelete: (isDelte: boolean) => void
}

export type UpdateCommentState = {
    isUpdateComment: boolean
    setIsUpdateComment: (isUpdateComment: boolean) => void
}

export type CreateCommentProps = {
    id: number
    content: string
    nickname: string
    likeCount: number
    createdAt: string
    postId: number
}

export type CreateCommentState<> = {
    comments: CreateCommentProps[]
    setComments: (comments: CreateCommentProps[]) => void
    addComment: (newComment: CreateCommentProps) => void
    updateComment: (updateComment: CreateCommentProps) => void
}

export type ThemeState = {
    showResult: boolean
    setShowResult: (value: boolean) => void
    topTags: ThemeProps[]
    setTopTags: (tags: ThemeProps[]) => void
}
