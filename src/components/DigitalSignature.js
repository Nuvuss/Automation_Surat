'use client';

import React from 'react';

// Digital signature component
export default function DigitalSignature() {
  return (
    <svg className="signature-svg" viewBox="0 0 160 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 32 C15 14, 26 4, 31 22 C34 35, 38 45, 43 26 C46 14, 49 7, 53 22 C56 32, 61 42, 66 20 C69 11, 73 18, 77 29 C83 45, 89 18, 96 28 C101 35, 109 40, 116 28 C123 16, 131 23, 136 35 C141 45, 131 52, 111 49 C91 45, 71 39, 51 42 C31 45, 21 39, 10 35"
        stroke="#111827"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M42 28 C56 26, 82 23, 108 26" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
