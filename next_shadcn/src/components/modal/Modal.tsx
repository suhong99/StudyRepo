import Link from "next/link";
import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

export function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg">
        <Link href="-1">Close modal</Link>

        {children}
      </div>
    </div>
  );
}
