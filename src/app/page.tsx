"use client";
import { Modal } from "@/Components";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const App = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleClose = () => setShowModal(false);
  const [key, setKey] = useState("");
  return (
    <div className="flex items-center h-screen relative">
      <div className=" flex justify-around w-full items-center">
        <div>
          <h1 className="font-thin text-6xl  my-6 text-center">
            Snip <span className="text-primary">Code</span>
          </h1>
          <div className="backdrop-blur-lg h-fit border border-white rounded-lg flex flex-col p-8 items-center gap-6 shadow-2xl shadow-slate-950">
            <h1 className=" font-bold text-2xl">Welcome User</h1>
            <div className="flex gap-6">
              <button
                className=" bg-primary/40 backdrop-blur-lg text-white w-64 px-4 py-2 rounded-md border-2 border-primary text-lg font-bold"
                onClick={() => setShowModal(true)}
              >
                Open Existing
              </button>
              <Link href="/new">
                <button className=" bg-primary/40 backdrop-blur-lg text-white w-64 px-4 py-2 rounded-md border-2 border-primary text-lg font-bold">
                  Create New
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          {/* Illustration */}
          <Image
            src="/Home/ill.svg"
            height={600}
            width={600}
            alt="Illustration Home"
          />
        </div>
      </div>
      {showModal && (
        <Modal close={handleClose}>
          <div className="flex flex-col">
            <label htmlFor="">Key</label>
            <div className="rounded-full border border-secondary overflow-hidden flex  justify-between p-1 ">
              <input
                type="text"
                placeholder="Enter key"
                className="w-64 bg-bg p-2 focus:outline-0 focus:bottom-0"
                onChange={(e) => setKey(e.target.value)}
                autoFocus
                onKeyUp={(e) => {
                  if (e.key === "enter" || e.keyCode === 13) router.push(key);
                }}
              />
              <button
                className=" rounded-full p-2 bg-primary shadow-xl shadow-slate-950"
                onClick={() => router.push(key)}
              >
                <MoveRight />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
export default App;
