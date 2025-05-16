import FloatingBtn2 from "./FloatingBtn2";

const ScrollObserve2 = () => {
  return (
    <div className="relative flex flex-col">
      <div className="h-[3000px] bg-yellow-100">스크롤해보세요</div>
      <FloatingBtn2 />
      <div className="h-[2000px] bg-pink-200">이후 영역</div>
    </div>
  );
};

export default ScrollObserve2;
