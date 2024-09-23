import { RefObject } from "react";
import { create } from "zustand";

export type Recipient = {
  email: string;
  name: string;
};

type State = {
  assunto: string;
  corpoDoEmail: string;
  guestList: Recipient[];
  base64Image: string;
  editorRef: RefObject<HTMLDivElement> | null

  setAssunto: (val: string) => void;
  setCorpoDoEmail: (val: string) => void;
  updateGuestList: (val: Recipient[]) => void;
  setBase64Image: (val: string) => void
  setEditorRef: (val: RefObject<HTMLDivElement>) => void
};

const useEmailEditorStore = create<State>((set) => ({
  assunto: "",
  corpoDoEmail: "",
  guestList: [],
  base64Image: "",
  editorRef: null,

  setAssunto: (newAssunto: string) =>
    set({ assunto: newAssunto }),

  setCorpoDoEmail: (newCorpo: string) =>
    set({ corpoDoEmail: newCorpo }),

  updateGuestList: (newGuestList: Recipient[]) =>
    set({ guestList: newGuestList }),

  setBase64Image: (newBase64Image) =>
    set({base64Image: newBase64Image}),

  setEditorRef: (newEditorRef) =>
    set({editorRef: newEditorRef}),
}));

export default useEmailEditorStore;
