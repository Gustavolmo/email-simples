import useEmailEditorStore, {
  Recipient,
} from "@/state-store/email-editor-store";
import { useState } from "react";
import Image from "next/image";
import remove from "../../../assets/icons/remove.png";

export default function RegisteredRecipients() {
  const { guestList, updateGuestList } = useEmailEditorStore();

  const removeGuestFromList = (guestIndex: number) => {
    const newGuestList: Recipient[] = guestList.filter(
      (_, index) => index != guestIndex
    );
    updateGuestList(newGuestList);
  };

  return guestList.map((guest, guestIndex) => {
    return (
      <div key={guestIndex} className="flex w-full">
        <RegisteredInputs
          guestName={guest.name}
          guestEmail={guest.email}
          guestIndex={guestIndex}
          handleGuests={removeGuestFromList}
        />
      </div>
    );
  });
}

type Prop = {
  guestName: string;
  guestEmail: string;
  guestIndex: number;
  handleGuests: (index: number) => void;
};

function RegisteredInputs({
  guestName,
  guestEmail,
  guestIndex,
  handleGuests,
}: Prop) {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const makeGuestTranslucid = () => setIsHovering(true);
  const makeGuestOpaque = () => setIsHovering(false);

  return (
    <>
      <input
        className={`px-2 border border-black border-b-0 border-r-0 grow focus:outline-none bg-es-offwhite shadow-retro-4x4 ${
          isHovering ? "opacity-50" : "opacity-none"
        }`}
        type="text"
        name="guest-name"
        placeholder="Nome"
        value={guestName}
        readOnly
      />
      <input
        className={`px-2 border border-black border-b-0 grow focus:outline-none bg-es-offwhite shadow-retro-4x4 ${
          isHovering ? "opacity-50" : "opacity-none"
        }`}
        type="text"
        name="guest-email"
        placeholder="Email"
        value={guestEmail}
        readOnly
      />
      <button
        onMouseEnter={() => makeGuestTranslucid()}
        onMouseLeave={() => makeGuestOpaque()}
        onClick={() => handleGuests(guestIndex)}
        className="ml-8"
      >
        <Image src={remove} alt="add-guest" width={20} />
      </button>
    </>
  );
}
