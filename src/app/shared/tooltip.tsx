import Image from "next/image";
import tooltipIcon from "../../assets/icons/tooltip-icon.png";
import { useCallback, useState } from "react";

type Prop = {
  children: React.ReactNode;
  position: "right" | "left";
  title: string;
};

export default function Tooltip({ children, position, title }: Prop) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="relative">
      <div onMouseEnter={openModal} onMouseLeave={closeModal} className="w-8">
        <Image src={tooltipIcon} alt="" />
      </div>

      <div
        onMouseEnter={openModal}
        onMouseLeave={closeModal}
        className={`
          ${isOpen ? "block" : "hidden"}
          ${position === "right" ? "left-4" : "right-4"} top-4 absolute 
          w-96 bg-white border border-black shadow-retro-16x16`}
      >
        <div className="border-b text-sm font-bold border-black bg-es-yellow px-2">
          {title}
        </div>
        <p className="p-2">{children}</p>
      </div>
    </div>
  );
}
