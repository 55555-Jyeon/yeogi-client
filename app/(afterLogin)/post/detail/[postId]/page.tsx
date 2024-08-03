import { PostDetailProps } from "./type"
import PostDetailClient from "./_components/postDetailClient"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { fetchGetPostDetail, queryClient } from "@/libs/queryClient/postQueryClient"

const DetailPostPage = async ({ params }: PostDetailProps) => {
    const { postId } = params

    try {
        const initialPost = await fetchGetPostDetail(Number(postId))

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <PostDetailClient postId={Number(postId)} initialPost={initialPost} />
            </HydrationBoundary>
        )
    } catch {
        return (
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <p className="text-[100px]">🫥</p>
                <p className="text-xl text-BRAND-70">게시글 내용이 조금 기네요... 조금만 기다려주세요 </p>
            </div>
        )
    }
}
export default DetailPostPage
