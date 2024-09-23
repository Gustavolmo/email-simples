"use client";
import { SessionProvider } from "next-auth/react";
import ComporHeader from "./comporHeader";
import ComporBody from "./comporBody";

export default function Compor() {
  return (
    <SessionProvider>
      <ComporHeader />
      <ComporBody />
    </SessionProvider>
  );
}
