import React from "react";

export default function Logo({ size = 28, title = "KUET Crime Management System" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id="kuetShieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="kuetBarsGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.7" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Shield */}
      <path
        d="M64 8C48 20 32 24 24 28v34c0 24 16 47 40 58 24-11 40-34 40-58V28c-8-4-24-8-40-20z"
        fill="url(#kuetShieldGrad)"
        stroke="#0b3b2e"
        strokeWidth="2"
        filter="url(#softShadow)"
      />

      {/* Checkmark */}
      <path
        d="M42 63l15 15 29-29"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Analytics bars */}
      <rect x="38" y="86" width="10" height="18" rx="2" fill="url(#kuetBarsGrad)" opacity="0.9" />
      <rect x="54" y="78" width="10" height="26" rx="2" fill="url(#kuetBarsGrad)" opacity="0.9" />
      <rect x="70" y="70" width="10" height="34" rx="2" fill="url(#kuetBarsGrad)" opacity="0.9" />
      <rect x="86" y="82" width="10" height="22" rx="2" fill="url(#kuetBarsGrad)" opacity="0.9" />

      {/* Ring accent */}
      <circle cx="64" cy="64" r="56" fill="none" stroke="#0ea5e9" strokeOpacity="0.25" strokeWidth="4" />
    </svg>
  );
}