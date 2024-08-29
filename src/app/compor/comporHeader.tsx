"use client";
import { useSession } from "next-auth/react";

export default function ComporHeader() {
  const { data: session } = useSession();

  return (
    <nav className="bg-linear-gradient from-es-green to-es-yellow">
      <div className="py-4 px-20 max-w-[1800px] mx-auto flex flex-col items-left text-white">
        <a href="/" className="text-3xl font-bold">
          Email Simples
        </a>

        <div className="text-xl font-thin">
          <p>{session?.user?.email}</p>
        </div>
      </div>
    </nav>
  );
}
