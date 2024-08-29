"use client";
import {
  centerAlignmentIcon,
  imageIcon,
  leftAlignmentIcon,
  rightAlignmentIcon,
} from "@/assets/icons/hero-icons";
import useComporStore, { Recipient } from "@/state-store/compor/compor-store";
import { RefObject, useCallback, useRef, useState } from "react";
import { sendEmail } from "../api/send/sendEmail";
import { useSession } from "next-auth/react";

export default function EmailEditor() {
  const { data: session } = useSession();

  const [base64Image, setBase64Image] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    failedEmail,
    successEmail,
    guestList,
    assunto,
    corpoDoEmail,
    sendingEmail,
    updateFailedEmails,
    updateSuccessEmails,
    setAssunto,
    setCorpoDoEmail,
    updateSendingEmail,
  } = useComporStore();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorIndicatorLetterRef = useRef<HTMLParagraphElement>(null);

  const handleAssuntoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssunto(e.target.value);
  };

  const handleCorpoChange = (e: React.FormEvent<HTMLDivElement>) => {
    setCorpoDoEmail((e.target as HTMLDivElement).innerHTML);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) insertImage(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleProxyUploadClick = (
    fileInputRef: RefObject<HTMLInputElement>
  ) => {
    if (editorRef.current?.querySelector("img")) {
      setErrorMessage("Máximo de 1 imagem por email");
      alert("Máximo de 1 imagem por email");
      return;
    }
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const insertImage = (file: File) => {
    if (file.type !== "image/png") {
      setErrorMessage("Apenas images tipo .PNG são suportadas");
      alert("Apenas images tipo .PNG são suportadas");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage("Seu arquivo deve ter menos de 9MB");
      alert("Seu arquivo deve ter menos de 9MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      setBase64Image(e.target?.result as string);

      const img = document.createElement("img");
      img.src = e.target?.result as string;
      img.alt = "email-image";
      img.style.width = "120px";
      img.style.margin = "0 auto";

      const emailEditor = editorRef.current;
      if (emailEditor) emailEditor.append(img);
    };
    reader.readAsDataURL(file);
  };

  const applyFontFormat = useCallback(
    (fontName: string, value: any | undefined = undefined) => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand(fontName, false, value);
        setCorpoDoEmail(editorRef.current.innerHTML);
      }
    },
    [setCorpoDoEmail]
  );

  const applyAlignment = useCallback(
    (alignment: "justifyLeft" | "justifyCenter" | "justifyRight") => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("formatBlock", false, "div");
        document.execCommand("justifyLeft", false, undefined);
        document.execCommand("justifyCenter", false, undefined);
        document.execCommand("justifyRight", false, undefined);
        document.execCommand(alignment, false, undefined);
        setCorpoDoEmail(editorRef.current.innerHTML);
      }
    },
    [setCorpoDoEmail]
  );

  const applyColor = useCallback(
    (color: string) => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("foreColor", false, color);
        setCorpoDoEmail(editorRef.current.innerHTML);

        if (colorIndicatorLetterRef.current)
          colorIndicatorLetterRef.current.style.color = color;
      }
    },
    [setCorpoDoEmail]
  );

  const handleSendEmail = async (
    sendToList: Recipient[],
    test: boolean = false
  ) => {
    const images = editorRef.current?.querySelectorAll("img");
    if (images && images.length > 1) {
      setErrorMessage("O email supporta no máximo 1 imagem");
      alert("O email supporta no máximo 1 imagem");
      return;
    }

    if (assunto === "") {
      setErrorMessage("O assunto não pode estar vazio");
      alert("O assunto não pode estar vazio");
      return;
    }
    if (corpoDoEmail === "") {
      setErrorMessage("O corpo do email não pode estar vazio");
      alert("O corpo do email não pode estar vazio");
      return;
    }

    if (guestList.length === 0 && !test) {
      setErrorMessage("Você precisa de pelo menos 1 destinatário");
      alert("Você precisa de pelo menos 1 destinatário");
      return;
    }

    const imageTag = editorRef.current?.querySelector("img");
    let emailCopy: string = "";

    if (imageTag) {
      const emailCopyWrapper = document.createElement("div");
      emailCopyWrapper.innerHTML = editorRef.current?.innerHTML || "";

      const clonedImageTag = emailCopyWrapper.querySelector("img");
      if (clonedImageTag) {
        clonedImageTag.src = "cid:unique-image";
        clonedImageTag.style.display = "flex";
        clonedImageTag.style.alignSelf = "center";
      }
      emailCopy = emailCopyWrapper.innerHTML;
    }
    setErrorMessage("");
    if (!test) updateSendingEmail(true);

    let failListUpdate: Recipient[] = [];
    let successListUpdate: Recipient[] = [];
    sendToList.forEach(async (guest) => {
      const status = await sendEmail(
        guest,
        assunto,
        emailCopy || corpoDoEmail,
        base64Image
      );
      if (status === "success") {
        successListUpdate.push(guest);
        updateSuccessEmails(successListUpdate);
      }
      if (status === "error") {
        failListUpdate.push(guest);
        updateFailedEmails(failListUpdate);
      }
    });
  };

  return (
    <>
      <section className="p-20 max-w-[1500px] mx-auto text-xl font-normal">
        <div className="flex items-center gap-2 mb-3 text-lg">
          <p>
            <b>Importante:</b> Coloque o seguint texto onde você deseja ter o
            nome do convidado
          </p>
          <input
            readOnly
            onClick={async () =>
              await navigator.clipboard.writeText("##guest##")
            }
            className="border bg-white w-28 py-1 px-2 rounded-md"
            value={"##guest##"}
          />
        </div>

        <input
          className="w-full mb-6 px-6 py-2 rounded-md border border-neutral-400"
          placeholder="assunto"
          type="text"
          name="assunto"
          id="assunto"
          onChange={handleAssuntoChange}
        />

        <div className="h-12 bg-neutral-200 flex items-center px-6 rounded-t-md border border-neutral-400 gap-8">
          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
            <div
              className="bg-white rounded-md px-1 cursor-pointer"
              onClick={() => handleProxyUploadClick(fileInputRef)}
            >
              {imageIcon("32px")}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => applyFontFormat("bold")}
              className="bg-white rounded-md w-8 h-8 font-extrabold"
            >
              n
            </button>
            <button
              onClick={() => applyFontFormat("italic")}
              className="bg-white rounded-md pr-1 w-8 h-8 italic"
            >
              i
            </button>
            <button
              onClick={() => applyFontFormat("underline")}
              className="bg-white rounded-md w-8 h-8 underline"
            >
              s
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => applyAlignment("justifyLeft")}
              className="bg-white rounded-md w-8 h-8 font-extrabold"
            >
              {leftAlignmentIcon("28px")}
            </button>
            <button
              onClick={() => applyAlignment("justifyCenter")}
              className="bg-white rounded-md w-8 h-8 font-extrabold flex items-center justify-center"
            >
              {centerAlignmentIcon("24px")}
            </button>
            <button
              onClick={() => applyAlignment("justifyRight")}
              className="bg-white rounded-md w-8 h-8 pl-1 font-extrabold"
            >
              {rightAlignmentIcon("28px")}
            </button>
          </div>

          <div className="flex gap-4">
            <select
              className="w-20 truncate text-base"
              onChange={(e) => {
                applyFontFormat("fontName", e.target.value);
                e.target.value = "";
              }}
            >
              <option className="hidden" value="">
                Font
              </option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>

            <select
              className="w-20 truncate text-base"
              onChange={(e) => {
                applyFontFormat("fontSize", e.target.value);
                e.target.value = "";
              }}
            >
              <option className="hidden" value="">
                Size
              </option>
              <option value="3">normal</option>
              <option value="5">médio</option>
              <option value="6">Grande</option>
              <option value="7">XGrande</option>
            </select>
          </div>

          <div className="flex gap-1">
            <p ref={colorIndicatorLetterRef}>A</p>
            <input
              className="w-8"
              onChange={(e) => applyColor(e.target.value)}
              type="color"
            />
          </div>
        </div>

        <div
          className="min-h-[600px] py-10 px-20 text-[16px] bg-white border border-neutral-400 rounded-b-md"
          id="email-editor"
          contentEditable
          ref={editorRef}
          onInput={handleCorpoChange}
        />

        <div className="flex items-center gap-2 w-[500px]">
          <button
            className="border border-black my-2 py-2 px-4 w-52 bg-white"
            onClick={() =>
              handleSendEmail(
                [{ name: session!.user!.name!, email: session!.user!.email! }],
                true
              )
            }
          >
            Teste
          </button>
          <p className="text-sm italic">
            Selecione para enviar <b>1 convite</b>
            <br /> para o seu próprio email como teste
          </p>
        </div>

        <div className="my-16">
          <p
            onClick={() => setErrorMessage("")}
            className={`text-lg text-red-600 h-8 w-fit
            ${errorMessage === "" ? "" : " cursor-pointer "}`}
          >
            {errorMessage}
          </p>
          <button
            onClick={() => handleSendEmail(guestList)}
            className="border text-4xl border-black my-2 py-2 px-4 w-fit bg-es-yellow ml-auto"
          >
            Enviar Todos
          </button>
        </div>

        {sendingEmail && (
          <div className="flex flex-col gap-4 p-4 bg-white rounded-md border border-neutral-400">
            <p className="text-2xl text-green-600">
              <b>Enviados:</b> {successEmail.length} de {guestList.length}
            </p>
            {failedEmail.length > 0 && (
              <>
                <p className="text-red-600">
                  <b>Não enviados: {failedEmail.length}</b> {" "}
                  <span className="text-thin text-sm">
                    confira se os emails estão corretos
                  </span>
                </p>
                <div>
                  {failedEmail.map((failedGuest, index) => {
                    return (
                      <div className="flex gap-1" key={index}>
                        <p className="border border-red-500 px-2 grow bg-neutral-100">
                          {failedGuest.name}
                        </p>
                        <p className="border border-red-500 px-2 grow bg-neutral-100">
                          {failedGuest.email}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
}
