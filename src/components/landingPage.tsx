import { signIn, signOut, useSession } from "next-auth/react";
import cartasDisparando from "../assets/cartas-disparando.svg";
import cartasCaindo from "../assets/cartas-caindo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const onSingIn = () => {
    if (status === "authenticated") router.push("/compor");
    else signIn("google", { callbackUrl: "/compor" });
  };

  return (
    <>
      <header className="bg-linear-gradient from-es-green to-es-yellow">
        <section className="flex flex-col-reverse 2xl:flex-row justify-between p-20 max-w-[1800px] mx-auto">
          <article className={`text-white`}>
            <div className="mb-10">
              <h1 className="text-9xl font-bold">Email Simples</h1>
              <h2 className="text-5xl font-light">Mala direta</h2>
            </div>

            <div className="text-3xl font-thin">
              <p>
                Use uma <b>conta do Gmail</b> no log in
              </p>
              <p>
                o <b>email logado fará envio</b> para os <b>destinatários</b>{" "}
                selecionados
              </p>
            </div>

            <button
              onMouseDown={onSingIn}
              className="mt-8 rounded-xl bg-es-blue px-8 py-4 text-2xl font-bold shadow-md"
            >
              Iniciar
            </button>
          </article>

          <div>
            <Image className="-rotate-45 2xl:rotate-0" src={cartasDisparando} alt="cartas-disparando" />
          </div>
        </section>
      </header>

      <div className="bg-es-blue">
        <main className="max-w-[1800px] mx-auto">
          <section className="flex p-20 pr-12 text-white justify-between">
            <article>
              <h1 className="text-7xl font-bold">Como utilizar</h1>
              <p className="mb-20 px-4 font-thin italic text-lg">
                *Os emails funcionam apenas com contas do google
              </p>

              <div className="flex items-end mb-10 gap-4">
                <p className="text-8xl font-bold opacity-20 w-24 text-center">
                  0.
                </p>
                <div className="text-2xl font-thin">
                  <p>
                    <b>Solicite accesso</b> ao grupo de usuários
                  </p>
                  <p>
                    pelo email <b>lmo.gustavo@gmail.com</b>
                  </p>
                </div>
              </div>

              <div className="flex items-end mb-10 gap-4">
                <p className="text-8xl font-bold opacity-20 w-24 text-center">
                  1.
                </p>
                <div className="text-2xl font-thin">
                  <p>
                    Clique no botão <b>iniciar</b> e
                  </p>
                  <p>
                    siga a página de <b>login do google</b>
                  </p>
                </div>
              </div>

              <div className="flex items-end mb-10 gap-4">
                <p className="text-8xl font-bold opacity-20 w-24">2.</p>
                <div className="text-2xl font-thin">
                  <p>
                    <b>Adicione</b> destinatários manualmente <b>ou</b>
                  </p>
                  <p>
                    faça o <b>upload</b> de uma <b>planilha excel</b>
                  </p>
                </div>
              </div>

              <div className="flex items-end mb-10 gap-4">
                <p className="text-8xl font-bold opacity-20 w-24">3.</p>
                <div className="text-2xl font-thin">
                  <p>
                    Crie o <b>título</b> e <b>corpo</b> do seu email
                  </p>
                </div>
              </div>

              <div className="flex items-end mb-20 gap-4">
                <p className="text-8xl font-bold opacity-20 w-24">4.</p>
                <div className="text-2xl font-thin">
                  <p>Aperte <b>enviar</b> e confira o status do envio no applicativo</p>
                  <p>e também <b>no seu Gmail</b></p>
                </div>
              </div>

              <button
                onMouseDown={onSingIn}
                className="mt-8 rounded-xl bg-es-yellow text-es-blue px-8 py-4 text-2xl font-bold shadow-md"
              >
                Iniciar
              </button>
            </article>

            <div className="hidden 2xl:block">
              <Image src={cartasCaindo} alt="cartas-caindo" />
            </div>
          </section>
        </main>
      </div>

      <div className="bg-neutral-900">
        <footer className="text-white max-w-[1800px] mx-auto p-20 pt-12">
          <h2 className="font-bold text-2xl">Email Simples</h2>

          <section className="flex gap-2 mb-4 text-lg">
            <p className="font-thin">Contato:</p>
            <a href="mailto:lmo.gustavo@gmail.com">lmo.gustavo@gmail.com</a>
          </section>

          <section className="underline text-lg">
            <p>
              <a href="/terms">Termos e Condições</a>
            </p>
            <p>
              <a href="/privacy">Política de Privacidade</a>
            </p>
          </section>
        </footer>
      </div>
    </>
  );
}
