"use client";

import useComporStore, { Recipient } from "@/state-store/compor/compor-store";

type Prop = {
  name: string;
  email: string;
};

export default function RegisteredRecipients({ name, email }: Prop) {
  const { guestList, updateGuestList } = useComporStore();

  const removeGuestFromList = () => {
    const newGuestList: Recipient[] = guestList.filter(
      (guest) => (guest.name !== name)
    );

    updateGuestList(newGuestList);
  };

  return (
    <div className="flex gap-1 w-full">
      <input
        className="px-2 border border-neutral-200 grow focus:outline-none bg-neutral-100"
        type="text"
        name="guest-name"
        placeholder="Nome"
        value={name}
        readOnly
      />
      <input
        className="px-2 border border-neutral-200 grow focus:outline-none bg-neutral-100"
        type="text"
        name="guest-email"
        placeholder="Email"
        value={email}
        readOnly
      />
      <button
        onClick={() => removeGuestFromList()}
        className="text-2xl mx-2 w-4"
      >
        -
      </button>
    </div>
  );
}
