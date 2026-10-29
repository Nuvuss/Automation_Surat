'use client';

import React from 'react';
import { OFFERING_PROGRAMS, LOC_PROGRAMS } from '@/config/templates';

export default function LetterForm({
  // Category
  letterCategory,
  handleCategoryChange,

  // Offering letter props
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

  // LoC letter props
  locProgram,
  handleLocProgramChange,
  currentLocProgram,
  locApproverName,
  setLocApproverName,
  locApproverPosition,
  setLocApproverPosition,
  locInstitutionName,
  setLocInstitutionName,
  locNpwp,
  setLocNpwp,
  locAddress,
  setLocAddress,
  locApplicantsText,
  setLocApplicantsText,
  locTuition,
  setLocTuition,
  locPaymentDeadline,
  setLocPaymentDeadline,
  locPlace,
  setLocPlace,

  // Global actions
  handleDownloadDocx,
  handleReset,
}) {
  const isOffering = letterCategory === 'penawaran';

  return (
    <aside className="editor-sidebar no-print">
      {/* Card 0: Dropdown Pemilihan Jenis Surat & Program */}
      <div className="section-card university-card">
        <div className="section-header" style={{ marginBottom: '0.6rem' }}>
          <div className="section-title">
            <span>Pilih Jenis Surat</span>
          </div>
          <span
            className={`program-indicator-pill ${
              isOffering
                ? currentTemplate.pillClass || 'pill-itb'
                : 'pill-loc'
            }`}
          >
            {isOffering
              ? currentTemplate.badge || 'Aktif'
              : '📜 LoC Aktif'}
          </span>
        </div>

        <p style={{ fontSize: '0.75rem', color: 'var(--revou-muted)', marginBottom: '0.75rem' }}>
          Pilih format dokumen resmi yang ingin dibuat:
        </p>

        {/* Dropdown 1: Jenis Surat */}
        <div className="form-group" style={{ marginBottom: '0.75rem' }}>
          <label htmlFor="letter-category-select" className="form-label" style={{ fontWeight: 700 }}>
            Jenis Surat
          </label>
          <div className="select-interactive-wrapper">
            <select
              id="letter-category-select"
              className="form-select select-interactive"
              value={letterCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="penawaran">Surat Penawaran</option>
              <option value="loc">Surat LoC ( tambahan )</option>
            </select>
          </div>
        </div>

        {/* Dropdown 2: Program (Tergantung Jenis Surat) */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor={templateSelectId} className="form-label" style={{ fontWeight: 700 }}>
            {isOffering ? 'Program Penawaran' : 'Program Letter of Commitment'}
          </label>
          <div className="select-interactive-wrapper">
            {isOffering ? (
              <select
                id={templateSelectId}
                className="form-select select-interactive"
                value={templateType}
                onChange={(e) => handleTemplateChange(e.target.value)}
              >
                {OFFERING_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
            ) : (
              <select
                id={templateSelectId}
                className="form-select select-interactive"
                value={locProgram}
                onChange={(e) => handleLocProgramChange(e.target.value)}
              >
                {LOC_PROGRAMS.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* ================= FORM KHUSUS SURAT PENAWARAN ================= */}
      {isOffering && (
        <>
          {/* Card 1: 3 Parameter Utama */}
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

          {/* Card 2: Pengaturan Tanggal, Nomor & Detail Surat */}
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
        </>
      )}

      {/* ================= FORM KHUSUS SURAT LOC ================= */}
      {!isOffering && (
        <>
          {/* Card: Peserta & Komitmen Pembayaran */}
          <div className="section-card primary-card">
            <div className="section-header">
              <div className="section-title">
                <span>Data Komitmen LoC</span>
              </div>
              <span className="badge-tag">Wajib Diisi</span>
            </div>

            <p style={{ fontSize: '0.74rem', color: 'var(--revou-muted)', marginBottom: '0.85rem' }}>
              ℹ️ Bagian identitas penandatangan (Name, Position, Institution, NPWP, Address) dibuat statis sesuai template resmi. Silakan isi data komitmen di bawah ini:
            </p>

            <div className="form-group">
              <label className="form-label">
                <span>Nama Perusahaan (declare that ...)</span>
                <span className="helper">Contoh: PT ABC</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: PT ABC"
                value={locInstitutionName}
                onChange={(e) => setLocInstitutionName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Nama Peserta (Applicant/s)</span>
                <span className="helper">Tulis 1 nama per baris (akan otomatis bernomor)</span>
              </label>
              <textarea
                className="form-input"
                rows={3}
                placeholder="1. Zakki&#10;2. Pita"
                value={locApplicantsText}
                onChange={(e) => setLocApplicantsText(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Total Biaya Pendaftaran (Tuition)</span>
                <span className="helper">Contoh: IDR 25,500,000</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: IDR 25,500,000"
                value={locTuition}
                onChange={(e) => setLocTuition(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Batas Tanggal Pembayaran (Deadline)</span>
                <span className="helper">Contoh: [Date of Payment]</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: [Date of Payment]"
                value={locPaymentDeadline}
                onChange={(e) => setLocPaymentDeadline(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span>Tempat / Kota (Place)</span>
                <span className="helper">Contoh: (Place) atau Jakarta</span>
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="Contoh: (Place)"
                value={locPlace}
                onChange={(e) => setLocPlace(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {/* Action Buttons: Unduh DOCX & Reset */}
      <div className="section-card" style={{ textAlign: 'center' }}>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}
          onClick={handleDownloadDocx}
        >
          {isOffering
            ? '📥 Unduh Format .DOCX (Surat Penawaran)'
            : '📥 Unduh Format .DOCX (Letter of Commitment)'}
        </button>

        <div style={{ marginTop: '0.65rem' }}>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: '100%', fontSize: '0.78rem' }}
            onClick={handleReset}
          >
            🔄 Reset ke Default ({isOffering ? currentTemplate.name : currentLocProgram?.name || 'LoC'})
          </button>
        </div>
      </div>
    </aside>
  );
}
