import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { postMemberCheckExists } from "@/apis/auth/socialSignup"

const useCheckNicknameExists = () => {
    const [message, setMessage] = useState<string | null>(null)

    const mutation = useMutation({
        mutationKey: ["checkNickname"],
        mutationFn: postMemberCheckExists,
        onSuccess: (nickname: { nicknameExists: boolean }) => {
            if (nickname.nicknameExists === true) {
                setMessage("이미 사용 중인 닉네임입니다")
            } else {
                setMessage("사용 가능한 닉네임입니다")
            }
        },
        onError: (error: Error) => {
            setMessage(error.message)
        },
    })

    const checkNickname = (nickname: string) => {
        setMessage(null)
        mutation.mutate(nickname)
    }
    return { checkNickname, message, isLoading: mutation }
}

export default useCheckNicknameExists
