type Prop = {
  children: React.ReactNode;
  className?: string;
};

export default function ComporSectionContainer({ children, className }: Prop) {
  return (
    <article className="px-20 py-16 max-w-[1500px] mx-auto">
      <div
        className={`bg-es-offwhite border border-black shadow-retro-16x16 p-8 ${className}`}
      >
        {children}
      </div>
    </article>
  );
}
