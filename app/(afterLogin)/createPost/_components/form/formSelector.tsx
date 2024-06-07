import React, { FC } from "react"
import { FormSelectorProps } from "../type"

const FormSelector: FC<FormSelectorProps> = ({ onClick, label }) => (
    <button
        onClick={onClick}
        className="rounded-[12px] p-8 w-[440px] h-[80px] bg-SYSTEM-white text-GREY-80 flex items-center justify-between"
    >
        <div>
            <span className="text-[#ff2323] mr-4">*</span>
            {label}
        </div>
        <span>&gt;</span>
    </button>
)

export default FormSelector