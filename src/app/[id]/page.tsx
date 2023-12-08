"use client";
import { Alert, Modal } from "@/Components";
import queries from "@/Utils/Queries";
import { useQuery } from "@apollo/client";
import { Copy, Home, Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};

const Code = ({ params }: Props) => {
  const key = params.id;
  const { data, loading } = useQuery(queries.GET_CODE, {
    variables: { key: key.toLowerCase() },
  });

  const [showAlert, setShowAlert] = useState<string | null>(null);
  const handleLinkCopy = () => {
    window.navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/${key}`
    );
    setShowAlert("Link Copied to Clipboard");
  };
  const handleCodeCopy = () => {
    window.navigator.clipboard.writeText(data && data.getCode.code);
    setShowAlert("Code Copied to clipboard");
  };
  const router = useRouter();
  if (data && !data.getCode.code) {
    return (
      <Modal close={() => router.back()}>
        <p>Key Does not exist</p>
      </Modal>
    );
  }
  return (
    <div>
      <div className="w-[60vw] mx-auto flex justify-between pt-4 items-center">
        <h1 className="text-3xl font-thin">
          Snip <span className="text-primary">Code</span>
        </h1>
        <div className="flex gap-4">
          <button
            className="bg-primary/60 border border-primary rounded-full h-fit w-fit p-2"
            onClick={() => router.push("/")}
          >
            <Home />
          </button>
          <button
            className="bg-primary/60 border border-primary p-2 flex rounded-lg"
            onClick={() => router.replace("new")}
          >
            New <Pen />
          </button>
        </div>
      </div>
      <div className="w-[60vw] border border-secondary rounded-lg shadow-2xl shadow-slate-950 h-[60vh] mx-auto mt-24 p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-thin">Key : {key}</h1>
          <div className="flex gap-4">
            <button
              className="bg-primary/60 border border-primary p-2 flex rounded-lg w-36 justify-between"
              onClick={handleCodeCopy}
            >
              Copy Code <Copy />
            </button>
            <button
              className="bg-primary/60 border border-primary p-2 flex rounded-lg w-36 justify-between"
              onClick={handleLinkCopy}
            >
              Copy Link <Copy />
            </button>
          </div>
        </div>
        <div className="border border-secondary rounded-lg shadow-2xl shadow-slate-950 h-[53vh] mt-4 p-2 overflow-y-scroll">
          {data && data.getCode.code}
        </div>
      </div>
      {showAlert && (
        <Alert onTime={() => setShowAlert(null)}>{showAlert}</Alert>
      )}
    </div>
  );
};

export default Code;
