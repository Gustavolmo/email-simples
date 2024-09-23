import { create } from "zustand";

export type Recipient = {
  email: string;
  name: string;
};

type State = {
  failedEmail: Recipient[];
  successEmail: Recipient[];
  cancelEmails: boolean;

  updateFailedEmails: (val: Recipient[]) => void;
  updateSuccessEmails: (val: Recipient[]) => void;
  setCancelEmail: (val: boolean) => void;
};

const useEmailStatusTrackerStore = create<State>((set) => ({
  failedEmail: [],
  successEmail: [],
  cancelEmails: false,

  updateFailedEmails: (newFailedGuestList: Recipient[]) =>
    set({ failedEmail: newFailedGuestList }),

  updateSuccessEmails: (newSuccessGuestList: Recipient[]) =>
    set({ successEmail: newSuccessGuestList }),

  setCancelEmail: (newVal: boolean) =>
    set({ cancelEmails: newVal }),
}));

export default useEmailStatusTrackerStore;
