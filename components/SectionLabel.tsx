export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-nunito text-[15px] font-bold uppercase leading-[2em] tracking-[0.13em] text-navy">
      {children}
    </span>
  );
}
