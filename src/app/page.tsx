"use client"
import { SessionProvider } from "next-auth/react";
import LandingPage from "../components/landingPage";

export default function Home() {

  return (
    <SessionProvider>
      <LandingPage />
    </SessionProvider>
  );
}
