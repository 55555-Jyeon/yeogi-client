import { LeftGroup, RightGroup } from "./mainImages"

const MainIntro = () => {
    return (
        <div className="relative w-full h-fit max-h-[980px] flex flex-row">
            <LeftGroup />
            <div className="absolute flex flex-col justify-center items-center w-full h-full z-10 top-[-14%] xl:top-[-80px] font-myeongjo">
                <p className="2xl:text-xl xl:text-[28px] md:text-bg sm:text-lg text-GREY-80 opacity-50">
                    Record Your Trip
                </p>
                <p className="2xl:text-title xl:text-[120px] md:text-[100px] sm:text-[80px]">여기,</p>
            </div>
            <RightGroup />
            <div className="absolute w-[490px] md:w-[320px] sm:w-[280px] right-[150px] xl:right-[13%] md:right-[6%] sm:right-[8%] bottom-0 md:bottom-[2%] sm:bottom-[12%]">
                <p className="font-myeongjo 2xl:text-[40px] xl:text-[36px] md:text-[30px] sm:text-lg break-keep">
                    <span className="font-semibold relative before-circle">여</span>행을{" "}
                    <span className="font-semibold relative before-circle">기</span>록하다
                </p>
                <p className="text-lg xl:text-bg sm:text-md break-keep w-[489px]">
                    여기는 세계 곳곳의 추억들을 한 곳에서 공유할 수 있도록 마련된 공간입니다.
                </p>
            </div>
        </div>
    )
}
export default MainIntro
