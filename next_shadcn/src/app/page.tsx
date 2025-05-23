import ScrollObserve2 from "@/components/scroll/ScrollObserver2";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex justify-end w-full max-w-xs">
        <ScrollObserve2 />
      </div>
    </div>
  );
}
