"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Chat from "./components/Chat";


export default function Home() {

  return (
    <>
      <main className="flex flex-col h-screen bg-[#040d17] text-white">
        <nav className="flex justify-between items-center p-4">
          <Image
            src="/logo.png"
            alt="MugiwaraAI Logo"
            width={400}
            height={150}
          />
          <h1 className=" text-2xl font-semibold lowercase">
            AI Chatbot inspired by {" "}
            <span className="highlighted-text"> one piece </span>
          </h1>
          <h1 className=" text-sm font-semibold lowercase">
            Developed By hlk {" "}
          </h1>
        </nav>
        <div className="flex-grow overflow-hidden">
          <Chat />
        </div>
      </main>
    </>
  );
}
