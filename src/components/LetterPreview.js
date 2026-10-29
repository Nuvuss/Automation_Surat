'use client';

import React from 'react';
import Image from 'next/image';
import HighlightSpan from './HighlightSpan';
import DigitalSignature from './DigitalSignature';

export default function LetterPreview({
  zoomScale,
  setZoomScale,
  // Letter Category
  letterCategory = 'penawaran',
  currentLocProgram,
  locApproverName,
  locApproverPosition,
  locInstitutionName,
  locNpwp,
  locAddress,
  locApplicantsText,
  locTuition,
  locPaymentDeadline,
  locPlace,

  // Offering letter props
  currentTemplate,
  letterDate,
  effectiveLetterNumber,
  effectiveRole,
  effectiveCompany,
  effectiveLocation,
  effectiveEmployee,
  templateType,
  startDate,
  normalPrice,
  fullPromoPrice,
  effectiveCertification,
  signerName,
  signerEmail,
  signerTitle,
}) {
  const isOffering = letterCategory === 'penawaran';
  const effectiveInstitution = locInstitutionName?.trim() || 'PT ABC';
  const effectiveTuition = locTuition?.trim() || 'IDR 25,500,000';
  const effectiveProgram = currentLocProgram?.name || 'Full-Stack Digital Marketing';
  const effectiveDeadline = locPaymentDeadline?.trim() || '[Date of Payment]';
  const effectivePlace = locPlace?.trim() || 'Jakarta';

  const applicantList = typeof locApplicantsText === 'string'
    ? locApplicantsText
        .split('\n')
        .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
        .filter(Boolean)
    : [];
  const safeApplicants = applicantList.length > 0 ? applicantList : ['Zakki', 'Pita'];

  return (
        <main className="preview-area">
          {/* Zoom & View Toolbar */}
          <div className="preview-toolbar no-print">
            <div className="preview-scale-controls">
              <span>Ukuran Tampilan:</span>
              <button
                type="button"
                className="scale-btn"
                onClick={() => setZoomScale(Math.max(0.6, zoomScale - 0.1))}
                title="Perkecil"
              >
                -
              </button>
              <span style={{ minWidth: '40px', textAlign: 'center' }}>{Math.round(zoomScale * 100)}%</span>
              <button
                type="button"
                className="scale-btn"
                onClick={() => setZoomScale(Math.min(1.2, zoomScale + 0.1))}
                title="Perbesar"
              >
                +
              </button>
              <button
                type="button"
                className="scale-btn"
                style={{ width: 'auto', padding: '0 8px', fontSize: '0.75rem' }}
                onClick={() => setZoomScale(0.88)}
                title="Reset zoom"
              >
                Reset
              </button>
            </div>

            <div style={{ height: '18px', width: '1px', background: '#CBD5E1' }}></div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#475569' }}>
              <span style={{ fontWeight: 700, color: '#1E40AF' }}>
                {isOffering ? currentTemplate.name : effectiveProgram}
              </span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <span>{isOffering ? '2 Halaman A4' : '1 Halaman A4'}</span>
            </div>
          </div>

          {/* Printable Letter Sheets */}
          <div
            id="printable-letter-container"
            className="paper-container"
            style={{ transform: `scale(${zoomScale})` }}
          >
            {!isOffering ? (
              /* ===================== LETTER OF COMMITMENT (1 HALAMAN) ===================== */
              <div className="page-wrapper">
                <div className="page-number-pill no-print">Letter of Commitment (1 Halaman A4)</div>
                <article className="a4-sheet loc-sheet" id="page-loc">
                  {/* Header company placeholder */}
                  <div className="loc-header-box">
                    <strong>[HEADER COMPANY/INSTITUTION LETTER WITH LOGO]</strong>
                  </div>

                  {/* Title */}
                  <h1 className="loc-title">Letter of Commitment</h1>

                  {/* Salutation / Statement intro */}
                  <p className="loc-intro">I, the undersigned, hereby:</p>

                  {/* Info table */}
                  <div className="loc-info-grid">
                    <div className="loc-info-row">
                      <div className="loc-label">Name</div>
                      <div className="loc-colon">:</div>
                      <div className="loc-value" style={{ color: '#0000FF' }}>
                        (Name of person who approves the training)
                      </div>
                    </div>

                    <div className="loc-info-row">
                      <div className="loc-label">Position</div>
                      <div className="loc-colon">:</div>
                      <div className="loc-value"></div>
                    </div>

                    <div className="loc-info-row">
                      <div className="loc-label">Institution Name</div>
                      <div className="loc-colon">:</div>
                      <div className="loc-value"></div>
                    </div>

                    <div className="loc-info-row">
                      <div className="loc-label">NPWP</div>
                      <div className="loc-colon">:</div>
                      <div className="loc-value"></div>
                    </div>

                    <div className="loc-info-row">
                      <div className="loc-label">Address</div>
                      <div className="loc-colon">:</div>
                      <div className="loc-value"></div>
                    </div>

                    <div className="loc-info-row">
                      <div className="loc-label">Name of Applicant(s)</div>
                      <div className="loc-colon">:</div>
                      <div className="loc-value">
                        <div className="loc-applicants-list">
                          {safeApplicants.map((app, idx) => (
                            <div key={idx} className="loc-applicant-item">
                              <HighlightSpan>{`${idx + 1}. ${app}`}</HighlightSpan>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commitment Declaration */}
                  <p className="loc-declaration">
                    declare that <HighlightSpan><strong>{effectiveInstitution}</strong></HighlightSpan> agrees to pay the enrollment tuition for the applicants in the amount of <HighlightSpan><strong>{effectiveTuition}</strong></HighlightSpan> for the <HighlightSpan><strong>{effectiveProgram}</strong></HighlightSpan> program on <HighlightSpan><strong>{effectiveDeadline}</strong></HighlightSpan> at the latest. If the company has not paid by the deadline, the institution agrees to cancel the applicant’s participation in the program.
                  </p>

                  {/* Signature Section */}
                  <div className="loc-signature-block">
                    <div className="loc-place-date" style={{ color: '#0000FF' }}>
                      ({effectivePlace}), 
                    </div>
                    <div className="loc-stamp-space"></div>
                    <div className="loc-signer-name" style={{ color: '#0000FF' }}>
                      (Name of Person in charge &amp; office stamp)
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              <>
            {/* ===================== HALAMAN 1 ===================== */}
            <div className="page-wrapper">
              <div className="page-number-pill no-print">Halaman 1 dari 2 ({currentTemplate.name})</div>
              <article className="a4-sheet" id="page-1">
                {/* Header */}
                <header className="letter-header">
                  <Image
                    src={currentTemplate.logo || "/revou-logo.png"}
                    alt={currentTemplate.logoAlt || "Logo RevoU"}
                    width={86}
                    height={86}
                    style={{ objectFit: 'contain' }}
                    priority
                  />

                  <div className="company-letterhead">
                    <div className="comp-name">PT REVOLUSI CITA EDUKASI</div>
                    <div>Menara Rajawali, Ground Floor</div>
                    <div>Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan</div>
                    <div>Jakarta Selatan 12950</div>
                  </div>
                </header>

                {/* Date */}
                <div className="letter-date-row">
                  <div className="letter-date">
                    <HighlightSpan>{letterDate}</HighlightSpan>
                  </div>
                </div>

                {/* Letter Reference */}
                <div className="letter-ref-block">
                  <div className="ref-row">
                    <div className="ref-label">Nomor</div>
                    <div className="ref-colon">:</div>
                    <div className="ref-content">
                      <HighlightSpan>{effectiveLetterNumber}</HighlightSpan>
                    </div>
                  </div>
                  <div className="ref-row">
                    <div className="ref-label">Perihal</div>
                    <div className="ref-colon">:</div>
                    <div className="ref-content">
                      {templateType === 'binus' ? (
                        <>
                          Informasi Program Applied AI, Analytics &amp;<br />
                          Automation (RevoU X BINUS)
                        </>
                      ) : (
                        currentTemplate.subject
                      )}
                    </div>
                  </div>
                </div>

                {/* Recipient */}
                <div className="letter-recipient-block">
                  <div className="recipient-title"><strong>Kepada Yth.</strong></div>
                  <div className="recipient-role-company">
                    <HighlightSpan>
                      <strong>{effectiveRole}</strong>
                    </HighlightSpan>
                  </div>
                  <div className="recipient-role-company">
                    <HighlightSpan>
                      <strong>{effectiveCompany}</strong>
                    </HighlightSpan>
                  </div>
                  <div>
                    <HighlightSpan>{effectiveLocation}</HighlightSpan>
                  </div>
                </div>

                {/* Salutation */}
                <div className="letter-salutation">
                  Bapak/Ibu yang kami hormati,
                </div>

                {/* Paragraphs */}
                {templateType !== 'itb_ds' && (
                  <p className="letter-paragraph">
                    Semoga Bapak/Ibu dalam keadaan sehat dan baik.
                  </p>
                )}

                {templateType === 'itb_ds' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan Institut Teknologi Bandung (ITB), RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin berkembangnya pemanfaatan data dan kecerdasan artifisial (AI) dalam proses bisnis, kemampuan untuk tidak hanya menganalisis data, tetapi juga membangun model prediktif dan solusi berbasis AI menjadi semakin penting bagi profesional di berbagai industri.
                    </p>

                    <p className="letter-paragraph">
                      Dengan senang hati kami menawarkan <strong>program pengembangan kompetensi Applied Data Science with AI (RevoU X ITB)</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Applied Data Science with AI (RevoU X ITB)</strong> dirancang bagi profesional yang telah memiliki dasar analitik data dan ingin mengembangkan kemampuan lebih lanjut, mulai dari <em>predictive modelling</em>, pemanfaatan AI dalam proses analisis dan pengembangan solusi, hingga membangun <em>data products</em> yang dapat digunakan untuk mendukung kebutuhan bisnis.
                    </p>

                    <p className="letter-paragraph">
                      Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya pada permasalahan nyata dari pekerjaan atau organisasi masing-masing. Selama program berlangsung, peserta akan:
                    </p>

                    <ul className="letter-list">
                      <li>
                        Mengembangkan kemampuan dalam <strong>predictive modelling</strong> dan validasi model untuk menghasilkan insight yang dapat dipercaya.
                      </li>
                      <li>
                        Memanfaatkan <strong>AI dan AI coding agents</strong> untuk mempercepat proses analisis dan pengembangan solusi data.
                      </li>
                      <li>
                        Membangun <strong>AI-enabled data product</strong> berdasarkan permasalahan atau keputusan nyata dari pekerjaan peserta.
                      </li>
                      <li>
                        Mempelajari proses <strong>monitoring, testing, reproducibility, dan responsible AI governance</strong> untuk memastikan solusi dapat digunakan secara berkelanjutan.
                      </li>
                      <li>
                        Mempresentasikan dan mempertahankan hasil <em>capstone project</em> di hadapan panel praktisi industri.
                      </li>
                    </ul>
                  </>
                ) : templateType === 'hr' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin pentingnya peran HR sebagai mitra strategis bisnis serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Strategic HR with AI (RevoU)</strong> dirancang untuk menjawab tantangan yang dihadapi fungsi HR modern. Banyak praktisi HR yang kuat di sisi eksekusi, namun belum dilibatkan dalam pengambilan keputusan strategis. Program ini membekali peserta dengan kemampuan HR Business Partner (HRBP) secara menyeluruh, mencakup <em>Organisation Development</em>, <em>Talent Management</em>, <em>Performance Management</em>, <em>Compensation &amp; Benefits</em>, serta <em>HR Operations &amp; Compliance</em> — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
                    </p>

                    <p className="letter-paragraph">
                      Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.
                    </p>

                    <div className="letter-paragraph" style={{ marginBottom: '6px' }}>
                      Selama program berlangsung, peserta akan:
                    </div>

                    <ul className="letter-list">
                      <li>
                        Mengasah kemampuan mendiagnosa situasi bisnis dan menerjemahkannya menjadi prioritas dan strategi HR yang tepat.
                      </li>
                      <li>
                        Mengerjakan project portofolio di setiap modul berbasis skenario perusahaan yang realistis (total 6 mini project + 1 capstone).
                      </li>
                      <li>
                        Menyusun rencana kerja HRBP 6 bulan (capstone) lengkap dengan <em>AI-enabled solution</em> yang berfungsi, dan mempresentasikannya di hadapan <em>simulated leadership panel</em>.
                      </li>
                    </ul>
                  </>
                ) : templateType === 'fsda' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari <strong>RevoU (PT Revolusi Cita Edukasi)</strong>, perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin pentingnya pengambilan keputusan berbasis data serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Full Stack Data Analytics (RevoU)</strong> dirancang untuk menjawab kebutuhan organisasi akan talenta yang mampu mengubah data menjadi keputusan bisnis. Banyak tim memiliki data melimpah, namun waktunya habis untuk membersihkan data dan menyusun laporan manual. Program ini membekali peserta dengan kemampuan analisis data secara menyeluruh, mencakup <em>Business Problem Structuring, Statistics &amp; Spreadsheet, SQL, Python for Data Analysis, Data Visualization, Data Communication</em>, hingga <em>Production-Ready Analytics</em> — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
                    </p>

                    <p className="letter-paragraph">
                      Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.
                    </p>

                    <div className="letter-paragraph" style={{ marginBottom: '6px', fontWeight: 'bold' }}>
                      Selama program berlangsung, peserta akan:
                    </div>

                    <ul className="letter-list">
                      <li>
                        Mengasah kemampuan menstrukturkan masalah bisnis, menyusun hipotesis, dan menentukan metrik yang tepat sebelum mulai menganalisis data.
                      </li>
                      <li>
                        Mengerjakan project portofolio berbasis studi kasus industri yang realistis (total 6 <em>skill-specific project</em> + 1 <em>end-to-end project</em>).
                      </li>
                      <li>
                        Membangun analisis dengan SQL dan Python, dashboard, serta sistem pelaporan otomatis, lalu mempresentasikan hasilnya di hadapan praktisi data berpengalaman.
                      </li>
                    </ul>
                  </>
                ) : templateType === 'fsdm' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari <strong>RevoU (PT Revolusi Cita Edukasi)</strong>, perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin kompetitifnya lanskap pemasaran digital serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Full Stack Digital Marketing (RevoU)</strong> dirancang untuk menjawab tantangan yang dihadapi tim pemasaran modern. Standar kerja marketer telah berubah: tim dituntut menghasilkan output lebih banyak dalam waktu lebih singkat, sambil tetap fokus pada strategi dan hasil bisnis. Program ini membekali peserta dengan kemampuan digital marketing secara menyeluruh melalui 12 modul, mencakup <em>Performance Measurement &amp; Budget Allocation, Product Marketing &amp; Landing Page, Google Analytics &amp; GTM, Social Media Organic, Influencer Marketing (KOL), Meta Ads, TikTok &amp; Marketplace Ads, Google Ads, SEO</em>, serta <em>Customer Relationship Management (CRM)</em> — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
                    </p>

                    <p className="letter-paragraph">
                      Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.
                    </p>

                    <div className="letter-paragraph" style={{ marginBottom: '6px', fontWeight: 'bold' }}>
                      Selama program berlangsung, peserta akan:
                    </div>

                    <ul className="letter-list">
                      <li>
                        Mengasah kemampuan menerjemahkan tujuan bisnis menjadi KPI pemasaran, alokasi budget per kanal, dan <em>media plan</em> yang terukur.
                      </li>
                      <li>
                        Mengerjakan project portofolio di setiap modul (total 13 project), antara lain kampanye Meta Ads, Google Ads, TikTok/Marketplace, strategi SEO, <em>content plan</em>, strategi KOL, hingga CRM <em>plan</em>.
                      </li>
                      <li>
                        Mempresentasikan hasil kerja kepada instruktur praktisi industri untuk mendapatkan <em>feedback</em> langsung di setiap modul.
                      </li>
                    </ul>
                  </>
                ) : templateType === 'fsse' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari <strong>RevoU (PT Revolusi Cita Edukasi)</strong>, perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin pesatnya transformasi digital serta pemanfaatan kecerdasan artifisial (AI) dalam proses pengembangan perangkat lunak, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Full Stack Software Engineering (RevoU)</strong> merupakan program <em>software engineering</em> berbasis AI (<em>AI-native</em>) pertama di Indonesia yang dikembangkan dalam kemitraan dengan <strong>Amazon Web Services (AWS)</strong>. Saat ini, semakin banyak kode ditulis dengan bantuan AI; yang dibutuhkan perusahaan adalah engineer yang mampu mengarahkan, meninjau, dan menyempurnakan output AI dengan fondasi teknis yang kuat. Program ini membekali peserta melalui 4 fase pembelajaran, mencakup <em>Algorithm, Backend (Python, Flask, PostgreSQL), Frontend (Next.js, TypeScript, Tailwind)</em>, serta <em>AI-Driven Development</em> menggunakan Kiro — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
                    </p>

                    <p className="letter-paragraph">
                      Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap fase.
                    </p>

                    <div className="letter-paragraph" style={{ marginBottom: '6px', fontWeight: 'bold' }}>
                      Selama program berlangsung, peserta akan:
                    </div>

                    <ul className="letter-list">
                      <li>
                        Membangun fondasi logika pemrograman dan algoritma, lalu menerapkannya pada pengembangan API, <em>backend, frontend, testing</em>, hingga <em>deployment</em>.
                      </li>
                      <li>
                        Mengerjakan 2 project portofolio: 1 <em>full-stack application</em> dengan pendekatan konvensional dan 1 project yang dibangun sepenuhnya dengan <em>AI-driven development</em>.
                      </li>
                      <li>
                        Menyelesaikan <em>HackerRank challenge</em> di akhir setiap fase — platform tes teknis standar yang digunakan perusahaan di seluruh dunia.
                      </li>
                    </ul>
                  </>
                ) : templateType === 'binus' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>edtech</em> yang berfokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia, RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Applied AI, Analytics &amp; Automation (RevoU X BINUS)</strong>. Program ini dirancang untuk meningkatkan kemampuan peserta dalam penerapan <em>AI</em>, <em>analytics</em>, dan <em>workflow automation</em> melalui pengalaman belajar yang interaktif, praktis, dan relevan dengan kebutuhan industri.
                    </p>

                    <p className="letter-paragraph">
                      Dengan kombinasi pembelajaran <em>online</em> dan <em>offline</em>, peserta akan mendapatkan pemahaman konseptual sekaligus pengalaman <em>hands-on</em> dalam menerapkan AI dan <em>automation</em> untuk menyelesaikan berbagai kebutuhan pekerjaan dan bisnis. Pembelajaran akan disampaikan oleh praktisi industri dan profesor BINUS University.
                    </p>

                    <div className="letter-paragraph" style={{ marginBottom: '6px' }}>
                      Selama program berlangsung, peserta akan:
                    </div>

                    <ul className="letter-list">
                      <li>
                        Menerapkan berbagai tools AI untuk mengotomatisasi tugas analisis, seperti prediksi, <em>sentiment analysis</em>, dan <em>text processing</em>.
                      </li>
                      <li>
                        Membangun <em>workflow</em> yang dapat secara otomatis menyampaikan <em>insight</em> kepada <em>stakeholder</em>.
                      </li>
                      <li>
                        Mengembangkan solusi berbasis AI dan <em>analytics</em> dengan mengangkat langsung kasus bisnis nyata di perusahaan.
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia yaitu ITB, RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu : <HighlightSpan><strong>{effectiveEmployee}</strong></HighlightSpan>
                    </p>

                    <p className="letter-paragraph">
                      <strong>Program Data-Driven &amp; AI-Enabled Decision Making for Leaders (RevoU X ITB)</strong> dirancang untuk menjawab tantangan yang dihadapi para pemimpin organisasi modern. Di tengah melimpahnya data dan <em>dashboard</em>, para pemimpin sering kali masih menghadapi tantangan dalam menentukan insight yang paling relevan serta menerjemahkannya menjadi keputusan strategis yang tepat.
                    </p>

                    <p className="letter-paragraph">
                      Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya secara langsung pada konteks bisnis dan organisasi masing-masing.
                    </p>

                    <div className="letter-paragraph" style={{ marginBottom: '6px' }}>
                      Selama program berlangsung, peserta akan:
                    </div>

                    <ul className="letter-list">
                      <li>
                        Mengasah kemampuan pengambilan keputusan berbasis data dan AI dengan mengangkat langsung kasus bisnis nyata di perusahaan.
                      </li>
                      <li>
                        Membangun AI assistant yang dapat mendukung proses pengambilan keputusan di internal perusahaan.
                      </li>
                      <li>
                        Menyusun <em>decision playbook</em> yang siap diimplementasikan setelah program selesai.
                      </li>
                    </ul>

                    {/* Detail Program for ITB on Page 1 */}
                    <div className="section-subtitle">
                      Detail Program:
                    </div>
                    <ul className="letter-list" style={{ marginBottom: 0 }}>
                      <li>
                        Durasi: 12 minggu, mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        Format: {currentTemplate.format}
                      </li>
                    </ul>
                  </>
                )}
              </article>
            </div>

            {/* ===================== HALAMAN 2 ===================== */}
            <div className="page-wrapper">
              <div className="page-number-pill no-print">Halaman 2 dari 2 ({currentTemplate.name})</div>
              <article className="a4-sheet" id="page-2">
                {/* Header (replicated on page 2) */}
                <header className="letter-header">
                  <Image
                    src={currentTemplate.logo || "/revou-logo.png"}
                    alt={currentTemplate.logoAlt || "Logo RevoU"}
                    width={86}
                    height={86}
                    style={{ objectFit: 'contain' }}
                    priority
                  />

                  <div className="company-letterhead">
                    <div className="comp-name">PT REVOLUSI CITA EDUKASI</div>
                    <div>Menara Rajawali, Ground Floor</div>
                    <div>Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan</div>
                    <div>Jakarta Selatan 12950</div>
                  </div>
                </header>

                {templateType === 'itb_ds' ? (
                  <>
                    {/* Detail Program for ITB Data Science */}
                    <div className="section-subtitle">
                      <strong>Detail Program:</strong>
                    </div>
                    <ul className="letter-list" style={{ marginBottom: '14px' }}>
                      <li>
                        <strong>Durasi:</strong> 13 minggu, mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Format:</strong> {currentTemplate.format}
                      </li>
                      <li>
                        <strong>Sesi Online:</strong> {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        <strong>Sertifikasi:</strong> {currentTemplate.certification}
                      </li>
                      <li>
                        <strong>Biaya Program:</strong> <span className="price-strike">{normalPrice}</span> <HighlightSpan><strong>{fullPromoPrice}</strong></HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      <strong>Manfaat bagi Organisasi:</strong>
                    </div>
                    <ul className="letter-list">
                      <li>
                        Memperkuat kapabilitas <strong>data science dan predictive analytics</strong> di internal perusahaan.
                      </li>
                      <li>
                        Meningkatkan kemampuan karyawan dalam menerjemahkan permasalahan bisnis menjadi solusi berbasis data dan AI.
                      </li>
                      <li>
                        Mendorong pemanfaatan AI untuk meningkatkan efisiensi proses analisis dan pengembangan solusi.
                      </li>
                      <li>
                        Menghasilkan <strong>data product yang aplikatif</strong> berdasarkan permasalahan nyata di lingkungan kerja.
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya program <strong>Applied Data Science with AI (RevoU X ITB)</strong> dapat memberikan nilai tambah bagi <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin <em>data-driven</em> serta perkembangan teknologi AI.
                    </p>

                    <p className="letter-paragraph">
                      Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> dalam mendukung pengembangan kompetensi karyawan dan kapabilitas data &amp; AI di organisasi.
                    </p>
                  </>
                ) : templateType === 'hr' ? (
                  <>
                    {/* Detail Program for HR */}
                    <div className="section-subtitle">
                      Detail Program:
                    </div>
                    <ul className="letter-list" style={{ marginBottom: '14px' }}>
                      <li>
                        Durasi: 15 minggu, mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        Format: {currentTemplate.format}
                      </li>
                      <li>
                        Sesi Online: {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        Sertifikat: {currentTemplate.certification}
                      </li>
                      <li>
                        Biaya Program: <span className="price-strike">{normalPrice}</span> <HighlightSpan>{fullPromoPrice}</HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      Manfaat bagi Organisasi:
                    </div>
                    <ul className="letter-list">
                      <li>
                        Membangun kapabilitas HR strategis internal yang mampu menjadi mitra strategi bisnis, bukan sekadar menjalankan proses.
                      </li>
                      <li>
                        Satu program mencakup seluruh domain HR serta keterkaitannya, tanpa perlu pelatihan terpisah per fungsi.
                      </li>
                      <li>
                        Meningkatkan kesiapan AI fungsi HR, dengan pendekatan <em>tool-agnostic</em> sehingga relevan dengan tools apa pun yang digunakan perusahaan.
                      </li>
                      <li>
                        Menghasilkan output nyata: rencana kerja HRBP 6 bulan dan <em>AI-enabled solution</em> yang dapat langsung diadaptasi untuk kebutuhan perusahaan.
                      </li>
                      <li>
                        Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya program ini dapat memberikan nilai tambah bagi <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan fungsi HR menghadapi kebutuhan bisnis yang semakin strategis dan didukung oleh perkembangan teknologi AI.
                    </p>

                    <p className="letter-paragraph">
                      Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> dalam mendukung pengembangan kompetensi para karyawan.
                    </p>
                  </>
                ) : templateType === 'fsda' ? (
                  <>
                    {/* Detail Program for FSDA */}
                    <div className="section-subtitle">
                      <strong>Detail Program:</strong>
                    </div>
                    <ul className="letter-list" style={{ marginBottom: '14px' }}>
                      <li>
                        <strong>Durasi:</strong> 4 bulan, mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Format:</strong> {currentTemplate.format}
                      </li>
                      <li>
                        <strong>Jadwal:</strong> {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        <strong>Sertifikat:</strong> <HighlightSpan>{effectiveCertification}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Biaya Program:</strong> <span className="price-strike">{normalPrice}</span> <HighlightSpan><strong>{fullPromoPrice}</strong></HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      <strong>Manfaat bagi Organisasi:</strong>
                    </div>
                    <ul className="letter-list">
                      <li>
                        Membangun kapabilitas <strong>data analytics internal</strong> yang siap pakai, tanpa perlu proses adaptasi yang panjang.
                      </li>
                      <li>
                        Meningkatkan efisiensi dan kecepatan pengambilan keputusan berbasis data di seluruh fungsi bisnis.
                      </li>
                      <li>
                        Mengurangi ketergantungan pada <em>tools</em> atau <em>talent eksternal</em> dengan memiliki talenta analisis data sendiri di dalam tim.
                      </li>
                      <li>
                        Mendorong efisiensi kerja melalui otomatisasi pelaporan dan visualisasi data yang terstandar.
                      </li>
                      <li>
                        Meningkatkan retensi dan motivasi karyawan melalui investasi nyata pada pengembangan profesional mereka.
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya keikutsertaan dalam <strong>Program Full Stack Data Analytics</strong> ini akan memberikan kontribusi langsung dan terukur bagi efisiensi serta pertumbuhan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      Demikian surat penawaran ini kami sampaikan. Kami sangat terbuka untuk berdiskusi lebih lanjut guna menyesuaikan program ini dengan kebutuhan spesifik di <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.
                    </p>
                  </>
                ) : templateType === 'fsdm' ? (
                  <>
                    {/* Detail Program for FSDM */}
                    <div className="section-subtitle">
                      <strong>Detail Program:</strong>
                    </div>
                    <ul className="letter-list" style={{ marginBottom: '14px' }}>
                      <li>
                        <strong>Durasi:</strong> 4 bulan, mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Format:</strong> {currentTemplate.format}
                      </li>
                      <li>
                        <strong>Jadwal:</strong> {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        <strong>Sertifikat:</strong> <HighlightSpan>{effectiveCertification}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Biaya Program:</strong> <span className="price-strike">{normalPrice}</span> <HighlightSpan><strong>{fullPromoPrice}</strong></HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      <strong>Manfaat bagi Organisasi:</strong>
                    </div>
                    <ul className="letter-list">
                      <li>
                        Membangun kapabilitas <em>digital marketing</em> internal yang komprehensif, mulai dari <em>organic</em> hingga <em>paid acquisition</em>.
                      </li>
                      <li>
                        Meningkatkan efektivitas dan efisiensi alokasi anggaran pemasaran melalui optimasi berbasis data dan analytics.
                      </li>
                      <li>
                        Mengurangi ketergantungan pada agensi eksternal dengan memiliki tim internal yang mampu mengeksekusi dan mengelola kampanye mandiri.
                      </li>
                      <li>
                        Mendorong pertumbuhan bisnis yang terukur melalui strategi pemasaran digital terintegrasi di berbagai channel.
                      </li>
                      <li>
                        Meningkatkan retensi dan motivasi karyawan melalui investasi nyata pada peningkatan kompetensi profesional mereka.
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya keikutsertaan dalam <strong>Program Full Stack Digital Marketing</strong> ini akan memberikan kontribusi langsung dan terukur bagi efisiensi serta pertumbuhan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      Demikian surat penawaran ini kami sampaikan. Kami sangat terbuka untuk berdiskusi lebih lanjut guna menyesuaikan program ini dengan kebutuhan spesifik di <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.
                    </p>
                  </>
                ) : templateType === 'fsse' ? (
                  <>
                    {/* Detail Program for FSSE */}
                    <div className="section-subtitle">
                      <strong>Detail Program:</strong>
                    </div>
                    <ul className="letter-list" style={{ marginBottom: '14px' }}>
                      <li>
                        <strong>Durasi:</strong> 5 bulan (4 fase, 21 minggu), mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Format:</strong> {currentTemplate.format}
                      </li>
                      <li>
                        <strong>Jadwal:</strong> {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        <strong>Sertifikat:</strong> <HighlightSpan>{effectiveCertification}</HighlightSpan>
                      </li>
                      <li>
                        <strong>Kebutuhan Perangkat:</strong> Laptop Windows (x64, RAM 8 GB, Intel i3 gen 5 ke atas) atau Mac (macOS Mojave 10.14 ke atas)
                      </li>
                      <li>
                        <strong>Biaya Program:</strong> <span className="price-strike">{normalPrice}</span> <HighlightSpan><strong>{fullPromoPrice}</strong></HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      <strong>Manfaat bagi Organisasi:</strong>
                    </div>
                    <ul className="letter-list">
                      <li>
                        Membangun kapabilitas <em>software engineering</em> internal yang siap kerja, mencakup sisi <em>frontend</em>, <em>backend</em>, maupun <em>full stack</em>.
                      </li>
                      <li>
                        Meningkatkan kecepatan dan kualitas pengembangan produk atau sistem internal perusahaan.
                      </li>
                      <li>
                        Mengurangi biaya ketergantungan pada vendor/pengembang eksternal dengan memperkuat tim teknis in-house.
                      </li>
                      <li>
                        Menerapkan standar <em>engineering</em> modern, mulai dari <em>clean code</em>, arsitektur yang <em>scalable</em>, hingga kolaborasi tim yang terstruktur.
                      </li>
                      <li>
                        Meningkatkan retensi dan motivasi karyawan melalui investasi nyata pada jenjang keterampilan teknis mereka.
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya keikutsertaan dalam <strong>Program Full Stack Software Engineering</strong> ini akan memberikan kontribusi langsung dan terukur bagi kapasitas teknologi serta pertumbuhan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>.
                    </p>

                    <p className="letter-paragraph">
                      Demikian surat penawaran ini kami sampaikan. Kami sangat terbuka untuk berdiskusi lebih lanjut guna menyesuaikan program ini dengan kebutuhan spesifik di <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.
                    </p>
                  </>
                ) : templateType === 'binus' ? (
                  <>
                    {/* Continued bullet from Page 1 */}
                    <ul className="letter-list" style={{ marginTop: 0, marginBottom: '14px' }}>
                      <li>
                        Mempresentasikan solusi secara efektif kepada stakeholder bisnis maupun tim teknis.
                      </li>
                    </ul>

                    {/* Detail Program for BINUS */}
                    <div className="section-subtitle">
                      Detail Program:
                    </div>
                    <ul className="letter-list" style={{ marginBottom: '14px' }}>
                      <li>
                        Durasi: 12 minggu, mulai <HighlightSpan>{startDate}</HighlightSpan>
                      </li>
                      <li>
                        Format: {currentTemplate.format}
                      </li>
                      <li>
                        Sesi Online: {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        Sertifikasi: {currentTemplate.certification}
                      </li>
                      <li>
                        Biaya Program: <span className="price-strike">{normalPrice}</span> <HighlightSpan>{fullPromoPrice}</HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      Manfaat bagi Organisasi:
                    </div>
                    <ul className="letter-list">
                      <li>
                        Meningkatkan kapabilitas peserta dalam penerapan AI, <em>analytics</em>, dan <em>automation</em>.
                      </li>
                      <li>
                        Meningkatkan produktivitas dan efisiensi kerja melalui penerapan AI dan <em>workflow automation</em>.
                      </li>
                      <li>
                        Mendorong pengembangan profesional dan penerapan solusi AI untuk kebutuhan bisnis secara nyata.
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya program ini dapat memberikan nilai tambah bagi <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, <em>data-driven</em>, dan didukung oleh perkembangan teknologi AI.
                    </p>

                    <p className="letter-paragraph">
                      Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>, dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.
                    </p>
                  </>
                ) : (
                  <>
                    {/* Continued Program Details for ITB */}
                    <ul className="letter-list" style={{ marginTop: '4px', marginBottom: '14px' }}>
                      <li>
                        Sesi Online: {currentTemplate.onlineSchedule}
                      </li>
                      <li>
                        Sertifikasi: {currentTemplate.certification}
                      </li>
                      <li>
                        Biaya Program: <span className="price-strike">{normalPrice}</span> <HighlightSpan>{fullPromoPrice}</HighlightSpan>
                      </li>
                    </ul>

                    {/* Manfaat bagi Organisasi */}
                    <div className="section-subtitle">
                      Manfaat bagi Organisasi:
                    </div>
                    <ul className="letter-list">
                      <li>
                        Memperkuat kemampuan pengambilan keputusan berbasis data di level <em>leadership</em>
                      </li>
                      <li>
                        Meningkatkan efisiensi operasional melalui <em>workflow</em> berbasis AI
                      </li>
                      <li>
                        Membangun kapabilitas internal untuk mendukung transformasi digital perusahaan
                      </li>
                      <li>
                        Menghasilkan output nyata berupa <em>framework</em> dan <em>roadmap</em> implementasi
                      </li>
                    </ul>

                    <p className="letter-paragraph">
                      Kami percaya program ini dapat memberikan nilai tambah bagi <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, <em>data-driven</em>, dan didukung oleh perkembangan teknologi AI.
                    </p>

                    <p className="letter-paragraph">
                      Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <HighlightSpan><strong>{effectiveCompany}</strong></HighlightSpan> dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.
                    </p>
                  </>
                )}

                {/* Sign-off */}
                <div className="letter-signoff">
                  <div>Salam hormat,</div>
                  <div style={{ minHeight: '52px', display: 'flex', alignItems: 'flex-end' }}>
                    {currentTemplate.hasSignatureImage ? (
                      <DigitalSignature />
                    ) : (
                      <div className="signature-space"></div>
                    )}
                  </div>
                  <div className="signoff-name-wrapper">
                    <div className="signoff-line"></div>
                    <div className="signoff-name">{signerName}</div>
                  </div>
                  <div className="signoff-email">
                    <a href={`mailto:${signerEmail}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      {signerEmail}
                    </a>
                  </div>
                  <div className="signoff-title">{signerTitle}</div>
                  <div>RevoU (PT Revolusi Cita Edukasi)</div>
                </div>
              </article>
            </div>
            </>
          )}
          </div>
        </main>

  );
}
