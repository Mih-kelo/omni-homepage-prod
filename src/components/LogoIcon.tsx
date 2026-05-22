export function LogoIcon({ className = "w-6 h-6 text-[#9b51e0]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 8.12 15.88 Q 16 16 15.88 8.12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="6" cy="18" r="1.5" fill="currentColor" />
      
      <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
}
