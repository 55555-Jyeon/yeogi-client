"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useFormDataStore, usePostDataStore, useSelectionStore } from "@/libs/store"
import FormInputs from "@/app/(afterLogin)/createPost/_components/form/formInputs"
import { QuillEditor } from "@/app/(afterLogin)/createPost/_components/editor/editorQuill"
import FormBtn from "@/app/(afterLogin)/createPost/_components/form/formBtn"
import { useUpdateFreePost } from "@/hook/usePostMutation"
import { processContentImages } from "@/utils/commonFormUtils"
import { CreatePost } from "@/utils/type"
import SuccessToFailModal from "@/components/commons/successToFailModal"

const UpdatePostPage = () => {
    const { formData, setFormData, resetFormData } = useFormDataStore()
    const { postId, postDetail } = usePostDataStore()
    const { selectedContinent, selectedCountry, startDate, endDate, selectedAddress, selectedTheme } = useSelectionStore()
    const isEditMode = true
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [quillEditors, setQuillEditors] = useState<Array<{ content: string }>>([])
    const updatePostMutation = useUpdateFreePost()

    useEffect(() => {
        resetFormData()
        if (postDetail) {
            const initialQuillEditors =
                postDetail.shortPosts?.map(post => ({
                    content: post,
                })) || []
            setFormData({ ...postDetail})
            setQuillEditors(initialQuillEditors)
        }
    }, [postDetail, resetFormData, setFormData])

    const handleInputChange = <K extends keyof CreatePost>(field: K, value: CreatePost[K]) => {
        setFormData({ ...formData, [field]: value })
    }

    const handleEditorInputChange = (index: number, value: string) => {
        const updatedEditors = quillEditors.map((editor, i) => (i === index ? { ...editor, content: value } : editor))
        setQuillEditors(updatedEditors)
        handleInputChange(
            "shortPosts",
            updatedEditors.map(editor => editor.content),
        )
    }

    const handleAddMemoClick = () => {
        setQuillEditors([...quillEditors, { content: "" }])
    }

    const handleDeleteQuillEditor = (index: number) => {
        const updatedEditors = quillEditors.filter((_, i) => i !== index)
        setQuillEditors(updatedEditors)
    }

    const handleUpdatePost = async (postId: string) => {
        if (!postId) return

        let editedPost: Partial<CreatePost> = {
            title: formData.title || "",
            content: formData.content || "",
            continent: selectedContinent || "아시아",
            region: formData.region || selectedCountry!,
            tripStartDate: startDate ? startDate.toISOString() : "",
            tripEndDate: endDate ? endDate.toISOString() : "",
            shortPosts: [],
            address: formData.address || selectedAddress!,
            theme: formData.theme || selectedTheme!
        }

        if (formData.content) {
            const processedContent = await processContentImages(formData.content)
            editedPost = { ...editedPost, content: processedContent }
        } else if (formData.shortPosts) {
            const processedShortPosts = await Promise.all(
                quillEditors.map(async editor => {
                    const content = await processContentImages(editor.content)
                    return content
                }),
            )
            editedPost = { ...editedPost, shortPosts: processedShortPosts }
        }

        try {
            await updatePostMutation.mutateAsync({
                postId: parseInt(postId),
                editedFields: editedPost,
            })  
            setIsSubmitted(true)
            window.location.href = `/detailPost/${postId}`
        } catch {
            /* 성공실패 오버레이 적용 예정 */
            
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center mb-[205px]">
                <div className="w-[900px] h-full font-pretendard">
                    <FormInputs formText={formData.content ? "자유롭게 " :"간단하게 "} postDetail={formData} handleInputChange={handleInputChange} />
                    {formData.content ? (
                        <QuillEditor
                            index={0}
                            isFreeForm={true}
                            postDetail={formData}
                            handleInputChange={handleInputChange}
                        />
                    ) : (
                        quillEditors.map((_, index) => (
                            <QuillEditor
                                key={index}
                                index={index}
                                isFreeForm={false}
                                postDetail={{
                                    ...formData,
                                    shortPosts: quillEditors.map(e => e.content),
                                }}
                                handleDeleteQuillEditor={() => handleDeleteQuillEditor(index)}
                                handleEditorInputChange={handleEditorInputChange}
                            />
                        ))
                    )}
                    {!formData.content && (
                        <div
                            onClick={handleAddMemoClick}
                            className="w-[900px] h-[48px] my-[30px] flex flex-row justify-center items-center rounded-[61px] bg-SYSTEM-beige border-[1px] border-BRAND-50 cursor-pointer"
                        >
                            <Image width={24} height={24} src="/icons/plus-circle.svg" alt="add memo icon" />
                            <p className="text-sm text-BRAND-50 mx-2">메모 추가하기</p>
                        </div>
                    )}
                    <FormBtn postId={postId} handleUpdatePost={handleUpdatePost} />
                </div>
            </div>
            {isEditMode && isSubmitted && 
            <SuccessToFailModal title={"게시글 수정"} context={"수정된 내용이 적용되지 않았어요."} isOpen={false} onClick={() => setIsSubmitted(false)} state={"fail"} />
            }
        </>
    )
}

export default UpdatePostPage
