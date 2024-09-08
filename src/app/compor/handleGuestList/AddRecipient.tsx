"use client";
import useComporStore, { Recipient } from "@/state-store/compor-store";
import { useState } from "react";

export default function AddRecipient() {
  const { guestList, updateGuestList } = useComporStore();
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
    <div className="flex gap-1 w-full">
      <input
        className="px-2 border border-neutral-400 grow"
        type="text"
        name="guest-name"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="px-2 border border-neutral-400 grow"
        type="text"
        name="guest-email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => addGuestToList()} className="text-2xl mx-2 w-4">
        +
      </button>
    </div>
  );
}
