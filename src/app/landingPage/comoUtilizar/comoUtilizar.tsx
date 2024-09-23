import Button from "@/app/shared/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ComoUtilizarSteps from "./comoUtilizarSteps";
import comoUtilizarText from "../../../assets/como-utilizar.png";
import Image from "next/image";
import B from "@/app/shared/b";
import one from "../../../assets/one.png";
import two from "../../../assets/two.png";
import three from "../../../assets/three.png";
import four from "../../../assets/four.png";
import five from "../../../assets/five.png";
import useAppStateStore from "@/state-store/app-state-store";

export default function ComoUtilizar() {
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
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <article className="flex flex-col gap-16">
      <div>
        <Image src={comoUtilizarText} alt="como-utilizar" />
      </div>

      <section>
        <ComoUtilizarSteps numberOrder={one}>
          Entre em contato para <B>registrar</B>
          <br className="hidden xs:block" />
          seu email <B>na lista de usuários</B>
        </ComoUtilizarSteps>

        <ComoUtilizarSteps numberOrder={two}>
          Clique no botão <B>iniciar</B> e
          <br className="hidden xs:block" />
          siga a página de <B>login do google</B>
        </ComoUtilizarSteps>

        <ComoUtilizarSteps numberOrder={three}>
          <B>Adicione</B> destinatários manualmente <B>ou</B>{" "}
          <br className="hidden xs:block" />
          faça o <B>upload</B> de uma <B>planilha excel</B>
        </ComoUtilizarSteps>

        <ComoUtilizarSteps numberOrder={four}>
          Crie o <B>título</B> e
          <br className="hidden xs:block" />
          <B>corpo</B> do seu email
        </ComoUtilizarSteps>

        <ComoUtilizarSteps numberOrder={five}>
          Aperte <B>enviar</B> e confira o status do envio no applicativo
          <br className="hidden xs:block" />e também <B>no seu Gmail</B>
        </ComoUtilizarSteps>
      </section>

      <Button isLoading={isLoading} onMouseDown={onSingIn} variant="yellow">
        Iniciar
      </Button>
    </article>
  );
}
