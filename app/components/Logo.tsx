export function Logo() {
  return (
    <div className="flex items-baseline gap-3 select-none">
      <span
        className="font-['Georgia'] text-[60px] leading-none font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[color:var(--rh-gold-1)] via-[#b98522] to-[color:var(--rh-gold-2)] drop-shadow-[0_10px_26px_rgba(0,0,0,0.25)]"
        aria-label="RH"
      >
        RH
      </span>
      <span className="font-['Georgia'] text-base font-black tracking-[0.28em] text-zinc-200/90">
        TRADERS
      </span>
    </div>
  );
}

