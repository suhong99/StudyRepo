import { useEffect, useRef, useState } from "react";

// iframe으로 적용시키려면 해당 페이지가 작동가능해져야함
const Iframe = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 iframe 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          padding: "12px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "9999px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        검색하기
      </button>

      {open && (
        <embed
          type="text/html"
          src="https://terms.naver.com/"
          width={230}
          height={400}
          style={{
            position: "absolute",
            bottom: 0,
            right: "100%",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            backgroundColor: "white",
          }}
        />
      )}
    </div>
  );
};

export default Iframe;
