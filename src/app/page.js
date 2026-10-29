'use client';

import React, { useState, useId, useSyncExternalStore } from 'react';
import {
  TEMPLATES,
  OFFERING_PROGRAMS,
  LOC_PROGRAMS,
  DEFAULT_LOC_DATA,
  ROMAN_MONTHS,
  INDO_MONTHS,
  emptySubscribe,
  getClientTodayString,
} from '@/config/templates';
import AppHeader from '@/components/AppHeader';
import LetterForm from '@/components/LetterForm';
import LetterPreview from '@/components/LetterPreview';
import GoogleDocsModal from '@/components/GoogleDocsModal';
import { generatePlainText, generateGoogleDocsHtml } from '@/lib/html-generator';
import { downloadDocx, downloadLocDocx } from '@/lib/docx-generator';

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
  const additionalNoteId = useId();
  const certOptionId = useId();

  // Letter Category: 'penawaran' or 'loc'
  const [letterCategory, setLetterCategory] = useState('penawaran');

  // Offering Template Type State
  const [templateType, setTemplateType] = useState('itb');

  // 3 Parameter Utama Penawaran
  const [roleOption, setRoleOption] = useState('Management');
  const [customRole, setCustomRole] = useState('');
  const [companyName, setCompanyName] = useState('PT Hatten Bali Tbk');
  const [locationOption, setLocationOption] = useState('di tempat');
  const [customLocation, setCustomLocation] = useState('');

  // Nama Karyawan / Peserta Penawaran
  const [employeeName, setEmployeeName] = useState('______');

  // Real-time client clock synchronization without hydration mismatch
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

  // Detail surat Penawaran
  const [letterSeq, setLetterSeq] = useState('06');
  const [startDate, setStartDate] = useState('15 December 2026');
  const [normalPrice, setNormalPrice] = useState('Rp16.000.000');
  const [promoPrice, setPromoPrice] = useState('Rp14.500.000');
  const [additionalNote, setAdditionalNote] = useState('(harga khusus early bird)');
  const [fsCertOption, setFsCertOption] = useState('Sertifikat penyelesaian program dari RevoU');

  const [signerName, setSignerName] = useState('Pita Rini Fajrian Ramadhani');
  const [signerEmail, setSignerEmail] = useState('admission@revou.co');
  const [signerTitle, setSignerTitle] = useState('Admission Lead');

  // ================= State Khusus Surat LoC =================
  const [locProgram, setLocProgram] = useState(DEFAULT_LOC_DATA.programId);
  const [locApproverName, setLocApproverName] = useState(DEFAULT_LOC_DATA.approverName);
  const [locApproverPosition, setLocApproverPosition] = useState(DEFAULT_LOC_DATA.approverPosition);
  const [locInstitutionName, setLocInstitutionName] = useState(DEFAULT_LOC_DATA.institutionName);
  const [locNpwp, setLocNpwp] = useState(DEFAULT_LOC_DATA.npwp);
  const [locAddress, setLocAddress] = useState(DEFAULT_LOC_DATA.address);
  const [locApplicantsText, setLocApplicantsText] = useState(DEFAULT_LOC_DATA.applicantsText);
  const [locTuition, setLocTuition] = useState(DEFAULT_LOC_DATA.tuitionAmount);
  const [locPaymentDeadline, setLocPaymentDeadline] = useState(DEFAULT_LOC_DATA.paymentDeadline);
  const [locPlace, setLocPlace] = useState(DEFAULT_LOC_DATA.place);

  const currentLocProgram = LOC_PROGRAMS.find((p) => p.id === locProgram) || LOC_PROGRAMS[0];

  // UI state
  const [zoomScale, setZoomScale] = useState(0.88);
  const [showGdocsModal, setShowGdocsModal] = useState(false);

  // Theme state: 'light' or 'dark'
  const [theme, setTheme] = useState('light');

  React.useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('revou-theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', initialTheme);
      if (initialTheme !== 'light') {
        requestAnimationFrame(() => setTheme(initialTheme));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('revou-theme', nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
    } catch {
      // ignore
    }
  };

  // Switch Category Handler
  const handleCategoryChange = (newCat) => {
    setLetterCategory(newCat);
  };

  // Switch LoC Program Handler
  const handleLocProgramChange = (newProgId) => {
    setLocProgram(newProgId);
  };

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
    setAdditionalNote(tmpl.additionalNote);
    setSignerName(tmpl.signerName);
    setSignerEmail(tmpl.signerEmail);
    setSignerTitle(tmpl.signerTitle);
    setFsCertOption('Sertifikat penyelesaian program dari RevoU');
  };

  // Compute final display strings for Penawaran
  const isFullstack = templateType === 'fsda' || templateType === 'fsdm' || templateType === 'fsse';
  const effectiveRole = roleOption === 'Custom' ? (customRole.trim() || 'Management') : roleOption;
  const effectiveCompany = companyName.trim() || '[Nama Perusahaan]';
  const effectiveLocation = locationOption === 'Custom' ? (customLocation.trim() || 'di tempat') : locationOption;
  const effectiveEmployee = employeeName.trim() || (
    templateType === 'binus' ? 'Pak Hendra Permana' :
      (templateType === 'hr' || templateType === 'fsda' || templateType === 'fsdm' || templateType === 'fsse') ? 'Yudithia Aprilinda' :
        templateType === 'itb_ds' ? 'Nanik Ambar Suharyanti' : '______'
  );
  const effectiveLetterNumber = `${(letterSeq || '01').trim()}/SP/ADM/${clientRomanMonth}/${clientYear}`;
  const fullPromoPrice = additionalNote.trim()
    ? `${promoPrice.trim()} ${additionalNote.trim()}`
    : promoPrice.trim();

  const currentTemplate = TEMPLATES[templateType];
  const effectiveCertification = isFullstack ? fsCertOption : currentTemplate.certification;

  // Set today's Indonesian date
  const setTodayDate = () => {
    setCustomLetterDate(getClientTodayString());
  };

  // Reset to default
  const handleReset = () => {
    if (letterCategory === 'penawaran') {
      handleTemplateChange(templateType);
    } else {
      setLocApproverName(DEFAULT_LOC_DATA.approverName);
      setLocApproverPosition(DEFAULT_LOC_DATA.approverPosition);
      setLocInstitutionName(DEFAULT_LOC_DATA.institutionName);
      setLocNpwp(DEFAULT_LOC_DATA.npwp);
      setLocAddress(DEFAULT_LOC_DATA.address);
      setLocApplicantsText(DEFAULT_LOC_DATA.applicantsText);
      setLocTuition(DEFAULT_LOC_DATA.tuitionAmount);
      setLocPaymentDeadline(DEFAULT_LOC_DATA.paymentDeadline);
      setLocPlace(DEFAULT_LOC_DATA.place);
    }
  };

  // Shared payload for Penawaran generators
  const documentPayload = {
    templateType,
    currentTemplate,
    letterDate,
    effectiveLetterNumber,
    effectiveRole,
    effectiveCompany,
    effectiveLocation,
    effectiveEmployee,
    startDate,
    normalPrice,
    fullPromoPrice,
    effectiveCertification,
    signerName,
    signerEmail,
    signerTitle,
  };

  // Google Docs Export Handler
  const handleOpenGoogleDocs = async () => {
    try {
      window.open('https://docs.google.com/document/create', '_blank');
    } catch (e) {
      console.warn('Browser blocked popup:', e);
    }

    const plainText = generatePlainText(documentPayload);
    const styledHtml = generateGoogleDocsHtml(documentPayload);

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
      } else {
        await navigator.clipboard.writeText(plainText);
      }
    } catch {
      navigator.clipboard.writeText(plainText);
    }

    setShowGdocsModal(true);
  };

  // Direct download in authentic Microsoft Word .DOCX format
  const handleDownloadDocx = async () => {
    if (letterCategory === 'penawaran') {
      await downloadDocx(documentPayload);
    } else {
      await downloadLocDocx({
        approverName: locApproverName,
        approverPosition: locApproverPosition,
        institutionName: locInstitutionName,
        npwp: locNpwp,
        address: locAddress,
        applicants: locApplicantsText,
        tuitionAmount: locTuition,
        programName: currentLocProgram.name,
        paymentDeadline: locPaymentDeadline,
        place: locPlace,
      });
    }
  };

  return (
    <>
      {/* Top Application Bar */}
      <AppHeader
        theme={theme}
        toggleTheme={toggleTheme}
        handleDownloadDocx={handleDownloadDocx}
        letterCategory={letterCategory}
      />

      {/* Main Workspace */}
      <div className="app-container">
        {/* Left Side: Form Controls */}
        <LetterForm
          // Category
          letterCategory={letterCategory}
          handleCategoryChange={handleCategoryChange}

          // Offering props
          templateSelectId={templateSelectId}
          templateType={templateType}
          handleTemplateChange={handleTemplateChange}
          currentTemplate={currentTemplate}
          roleSelectId={roleSelectId}
          roleOption={roleOption}
          setRoleOption={setRoleOption}
          customRoleId={customRoleId}
          customRole={customRole}
          setCustomRole={setCustomRole}
          companyNameId={companyNameId}
          companyName={companyName}
          setCompanyName={setCompanyName}
          locationSelectId={locationSelectId}
          locationOption={locationOption}
          setLocationOption={setLocationOption}
          customLocationId={customLocationId}
          customLocation={customLocation}
          setCustomLocation={setCustomLocation}
          employeeNameId={employeeNameId}
          employeeName={employeeName}
          setEmployeeName={setEmployeeName}
          letterDateId={letterDateId}
          letterDate={letterDate}
          setCustomLetterDate={setCustomLetterDate}
          setTodayDate={setTodayDate}
          letterSeqId={letterSeqId}
          letterSeq={letterSeq}
          setLetterSeq={setLetterSeq}
          startDateId={startDateId}
          startDate={startDate}
          setStartDate={setStartDate}
          normalPriceId={normalPriceId}
          normalPrice={normalPrice}
          setNormalPrice={setNormalPrice}
          promoPriceId={promoPriceId}
          promoPrice={promoPrice}
          setPromoPrice={setPromoPrice}
          additionalNoteId={additionalNoteId}
          additionalNote={additionalNote}
          setAdditionalNote={setAdditionalNote}
          isFullstack={isFullstack}
          certOptionId={certOptionId}
          fsCertOption={fsCertOption}
          setFsCertOption={setFsCertOption}

          // LoC props
          locProgram={locProgram}
          handleLocProgramChange={handleLocProgramChange}
          currentLocProgram={currentLocProgram}
          locApproverName={locApproverName}
          setLocApproverName={setLocApproverName}
          locApproverPosition={locApproverPosition}
          setLocApproverPosition={setLocApproverPosition}
          locInstitutionName={locInstitutionName}
          setLocInstitutionName={setLocInstitutionName}
          locNpwp={locNpwp}
          setLocNpwp={setLocNpwp}
          locAddress={locAddress}
          setLocAddress={setLocAddress}
          locApplicantsText={locApplicantsText}
          setLocApplicantsText={setLocApplicantsText}
          locTuition={locTuition}
          setLocTuition={setLocTuition}
          locPaymentDeadline={locPaymentDeadline}
          setLocPaymentDeadline={setLocPaymentDeadline}
          locPlace={locPlace}
          setLocPlace={setLocPlace}

          // Global actions
          handleDownloadDocx={handleDownloadDocx}
          handleReset={handleReset}
        />

        {/* Right Side: Document Preview Area */}
        <LetterPreview
          zoomScale={zoomScale}
          setZoomScale={setZoomScale}

          // Letter Category & LoC
          letterCategory={letterCategory}
          currentLocProgram={currentLocProgram}
          locApproverName={locApproverName}
          locApproverPosition={locApproverPosition}
          locInstitutionName={locInstitutionName}
          locNpwp={locNpwp}
          locAddress={locAddress}
          locApplicantsText={locApplicantsText}
          locTuition={locTuition}
          locPaymentDeadline={locPaymentDeadline}
          locPlace={locPlace}

          // Offering props
          currentTemplate={currentTemplate}
          letterDate={letterDate}
          effectiveLetterNumber={effectiveLetterNumber}
          effectiveRole={effectiveRole}
          effectiveCompany={effectiveCompany}
          effectiveLocation={effectiveLocation}
          effectiveEmployee={effectiveEmployee}
          templateType={templateType}
          startDate={startDate}
          normalPrice={normalPrice}
          fullPromoPrice={fullPromoPrice}
          effectiveCertification={effectiveCertification}
          signerName={signerName}
          signerEmail={signerEmail}
          signerTitle={signerTitle}
        />
      </div>

      {/* Google Docs Instructions Modal */}
      <GoogleDocsModal
        isOpen={showGdocsModal}
        onClose={() => setShowGdocsModal(false)}
        currentTemplate={currentTemplate}
        effectiveCompany={effectiveCompany}
        handleDownloadDocx={handleDownloadDocx}
      />
    </>
  );
}
