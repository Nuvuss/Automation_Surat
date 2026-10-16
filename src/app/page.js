'use client';

import React, { useState, useId, useSyncExternalStore } from 'react';
import Image from 'next/image';

// Highlight helper component placed at module scope to comply with React 19 static component rules
function HighlightSpan({ children, isHighlighted = false, className = '' }) {
  return (
    <span className={`hl-dynamic ${isHighlighted ? 'hl-active' : ''} ${className}`}>
      {children}
    </span>
  );
}

// Digital signature component
function DigitalSignature() {
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

// Real-time Date and Roman Month Helpers
const ROMAN_MONTHS = [
  'I', 'II', 'III', 'IV', 'V', 'VI',
  'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
];

const INDO_MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const emptySubscribe = () => () => {};

function getClientTodayString() {
  const d = new Date();
  const day = d.getDate();
  const monthName = INDO_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `Jakarta, ${day} ${monthName} ${year}`;
}

// Template definitions for ITB and BINUS
const TEMPLATES = {
  itb: {
    id: 'itb',
    name: 'RevoU X ITB',
    seqNumber: '06',
    programName: 'Program Data-Driven & AI-Enabled Decision Making for Leaders (RevoU X ITB)',
    subject: 'Informasi Program Data-Driven & AI Enabled Decision Making for Leaders (RevoU X ITB)',
    defaultCompany: 'PT Hatten Bali Tbk',
    defaultRole: 'Management',
    defaultLocation: 'di tempat',
    defaultEmployee: '______',
    startDate: '15 December 2026',
    normalPrice: 'Rp16.000.000',
    promoPrice: 'Rp14.500.000 (harga khusus early bird)',
    format: 'Hybrid (online dan 2 sesi on-campus di Institut Teknologi Bandung)',
    onlineSchedule: 'Selasa & Kamis, pukul 19.30–21.30 WIB',
    certification: 'Institut Teknologi Bandung (ITB)',
    signerName: 'Pita Rini Fajrian Ramadhani',
    signerEmail: 'admission@revou.co',
    signerTitle: 'Admission Lead',
    hasSignatureImage: false,
  },
  binus: {
    id: 'binus',
    name: 'RevoU X BINUS',
    seqNumber: '14',
    programName: 'Program Applied AI, Analytics & Automation (RevoU X BINUS)',
    subject: 'Informasi Program Applied AI, Analytics & Automation (RevoU X BINUS)',
    defaultCompany: 'PT Pegadaian Galeri Dua Empat',
    defaultRole: 'Management',
    defaultLocation: 'di tempat',
    defaultEmployee: 'Pak Hendra Permana',
    startDate: '30 October 2026',
    normalPrice: 'Rp15.000.000',
    promoPrice: 'Rp13.500.000 per peserta (kuota terbatas diskon early bird)',
    format: 'Hybrid (online dan 2 sesi on-campus di Binus Kemanggisan)',
    onlineSchedule: 'Senin, Selasa & Kamis, pukul 19.30–21.30 WIB',
    certification: 'BINUS University',
    signerName: 'Pita Rini Fajrian Ramadhani',
    signerEmail: 'pita@revou.co',
    signerTitle: 'Admission lead',
    hasSignatureImage: true,
  }
};

export default function SuratPenawaranGenerator() {
  const templateSelectId = useId();
  const roleSelectId = useId();
  const customRoleId = useId();
  const companyNameId = useId();
  const locationSelectId = useId();
  const customLocationId = useId();
  const employeeNameId = useId();
  const letterDateId = useId();
  const letterSeqId = useId();
  const startDateId = useId();
  const normalPriceId = useId();
  const promoPriceId = useId();
  const signerNameId = useId();
  const signerEmailId = useId();
  const signerTitleId = useId();

  // Template Type State (ITB vs BINUS)
  const [templateType, setTemplateType] = useState('itb');

  // 3 Parameter Utama sesuai instruksi user
  const [roleOption, setRoleOption] = useState('Management');
  const [customRole, setCustomRole] = useState('');
  
  const [companyName, setCompanyName] = useState('PT Hatten Bali Tbk');
  
  const [locationOption, setLocationOption] = useState('di tempat');
  const [customLocation, setCustomLocation] = useState('');

  // Nama Karyawan / Peserta (di ITB: ______ , di BINUS: Pak Hendra Permana)
  const [employeeName, setEmployeeName] = useState('______');

  // Real-time client clock synchronization without hydration mismatch or cascading renders
  const clientDateString = useSyncExternalStore(
    emptySubscribe,
    getClientTodayString,
    () => 'Jakarta, 15 Oktober 2026'
  );

  const clientRomanMonth = useSyncExternalStore(
    emptySubscribe,
    () => ROMAN_MONTHS[new Date().getMonth()],
    () => 'X'
  );

  const clientYear = useSyncExternalStore(
    emptySubscribe,
    () => String(new Date().getFullYear()),
    () => '2026'
  );

  // Custom user override for date (if user edits it)
  const [customLetterDate, setCustomLetterDate] = useState('');
  const letterDate = customLetterDate !== '' ? customLetterDate : clientDateString;

  // Hanya nomor urut surat saja yang diisi user
  const [letterSeq, setLetterSeq] = useState('06');
  const [startDate, setStartDate] = useState('15 December 2026');
  const [normalPrice, setNormalPrice] = useState('Rp16.000.000');
  const [promoPrice, setPromoPrice] = useState('Rp14.500.000 (harga khusus early bird)');
  
  const [signerName, setSignerName] = useState('Pita Rini Fajrian Ramadhani');
  const [signerEmail, setSignerEmail] = useState('admission@revou.co');
  const [signerTitle, setSignerTitle] = useState('Admission Lead');

  // UI state
  const [showHighlight, setShowHighlight] = useState(true);
  const [zoomScale, setZoomScale] = useState(0.88);
  const [showGdocsModal, setShowGdocsModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Switch Template Handler
  const handleTemplateChange = (newType) => {
    setTemplateType(newType);
    const tmpl = TEMPLATES[newType];
    setCustomLetterDate('');
    setLetterSeq(tmpl.seqNumber);
    setCompanyName(tmpl.defaultCompany);
    setRoleOption(tmpl.defaultRole);
    setCustomRole('');
    setLocationOption(tmpl.defaultLocation);
    setCustomLocation('');
    setEmployeeName(tmpl.defaultEmployee);
    setStartDate(tmpl.startDate);
    setNormalPrice(tmpl.normalPrice);
    setPromoPrice(tmpl.promoPrice);
    setSignerName(tmpl.signerName);
    setSignerEmail(tmpl.signerEmail);
    setSignerTitle(tmpl.signerTitle);
  };

  // Compute final display strings
  const effectiveRole = roleOption === 'Custom' ? (customRole.trim() || 'Management') : roleOption;
  const effectiveCompany = companyName.trim() || '[Nama Perusahaan]';
  const effectiveLocation = locationOption === 'Custom' ? (customLocation.trim() || 'di tempat') : locationOption;
  const effectiveEmployee = employeeName.trim() || (templateType === 'binus' ? 'Pak Hendra Permana' : '______');
  const effectiveLetterNumber = `${(letterSeq || '01').trim()}/SP/ADM/${clientRomanMonth}/${clientYear}`;

  const currentTemplate = TEMPLATES[templateType];

  // Set today's Indonesian date
  const setTodayDate = () => {
    setCustomLetterDate(getClientTodayString());
  };

  // Reset to current template default
  const handleReset = () => {
    handleTemplateChange(templateType);
    setShowHighlight(true);
  };


  // Generate complete plain text representation
  const generatePlainText = () => {
    if (templateType === 'binus') {
      return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor   : ${effectiveLetterNumber}
Perihal : Informasi Program Applied AI, Analytics &
          Automation (RevoU X BINUS)

Kepada Yth.
${effectiveRole}
${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Semoga Bapak/Ibu dalam keadaan sehat dan baik.

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan edtech yang berfokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia, RevoU menghadirkan program upskilling yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.

Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan program pengembangan kompetensi untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu: ${effectiveEmployee}.

Program Applied AI, Analytics & Automation (RevoU X BINUS). Program ini dirancang untuk meningkatkan kemampuan peserta dalam penerapan AI, analytics, dan workflow automation melalui pengalaman belajar yang interaktif, praktis, dan relevan dengan kebutuhan industri.

Dengan kombinasi pembelajaran online dan offline, peserta akan mendapatkan pemahaman konseptual sekaligus pengalaman hands-on dalam menerapkan AI dan automation untuk menyelesaikan berbagai kebutuhan pekerjaan dan bisnis. Pembelajaran akan disampaikan oleh praktisi industri dan profesor BINUS University.

Selama program berlangsung, peserta akan:
● Menerapkan berbagai tools AI untuk mengotomatisasi tugas analisis, seperti prediksi, sentiment analysis, dan text processing.
● Membangun workflow yang dapat secara otomatis menyampaikan insight kepada stakeholder.
● Mengembangkan solusi berbasis AI dan analytics dengan mengangkat langsung kasus bisnis nyata di perusahaan.
● Mempresentasikan solusi secara efektif kepada stakeholder bisnis maupun tim teknis.

Detail Program:
● Durasi: 12 minggu, mulai ${startDate}
● Format: ${currentTemplate.format}
● Sesi Online: ${currentTemplate.onlineSchedule}
● Sertifikasi: ${currentTemplate.certification}
● Biaya Program: ${normalPrice} ${promoPrice}

Manfaat bagi Organisasi:
● Meningkatkan kapabilitas peserta dalam penerapan AI, analytics, dan automation.
● Meningkatkan produktivitas dan efisiensi kerja melalui penerapan AI dan workflow automation.
● Mendorong pengembangan profesional dan penerapan solusi AI untuk kebutuhan bisnis secara nyata.

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, data-driven, dan didukung oleh perkembangan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany}, dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.

Salam hormat,

${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
    }

    // Default: ITB Template
    return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor : ${effectiveLetterNumber}
Perihal : ${currentTemplate.subject}

Kepada Yth.
${effectiveRole} ${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Semoga Bapak/Ibu dalam keadaan sehat dan baik.

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ed-tech yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia yaitu ITB, RevoU menghadirkan program upskilling yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.

Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan program pengembangan kompetensi untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu : ${effectiveEmployee}

Program Data-Driven & AI-Enabled Decision Making for Leaders (RevoU X ITB) dirancang untuk menjawab tantangan yang dihadapi para pemimpin organisasi modern. Di tengah melimpahnya data dan dashboard, para pemimpin sering kali masih menghadapi tantangan dalam menentukan insight yang paling relevan serta menerjemahkannya menjadi keputusan strategis yang tepat.

Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya secara langsung pada konteks bisnis dan organisasi masing-masing.

Selama program berlangsung, peserta akan:
● Mengasah kemampuan pengambilan keputusan berbasis data dan AI dengan mengangkat langsung kasus bisnis nyata di perusahaan.
● Membangun AI assistant yang dapat mendukung proses pengambilan keputusan di internal perusahaan.
● Menyusun decision playbook yang siap diimplementasikan setelah program selesai.

Detail Program:
● Durasi: 12 minggu, mulai ${startDate}
● Format: ${currentTemplate.format}
● Sesi Online: ${currentTemplate.onlineSchedule}
● Sertifikasi: ${currentTemplate.certification}
● Biaya Program: ${normalPrice} ${promoPrice}

Manfaat bagi Organisasi:
● Memperkuat kemampuan pengambilan keputusan berbasis data di level leadership
● Meningkatkan efisiensi operasional melalui workflow berbasis AI
● Membangun kapabilitas internal untuk mendukung transformasi digital perusahaan
● Menghasilkan output nyata berupa framework dan roadmap implementasi

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, data-driven, dan didukung oleh perkembangan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.

Salam hormat,

${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
  };

  // Print / Save as PDF Handler
  const handlePrintPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Google Docs Export Handler with authentic table formatting for colons and justified paragraphs
  const handleOpenGoogleDocs = async () => {
    // Open new tab synchronously within click gesture to prevent browser popup blocker from blocking it
    try {
      window.open('https://docs.google.com/document/create', '_blank');
    } catch (e) {
      console.warn('Browser blocked popup:', e);
    }

    const plainText = generatePlainText();
    
    // Google Docs exported document is clean without yellow highlights (highlights are only for on-screen preview)
    const highlightBg = '';
    const styledHtml = `
      <!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      </head>
      <body style="font-family: Arial, sans-serif; font-size: 11pt; line-height: 1.45; color: #111827;">
        <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 14pt;">
          <tr>
            <td style="width: 50%; vertical-align: top; border: none;">
              <strong style="font-size: 16pt; color: #111827; letter-spacing: 1px;">RevoU</strong>
            </td>
            <td style="width: 50%; text-align: right; vertical-align: top; border: none; font-size: 11pt; line-height: 1.35; color: #111827;">
              <strong>PT REVOLUSI CITA EDUKASI</strong><br/>
              Menara Rajawali, Ground Floor<br/>
              Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan<br/>
              Jakarta Selatan 12950
            </td>
          </tr>
        </table>

        <p style="text-align: right; margin-bottom: 12pt; font-size: 11pt;">
          <span style="${highlightBg}">${letterDate}</span>
        </p>

        <table style="width: 100%; border-collapse: collapse; border: none; margin-bottom: 14pt; font-size: 11pt;">
          <tr>
            <td style="width: 76px; vertical-align: top; border: none; padding: 1px 0;">Nomor</td>
            <td style="width: 16px; vertical-align: top; border: none; padding: 1px 0;">:</td>
            <td style="vertical-align: top; border: none; padding: 1px 0;">
              <span style="${highlightBg}">${effectiveLetterNumber}</span>
            </td>
          </tr>
          <tr>
            <td style="width: 76px; vertical-align: top; border: none; padding: 1px 0;">Perihal</td>
            <td style="width: 16px; vertical-align: top; border: none; padding: 1px 0;">:</td>
            <td style="vertical-align: top; border: none; padding: 1px 0;">
              ${templateType === 'binus' 
                ? 'Informasi Program Applied AI, Analytics &<br/>Automation (RevoU X BINUS)' 
                : currentTemplate.subject}
            </td>
          </tr>
        </table>

        <div style="margin-bottom: 18pt; font-size: 11pt; line-height: 1.35;">
          <strong>Kepada Yth.</strong><br/>
          <span style="${highlightBg}"><strong>${effectiveRole}</strong></span><br/>
          <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span><br/>
          <span style="${highlightBg}">${effectiveLocation}</span>
        </div>

        <p style="margin-bottom: 16pt; font-size: 11pt; line-height: 1.45;">Bapak/Ibu yang kami hormati,</p>
        <p style="margin-bottom: 14pt; font-size: 11pt; line-height: 1.45;">Semoga Bapak/Ibu dalam keadaan sehat dan baik.</p>

        ${templateType === 'binus' ? `
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>edtech</em> yang berfokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia, RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu: <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            <strong>Program Applied AI, Analytics &amp; Automation (RevoU X BINUS)</strong>. Program ini dirancang untuk meningkatkan kemampuan peserta dalam penerapan <em>AI</em>, <em>analytics</em>, dan <em>workflow automation</em> melalui pengalaman belajar yang interaktif, praktis, dan relevan dengan kebutuhan industri.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Dengan kombinasi pembelajaran <em>online</em> dan <em>offline</em>, peserta akan mendapatkan pemahaman konseptual sekaligus pengalaman <em>hands-on</em> dalam menerapkan AI dan <em>automation</em> untuk menyelesaikan berbagai kebutuhan pekerjaan dan bisnis. Pembelajaran akan disampaikan oleh praktisi industri dan profesor BINUS University.
          </p>
          <p style="margin-bottom: 4pt; font-size: 11pt;">Selama program berlangsung, peserta akan:</p>
          <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menerapkan berbagai tools AI untuk mengotomatisasi tugas analisis, seperti prediksi, <em>sentiment analysis</em>, dan <em>text processing</em>.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun <em>workflow</em> yang dapat secara otomatis menyampaikan <em>insight</em> kepada <em>stakeholder</em>.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengembangkan solusi berbasis AI dan <em>analytics</em> dengan mengangkat langsung kasus bisnis nyata di perusahaan.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mempresentasikan solusi secara efektif kepada stakeholder bisnis maupun tim teknis.</li>
          </ul>
          <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
          <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
            <li style="margin-bottom: 3pt; font-size: 11pt;">Durasi: 12 minggu, mulai <span style="${highlightBg}">${startDate}</span></li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Format: ${currentTemplate.format}</li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Sesi Online: ${currentTemplate.onlineSchedule}</li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Sertifikasi: ${currentTemplate.certification}</li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Biaya Program: <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${promoPrice}</strong></span></li>
          </ul>
          <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
          <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan kapabilitas peserta dalam penerapan AI, <em>analytics</em>, dan <em>automation</em>.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan produktivitas dan efisiensi kerja melalui penerapan AI dan <em>workflow automation</em>.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mendorong pengembangan profesional dan penerapan solusi AI untuk kebutuhan bisnis secara nyata.</li>
          </ul>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Kami percaya program ini dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, <em>data-driven</em>, dan didukung oleh perkembangan teknologi AI.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.
          </p>
        ` : `
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia yaitu ITB, RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu : <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            <strong>Program Data-Driven &amp; AI-Enabled Decision Making for Leaders (RevoU X ITB)</strong> dirancang untuk menjawab tantangan yang dihadapi para pemimpin organisasi modern. Di tengah melimpahnya data dan <em>dashboard</em>, para pemimpin sering kali masih menghadapi tantangan dalam menentukan insight yang paling relevan serta menerjemahkannya menjadi keputusan strategis yang tepat.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya secara langsung pada konteks bisnis dan organisasi masing-masing.
          </p>
          <p style="margin-bottom: 4pt; font-size: 11pt;">Selama program berlangsung, peserta akan:</p>
          <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengasah kemampuan pengambilan keputusan berbasis data dan AI dengan mengangkat langsung kasus bisnis nyata di perusahaan.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun AI assistant yang dapat mendukung proses pengambilan keputusan di internal perusahaan.</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menyusun <em>decision playbook</em> yang siap diimplementasikan setelah program selesai.</li>
          </ul>
          <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
          <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
            <li style="margin-bottom: 3pt; font-size: 11pt;">Durasi: 12 minggu, mulai <span style="${highlightBg}">${startDate}</span></li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Format: ${currentTemplate.format}</li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Sesi Online: ${currentTemplate.onlineSchedule}</li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Sertifikasi: ${currentTemplate.certification}</li>
            <li style="margin-bottom: 3pt; font-size: 11pt;">Biaya Program: <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${promoPrice}</strong></span></li>
          </ul>
          <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
          <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Memperkuat kemampuan pengambilan keputusan berbasis data di level <em>leadership</em></li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan efisiensi operasional melalui <em>workflow</em> berbasis AI</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun kapabilitas internal untuk mendukung transformasi digital perusahaan</li>
            <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menghasilkan output nyata berupa <em>framework</em> dan <em>roadmap</em> implementasi</li>
          </ul>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Kami percaya program ini dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, <em>data-driven</em>, dan didukung oleh perkembangan teknologi AI.
          </p>
          <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
            Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.
          </p>
        `}

        <div style="margin-top: 18pt; font-size: 11pt; line-height: 1.45;">
          <p style="margin-bottom: 36pt;">Salam hormat,</p>
          <p style="margin-bottom: 2pt;"><u><strong>${signerName}</strong></u></p>
          <p style="margin-bottom: 2pt; color: #1D4ED8;"><u>${signerEmail}</u></p>
          <p style="margin-bottom: 2pt;">${signerTitle}</p>
          <p style="margin-bottom: 0;">RevoU (PT Revolusi Cita Edukasi)</p>
        </div>
      </body>
      </html>
    `;

    try {
      if (typeof window !== 'undefined' && navigator.clipboard && window.ClipboardItem) {
        const textBlob = new Blob([plainText], { type: 'text/plain' });
        const htmlBlob = new Blob([styledHtml], { type: 'text/html' });
        await navigator.clipboard.write([
          new window.ClipboardItem({
            'text/plain': textBlob,
            'text/html': htmlBlob,
          })
        ]);
        setCopySuccess(true);
      } else {
        await navigator.clipboard.writeText(plainText);
        setCopySuccess(true);
      }
    } catch {
      navigator.clipboard.writeText(plainText);
      setCopySuccess(true);
    }

    setShowGdocsModal(true);
  };

  // Direct download in authentic Microsoft Word .DOCX format with pixel-perfect alignment
  const handleDownloadDocx = async () => {
    try {
      const { 
        Document, 
        Packer, 
        Paragraph, 
        TextRun, 
        AlignmentType, 
        ImageRun, 
        Table, 
        TableRow, 
        TableCell, 
        BorderStyle, 
        WidthType,
        PageBreak,
        Header
      } = await import('docx');

      let logoBuffer = null;
      try {
        const resp = await fetch('/revou-logo.png');
        if (resp.ok) {
          logoBuffer = await resp.arrayBuffer();
        }
      } catch (e) {
        console.warn('Could not load logo for docx:', e);
      }

      // Borderless configuration
      const noneBorder = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
      const tableBordersNone = {
        top: noneBorder,
        bottom: noneBorder,
        left: noneBorder,
        right: noneBorder,
        insideHorizontal: noneBorder,
        insideVertical: noneBorder,
      };
      const cellBordersNone = {
        top: noneBorder,
        bottom: noneBorder,
        left: noneBorder,
        right: noneBorder,
      };

      // Helper to create the official RevoU letterhead table (Word Header)
      const createHeaderTable = () => {
        const cells = [];
        if (logoBuffer) {
          cells.push(
            new TableCell({
              width: { size: 25, type: WidthType.PERCENTAGE },
              borders: cellBordersNone,
              children: [
                new Paragraph({
                  children: [
                    new ImageRun({
                      data: logoBuffer,
                      transformation: { width: 86.4, height: 86.4 },
                      type: 'png',
                    }),
                  ],
                }),
              ],
            })
          );
        }

        cells.push(
          new TableCell({
            width: { size: logoBuffer ? 75 : 100, type: WidthType.PERCENTAGE },
            borders: cellBordersNone,
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 20, line: 240 },
                children: [
                  new TextRun({ text: 'PT REVOLUSI CITA EDUKASI', bold: true, size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 20, line: 240 },
                children: [
                  new TextRun({ text: 'Menara Rajawali, Ground Floor', size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 20, line: 240 },
                children: [
                  new TextRun({ text: 'Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan', size: 22 }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                spacing: { after: 0, line: 240 },
                children: [
                  new TextRun({ text: 'Jakarta Selatan 12950', size: 22 }),
                ],
              }),
            ],
          })
        );

        return new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: tableBordersNone,
          rows: [
            new TableRow({
              children: cells,
            }),
          ],
        });
      };

      // 3-Column Table for Nomor and Perihal: perfectly aligns the colons and indents wrapped lines
      const refTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: tableBordersNone,
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 14, type: WidthType.PERCENTAGE },
                borders: cellBordersNone,
                children: [
                  new Paragraph({
                    spacing: { after: 40, line: 260 },
                    children: [new TextRun({ text: 'Nomor', size: 22 })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 3, type: WidthType.PERCENTAGE },
                borders: cellBordersNone,
                children: [
                  new Paragraph({
                    spacing: { after: 40, line: 260 },
                    children: [new TextRun({ text: ':', size: 22 })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 83, type: WidthType.PERCENTAGE },
                borders: cellBordersNone,
                children: [
                  new Paragraph({
                    spacing: { after: 40, line: 260 },
                    children: [
                      new TextRun({
                        text: effectiveLetterNumber,
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          new TableRow({
            children: [
              new TableCell({
                width: { size: 14, type: WidthType.PERCENTAGE },
                borders: cellBordersNone,
                children: [
                  new Paragraph({
                    spacing: { after: 40, line: 260 },
                    children: [new TextRun({ text: 'Perihal', size: 22 })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 3, type: WidthType.PERCENTAGE },
                borders: cellBordersNone,
                children: [
                  new Paragraph({
                    spacing: { after: 40, line: 260 },
                    children: [new TextRun({ text: ':', size: 22 })],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 83, type: WidthType.PERCENTAGE },
                borders: cellBordersNone,
                children: [
                  new Paragraph({
                    spacing: { after: 40, line: 260 },
                    children: templateType === 'binus' ? [
                      new TextRun({
                        text: 'Informasi Program Applied AI, Analytics &',
                        size: 22,
                      }),
                      new TextRun({
                        text: 'Automation (RevoU X BINUS)',
                        size: 22,
                        break: 1,
                      }),
                    ] : [
                      new TextRun({
                        text: currentTemplate.subject,
                        size: 22,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });

      const bodyParagraphs = [];

      // PAGE 1: Date + Reference + Recipient + Intro + Program start
      bodyParagraphs.push(
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          spacing: { before: 80, after: 180, line: 260 },
          children: [
            new TextRun({ 
              text: letterDate, 
              size: 22,
            }),
          ],
        }),
        refTable,
        new Paragraph({
          spacing: { before: 180, after: 30, line: 260 },
          children: [
            new TextRun({ text: 'Kepada Yth.', bold: true, size: 22 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 30, line: 260 },
          children: [
            new TextRun({ 
              text: effectiveRole, 
              bold: true, 
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 30, line: 260 },
          children: [
            new TextRun({ 
              text: effectiveCompany, 
              bold: true, 
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 260, line: 260 },
          children: [
            new TextRun({ 
              text: effectiveLocation, 
              size: 22,
            }),
          ],
        }),
        new Paragraph({
          spacing: { after: 260, line: 260 },
          children: [
            new TextRun({ text: 'Bapak/Ibu yang kami hormati,', size: 22 }),
          ],
        }),
        new Paragraph({
          spacing: { after: 200, line: 276 },
          children: [
            new TextRun({ text: 'Semoga Bapak/Ibu dalam keadaan sehat dan baik.', size: 22 }),
          ],
        })
      );

      if (templateType === 'binus') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ', size: 22 }),
              new TextRun({ text: 'edtech', italics: true, size: 22 }),
              new TextRun({ text: ' yang berfokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia, RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan ', size: 22 }),
              new TextRun({ text: 'program pengembangan kompetensi', bold: true, size: 22 }),
              new TextRun({ text: ' untuk dipertimbangkan oleh ', size: 22 }),
              new TextRun({ 
                text: effectiveCompany, 
                bold: true, 
                size: 22,
              }),
              new TextRun({ text: ' bagi pengembangan kompetensi karyawan Bapak/Ibu: ', size: 22 }),
              new TextRun({ 
                text: effectiveEmployee, 
                bold: true, 
                size: 22,
              }),
              new TextRun({ text: '.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Program Applied AI, Analytics & Automation (RevoU X BINUS)', bold: true, size: 22 }),
              new TextRun({ text: '. Program ini dirancang untuk meningkatkan kemampuan peserta dalam penerapan ', size: 22 }),
              new TextRun({ text: 'AI', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'analytics', italics: true, size: 22 }),
              new TextRun({ text: ', dan ', size: 22 }),
              new TextRun({ text: 'workflow automation', italics: true, size: 22 }),
              new TextRun({ text: ' melalui pengalaman belajar yang interaktif, praktis, dan relevan dengan kebutuhan industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Dengan kombinasi pembelajaran ', size: 22 }),
              new TextRun({ text: 'online', italics: true, size: 22 }),
              new TextRun({ text: ' dan ', size: 22 }),
              new TextRun({ text: 'offline', italics: true, size: 22 }),
              new TextRun({ text: ', peserta akan mendapatkan pemahaman konseptual sekaligus pengalaman ', size: 22 }),
              new TextRun({ text: 'hands-on', italics: true, size: 22 }),
              new TextRun({ text: ' dalam menerapkan AI dan ', size: 22 }),
              new TextRun({ text: 'automation', italics: true, size: 22 }),
              new TextRun({ text: ' untuk menyelesaikan berbagai kebutuhan pekerjaan dan bisnis. Pembelajaran akan disampaikan oleh praktisi industri dan profesor BINUS University.', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60, line: 276 },
            children: [
              new TextRun({ text: 'Selama program berlangsung, peserta akan:', size: 22 }),
            ],
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Menerapkan berbagai tools AI untuk mengotomatisasi tugas analisis, seperti prediksi, ', size: 22 }),
              new TextRun({ text: 'sentiment analysis', italics: true, size: 22 }),
              new TextRun({ text: ', dan ', size: 22 }),
              new TextRun({ text: 'text processing', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Membangun ', size: 22 }),
              new TextRun({ text: 'workflow', italics: true, size: 22 }),
              new TextRun({ text: ' yang dapat secara otomatis menyampaikan ', size: 22 }),
              new TextRun({ text: 'insight', italics: true, size: 22 }),
              new TextRun({ text: ' kepada ', size: 22 }),
              new TextRun({ text: 'stakeholder', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Mengembangkan solusi berbasis AI dan ', size: 22 }),
              new TextRun({ text: 'analytics', italics: true, size: 22 }),
              new TextRun({ text: ' dengan mengangkat langsung kasus bisnis nyata di perusahaan.', size: 22 }),
            ] 
          }),

          // PAGE 2: Clean Page Break (Header is automatically supplied by section Header)
          new Paragraph({ children: [new PageBreak()] }),

          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 80, after: 120, line: 276 },
            children: [new TextRun({ text: 'Mempresentasikan solusi secara efektif kepada stakeholder bisnis maupun tim teknis.', size: 22 })] 
          }),
          new Paragraph({ 
            spacing: { before: 100, after: 60, line: 276 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Durasi: 12 minggu, mulai ', size: 22 }),
              new TextRun({ 
                text: startDate, 
                size: 22,
              }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: `Format: ${currentTemplate.format}`, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: `Sesi Online: ${currentTemplate.onlineSchedule}`, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: `Sertifikasi: ${currentTemplate.certification}`, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: `Biaya Program: `, size: 22 }), 
              new TextRun({ text: normalPrice, strike: true, size: 22, color: '4B5563' }), 
              new TextRun({ text: ` ` }),
              new TextRun({ 
                text: promoPrice, 
                bold: true, 
                size: 22,
              })
            ] 
          }),
          new Paragraph({ 
            spacing: { before: 100, after: 60, line: 276 },
            children: [new TextRun({ text: 'Manfaat bagi Organisasi:', bold: true, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Meningkatkan kapabilitas peserta dalam penerapan AI, ', size: 22 }),
              new TextRun({ text: 'analytics', italics: true, size: 22 }),
              new TextRun({ text: ', dan ', size: 22 }),
              new TextRun({ text: 'automation', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Meningkatkan produktivitas dan efisiensi kerja melalui penerapan AI dan ', size: 22 }),
              new TextRun({ text: 'workflow automation', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [new TextRun({ text: 'Mendorong pengembangan profesional dan penerapan solusi AI untuk kebutuhan bisnis secara nyata.', size: 22 })] 
          })
        );
      } else {
        // ITB Template
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ', size: 22 }),
              new TextRun({ text: 'ed-tech', italics: true, size: 22 }),
              new TextRun({ text: ' yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia yaitu ITB, RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan ', size: 22 }),
              new TextRun({ text: 'program pengembangan kompetensi', bold: true, size: 22 }),
              new TextRun({ text: ' untuk dipertimbangkan oleh ', size: 22 }),
              new TextRun({ 
                text: effectiveCompany, 
                bold: true, 
                size: 22,
              }),
              new TextRun({ text: ' bagi pengembangan kompetensi karyawan Bapak/Ibu : ', size: 22 }),
              new TextRun({ 
                text: effectiveEmployee, 
                bold: true, 
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Program Data-Driven & AI-Enabled Decision Making for Leaders (RevoU X ITB)', bold: true, size: 22 }),
              new TextRun({ text: ' dirancang untuk menjawab tantangan yang dihadapi para pemimpin organisasi modern. Di tengah melimpahnya data dan ', size: 22 }),
              new TextRun({ text: 'dashboard', italics: true, size: 22 }),
              new TextRun({ text: ', para pemimpin sering kali masih menghadapi tantangan dalam menentukan insight yang paling relevan serta menerjemahkannya menjadi keputusan strategis yang tepat.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya secara langsung pada konteks bisnis dan organisasi masing-masing.', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 60, line: 276 },
            children: [
              new TextRun({ text: 'Selama program berlangsung, peserta akan:', size: 22 }),
            ],
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: 'Mengasah kemampuan pengambilan keputusan berbasis data dan AI dengan mengangkat langsung kasus bisnis nyata di perusahaan.', size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: 'Membangun AI assistant yang dapat mendukung proses pengambilan keputusan di internal perusahaan.', size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Menyusun ', size: 22 }),
              new TextRun({ text: 'decision playbook', italics: true, size: 22 }),
              new TextRun({ text: ' yang siap diimplementasikan setelah program selesai.', size: 22 }),
            ] 
          }),
          new Paragraph({ 
            spacing: { before: 100, after: 60, line: 276 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: `Durasi: 12 minggu, mulai `, size: 22 }),
              new TextRun({ 
                text: startDate, 
                size: 22,
              }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: `Format: ${currentTemplate.format}`, size: 22 })] 
          }),

          // PAGE 2: Clean Page Break (Header is automatically supplied by section Header)
          new Paragraph({ children: [new PageBreak()] }),

          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { before: 80, after: 40, line: 276 },
            children: [new TextRun({ text: `Sesi Online: ${currentTemplate.onlineSchedule}`, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: `Sertifikasi: ${currentTemplate.certification}`, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: `Biaya Program: `, size: 22 }), 
              new TextRun({ text: normalPrice, strike: true, size: 22, color: '4B5563' }), 
              new TextRun({ text: ` ` }),
              new TextRun({ 
                text: promoPrice, 
                bold: true, 
                size: 22,
              })
            ] 
          }),
          new Paragraph({ 
            spacing: { before: 100, after: 60, line: 276 },
            children: [new TextRun({ text: 'Manfaat bagi Organisasi:', bold: true, size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Memperkuat kemampuan pengambilan keputusan berbasis data di level ', size: 22 }),
              new TextRun({ text: 'leadership', italics: true, size: 22 }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Meningkatkan efisiensi operasional melalui ', size: 22 }),
              new TextRun({ text: 'workflow', italics: true, size: 22 }),
              new TextRun({ text: ' berbasis AI', size: 22 }),
            ] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: 'Membangun kapabilitas internal untuk mendukung transformasi digital perusahaan', size: 22 })] 
          }),
          new Paragraph({ 
            bullet: { level: 0 }, 
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: 'Menghasilkan output nyata berupa ', size: 22 }),
              new TextRun({ text: 'framework', italics: true, size: 22 }),
              new TextRun({ text: ' dan ', size: 22 }),
              new TextRun({ text: 'roadmap', italics: true, size: 22 }),
              new TextRun({ text: ' implementasi', size: 22 }),
            ] 
          })
        );
      }

      // Closing paragraphs on Page 2
      bodyParagraphs.push(
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { before: 140, after: 140, line: 276 },
          children: [
            new TextRun({ text: 'Kami percaya program ini dapat memberikan nilai tambah bagi ', size: 22 }),
            new TextRun({ 
              text: effectiveCompany, 
              bold: true, 
              size: 22,
            }),
            new TextRun({ text: ', khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, ', size: 22 }),
            new TextRun({ text: 'data-driven', italics: true, size: 22 }),
            new TextRun({ text: ', dan didukung oleh perkembangan teknologi AI.', size: 22 }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          spacing: { after: 160, line: 276 },
          children: [
            new TextRun({ text: 'Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ', size: 22 }),
            new TextRun({ 
              text: effectiveCompany, 
              bold: true, 
              size: 22,
            }),
            new TextRun({ text: templateType === 'binus' ? ', dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.' : ' dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.', size: 22 }),
          ],
        }),
        new Paragraph({ 
          spacing: { before: 140, after: 80, line: 260 },
          children: [new TextRun({ text: 'Salam hormat,', size: 22 })] 
        }),
        new Paragraph({ 
          spacing: { before: 360, after: 40, line: 240 },
          children: [
            new TextRun({ 
              text: signerName, 
              bold: true, 
              size: 22,
              underline: {},
            })
          ] 
        }),
        new Paragraph({ 
          spacing: { after: 30, line: 240 },
          children: [
            new TextRun({ 
              text: signerEmail, 
              size: 22, 
              color: '1D4ED8',
              underline: {},
            })
          ] 
        }),
        new Paragraph({ 
          spacing: { after: 30, line: 240 },
          children: [new TextRun({ text: signerTitle, size: 22 })] 
        }),
        new Paragraph({ 
          spacing: { after: 30, line: 240 },
          children: [new TextRun({ text: 'RevoU (PT Revolusi Cita Edukasi)', size: 22 })] 
        })
      );

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: {
                font: 'Arial',
              },
            },
          },
        },
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 2000,
                  right: 1134,
                  bottom: 1134,
                  left: 1134,
                  header: 720,
                },
              },
            },
            headers: {
              default: new Header({
                children: [
                  createHeaderTable(),
                  new Paragraph({ spacing: { before: 0, after: 0, line: 240 } }),
                ],
              }),
            },
            children: bodyParagraphs,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Surat_Penawaran_${templateType.toUpperCase()}_${effectiveCompany.replace(/\s+/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating docx:', err);
    }
  };

  return (
    <>
      {/* Top Application Bar */}
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
            <p>Otomatisasi Dokumen Penawaran Program Enterprise (ITB &amp; BINUS)</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button"
            className="btn btn-secondary" 
            onClick={handlePrintPdf}
            title="Cetak atau simpan surat langsung sebagai PDF"
          >
            <span>🖨️</span>
            <span>Cetak / PDF</span>
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

          <button 
            type="button"
            className="btn btn-gdocs" 
            onClick={handleOpenGoogleDocs}
            title="Buka dokumen baru di Google Docs dan salin isi surat"
          >
            <span style={{ fontSize: '1.1rem' }}>📄</span>
            <span>Buka di Google Docs</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="app-container">
        {/* Left Side: Form Controls */}
        <aside className="editor-sidebar no-print">
          
          {/* Card 0: Dropdown Pemilihan Tipe Surat untuk AC */}
          <div className="section-card" style={{ borderColor: '#2563EB', background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)' }}>
            <div className="section-header" style={{ marginBottom: '0.6rem' }}>
              <div className="section-title" style={{ color: '#1E40AF' }}>
                <span>🎓</span>
                <span>Pilih Tipe Surat (Kerjasama)</span>
              </div>
              <span className="badge-tag" style={{ background: '#DBEAFE', color: '#1E40AF' }}>Untuk AC</span>
            </div>
            
            <p style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.75rem' }}>
              Pilih program kemitraan universitas yang ingin ditawarkan:
            </p>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor={templateSelectId} className="form-label" style={{ fontWeight: 700 }}>
                Program Universitas
              </label>
              <select 
                id={templateSelectId}
                className="form-select"
                value={templateType}
                onChange={(e) => handleTemplateChange(e.target.value)}
                style={{ borderColor: '#3B82F6', fontWeight: 600 }}
              >
                <option value="itb">🏛️ RevoU X ITB (Data-Driven &amp; AI Decision Making)</option>
                <option value="binus">🏢 RevoU X BINUS (Applied AI, Analytics &amp; Automation)</option>
              </select>
            </div>
          </div>

          {/* Card 1: 3 Parameter Utama sesuai Rule */}
          <div className="section-card primary-card">
            <div className="section-header">
              <div className="section-title">
                <span>📝</span>
                <span>3 Data Utama Penawaran</span>
              </div>
              <span className="badge-tag">Wajib Diisi</span>
            </div>

            {/* 1. Role di Perusahaan */}
            <div className="form-group">
              <label htmlFor={roleSelectId} className="form-label">
                <span>1. Role di Perusahaan</span>
                <span className="helper">Pilih atau Custom</span>
              </label>
              <select 
                id={roleSelectId}
                className="form-select"
                value={roleOption}
                onChange={(e) => setRoleOption(e.target.value)}
              >
                <option value="Management">Management</option>
                <option value="Tim HR/Learning">Tim HR/Learning</option>
                <option value="Custom">Custom (Tulis Sendiri)</option>
              </select>

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
              
              {/* Quick Presets based on template */}
              <div className="quick-presets">
                <span style={{ fontSize: '0.7rem', color: '#64748B', alignSelf: 'center' }}>Contoh Cepat:</span>
                {templateType === 'binus' ? (
                  <>
                    <button 
                      type="button" 
                      className="preset-chip"
                      onClick={() => setCompanyName('PT Pegadaian Galeri Dua Empat')}
                    >
                      PT Pegadaian Galeri Dua Empat
                    </button>
                    <button 
                      type="button" 
                      className="preset-chip"
                      onClick={() => setCompanyName('PT Telkom Indonesia (Persero) Tbk')}
                    >
                      Telkom
                    </button>
                    <button 
                      type="button" 
                      className="preset-chip"
                      onClick={() => setCompanyName('PT Bank Mandiri (Persero) Tbk')}
                    >
                      Mandiri
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      type="button" 
                      className="preset-chip"
                      onClick={() => setCompanyName('PT Hatten Bali Tbk')}
                    >
                      PT Hatten Bali Tbk
                    </button>
                    <button 
                      type="button" 
                      className="preset-chip"
                      onClick={() => setCompanyName('PT Bank Central Asia Tbk')}
                    >
                      BCA
                    </button>
                    <button 
                      type="button" 
                      className="preset-chip"
                      onClick={() => setCompanyName('PT GoTo Gojek Tokopedia Tbk')}
                    >
                      GoTo
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 3. Lokasi */}
            <div className="form-group">
              <label htmlFor={locationSelectId} className="form-label">
                <span>3. Lokasi</span>
                <span className="helper">Pilih atau Custom</span>
              </label>
              <select 
                id={locationSelectId}
                className="form-select"
                value={locationOption}
                onChange={(e) => setLocationOption(e.target.value)}
              >
                <option value="di tempat">di tempat</option>
                <option value="Custom">Custom (Tulis Sendiri)</option>
              </select>

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
            <div className="form-group" style={{ marginTop: '0.8rem', borderTop: '1px dashed #E2E8F0', paddingTop: '0.8rem' }}>
              <label htmlFor={employeeNameId} className="form-label">
                <span>Nama Karyawan / Peserta (Opsional)</span>
                <span className="helper">{templateType === 'binus' ? 'Contoh: Pak Hendra Permana' : 'Default: ______'}</span>
              </label>
              <input
                id={employeeNameId}
                type="text"
                className="form-input"
                placeholder={templateType === 'binus' ? 'Pak Hendra Permana' : '______'}
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
          </div>

          {/* Toggle Highlight Kuning */}
          <div className="toggle-row">
            <div className="toggle-info">
              <h4>Sorot Fitur Kuning (Highlight)</h4>
              <p>Menandai bagian yang terisi dinamis sesuai contoh</p>
            </div>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={showHighlight}
                onChange={(e) => setShowHighlight(e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          {/* Card 2: Pengaturan Tanggal, Nomor & Detail Surat (Accordion) */}
          <details className="accordion">
            <summary>
              <span>⚙️ Tanggal, Nomor &amp; Detail Surat</span>
              <span style={{ fontSize: '0.8rem', color: '#64748B' }}>▼</span>
            </summary>
            <div className="accordion-body">
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
                <label htmlFor={normalPriceId} className="form-label">Biaya Normal (Dicoret)</label>
                <input
                  id={normalPriceId}
                  type="text"
                  className="form-input"
                  value={normalPrice}
                  onChange={(e) => setNormalPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={promoPriceId} className="form-label">Biaya Promo / Early Bird</label>
                <input
                  id={promoPriceId}
                  type="text"
                  className="form-input"
                  value={promoPrice}
                  onChange={(e) => setPromoPrice(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={signerNameId} className="form-label">Nama Penandatangan</label>
                <input
                  id={signerNameId}
                  type="text"
                  className="form-input"
                  value={signerName}
                  onChange={(e) => setSignerName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={signerEmailId} className="form-label">Email Penandatangan</label>
                <input
                  id={signerEmailId}
                  type="text"
                  className="form-input"
                  value={signerEmail}
                  onChange={(e) => setSignerEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor={signerTitleId} className="form-label">Jabatan Penandatangan</label>
                <input
                  id={signerTitleId}
                  type="text"
                  className="form-input"
                  value={signerTitle}
                  onChange={(e) => setSignerTitle(e.target.value)}
                />
              </div>
            </div>
          </details>

          {/* Action Button: Output Google Docs, DOCX & PDF */}
          <div className="section-card" style={{ textAlign: 'center' }}>
            <button 
              type="button" 
              className="btn btn-gdocs" 
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem', marginBottom: '0.5rem' }}
              onClick={handleOpenGoogleDocs}
            >
              📄 Buka &amp; Ekspor ke Google Docs
            </button>

            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem', marginBottom: '0.5rem' }}
              onClick={handleDownloadDocx}
            >
              📥 Unduh Format .DOCX (Word)
            </button>

            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}
              onClick={handlePrintPdf}
            >
              🖨️ Cetak / Unduh Format PDF
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

          {/* Tips Info Box */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '0.85rem', fontSize: '0.76rem', color: '#1E40AF', lineHeight: '1.45' }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>💡 Alur Output Google Docs:</strong>
            1. Klik <strong>&quot;Buka &amp; Ekspor ke Google Docs&quot;</strong><br />
            2. Tab Google Docs baru langsung terbuka otomatis.<br />
            3. Tekan <kbd style={{ background: '#DBEAFE', padding: '1px 4px', borderRadius: '3px' }}>Ctrl + V</kbd> untuk menempel surat dengan layout rapi!
          </div>
        </aside>

        {/* Right Side: Document Preview Area */}
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
              <span style={{ fontWeight: 700, color: '#1E40AF' }}>{currentTemplate.name}</span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <span>2 Halaman A4</span>
              <span style={{ color: '#94A3B8' }}>•</span>
              <span style={{ color: showHighlight ? '#CA8A04' : '#16A34A', fontWeight: 600 }}>
                {showHighlight ? 'Highlight Kuning Aktif' : 'Tampilan Bersih'}
              </span>
            </div>
          </div>

          {/* Printable Letter Sheets */}
          <div 
            id="printable-letter-container"
            className="paper-container" 
            style={{ transform: `scale(${zoomScale})` }}
          >
            {/* ===================== HALAMAN 1 ===================== */}
            <div className="page-wrapper">
              <div className="page-number-pill no-print">Halaman 1 dari 2 ({currentTemplate.name})</div>
              <article className="a4-sheet" id="page-1">
                {/* Header */}
                <header className="letter-header">
                  <Image 
                    src="/revou-logo.png" 
                    alt="Logo RevoU" 
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
                    <HighlightSpan isHighlighted={showHighlight}>{letterDate}</HighlightSpan>
                  </div>
                </div>

                {/* Letter Reference */}
                <div className="letter-ref-block">
                  <div className="ref-row">
                    <div className="ref-label">Nomor</div>
                    <div className="ref-colon">:</div>
                    <div className="ref-content">
                      <HighlightSpan isHighlighted={showHighlight}>{effectiveLetterNumber}</HighlightSpan>
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
                  <div className="recipient-title">Kepada Yth.</div>
                  <div className="recipient-role-company">
                    <HighlightSpan isHighlighted={showHighlight}>
                      {effectiveRole}
                    </HighlightSpan>
                  </div>
                  <div className="recipient-role-company">
                    <HighlightSpan isHighlighted={showHighlight}>
                      {effectiveCompany}
                    </HighlightSpan>
                  </div>
                  <div>
                    <HighlightSpan isHighlighted={showHighlight}>{effectiveLocation}</HighlightSpan>
                  </div>
                </div>

                {/* Salutation */}
                <div className="letter-salutation">
                  Bapak/Ibu yang kami hormati,
                </div>

                {/* Paragraphs */}
                <p className="letter-paragraph">
                  Semoga Bapak/Ibu dalam keadaan sehat dan baik.
                </p>

                {templateType === 'binus' ? (
                  <>
                    <p className="letter-paragraph">
                      Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>edtech</em> yang berfokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan universitas terkemuka di Indonesia, RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
                    </p>

                    <p className="letter-paragraph">
                      Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu: <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveEmployee}</strong></HighlightSpan>.
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
                      Sejalan dengan semakin pentingnya pemanfaatan data, kecerdasan artifisial (AI), dan otomatisasi dalam meningkatkan efektivitas pengambilan keputusan serta produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveCompany}</strong></HighlightSpan> bagi pengembangan kompetensi karyawan Bapak/Ibu : <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveEmployee}</strong></HighlightSpan>
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
                        Durasi: 12 minggu, mulai <HighlightSpan isHighlighted={showHighlight}>{startDate}</HighlightSpan>
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
                    src="/revou-logo.png" 
                    alt="Logo RevoU" 
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

                {templateType === 'binus' ? (
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
                        Durasi: 12 minggu, mulai <HighlightSpan isHighlighted={showHighlight}>{startDate}</HighlightSpan>
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
                        Biaya Program: <span className="price-strike">{normalPrice}</span> <HighlightSpan isHighlighted={showHighlight}>{promoPrice}</HighlightSpan>
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
                      Kami percaya program ini dapat memberikan nilai tambah bagi <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveCompany}</strong></HighlightSpan>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, <em>data-driven</em>, dan didukung oleh perkembangan teknologi AI.
                    </p>

                    <p className="letter-paragraph">
                      Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveCompany}</strong></HighlightSpan>, dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.
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
                        Biaya Program: <span className="price-strike">{normalPrice}</span> <HighlightSpan isHighlighted={showHighlight}>{promoPrice}</HighlightSpan>
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
                      Kami percaya program ini dapat memberikan nilai tambah bagi <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveCompany}</strong></HighlightSpan>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, <em>data-driven</em>, dan didukung oleh perkembangan teknologi AI.
                    </p>

                    <p className="letter-paragraph">
                      Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <HighlightSpan isHighlighted={showHighlight}><strong>{effectiveCompany}</strong></HighlightSpan> dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.
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
                  <div className="signoff-line"></div>
                  <div className="signoff-name">{signerName}</div>
                  <div className="signoff-email">{signerEmail}</div>
                  <div className="signoff-title">{signerTitle}</div>
                  <div>RevoU (PT Revolusi Cita Edukasi)</div>
                </div>
              </article>
            </div>
          </div>
        </main>
      </div>

      {/* Google Docs Instructions Modal */}
      {showGdocsModal && (
        <div className="modal-overlay" onClick={() => setShowGdocsModal(false)}>
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
                  {currentTemplate.name} • {effectiveCompany}
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
                onClick={() => setShowGdocsModal(false)}
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
