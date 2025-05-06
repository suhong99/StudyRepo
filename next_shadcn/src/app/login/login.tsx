import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="flex items-center content-center">
      <Link href="login"> 모달이동</Link>
      <Link href="/modal"> 모달 테스트이동</Link>
    </div>
  );
};

export default LoginPage;
