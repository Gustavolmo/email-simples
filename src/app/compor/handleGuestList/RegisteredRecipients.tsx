"use client";
import useComporStore, { Recipient } from "@/state-store/compor-store";

export default function RegisteredRecipients() {
  const { guestList, updateGuestList } = useComporStore();

  const removeGuestFromList = (guestIndex: number) => {
    const newGuestList: Recipient[] = guestList.filter(
      (_, index) => index != guestIndex
    );
    updateGuestList(newGuestList);
  };

  return guestList.map((guest, guestIndex) => {
    return (
      <div key={guestIndex} className="flex gap-1 w-full">
        <input
          className="px-2 border border-neutral-200 grow focus:outline-none bg-neutral-100"
          type="text"
          name="guest-name"
          placeholder="Nome"
          value={guest.name}
          readOnly
        />
        <input
          className="px-2 border border-neutral-200 grow focus:outline-none bg-neutral-100"
          type="text"
          name="guest-email"
          placeholder="Email"
          value={guest.email}
          readOnly
        />
        <button
          onClick={() => removeGuestFromList(guestIndex)}
          className="text-2xl mx-2 w-4"
        >
          -
        </button>
      </div>
    );
  });
}
