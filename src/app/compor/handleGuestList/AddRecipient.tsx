import useEmailEditorStore, {
  Recipient,
} from "@/state-store/email-editor-store";
import { useState } from "react";
import Image from "next/image";
import add from "../../../assets/icons/add.png";

export default function AddRecipient() {
  const { guestList, updateGuestList } = useEmailEditorStore();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const addGuestToList = () => {
    if (!name) return;
    if (!email) return;

    const newGuestList: Recipient[] = [
      ...guestList,
      { name: name, email: email },
    ];

    updateGuestList(newGuestList);
    setName("");
    setEmail("");
  };

  return (
    <div className="flex w-full">
      <input
        className="px-2 border border-black border-r-0 grow shadow-retro-4x4 focus:outline-none"
        type="text"
        name="guest-name"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="px-2 border border-black grow shadow-retro-4x4 focus:outline-none"
        type="text"
        name="guest-email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => addGuestToList()} className="ml-8 flex items-center">
        <Image src={add} alt="add-guest" width={20} />
      </button>
    </div>
  );
}
