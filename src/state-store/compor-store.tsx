import { create } from "zustand";

export type Recipient = {
  email: string;
  name: string;
};

type State = {
  assunto: string;
  corpoDoEmail: string;
  guestList: Recipient[];
  failedEmail: Recipient[];
  successEmail: Recipient[];
  sendingEmail: boolean;

  setAssunto: (val: string) => void;
  setCorpoDoEmail: (val: string) => void;
  updateGuestList: (val: Recipient[]) => void;
  updateFailedEmails: (val: Recipient[]) => void;
  updateSuccessEmails: (val: Recipient[]) => void;
  updateSendingEmail: (value: boolean) => void;
};

const useComporStore = create<State>((set) => ({
  assunto: "",
  corpoDoEmail: "",
  guestList: [],
  failedEmail: [],
  successEmail: [],
  sendingEmail: false,

  setAssunto: (newAssunto: string) =>
    set({ assunto: newAssunto }),

  setCorpoDoEmail: (newCorpo: string) =>
    set({ corpoDoEmail: newCorpo }),

  updateGuestList: (newGuestList: Recipient[]) =>
    set({ guestList: newGuestList }),

  updateFailedEmails: (newFailedGuestList: Recipient[]) =>
    set({ failedEmail: newFailedGuestList }),

  updateSuccessEmails: (newSuccessGuestList: Recipient[]) =>
    set({ successEmail: newSuccessGuestList }),

  updateSendingEmail: (value: boolean) =>
    set({ sendingEmail: value }),
}));

export default useComporStore;
