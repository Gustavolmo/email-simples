import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

type Prop = {
  children: React.ReactNode;
  numberOrder: string | StaticImport;
};

export default function ComoUtilizarSteps({ children, numberOrder }: Prop) {
  return (
    <div className="flex items-end mb-10 gap-4">
      <div className="min-w-24">
        <Image src={numberOrder} alt="numbering"/>
      </div>
      <div className="md:text-2xl font-light text-neutral-600">
        <p>{children}</p>
      </div>
    </div>
  );
}
