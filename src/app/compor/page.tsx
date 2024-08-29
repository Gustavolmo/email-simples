"use client";
import { SessionProvider } from "next-auth/react";
import EmailEditor from "./emailEditor";
import ComporHeader from "./comporHeader";
import EmailRecipients from "./emailRecipients";

export default function Compor() {
  return (
    <SessionProvider>
      <ComporHeader />
      <EmailRecipients />
      <EmailEditor />
    </SessionProvider>
  );
}
