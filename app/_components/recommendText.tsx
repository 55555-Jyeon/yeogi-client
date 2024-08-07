const RecommendText = () => {
    return (
        <div className="w-[458px] break-keep xl:pb-5">
            <p className="text-[28px] xl:text-md sm:text-sm text-GREY-50 font-myeongjo py-2.5">
                Suggested trip records
            </p>
            <h1 className="text-[44px] xl:text-xl sm:text-[30px] font-myeongjo">
                '여기'에서는 <br /> 사용자 <span className="text-BRAND-50">여행 취향</span>에 맞는 기록을 추천하고
                있어요.
            </h1>
            <p className="text-bg xl:text-sm sm:text-sm py-6">
                간단한 취향 검사를 통해 <br /> 여행 취향을 확인하고 추천 기록을 확인하세요!
            </p>
        </div>
    )
}
export default RecommendText
