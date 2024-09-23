import Image from "next/image";
import LandingPageHeader from "./landingPageHeader";
import Footer from "../shared/footet";
import ComoUtilizar from "./comoUtilizar/comoUtilizar";
import utilizarExample from "../../assets/como-utilizar-exemplo.png";

export default function LandingPage() {
  return (
    <div className="min-h-[100vh] flex flex-col">
      <LandingPageHeader />

      <div className="bg-es-offwhite shadow-inset-t-16 grow">
        <main className="max-w-[1800px] mx-auto">
          <section className="flex flex-col 2xl:flex-row p-8 md:p-20 pr-12 items-center 2xl:justify-between gap-16">
            <Image src={utilizarExample} alt="utilizar-exemplo" />
            <ComoUtilizar />
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
