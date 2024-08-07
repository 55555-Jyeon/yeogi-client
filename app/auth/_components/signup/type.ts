export type SelectedGender = "F" | "M"
export type SignupFormData = {
    email: string
    password: string
    confirmPassword: string
    nickname: string
    age?: string
    gender?: SelectedGender | ""
}
export type GenderSelectProps = {
    selectedGender: SelectedGender | ""
    onGenderChange: (selectedGender: SelectedGender) => void
}

export type SocialSignupRequest = {
    memberId: number
    nickname: string
    ageRange: string
    gender: SelectedGender
}

export type SocialSignupCheckExists = {
    nickname: string
}
