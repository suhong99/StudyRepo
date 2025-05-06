import Link from "next/link";

const ModalPage = () => {
  return (
    <div className="flex items-center content-center">
      <Link href="login"> 모달이동</Link>
      <Link href="/login"> 로그인인데 다르려나</Link>
    </div>
  );
};

export default ModalPage;
