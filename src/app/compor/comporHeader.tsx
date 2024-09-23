import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import emailSimplesLogo from "../../assets/email-simples-logo.svg";
import Button from "../shared/button";

export default function ComporHeader() {
  const { data: session } = useSession();

  return (
    <nav className="bg-linear-gradient from-es-yellow to-es-green border-b-2 border-black">
      <div className="py-8 px-20 max-w-[1500px] mx-auto flex flex-col text-white">
        <Image src={emailSimplesLogo} alt="email-simples-logo" width={240} />

        <div className="text-xl font-light mb-6">
          <p>{session?.user?.email}</p>
        </div>
        <Button
          variant="yellow"
          className="!w-24 !h-8 !text-sm !px-4 !py-0 !rounded-md"
          onMouseDown={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </Button>
      </div>
    </nav>
  );
}
