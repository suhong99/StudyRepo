import SunguPage from "@/components/scroll-2/SunguPage";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen ">
      <div className="flex justify-between items-center sticky top-0 w-full z-20 max-w-maxw bg-red-200 h-16">
        헤더 입니다
      </div>

      <div className="w-full max-w-[700px] mx-auto items-center bg-amber-100">
        <SunguPage />
      </div>
    </div>
  );
}
