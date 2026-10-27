'use client';

import React from 'react';

export default function LetterForm({
  templateSelectId,
  templateType,
  handleTemplateChange,
  currentTemplate,
  roleSelectId,
  roleOption,
  setRoleOption,
  customRoleId,
  customRole,
  setCustomRole,
  companyNameId,
  companyName,
  setCompanyName,
  locationSelectId,
  locationOption,
  setLocationOption,
  customLocationId,
  customLocation,
  setCustomLocation,
  employeeNameId,
  employeeName,
  setEmployeeName,
  letterDateId,
  letterDate,
  setCustomLetterDate,
  setTodayDate,
  letterSeqId,
  letterSeq,
  setLetterSeq,
  startDateId,
  startDate,
  setStartDate,
  normalPriceId,
  normalPrice,
  setNormalPrice,
  promoPriceId,
  promoPrice,
  setPromoPrice,
  additionalNoteId,
  additionalNote,
  setAdditionalNote,
  isFullstack,
  certOptionId,
  fsCertOption,
  setFsCertOption,
  handleDownloadDocx,
  handleReset,
}) {
  return (
        <aside className="editor-sidebar no-print">

          {/* Card 0: Dropdown Pemilihan Tipe Surat untuk AC */}
          <div className="section-card university-card">
            <div className="section-header" style={{ marginBottom: '0.6rem' }}>
              <div className="section-title">
                <span>Pilih Tipe Surat Penawaran</span>
              </div>
              <span className={`program-indicator-pill ${currentTemplate.pillClass || (templateType === 'itb' ? 'pill-itb' : templateType === 'binus' ? 'pill-binus' : 'pill-hr')}`}>
                {currentTemplate.badge || (templateType === 'itb' ? '🏛️ ITB Aktif' : templateType === 'binus' ? 'Aktif' : '👥 Strategic HR Aktif')}
              </span>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--revou-muted)', marginBottom: '0.75rem' }}>
              Pilih program penawaran yang ingin dibuatkan suratnya:
            </p>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor={templateSelectId} className="form-label" style={{ fontWeight: 700 }}>
                Program Penawaran
              </label>
              <div className="select-interactive-wrapper">
                <select
                  id={templateSelectId}
                  className="form-select select-interactive"
                  value={templateType}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                >
                  <option value="itb">RevoU X ITB (Data-Driven &amp; AI Decision Making)</option>
                  <option value="itb_ds">RevoU X ITB (Applied Data Science with AI)</option>
                  <option value="binus">RevoU X BINUS (Applied AI, Analytics &amp; Automation)</option>
                  <option value="hr">Strategic HR with AI (RevoU Executive Program)</option>
                  <option value="fsda">Full Stack Data Analytics (RevoU FSDA)</option>
                  <option value="fsdm">Full Stack Digital Marketing (RevoU FSDM)</option>
                  <option value="fsse">Full Stack Software Engineering (RevoU FSSE)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 1: 3 Parameter Utama sesuai Rule */}
          <div className="section-card primary-card">
            <div className="section-header">
              <div className="section-title">
                <span>Data Utama Penawaran</span>
              </div>
              <span className="badge-tag">Wajib Diisi</span>
            </div>

            {/* 1. Role di Perusahaan */}
            <div className="form-group">
              <label htmlFor={roleSelectId} className="form-label">
                <span>1. Role di Perusahaan</span>
                <span className="helper">Pilih atau Custom</span>
              </label>
              <div className="select-interactive-wrapper">
                <select
                  id={roleSelectId}
                  className="form-select select-interactive"
                  value={roleOption}
                  onChange={(e) => setRoleOption(e.target.value)}
                >
                  <option value="Management">Management</option>
                  <option value="Tim HR/Learning">Tim HR/Learning</option>
                  <option value="Research and Development Team">Research and Development Team</option>
                  <option value="Custom">Custom (Tulis Sendiri)</option>
                </select>
              </div>

              {roleOption === 'Custom' && (
                <div className="custom-input-wrapper">
                  <input
                    id={customRoleId}
                    aria-label="Tuliskan nama role kustom"
                    type="text"
                    className="form-input"
                    placeholder="Tulis role (misal: Direktur HR / VP People)..."
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* 2. Nama Company */}
            <div className="form-group">
              <label htmlFor={companyNameId} className="form-label">
                <span>2. Nama Company</span>
                <span className="helper">Otomatis sinkron ke seluruh surat</span>
              </label>
              <input
                id={companyNameId}
                type="text"
                className="form-input"
                placeholder="Contoh: PT Pegadaian Galeri Dua Empat"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            {/* 3. Lokasi */}
            <div className="form-group">
              <label htmlFor={locationSelectId} className="form-label">
                <span>3. Lokasi</span>
                <span className="helper">Pilih atau Custom</span>
              </label>
              <div className="select-interactive-wrapper">
                <select
                  id={locationSelectId}
                  className="form-select select-interactive"
                  value={locationOption}
                  onChange={(e) => setLocationOption(e.target.value)}
                >
                  <option value="di tempat">di tempat</option>
                  <option value="Custom">Custom (Tulis Sendiri)</option>
                </select>
              </div>

              {locationOption === 'Custom' && (
                <div className="custom-input-wrapper">
                  <input
                    id={customLocationId}
                    aria-label="Tuliskan lokasi kustom"
                    type="text"
                    className="form-input"
                    placeholder="Tulis lokasi (misal: Jakarta / di Kantor Pusat)..."
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Nama Karyawan / Peserta */}
            <div className="form-group">
              <label htmlFor={employeeNameId} className="form-label">
                <span>Nama Karyawan / Peserta (Opsional)</span>
                <span className="helper">
                  {templateType === 'binus'
                    ? 'Contoh: Pak Hendra Permana'
                    : (templateType === 'hr' || templateType === 'fsda' || templateType === 'fsdm' || templateType === 'fsse')
                      ? 'Contoh: Yudithia Aprilinda'
                      : templateType === 'itb_ds'
                        ? 'Contoh: Nanik Ambar Suharyanti'
                        : ''}
                </span>
              </label>
              <input
                id={employeeNameId}
                type="text"
                className="form-input"
                placeholder={
                  templateType === 'binus'
                    ? 'Pak Hendra Permana'
                    : (templateType === 'hr' || templateType === 'fsda' || templateType === 'fsdm' || templateType === 'fsse')
                      ? 'Yudithia Aprilinda'
                      : templateType === 'itb_ds'
                        ? 'Nanik Ambar Suharyanti'
                        : '______'
                }
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
          </div>


          {/* Card 2: Pengaturan Tanggal, Nomor & Detail Surat (Langsung Terbuka) */}
          <div className="section-card">
            <div className="section-header">
              <div className="section-title">
                <span>Tanggal, Nomor &amp; Detail Surat</span>
              </div>
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label htmlFor={letterDateId} className="form-label" style={{ marginBottom: 0 }}>
                  Tanggal Surat
                </label>
                <button
                  type="button"
                  onClick={setTodayDate}
                  style={{ fontSize: '0.72rem', color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Pakai Hari Ini
                </button>
              </div>
              <input
                id={letterDateId}
                type="text"
                className="form-input"
                value={letterDate}
                onChange={(e) => setCustomLetterDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={letterSeqId} className="form-label">
                Nomor Urut Surat
              </label>
              <input
                id={letterSeqId}
                type="text"
                className="form-input"
                placeholder="Contoh: 06"
                value={letterSeq}
                onChange={(e) => setLetterSeq(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={startDateId} className="form-label">Tanggal Mulai Program</label>
              <input
                id={startDateId}
                type="text"
                className="form-input"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={normalPriceId} className="form-label">Biaya I (Dicoret)</label>
              <input
                id={normalPriceId}
                type="text"
                className="form-input"
                value={normalPrice}
                onChange={(e) => setNormalPrice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={promoPriceId} className="form-label">
                <span>Biaya II</span>
              </label>
              <input
                id={promoPriceId}
                type="text"
                className="form-input"
                placeholder="Contoh: Rp14.500.000"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor={additionalNoteId} className="form-label">
                <span>Keterangan Tambahan</span>
                <span className="helper">Contoh: (harga khusus early bird)</span>
              </label>
              <input
                id={additionalNoteId}
                type="text"
                className="form-input"
                placeholder="Contoh: (harga khusus early bird)"
                value={additionalNote}
                onChange={(e) => setAdditionalNote(e.target.value)}
              />
            </div>

            {isFullstack && (
              <div className="form-group">
                <label htmlFor={certOptionId} className="form-label">
                  <span>Opsi Sertifikat</span>
                  <span className="helper">Pilihan sertifikat program Fullstack</span>
                </label>
                <select
                  id={certOptionId}
                  className="form-select"
                  value={fsCertOption}
                  onChange={(e) => setFsCertOption(e.target.value)}
                >
                  <option value="Sertifikat penyelesaian program dari RevoU">
                    Sertifikat penyelesaian program dari RevoU
                  </option>
                  <option value="Sertifikat penyelesaian program dari RevoU & BNSP">
                    Sertifikat penyelesaian program dari RevoU &amp; BNSP
                  </option>
                </select>
              </div>
            )}
          </div>

          {/* Action Button: DOCX & PDF */}
          <div className="section-card" style={{ textAlign: 'center' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}
              onClick={handleDownloadDocx}
            >
              📥 Unduh Format .DOCX (Word)
            </button>

            <div style={{ marginTop: '0.65rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', fontSize: '0.78rem' }}
                onClick={handleReset}
              >
                🔄 Reset ke Contoh Asli ({currentTemplate.name})
              </button>
            </div>
          </div>

        </aside>

  );
}
