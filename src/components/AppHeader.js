'use client';

import React from 'react';
import Image from 'next/image';

export default function AppHeader({
  theme,
  toggleTheme,
  handleDownloadDocx,
}) {
  return (
    <header className="app-header no-print">
      <div className="brand-wrapper">
        <Image
          src="/revou-logo.png"
          alt="Logo RevoU"
          width={42}
          height={42}
          style={{ borderRadius: '50%', objectFit: 'contain', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
          priority
        />
        <div className="brand-title-group">
          <h1>Generator Surat Penawaran RevoU</h1>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="btn-theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          aria-label="Toggle Theme"
        >
          <span className="theme-toggle-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span>{theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleDownloadDocx}
          title="Unduh file dokumen dalam format Microsoft Word (.docx)"
        >
          <span>📥</span>
          <span>Unduh .DOCX</span>
        </button>
      </div>
    </header>
  );
}
