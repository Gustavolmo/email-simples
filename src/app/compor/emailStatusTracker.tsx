import ComporSectionContainer from "./comporSectionContainer";
import Button from "../shared/button";
import useAppStateStore from "@/state-store/app-state-store";
import { sendEmail } from "../api/sendEmail";
import FailedRecipients from "./handleGuestList/failedRecipients";
import SuccessRecipients from "./handleGuestList/successRecipients";
import useEmailEditorStore, {
  Recipient,
} from "@/state-store/email-editor-store";
import useEmailStatusTrackerStore from "@/state-store/email-status-tracker-store";

export default function EmailTrackerStatus() {
  const { emailState, setEmailState } = useAppStateStore();
  const {
    cancelEmails,
    setCancelEmail,
    updateFailedEmails,
    updateSuccessEmails,
    successEmail,
    failedEmail,
  } = useEmailStatusTrackerStore();
  const {
    assunto,
    corpoDoEmail,
    base64Image,
    editorRef,
    guestList,
    updateGuestList,
    setBase64Image,
  } = useEmailEditorStore();

  const emailActions = () => {
    switch (emailState) {
      case "notSent":
        return (
          <Button
            variant="yellow"
            onMouseDown={() => handleSendEmail(guestList)}
            className=""
          >
            Enviar Todos
          </Button>
        );
      case "sending":
        return (
          <Button
            variant="yellow"
            onMouseDown={() => cancelSendingEmails()}
            className="!bg-red-600 !text-es-offwhite self-end"
          >
            Cancelar envio
          </Button>
        );
      case "sent":
        return (
          <Button
            variant="neutral"
            onMouseDown={() => sendAnotherEmail()}
            className="self-end"
          >
            {failedEmail.length > 0
              ? "Reutilizar emails falhos"
              : "Fazer novo envio"}
          </Button>
        );
    }
  };

  const cancelSendingEmails = () => {
    setCancelEmail(true);
    setEmailState("sent");
  };

  const sendAnotherEmail = () => {
    if (failedEmail.length === 0) updateGuestList([]);
    else updateGuestList(failedEmail);

    updateSuccessEmails([]);
    updateFailedEmails([]);
    setCancelEmail(false);
    setEmailState("notSent");

    window.scrollBy({
      top: -window.innerHeight * 10,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSendEmail = async (
    guestList: Recipient[],
    isTesting: boolean = false
  ) => {
    if (emailState === "sending") return;

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
    if (guestList.length === 0 && !isTesting) {
      alert("Você precisa de pelo menos 1 destinatário");
      return;
    }

    setEmailState("sending");

    const imageTag = editorRef?.current?.querySelector("img");
    let emailCopy: string = "";

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

    updateSuccessEmails([]);
    updateFailedEmails([]);
    let failListRegister: Recipient[] = [];
    let successListRegister: Recipient[] = [];

    const promises = guestList.map(async (guest) => {
      const status = await sendEmail(
        guest,
        assunto,
        emailCopy || corpoDoEmail,
        imageTag ? base64Image : ""
      );
      if (cancelEmails) return;
      if (status === "success") {
        successListRegister.push(guest);
        updateSuccessEmails(successListRegister);
      }
      if (status === "error") {
        failListRegister.push(guest);
        updateFailedEmails(failListRegister);
      }
    });

    await Promise.all(promises);
    setEmailState("sent");
  };

  return (
    <ComporSectionContainer className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 justify-center items-center">
        {emailActions()}
      </div>

      <div className="flex flex-col gap-4">
        {failedEmail.length > 0 && (
          <>
            <p className="text-red-600 leading-4">
              <b>Não enviados: {failedEmail.length}</b> <br />
              <span className="text-thin">
                confira se os emails estão corretos
              </span>
            </p>
            <div>
              <FailedRecipients />
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {successEmail.length > 0 && (
          <>
            <p className="text-green-600 leading-4">
              <b>Enviados: {successEmail.length}</b> <br />
            </p>
            <div>
              <SuccessRecipients />
            </div>
          </>
        )}
      </div>
    </ComporSectionContainer>
  );
}
