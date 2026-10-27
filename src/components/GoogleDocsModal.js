'use client';

import React from 'react';

export default function GoogleDocsModal({
  isOpen,
  onClose,
  currentTemplate,
  effectiveCompany,
  handleDownloadDocx,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-badge">
            📄
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
              Dokumen Siap di Google Docs!
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
              {currentTemplate?.name} • {effectiveCompany}
            </p>
          </div>
        </div>

        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '10px', padding: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#166534', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
            <span>✓</span>
            <span>Isi Surat Berhasil Disalin ke Clipboard!</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#15803D' }}>
            Tab Google Docs baru telah dibuka. Cukup tempelkan langsung ke dokumen tersebut.
          </p>
        </div>

        <div style={{ marginBottom: '1.25rem', fontSize: '0.82rem', color: '#334155', lineHeight: '1.6' }}>
          <strong>Langkah Mudah di Google Docs:</strong>
          <ol style={{ paddingLeft: '1.25rem', marginTop: '6px' }}>
            <li>Beralih ke tab <strong>Google Docs</strong> yang baru saja dibuka.</li>
            <li>Tekan <kbd style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Ctrl + V</kbd> (atau <kbd style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>Cmd + V</kbd> di Mac).</li>
            <li>Seluruh teks surat penawaran, format paragraf, dan detail program RevoU langsung terpasang rapi!</li>
          </ol>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownloadDocx}
            title="Unduh file dokumen Word format .docx"
          >
            📥 Unduh Format .DOCX
          </button>

          <a
            href="https://docs.google.com/document/create"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gdocs"
            style={{ textDecoration: 'none' }}
          >
            📄 Buka Tab Google Docs
          </a>

          <button
            type="button"
            className="btn btn-dark"
            onClick={onClose}
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
