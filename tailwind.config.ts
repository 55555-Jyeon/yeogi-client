import type { Config } from "tailwindcss"
import { COLORS } from "./styles/color"
import { FONT_SIZE } from "./styles/font"
import { PluginAPI } from "tailwindcss/types/config"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                ...COLORS,
            },
            fontFamily: {
                myeongjo: ["var(--font-myeongjo)", "serif"],
                pretendard: ["var(--font-pretendard)", "sans-serif"],
            },
            fontSize: {
                ...FONT_SIZE,
            },
            boxShadow: {
                custom: "3px 4px 18px 0px #59595945",
                profile: "3px 4px 18px 0px rgba(107, 68, 29, 0.27)",
                polaroid: "3px 4px 18px 0 rgba(107, 68, 28, .27)",
                "polaroid-hover": "3px 4px 22px 0 rgba(107, 68, 28, .1)",
            },
            screens: {
                "3xl": "1680px",
                "4xl": "1850px",
                "5xl": "1920px",
            },
            extend: {},
            backgroundImage: {
                "post-pattern": "url(/images/post-bg.svg)",
                "comment-pattern": "url(/images/comment-bg_1.svg)",
                EATING: "url(/images/EATING.svg)",
                HOT_PLACE: "url(/images/HOT_PLACE.svg)",
                REST: "url(/images/REST.svg)",
                SHOPPING: "url(/images/SHOPPING.svg)",
                ACTIVITY: "url(/images/ACTIVITY.svg)",
                SIGHTSEEING: "url(/images/SIGHTSEEING.svg)",
                PACKAGE: "url(/images/PACKAGE.svg)",
                LUXURY: "url(/images/LUXURY.svg)",
                COST_SAVING: "url(/images/COST_SAVING.svg)",
                MAIN_SEARCH: "url(/images/search-bg.svg)",
                MAIN_POLAROID_LINE: "url(/images/line.svg)",
                SURVEY_IMAGE: "url(/images/subVisual.svg)",
            },
            scale: {
                "120": "1.2",
            },
            before: {
                circle: {
                    content: '""',
                    position: "absolute",
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#0c0c0c",
                    borderRadius: "50%",
                },
            },
        },
    },
    variants: {
        before: ["responsive"],
    },
    plugins: [
        function ({ addUtilities }: PluginAPI) {
            const newUtilities = {
                ".before-circle::before": {
                    content: '""',
                    position: "absolute",
                    width: "5px",
                    height: "5px",
                    backgroundColor: "#0c0c0c",
                    borderRadius: "50%",
                    top: "-4px",
                    left: "14px",
                    transform: "translate(-50%, -50%)",
                },
            }
            addUtilities(newUtilities, { respectPrefix: false, respectImportant: false })
        },
    ],
}
export default config
