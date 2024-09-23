import { useEffect, useRef } from "react";
import { sendEmail } from "../api/sendEmail";
import { useSession } from "next-auth/react";
import ComporSectionContainer from "./comporSectionContainer";
import Tooltip from "../shared/tooltip";
import Button from "../shared/button";
import B from "../shared/b";
import useEmailEditorStore from "@/state-store/email-editor-store";
import EditorControls from "./editorControls";

export default function EmailEditor() {
  const { data: session } = useSession();
  const editorRef = useRef<HTMLDivElement>(null);
  const {
    assunto,
    corpoDoEmail,
    base64Image,
    setAssunto,
    setCorpoDoEmail,
    setEditorRef,
  } = useEmailEditorStore();

  useEffect(() => {
    setEditorRef(editorRef);
  }, [setEditorRef, editorRef]);

  const handleAssuntoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssunto(e.target.value);
  };

  const handleCorpoChange = (e: React.FormEvent<HTMLDivElement>) => {
    setCorpoDoEmail((e.target as HTMLDivElement).innerHTML);
  };

  const sendTestEmail = async () => {
    const images = editorRef?.current?.querySelectorAll("img");
    if (images && images.length > 1) {
      alert("O email supporta no máximo 1 imagem");
      return;
    }
    if (assunto === "") {
      alert("O assunto não pode estar vazio");
      return;
    }
    if (corpoDoEmail === "") {
      alert("O corpo do email não pode estar vazio");
      return;
    }

    let emailCopy: string = "";
    const imageTag = editorRef?.current?.querySelector("img");

    if (imageTag) {
      const emailCopyWrapper = document.createElement("div");
      emailCopyWrapper.innerHTML = editorRef?.current?.innerHTML || "";

      const clonedImageTag = emailCopyWrapper.querySelector("img");
      if (clonedImageTag) {
        clonedImageTag.src = "cid:unique-image";
        clonedImageTag.style.display = "flex";
        clonedImageTag.style.alignSelf = "center";
      }
      emailCopy = emailCopyWrapper.innerHTML;
    }

    const testEmailGuest = {
      name: session!.user!.name!,
      email: session!.user!.email!,
    };

    await sendEmail(
      testEmailGuest,
      assunto,
      emailCopy || corpoDoEmail,
      imageTag ? base64Image : ""
    );
  };

  return (
    <>
      <ComporSectionContainer className="flex flex-col gap-8">
        <div className="flex items-left gap-6 items-center">
          <Button
            onMouseDown={async () =>
              await navigator.clipboard.writeText("##guest##")
            }
            variant="neutral"
            className="!w-44 !px-3 !py-2 !rounded-md !text-sm"
          >
            <input
              readOnly
              className="bg-es-neutral w-20 focus:outline-none"
              value={"##guest##"}
            />
            | Copiar
          </Button>{" "}
          <Tooltip position="right" title="Adicionando o nome do convidado">
            Coloque o texto <B>##guest##</B> onde você deseja ter o nome do
            recipiente no corpo do email
          </Tooltip>
        </div>

        <section>
          <input
            className="w-full px-6 py-2 border border-black bg-white focus:outline-none focus:shadow-retro-4x4 transition-all"
            placeholder="assunto"
            type="text"
            name="assunto"
            id="assunto"
            onChange={handleAssuntoChange}
          />

          <EditorControls />

          <div
            className="min-h-[600px] py-10 px-20 text-[16px] bg-white border border-black focus:outline-none focus:shadow-retro-4x4 transition-all"
            id="email-editor"
            contentEditable
            ref={editorRef}
            onInput={handleCorpoChange}
          />
        </section>

        <div className="p-2 flex items-center justify-end gap-6">
          <Tooltip position="left" title="Envio teste">
            Selecione para enviar <B>1 convite</B>
            <br /> para o seu próprio email como teste e
            <br /> conferir se o formato está satisfatório
          </Tooltip>
          <Button
            className="!p-2 !px-4 !w-52 !text-lg !rounded-md"
            variant="neutral"
            onMouseDown={sendTestEmail}
          >
            Teste
          </Button>
        </div>
      </ComporSectionContainer>
    </>
  );
}
