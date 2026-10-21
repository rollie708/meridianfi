import { useId } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const SOCIALS = {
  telegram: 'https://t.me/meridianfii',
  x: 'https://x.com/meridianfii?s=11',
};

export function Mark({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}><path d="M7 35V13l4-3 18 19-6 7-9-10v15zm34 0V13l-4-3-13 14 6 7 4-5v15z" fill="currentColor" /></svg>;
}

export function TelegramIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.5 3.2 18.1 20c-.3 1.2-1 1.5-2 .9l-5.2-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3L17.4 6c.4-.4-.1-.6-.6-.3L5 13.1 0 11.5c-1.1-.3-1.1-1.1.2-1.6L20 2.3c.9-.3 1.7.2 1.5.9Z" transform="translate(1 0) scale(.95)" /></svg>;
}

export function XIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l8.2-9.4L2.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L8.3 4H6.5l11.3 16Z" /></svg>;
}

export function SocialLink({ type, className = '', children }: { type: keyof typeof SOCIALS; className?: string; children: React.ReactNode }) {
  return <a href={SOCIALS[type]} target="_blank" rel="noopener noreferrer" className={className}>{children}<span className="sr-only"> (opens in a new tab)</span></a>;
}

export function Eyebrow({ children, number }: { children: React.ReactNode; number?: string }) {
  return <div className="eyebrow">{number ? <span className="section-number">{number}</span> : <span className="blue-dash" />}{children}</div>;
}

export function OrbitalArt({ compact = false }: { compact?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <div className={`orbital-art ${compact ? 'compact' : ''}`} aria-hidden="true">
    <div className="orbital-glow" />
    <svg className="orbit-svg" viewBox="0 0 620 620" fill="none">
      <defs>
        <linearGradient id={`${id}-rim`} x1="102" y1="82" x2="540" y2="530" gradientUnits="userSpaceOnUse"><stop stopColor="#354052" /><stop offset=".18" stopColor="#dce8ff" /><stop offset=".36" stopColor="#7c8da7" /><stop offset=".5" stopColor="#253650" /><stop offset=".72" stopColor="#e4efff" /><stop offset=".84" stopColor="#759dda" /><stop offset="1" stopColor="#172435" /></linearGradient>
        <linearGradient id={`${id}-metal`} x1="212" y1="201" x2="397" y2="416" gradientUnits="userSpaceOnUse"><stop stopColor="#f4f7ff" /><stop offset=".25" stopColor="#b4becf" /><stop offset=".43" stopColor="#eef4ff" /><stop offset=".61" stopColor="#737e92" /><stop offset=".8" stopColor="#dce9ff" /><stop offset="1" stopColor="#677587" /></linearGradient>
        <linearGradient id={`${id}-side`} x1="160" y1="230" x2="440" y2="440" gradientUnits="userSpaceOnUse"><stop stopColor="#8b9aac" /><stop offset=".5" stopColor="#1e293b" /><stop offset="1" stopColor="#98b4d7" /></linearGradient>
        <radialGradient id={`${id}-disc`}><stop stopColor="#111c2c" stopOpacity=".7" /><stop offset=".7" stopColor="#0b1019" stopOpacity=".45" /><stop offset="1" stopColor="#060b13" stopOpacity=".8" /></radialGradient>
        <filter id={`${id}-light`} x="-300%" y="-300%" width="700%" height="700%"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="14" floodColor="#000" floodOpacity=".85" /></filter>
      </defs>
      <g className="outer-orbit"><circle cx="310" cy="310" r="278" stroke="#63738d" strokeOpacity=".15" strokeDasharray="2 9" /><path d="M310 25a285 285 0 0 1 278 225M310 595A285 285 0 0 1 32 370" stroke="#8296b8" strokeOpacity=".3" /><circle cx="563" cy="177" r="3" fill="#8fb6ff" /><circle cx="57" cy="443" r="3" fill="#8fb6ff" /></g>
      <ellipse cx="310" cy="310" rx="302" ry="105" transform="rotate(-36 310 310)" stroke="#5e85c1" strokeOpacity=".16" />
      <circle cx="310" cy="310" r="239" fill={`url(#${id}-disc)`} stroke="#1a2638" strokeWidth="8" />
      <circle cx="310" cy="310" r="239" stroke={`url(#${id}-rim)`} strokeWidth="3.5" />
      <circle cx="310" cy="310" r="231" stroke="#62748b" strokeOpacity=".13" />
      <g className="ring-spark"><circle cx="456" cy="120" r="14" fill="#428aff" filter={`url(#${id}-light)`} /><circle cx="456" cy="120" r="3" fill="#eff7ff" /><path d="m442 120h28m-14-14v28" stroke="#b8dbff" strokeWidth=".6" /></g>
      <g className="ring-spark second"><circle cx="148" cy="486" r="12" fill="#428aff" filter={`url(#${id}-light)`} /><circle cx="148" cy="486" r="2.5" fill="#e3f2ff" /></g>
      <g filter={`url(#${id}-shadow)`} transform="translate(0 5)">
        <path d="M171 383V225l21-18 158 169-32 36-103-110v119zm278 0V225l-21-18-109 117 34 37 52-59v119z" transform="translate(4 7)" fill={`url(#${id}-side)`} />
        <path d="M171 383V225l21-18 158 169-32 36-103-110v119zm278 0V225l-21-18-109 117 34 37 52-59v119z" fill={`url(#${id}-metal)`} />
        <path d="m171 225 21-18 158 169-32 36-103-110v119m234-196-21-18-109 117 34 37 52-59v119" stroke="#e5efff" strokeOpacity=".65" strokeWidth=".8" />
      </g>
      <path d="M310 54v12M310 554v12M54 310h12M554 310h12" stroke="#8ca7ca" strokeOpacity=".6" />
      <path d="M80 80h10m-5-5v10M530 530h10m-5-5v10" stroke="#647690" strokeOpacity=".5" />
    </svg>
    {!compact && <><span className="art-label art-label-top">M / ORIGIN POINT</span><span className="art-label art-label-bottom"><span /> MANY PERSPECTIVES. ONE HORIZON.</span></>}
  </div>;
}

export function ArrowLink({ children }: { children: React.ReactNode }) {
  return <>{children}<ArrowUpRight size={17} /></>;
}
