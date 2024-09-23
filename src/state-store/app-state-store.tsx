import { create } from "zustand";

type EmailState = "notSent" | "sending" | "sent";

type State = {
  emailState: EmailState;
  isLoading: boolean;

  setIsLoading: (val: boolean) => void;
  setEmailState: (newVal: EmailState ) => void;
};

const useAppStateStore = create<State>((set) => ({
  emailState: "notSent",
  isLoading: false,

  setIsLoading: (newVal: boolean) => set({ isLoading: newVal }),
  setEmailState: (newVal: EmailState) =>
    set({ emailState: newVal }),
}));

export default useAppStateStore;
