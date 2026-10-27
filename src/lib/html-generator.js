/**
 * Helper to generate plain text representation of the offer letter
 */
export function generatePlainText({
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
  signerTitle
}) {
  if (templateType === 'itb_ds') {
    return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor : ${effectiveLetterNumber}
Perihal : ${currentTemplate.subject}

Kepada Yth.
${effectiveRole}
${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ed-tech yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan Institut Teknologi Bandung (ITB), RevoU menghadirkan program upskilling yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.

Sejalan dengan semakin berkembangnya pemanfaatan data dan kecerdasan artifisial (AI) dalam proses bisnis, kemampuan untuk tidak hanya menganalisis data, tetapi juga membangun model prediktif dan solusi berbasis AI menjadi semakin penting bagi profesional di berbagai industri.

Dengan senang hati kami menawarkan program pengembangan kompetensi Applied Data Science with AI (RevoU X ITB) untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu: ${effectiveEmployee}.

Program Applied Data Science with AI (RevoU X ITB) dirancang bagi profesional yang telah memiliki dasar analitik data dan ingin mengembangkan kemampuan lebih lanjut, mulai dari predictive modelling, pemanfaatan AI dalam proses analisis dan pengembangan solusi, hingga membangun data products yang dapat digunakan untuk mendukung kebutuhan bisnis.

Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya pada permasalahan nyata dari pekerjaan atau organisasi masing-masing. Selama program berlangsung, peserta akan:
● Mengembangkan kemampuan dalam predictive modelling dan validasi model untuk menghasilkan insight yang dapat dipercaya.
● Memanfaatkan AI dan AI coding agents untuk mempercepat proses analisis dan pengembangan solusi data.
● Membangun AI-enabled data product berdasarkan permasalahan atau keputusan nyata dari pekerjaan peserta.
● Mempelajari proses monitoring, testing, reproducibility, dan responsible AI governance untuk memastikan solusi dapat digunakan secara berkelanjutan.
● Mempresentasikan dan mempertahankan hasil capstone project di hadapan panel praktisi industri.

Detail Program:
● Durasi: 13 minggu, mulai ${startDate}
● Format: ${currentTemplate.format}
● Sesi Online: ${currentTemplate.onlineSchedule}
● Sertifikasi: ${currentTemplate.certification}
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Memperkuat kapabilitas data science dan predictive analytics di internal perusahaan.
● Meningkatkan kemampuan karyawan dalam menerjemahkan permasalahan bisnis menjadi solusi berbasis data dan AI.
● Mendorong pemanfaatan AI untuk meningkatkan efisiensi proses analisis dan pengembangan solusi.
● Menghasilkan data product yang aplikatif berdasarkan permasalahan nyata di lingkungan kerja.

Kami percaya program Applied Data Science with AI (RevoU X ITB) dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin data-driven serta perkembangan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi karyawan dan kapabilitas data & AI di organisasi.

Salam hormat,



__________________________
${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
  }

  if (templateType === 'hr') {
    return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor : ${effectiveLetterNumber}
Perihal : ${currentTemplate.subject}

Kepada Yth.
${effectiveRole}
${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Semoga Bapak/Ibu dalam keadaan sehat dan baik.

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ed-tech yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program upskilling yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.

Sejalan dengan semakin pentingnya peran HR sebagai mitra strategis bisnis serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan program pengembangan kompetensi untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu: ${effectiveEmployee}.

Program Strategic HR with AI (RevoU) dirancang untuk menjawab tantangan yang dihadapi fungsi HR modern. Banyak praktisi HR yang kuat di sisi eksekusi, namun belum dilibatkan dalam pengambilan keputusan strategis. Program ini membekali peserta dengan kemampuan HR Business Partner (HRBP) secara menyeluruh, mencakup Organisation Development, Talent Management, Performance Management, Compensation & Benefits, serta HR Operations & Compliance — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.

Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.

Selama program berlangsung, peserta akan:
● Mengasah kemampuan mendiagnosa situasi bisnis dan menerjemahkannya menjadi prioritas dan strategi HR yang tepat.
● Mengerjakan project portofolio di setiap modul berbasis skenario perusahaan yang realistis (total 6 mini project + 1 capstone).
● Menyusun rencana kerja HRBP 6 bulan (capstone) lengkap dengan AI-enabled solution yang berfungsi, dan mempresentasikannya di hadapan simulated leadership panel.

Detail Program:
● Durasi: ${currentTemplate.duration || '15 minggu'}, mulai ${startDate}
● Format: ${currentTemplate.format}
● Sesi Online: ${currentTemplate.onlineSchedule}
● ${currentTemplate.certLabel || 'Sertifikat'}: ${currentTemplate.certification}
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Membangun kapabilitas HR strategis internal yang mampu menjadi mitra strategi bisnis, bukan sekadar menjalankan proses.
● Satu program mencakup seluruh domain HR serta keterkaitannya, tanpa perlu pelatihan terpisah per fungsi.
● Meningkatkan kesiapan AI fungsi HR, dengan pendekatan tool-agnostic sehingga relevan dengan tools apa pun yang digunakan perusahaan.
● Menghasilkan output nyata: rencana kerja HRBP 6 bulan dan AI-enabled solution yang dapat langsung diadaptasi untuk kebutuhan perusahaan.
● Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan fungsi HR menghadapi kebutuhan bisnis yang semakin strategis dan didukung oleh perkembangan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi para karyawan.

Salam hormat,



__________________________
${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
  }

  if (templateType === 'fsda') {
    return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor : ${effectiveLetterNumber}
Perihal : ${currentTemplate.subject}

Kepada Yth.
${effectiveRole}
${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Semoga Bapak/Ibu dalam keadaan sehat dan baik.

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ed-tech yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program upskilling yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.

Sejalan dengan semakin pentingnya pengambilan keputusan berbasis data serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan program pengembangan kompetensi untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu: ${effectiveEmployee}.

Program Full Stack Data Analytics (RevoU) dirancang untuk menjawab kebutuhan organisasi akan talenta yang mampu mengubah data menjadi keputusan bisnis. Banyak tim memiliki data melimpah, namun waktunya habis untuk membersihkan data dan menyusun laporan manual. Program ini membekali peserta dengan kemampuan analisis data secara menyeluruh, mencakup Business Problem Structuring, Statistics & Spreadsheet, SQL, Python for Data Analysis, Data Visualization, Data Communication, hingga Production-Ready Analytics — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.

Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.

Selama program berlangsung, peserta akan:
● Mengasah kemampuan menstrukturkan masalah bisnis, menyusun hipotesis, dan menentukan metrik yang tepat sebelum mulai menganalisis data.
● Mengerjakan project portofolio berbasis studi kasus industri yang realistis (total 6 skill-specific project + 1 end-to-end project).
● Membangun analisis dengan SQL dan Python, dashboard, serta sistem pelaporan otomatis, lalu mempresentasikan hasilnya di hadapan praktisi data berpengalaman.

Detail Program:
● Durasi: ${currentTemplate.duration || '4 bulan'}, mulai ${startDate}
● Format: ${currentTemplate.format}
● Jadwal: ${currentTemplate.onlineSchedule}
● Sertifikat: ${effectiveCertification}
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Membangun kapabilitas analisis data internal sehingga keputusan bisnis didasarkan pada data, bukan sekadar asumsi.
● Satu program mencakup seluruh alur kerja analisis — dari spreadsheet, SQL, Python, hingga visualisasi dan otomasi pelaporan — tanpa perlu pelatihan terpisah per tools.
● Mempercepat pekerjaan analitik dengan AI: waktu untuk membersihkan data dan menyusun laporan berkurang, sehingga tim punya lebih banyak waktu untuk menghasilkan insight.
● Menghasilkan output nyata: dashboard dan analisis end-to-end yang dapat langsung diadaptasi untuk kebutuhan perusahaan.
● Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kemampuan tim mengolah data menjadi insight serta mendukung pengambilan keputusan bisnis yang lebih cepat dan akurat dengan dukungan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi para karyawan.

Salam hormat,



__________________________
${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
  }

  if (templateType === 'fsdm') {
    return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor : ${effectiveLetterNumber}
Perihal : ${currentTemplate.subject}

Kepada Yth.
${effectiveRole}
${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Semoga Bapak/Ibu dalam keadaan sehat dan baik.

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ed-tech yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program upskilling yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.

Sejalan dengan semakin kompetitifnya lanskap pemasaran digital serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan program pengembangan kompetensi untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu: ${effectiveEmployee}.

Program Full Stack Digital Marketing (RevoU) dirancang untuk menjawab tantangan yang dihadapi tim pemasaran modern. Standar kerja marketer telah berubah: tim dituntut menghasilkan output lebih banyak dalam waktu lebih singkat, sambil tetap fokus pada strategi dan hasil bisnis. Program ini membekali peserta dengan kemampuan digital marketing secara menyeluruh melalui 12 modul, mencakup Performance Measurement & Budget Allocation, Product Marketing & Landing Page, Google Analytics & GTM, Social Media Organic, Influencer Marketing (KOL), Meta Ads, TikTok & Marketplace Ads, Google Ads, SEO, serta Customer Relationship Management (CRM) — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.

Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.

Selama program berlangsung, peserta akan:
● Mengasah kemampuan menerjemahkan tujuan bisnis menjadi KPI pemasaran, alokasi budget per kanal, dan media plan yang terukur.
● Mengerjakan project portofolio di setiap modul (total 13 project), antara lain kampanye Meta Ads, Google Ads, TikTok/Marketplace, strategi SEO, content plan, strategi KOL, hingga CRM plan.
● Mempresentasikan hasil kerja kepada instruktur praktisi industri untuk mendapatkan feedback langsung di setiap modul.

Detail Program:
● Durasi: ${currentTemplate.duration || '4 bulan'}, mulai ${startDate}
● Format: ${currentTemplate.format}
● Jadwal: ${currentTemplate.onlineSchedule}
● Sertifikat: ${effectiveCertification}
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Membangun kapabilitas pemasaran digital in-house dari strategi hingga eksekusi, sehingga perusahaan tidak sepenuhnya bergantung pada agensi eksternal.
● Satu program mencakup seluruh kanal utama — paid ads, organic social, SEO, KOL, hingga CRM — tanpa perlu pelatihan terpisah per kanal.
● Meningkatkan produktivitas tim dengan AI untuk riset, pembuatan konten dan ad creative, hingga pelaporan kampanye.
● Menghasilkan output nyata: rencana kampanye, laporan performa, dan strategi kanal yang dapat langsung diadaptasi untuk kebutuhan perusahaan.
● Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kemampuan tim pemasaran dalam menjalankan kampanye digital yang lebih efektif, terukur, dan efisien dengan dukungan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi para karyawan.

Salam hormat,



__________________________
${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
  }

  if (templateType === 'fsse') {
    return `PT REVOLUSI CITA EDUKASI
Menara Rajawali, Ground Floor
Jl. DR. Ide Anak Agung Gde Agung RT.5/RW.2, Kuningan
Jakarta Selatan 12950

${letterDate}

Nomor : ${effectiveLetterNumber}
Perihal : ${currentTemplate.subject}

Kepada Yth.
${effectiveRole}
${effectiveCompany}
${effectiveLocation}

Bapak/Ibu yang kami hormati,

Semoga Bapak/Ibu dalam keadaan sehat dan baik.

Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ed-tech yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program upskilling yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.

Sejalan dengan semakin pesatnya transformasi digital serta pemanfaatan kecerdasan artifisial (AI) dalam proses pengembangan perangkat lunak, kami dengan senang hati menawarkan program pengembangan kompetensi untuk dipertimbangkan oleh ${effectiveCompany} bagi pengembangan kompetensi karyawan Bapak/Ibu: ${effectiveEmployee}.

Program Full Stack Software Engineering (RevoU) merupakan program software engineering berbasis AI (AI-native) pertama di Indonesia yang dikembangkan dalam kemitraan dengan Amazon Web Services (AWS). Saat ini, semakin banyak kode ditulis dengan bantuan AI; yang dibutuhkan perusahaan adalah engineer yang mampu mengarahkan, meninjau, dan menyempurnakan output AI dengan fondasi teknis yang kuat. Program ini membekali peserta melalui 4 fase pembelajaran, mencakup Algorithm, Backend (Python, Flask, PostgreSQL), Frontend (Next.js, TypeScript, Tailwind), serta AI-Driven Development menggunakan Kiro — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.

Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap fase.

Selama program berlangsung, peserta akan:
● Membangun fondasi logika pemrograman dan algoritma, lalu menerapkannya pada pengembangan API, backend, frontend, testing, hingga deployment.
● Mengerjakan 2 project portofolio: 1 full-stack application dengan pendekatan konvensional dan 1 project yang dibangun sepenuhnya dengan AI-driven development.
● Menyelesaikan HackerRank challenge di akhir setiap fase — platform tes teknis standar yang digunakan perusahaan di seluruh dunia.

Detail Program:
● Durasi: ${currentTemplate.duration || '5 bulan (4 fase, 21 minggu)'}, mulai ${startDate}
● Format: ${currentTemplate.format}
● Jadwal: ${currentTemplate.onlineSchedule}
● Sertifikat: ${effectiveCertification}
● Kebutuhan Perangkat: ${currentTemplate.deviceRequirement || 'Laptop Windows / Mac'}
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Membangun kapabilitas engineering internal yang menguasai pendekatan konvensional sekaligus AI-driven development.
● Mempercepat siklus pengembangan produk melalui alur kerja berbantuan AI yang terstruktur, dengan disiplin review yang tetap terjaga.
● Membekali tim dengan kemahiran tools AI dari AWS (Kiro) melalui kemitraan eksklusif RevoU dan AWS.
● Menghasilkan output nyata: aplikasi full-stack yang telah melalui unit, performance, dan end-to-end testing serta siap di-deploy.
● Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas tim teknologi serta mempercepat transformasi digital perusahaan dengan dukungan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi para karyawan.

Salam hormat,



__________________________
${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
  }

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
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Meningkatkan kapabilitas peserta dalam penerapan AI, analytics, dan automation.
● Meningkatkan produktivitas dan efisiensi kerja melalui penerapan AI dan workflow automation.
● Mendorong pengembangan profesional dan penerapan solusi AI untuk kebutuhan bisnis secara nyata.

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, data-driven, dan didukung oleh perkembangan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany}, dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.

Salam hormat,



________________________
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
● Biaya Program: ${normalPrice} ${fullPromoPrice}

Manfaat bagi Organisasi:
● Memperkuat kemampuan pengambilan keputusan berbasis data di level leadership
● Meningkatkan efisiensi operasional melalui workflow berbasis AI
● Membangun kapabilitas internal untuk mendukung transformasi digital perusahaan
● Menghasilkan output nyata berupa framework dan roadmap implementasi

Kami percaya program ini dapat memberikan nilai tambah bagi ${effectiveCompany}, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin kompleks, data-driven, dan didukung oleh perkembangan teknologi AI.

Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ${effectiveCompany} dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.

Salam hormat,



________________________
${signerName}
${signerEmail}
${signerTitle}
RevoU (PT Revolusi Cita Edukasi)
`;
}

/**
 * Helper to generate rich formatted HTML representation for Google Docs clipboard
 */
export function generateGoogleDocsHtml({
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
  signerTitle
}) {
  const highlightBg = '';
  return `
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
      ${templateType !== 'itb_ds' ? `<p style="margin-bottom: 14pt; font-size: 11pt; line-height: 1.45;">Semoga Bapak/Ibu dalam keadaan sehat dan baik.</p>` : ''}

      ${templateType === 'itb_ds' ? `
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan Institut Teknologi Bandung (ITB), RevoU menghadirkan program <em>upskilling</em> yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Sejalan dengan semakin berkembangnya pemanfaatan data dan kecerdasan artifisial (AI) dalam proses bisnis, kemampuan untuk tidak hanya menganalisis data, tetapi juga membangun model prediktif dan solusi berbasis AI menjadi semakin penting bagi profesional di berbagai industri.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Dengan senang hati kami menawarkan <strong>program pengembangan kompetensi Applied Data Science with AI (RevoU X ITB)</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu: <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          <strong>Program Applied Data Science with AI (RevoU X ITB)</strong> dirancang bagi profesional yang telah memiliki dasar analitik data dan ingin mengembangkan kemampuan lebih lanjut, mulai dari <em>predictive modelling</em>, pemanfaatan AI dalam proses analisis dan pengembangan solusi, hingga membangun <em>data products</em> yang dapat digunakan untuk mendukung kebutuhan bisnis.
        </p>
        <p style="text-align: justify; margin-bottom: 4pt; font-size: 11pt; line-height: 1.45;">
          Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya pada permasalahan nyata dari pekerjaan atau organisasi masing-masing. Selama program berlangsung, peserta akan:
        </p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengembangkan kemampuan dalam <strong>predictive modelling</strong> dan validasi model untuk menghasilkan insight yang dapat dipercaya.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Memanfaatkan <strong>AI dan AI coding agents</strong> untuk mempercepat proses analisis dan pengembangan solusi data.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun <strong>AI-enabled data product</strong> berdasarkan permasalahan atau keputusan nyata dari pekerjaan peserta.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mempelajari proses <strong>monitoring, testing, reproducibility, dan responsible AI governance</strong> untuk memastikan solusi dapat digunakan secara berkelanjutan.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mempresentasikan dan mempertahankan hasil <em>capstone project</em> di hadapan panel praktisi industri.</li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Durasi:</strong> 13 minggu, mulai <span style="${highlightBg}">${startDate}</span></li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Format:</strong> ${currentTemplate.format}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Sesi Online:</strong> ${currentTemplate.onlineSchedule}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Sertifikasi:</strong> ${currentTemplate.certification}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Biaya Program:</strong> <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Memperkuat kapabilitas <strong>data science dan predictive analytics</strong> di internal perusahaan.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan kemampuan karyawan dalam menerjemahkan permasalahan bisnis menjadi solusi berbasis data dan AI.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mendorong pemanfaatan AI untuk meningkatkan efisiensi proses analisis dan pengembangan solusi.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menghasilkan <strong>data product yang aplikatif</strong> berdasarkan permasalahan nyata di lingkungan kerja.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Kami percaya program <strong>Applied Data Science with AI (RevoU X ITB)</strong> dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin <em>data-driven</em> serta perkembangan teknologi AI.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> dalam mendukung pengembangan kompetensi karyawan dan kapabilitas data &amp; AI di organisasi.
        </p>
      ` : templateType === 'hr' ? `
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Sejalan dengan semakin pentingnya peran HR sebagai mitra strategis bisnis serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu: <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          <strong>Program Strategic HR with AI (RevoU)</strong> dirancang untuk menjawab tantangan yang dihadapi fungsi HR modern. Banyak praktisi HR yang kuat di sisi eksekusi, namun belum dilibatkan dalam pengambilan keputusan strategis. Program ini membekali peserta dengan kemampuan HR Business Partner (HRBP) secara menyeluruh, mencakup <em>Organisation Development</em>, <em>Talent Management</em>, <em>Performance Management</em>, <em>Compensation &amp; Benefits</em>, serta <em>HR Operations &amp; Compliance</em> — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.
        </p>
        <p style="margin-bottom: 4pt; font-size: 11pt;">Selama program berlangsung, peserta akan:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengasah kemampuan mendiagnosa situasi bisnis dan menerjemahkannya menjadi prioritas dan strategi HR yang tepat.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengerjakan project portofolio di setiap modul berbasis skenario perusahaan yang realistis (total 6 mini project + 1 capstone).</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menyusun rencana kerja HRBP 6 bulan (capstone) lengkap dengan AI-enabled solution yang berfungsi, dan mempresentasikannya di hadapan simulated leadership panel.</li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="margin-bottom: 3pt; font-size: 11pt;">Durasi: 15 minggu, mulai <span style="${highlightBg}">${startDate}</span></li>
          <li style="margin-bottom: 3pt; font-size: 11pt;">Format: ${currentTemplate.format}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;">Sesi Online: ${currentTemplate.onlineSchedule}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;">Sertifikat: ${currentTemplate.certification}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;">Biaya Program: <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun kapabilitas HR strategis internal yang mampu menjadi mitra strategi bisnis, bukan sekadar menjalankan proses.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Satu program mencakup seluruh domain HR serta keterkaitannya, tanpa perlu pelatihan terpisah per fungsi.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan kesiapan AI fungsi HR, dengan pendekatan <em>tool-agnostic</em> sehingga relevan dengan tools apa pun yang digunakan perusahaan.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menghasilkan output nyata: rencana kerja HRBP 6 bulan dan AI-enabled solution yang dapat langsung diadaptasi untuk kebutuhan perusahaan.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Kami percaya program ini dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan fungsi HR menghadapi kebutuhan bisnis yang semakin strategis dan didukung oleh perkembangan teknologi AI.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> dalam mendukung pengembangan kompetensi para karyawan.
        </p>
      ` : templateType === 'fsda' ? `
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Perkenalkan, kami dari <strong>RevoU (PT Revolusi Cita Edukasi)</strong>, perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Sejalan dengan semakin pentingnya pengambilan keputusan berbasis data serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu: <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          <strong>Program Full Stack Data Analytics (RevoU)</strong> dirancang untuk menjawab kebutuhan organisasi akan talenta yang mampu mengubah data menjadi keputusan bisnis. Banyak tim memiliki data melimpah, namun waktunya habis untuk membersihkan data dan menyusun laporan manual. Program ini membekali peserta dengan kemampuan analisis data secara menyeluruh, mencakup <em>Business Problem Structuring, Statistics &amp; Spreadsheet, SQL, Python for Data Analysis, Data Visualization, Data Communication</em>, hingga <em>Production-Ready Analytics</em> — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.
        </p>
        <p style="margin-bottom: 4pt; font-size: 11pt; font-weight: bold;">Selama program berlangsung, peserta akan:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengasah kemampuan menstrukturkan masalah bisnis, menyusun hipotesis, dan menentukan metrik yang tepat sebelum mulai menganalisis data.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengerjakan project portofolio berbasis studi kasus industri yang realistis (total 6 <em>skill-specific project</em> + 1 <em>end-to-end project</em>).</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun analisis dengan SQL dan Python, dashboard, serta sistem pelaporan otomatis, lalu mempresentasikan hasilnya di hadapan praktisi data berpengalaman.</li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Durasi:</strong> ${currentTemplate.duration || '4 bulan'}, mulai <span style="${highlightBg}">${startDate}</span></li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Format:</strong> ${currentTemplate.format}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Jadwal:</strong> ${currentTemplate.onlineSchedule}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Sertifikat:</strong> ${effectiveCertification}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Biaya Program:</strong> <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun kapabilitas analisis data internal sehingga keputusan bisnis didasarkan pada data, bukan sekadar asumsi.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Satu program mencakup seluruh alur kerja analisis — dari spreadsheet, SQL, Python, hingga visualisasi dan otomasi pelaporan — tanpa perlu pelatihan terpisah per <em>tools</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mempercepat pekerjaan analitik dengan AI: waktu untuk membersihkan data dan menyusun laporan berkurang, sehingga tim punya lebih banyak waktu untuk menghasilkan <em>insight</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menghasilkan output nyata: dashboard dan analisis <em>end-to-end</em> yang dapat langsung diadaptasi untuk kebutuhan perusahaan.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Kami percaya program ini dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kemampuan tim mengolah data menjadi <em>insight</em> serta mendukung pengambilan keputusan bisnis yang lebih cepat dan akurat dengan dukungan teknologi AI.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> dalam mendukung pengembangan kompetensi para karyawan.
        </p>
      ` : templateType === 'fsdm' ? `
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Perkenalkan, kami dari <strong>RevoU (PT Revolusi Cita Edukasi)</strong>, perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Sejalan dengan semakin kompetitifnya lanskap pemasaran digital serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu: <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          <strong>Program Full Stack Digital Marketing (RevoU)</strong> dirancang untuk menjawab tantangan yang dihadapi tim pemasaran modern. Standar kerja marketer telah berubah: tim dituntut menghasilkan output lebih banyak dalam waktu lebih singkat, sambil tetap fokus pada strategi dan hasil bisnis. Program ini membekali peserta dengan kemampuan digital marketing secara menyeluruh melalui 12 modul, mencakup <em>Performance Measurement &amp; Budget Allocation, Product Marketing &amp; Landing Page, Google Analytics &amp; GTM, Social Media Organic, Influencer Marketing (KOL), Meta Ads, TikTok &amp; Marketplace Ads, Google Ads, SEO</em>, serta <em>Customer Relationship Management (CRM)</em> — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.
        </p>
        <p style="margin-bottom: 4pt; font-size: 11pt; font-weight: bold;">Selama program berlangsung, peserta akan:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengasah kemampuan menerjemahkan tujuan bisnis menjadi KPI pemasaran, alokasi budget per kanal, dan <em>media plan</em> yang terukur.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengerjakan project portofolio di setiap modul (total 13 project), antara lain kampanye Meta Ads, Google Ads, TikTok/Marketplace, strategi SEO, <em>content plan</em>, strategi KOL, hingga CRM <em>plan</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mempresentasikan hasil kerja kepada instruktur praktisi industri untuk mendapatkan <em>feedback</em> langsung di setiap modul.</li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Durasi:</strong> ${currentTemplate.duration || '4 bulan'}, mulai <span style="${highlightBg}">${startDate}</span></li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Format:</strong> ${currentTemplate.format}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Jadwal:</strong> ${currentTemplate.onlineSchedule}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Sertifikat:</strong> ${effectiveCertification}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Biaya Program:</strong> <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun kapabilitas pemasaran digital <em>in-house</em> dari strategi hingga eksekusi, sehingga perusahaan tidak sepenuhnya bergantung pada agensi eksternal.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Satu program mencakup seluruh kanal utama — <em>paid ads, organic social, SEO, KOL</em>, hingga CRM — tanpa perlu pelatihan terpisah per kanal.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan produktivitas tim dengan AI untuk riset, pembuatan konten dan <em>ad creative</em>, hingga pelaporan kampanye.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menghasilkan output nyata: rencana kampanye, laporan performa, dan strategi kanal yang dapat langsung diadaptasi untuk kebutuhan perusahaan.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Kami percaya program ini dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kemampuan tim pemasaran dalam menjalankan kampanye digital yang lebih efektif, terukur, dan efisien dengan dukungan teknologi AI.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> dalam mendukung pengembangan kompetensi para karyawan.
        </p>
      ` : templateType === 'fsse' ? `
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Perkenalkan, kami dari <strong>RevoU (PT Revolusi Cita Edukasi)</strong>, perusahaan <em>ed-tech</em> yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program <em>upskilling</em> yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Sejalan dengan semakin pesatnya transformasi digital serta pemanfaatan kecerdasan artifisial (AI) dalam proses pengembangan perangkat lunak, kami dengan senang hati menawarkan <strong>program pengembangan kompetensi</strong> untuk dipertimbangkan oleh <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> bagi pengembangan kompetensi karyawan Bapak/Ibu: <span style="${highlightBg}"><strong>${effectiveEmployee}</strong></span>.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          <strong>Program Full Stack Software Engineering (RevoU)</strong> merupakan program <em>software engineering</em> berbasis AI (<em>AI-native</em>) pertama di Indonesia yang dikembangkan dalam kemitraan dengan <strong>Amazon Web Services (AWS)</strong>. Saat ini, semakin banyak kode ditulis dengan bantuan AI; yang dibutuhkan perusahaan adalah engineer yang mampu mengarahkan, meninjau, dan menyempurnakan output AI dengan fondasi teknis yang kuat. Program ini membekali peserta melalui 4 fase pembelajaran, mencakup <em>Algorithm, Backend (Python, Flask, PostgreSQL), Frontend (Next.js, TypeScript, Tailwind)</em>, serta <em>AI-Driven Development</em> menggunakan Kiro — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap fase.
        </p>
        <p style="margin-bottom: 4pt; font-size: 11pt; font-weight: bold;">Selama program berlangsung, peserta akan:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun fondasi logika pemrograman dan algoritma, lalu menerapkannya pada pengembangan API, <em>backend, frontend, testing</em>, hingga <em>deployment</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mengerjakan 2 project portofolio: 1 <em>full-stack application</em> dengan pendekatan konvensional dan 1 project yang dibangun sepenuhnya dengan <em>AI-driven development</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menyelesaikan <em>HackerRank challenge</em> di akhir setiap fase — platform tes teknis standar yang digunakan perusahaan di seluruh dunia.</li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Detail Program:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Durasi:</strong> ${currentTemplate.duration || '5 bulan (4 fase, 21 minggu)'}, mulai <span style="${highlightBg}">${startDate}</span></li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Format:</strong> ${currentTemplate.format}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Jadwal:</strong> ${currentTemplate.onlineSchedule}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Sertifikat:</strong> ${effectiveCertification}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Kebutuhan Perangkat:</strong> ${currentTemplate.deviceRequirement || 'Laptop Windows (x64, RAM 8 GB, Intel i3 gen 5 ke atas) atau Mac (macOS Mojave 10.14 ke atas)'}</li>
          <li style="margin-bottom: 3pt; font-size: 11pt;"><strong>Biaya Program:</strong> <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
        </ul>
        <p style="font-weight: bold; margin-top: 10pt; margin-bottom: 4pt; font-size: 11pt;">Manfaat bagi Organisasi:</p>
        <ul style="margin: 4pt 0 10pt 20pt; padding: 0;">
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membangun kapabilitas engineering internal yang menguasai pendekatan konvensional sekaligus <em>AI-driven development</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Mempercepat siklus pengembangan produk melalui alur kerja berbantuan AI yang terstruktur, dengan disiplin <em>review</em> yang tetap terjaga.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Membekali tim dengan kemahiran <em>tools</em> AI dari AWS (Kiro) melalui kemitraan eksklusif RevoU dan AWS.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Menghasilkan output nyata: aplikasi <em>full-stack</em> yang telah melalui <em>unit, performance</em>, dan <em>end-to-end testing</em> serta siap di-<em>deploy</em>.</li>
          <li style="text-align: justify; margin-bottom: 3pt; font-size: 11pt;">Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.</li>
        </ul>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Kami percaya program ini dapat memberikan nilai tambah bagi <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span>, khususnya dalam memperkuat kapabilitas tim teknologi serta mempercepat transformasi digital perusahaan dengan dukungan teknologi AI.
        </p>
        <p style="text-align: justify; margin-bottom: 10pt; font-size: 11pt; line-height: 1.45;">
          Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan <span style="${highlightBg}"><strong>${effectiveCompany}</strong></span> dalam mendukung pengembangan kompetensi para karyawan.
        </p>
      ` : templateType === 'binus' ? `
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
          <li style="margin-bottom: 3pt; font-size: 11pt;">Biaya Program: <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
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
          <li style="margin-bottom: 3pt; font-size: 11pt;">Biaya Program: <span style="text-decoration: line-through; color: #4B5563;">${normalPrice}</span> <span style="${highlightBg}"><strong>${fullPromoPrice}</strong></span></li>
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
        <div style="display: inline-block;">
          <div style="border-bottom: 1px solid #111827; margin-bottom: 6px;"></div>
          <p style="margin-bottom: 2pt;"><strong>${signerName}</strong></p>
        </div>
        <p style="margin-bottom: 2pt;"><a href="mailto:${signerEmail}" style="color: #1D4ED8; text-decoration: underline;">${signerEmail}</a></p>
        <p style="margin-bottom: 2pt;">${signerTitle}</p>
        <p style="margin-bottom: 0;">RevoU (PT Revolusi Cita Edukasi)</p>
      </div>
    </body>
    </html>
  `;
}
