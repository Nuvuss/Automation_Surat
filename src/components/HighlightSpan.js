'use client';

import React from 'react';

// Highlight helper component placed at module scope to comply with React 19 static component rules
export default function HighlightSpan({ children, className = '' }) {
  return (
    <span className={`hl-dynamic hl-active ${className}`}>
      {children}
    </span>
  );
}
