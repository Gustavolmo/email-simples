import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cartasDisparando from "../../assets/cartas-disparando.svg";
import emailSimplesLogo from "../../assets/email-simples-logo.svg";
import Button from "../shared/button";
import useAppStateStore from "@/state-store/app-state-store";

export default function LandingPageHeader() {
  const { setIsLoading, isLoading } = useAppStateStore();
  const { data: _, status } = useSession();
  const router = useRouter();

  const onSingIn = async () => {
    if (window.innerWidth < 1000) {
      return alert(
        `Email Simples não funciona com aparelhos celulares
        ou em telas menores do que 1000px de largura`
      );
    }
    
    setIsLoading(true);
    try {
      if (status === "authenticated") router.push("/compor");
      else await signIn("google", { callbackUrl: "/compor" });
    } catch (error) {
      console.error(error)
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-linear-gradient from-es-green to-es-yellow border-b-2 border-black">
      <section className="flex flex-col-reverse 2xl:flex-row justify-between p-8 md:p-20 max-w-[1800px] mx-auto">
        <article className={`text-white flex flex-col md:gap-12`}>
          <div className="mb-10">
            <Image src={emailSimplesLogo} alt="email-simples-logo" />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl md:text-3xl font-thin">
              Use uma <b>conta do Gmail</b> no log in
              <br className="hidden xs:block" />o <b>email logado fará envio</b>{" "}
              para os <b>destinatários</b> selecionados
            </p>
            <Button isLoading={isLoading} onMouseDown={onSingIn}>
              Iniciar
            </Button>
          </div>
        </article>

        <div className="px-12 mb-0 md:mb-[-128px] 2xl:mb-0">
          <Image
            className="-rotate-[32deg] 2xl:rotate-0 hidden md:block"
            src={cartasDisparando}
            alt="cartas-disparando"
          />
        </div>
      </section>
    </header>
  );
}
