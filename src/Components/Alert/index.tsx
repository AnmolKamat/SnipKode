"use client";
import React, { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
  time?: number;
  onTime?: () => void;
};

const Alert = ({ children, time, onTime }: Props) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
        onTime && onTime();
      }, time || 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible, time]);
  return (
    <>
      {visible && (
        <div className="bg-primary/40 border border-primary rounded-lg w-fit h-fit p-2">
          {children}
        </div>
      )}
    </>
  );
};

export default Alert;
