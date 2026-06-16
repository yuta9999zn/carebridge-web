import type { ComponentType, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p,
});

export const IconHeart = (p: P) => (
  <svg {...base(p)}><path d="M12 20s-7-4.6-9.2-9C1.4 8 3 4.5 6.3 4.5c2 0 3.2 1.2 4.2 2.6 1-1.4 2.2-2.6 4.2-2.6 3.3 0 4.9 3.5 3.5 6.5C19 15.4 12 20 12 20Z"/></svg>
);
export const IconShield = (p: P) => (
  <svg {...base(p)}><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
);
export const IconGlobe = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>
);
export const IconBook = (p: P) => (
  <svg {...base(p)}><path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5Z"/><path d="M18 17H6a2 2 0 0 0-2 2"/></svg>
);
export const IconNetwork = (p: P) => (
  <svg {...base(p)}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.6 7.6 10.6 16M16.4 7.6 13.4 16M8 6h8"/></svg>
);
export const IconBadge = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="9" r="6"/><path d="m9 13-1.5 8L12 19l4.5 2L15 13"/><path d="m9.5 9 1.7 1.7L15 7"/></svg>
);
export const IconHandshake = (p: P) => (
  <svg {...base(p)}><path d="m3 12 4-4 4 3 3-2 4 3 3-3"/><path d="M7 8l3 3a2 2 0 0 0 3 0M11 11l2 2a2 2 0 0 0 3 0"/></svg>
);
export const IconUsers = (p: P) => (
  <svg {...base(p)}><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6"/></svg>
);
export const IconChat = (p: P) => (
  <svg {...base(p)}><path d="M4 5h16v10H8l-4 4V5Z"/><path d="M8 9h8M8 12h5"/></svg>
);
export const IconLanguage = (p: P) => (
  <svg {...base(p)}><path d="M4 5h8M8 3v2c0 4-2 7-5 9"/><path d="M6 10c1.5 3 4 5 7 6"/><path d="m13 20 4-9 4 9M14.5 17h5"/></svg>
);
export const IconSupport = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 5 2c0 2-2 2-2 4"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/></svg>
);
export const IconPhone = (p: P) => (
  <svg {...base(p)}><path d="M5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5V21a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-1Z"/></svg>
);
export const IconMail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
);
export const IconArrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
);
export const IconCheck = (p: P) => (
  <svg {...base(p)}><path d="m5 12 4 4 10-10"/></svg>
);
export const IconBuilding = (p: P) => (
  <svg {...base(p)}><rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></svg>
);

export const iconByKey: Record<string, ComponentType<P>> = {
  heart: IconHeart,
  shield: IconShield,
  globe: IconGlobe,
  book: IconBook,
  network: IconNetwork,
  badge: IconBadge,
  handshake: IconHandshake,
  users: IconUsers,
  chat: IconChat,
  language: IconLanguage,
  support: IconSupport,
  building: IconBuilding,
};
