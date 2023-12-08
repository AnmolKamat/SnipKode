"use client";
import { Modal } from "@/Components";
import queries from "@/Utils/Queries";
import { useMutation } from "@apollo/client";
import { Home, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
type Props = {};

const New = (props: Props) => {
  const [code, setCode] = useState("");
  const [key, setKey] = useState("");
  const router = useRouter();
  const [fieldError, setFieldError] = useState({ key: false, code: false });
  const [modalData, setModalData] = useState<ReactNode | null>();
  const [AddCodeMutation, { data, error, loading }] = useMutation(
    queries.ADD_CODE
  );

  useEffect(() => {
    if (data) {
      if (data.addCode === "Key Already exists")
        setModalData(<p>Key Already in use</p>);
      if (data.addCode === "added the Code") {
        window.navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_APP_URL!}/${key}`
        );
        setModalData(
          <>
            <p>
              Added the code <b>Key : {key}</b>
            </p>
            <p>Copied To Clipboard</p>
          </>
        );
        setKey("");
        setCode("");
      }
    }
    if (error) {
      setModalData(<p>Error while adding code</p>);
      console.log(error);
    }
    if (loading)
      setModalData(
        <p>
          <ClipLoader color="#00ff7b" />
        </p>
      );
  }, [data, error, loading]);
  const handleSave = async () => {
    const error = { key: false, code: false };
    if (key === "" || code === "") {
      if (key === "") error.key = true;
      if (code === "") error.code = true;
      setFieldError(error);
      return;
    }
    AddCodeMutation({ variables: { key: key.toLowerCase(), code } });
  };
  return (
    <div className=" items-center h-screen relative">
      <div className="flex gap-4 items-center w-[60vw] mx-auto">
        <button
          className="p-2 bg-primary/60 border border-primary w-fit  h-fit rounded-full"
          onClick={() => router.back()}
        >
          <Home strokeWidth={1.4} />
        </button>
        <h1 className="text-3xl font-thin">
          Create New <span className="text-primary">Snip Code</span>
        </h1>
      </div>
      <div className="mx-auto w-fit flex flex-col gap-4 shadow-2xl shadow-slate-950 border border-secondary mt-16 p-3 h-fit rounded-lg">
        <div className="flex w-full justify-between">
          <div className=" flex flex-col gap-2 ">
            <label htmlFor="">Key</label>
            <input
              placeholder="enter the key"
              className={`w-72 bg-bg outline-none border hover:brightness-150 px-2 py-3 focus:brightness-150 rounded-lg shadow-2xl shadow-slate-950 ${
                fieldError.key ? "border-red-600" : "border-primary "
              }`}
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <button
            className=" w-24 py-3 bg-primary/40 border border-primary flex justify-around h-fit rounded-lg shadow-2xl shadow-slate-950"
            onClick={handleSave}
          >
            Save <Save />
          </button>
        </div>
        <label htmlFor="">Code</label>
        <textarea
          className={`border border-primary w-[60vw] h-[60vh] block outline-none p-2 rounded-lg   bg-bg shadow-2xl shadow-slate-950 ${
            fieldError.code ? "border-red-600" : "border-primary "
          }`}
          placeholder="Enter the code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      {modalData && <Modal close={() => setModalData(null)}>{modalData}</Modal>}
    </div>
  );
};

export default New;
