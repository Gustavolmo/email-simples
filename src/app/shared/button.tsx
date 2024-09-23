type Prop = {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "blue" | "yellow" | "neutral";
  onMouseDown?: () => void;
  className?: string;
};

export default function Button({
  isLoading,
  children,
  variant,
  onMouseDown,
  className,
}: Prop) {
  const blueButton = (
    <button
      disabled={isLoading}
      onMouseDown={onMouseDown}
      className={`
        rounded-xl bg-es-blue px-8 py-4 text-2xl w-fit
        font-bold border border-white
        shadow-retro-8x8
        transition-all
        ${
          isLoading
            ? "animate-pulse"
            : "hover:shadow-retro-4x4 active:shadow-none"
        }
        ${className}
        `}
    >
      {children}
    </button>
  );

  const yellowButton = (
    <button
      disabled={isLoading}
      onMouseDown={onMouseDown}
      className={`
        rounded-xl bg-es-yellow px-8 py-4 text-2xl w-fit
        font-bold text-neutral-800 border border-black
        shadow-retro-8x8
        transition-all
        ${
          isLoading
            ? "animate-pulse"
            : "shadow-retro-8x8 hover:shadow-retro-4x4 active:shadow-none"
        }
        ${className}
        `}
    >
      {children}
    </button>
  );

  const neutralButton = (
    <button
      onMouseDown={onMouseDown}
      className={`
        rounded-xl bg-es-neutral px-8 py-4 text-2xl w-fit
        font-bold border text-neutral-800 border-black
        shadow-retro-4x4
        hover:shadow-retro-8x8
        active:shadow-none
        transition-all
        ${className}
        `}
    >
      {children}
    </button>
  );

  switch (variant) {
    case "blue":
      return blueButton;
    case "yellow":
      return yellowButton;
    case "neutral":
      return neutralButton;
    default:
      return blueButton;
  }
}
