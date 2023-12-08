import { X } from "lucide-react";
import React, { ReactNode } from "react";
import "tailwindcss/tailwind.css";

type Props = {
  close: () => void;
  children: ReactNode;
};

const Modal = ({ close, children }: Props) => {
  return (
    <div className=" bg-black/50 backdrop-blur-3xl h-screen absolute top-0 left-0 w-screen grid">
      <div className="p-8 relative bg-bg place-self-center shadow-2xl rounded-lg">
        <X className="absolute top-2 right-2" onClick={close} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
