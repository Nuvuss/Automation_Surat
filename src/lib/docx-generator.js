/**
 * Generates and triggers download of the official 2-page Microsoft Word (.docx) document
 */
export async function downloadDocx({
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
        Header,
        ExternalHyperlink
      } = await import('docx');

      let logoBuffer = null;
      try {
        const logoUrl = currentTemplate.logo || '/revou-logo.png';
        const resp = await fetch(logoUrl);
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
        ...(templateType !== 'itb_ds' ? [
          new Paragraph({
            spacing: { after: 200, line: 276 },
            children: [
              new TextRun({ text: 'Semoga Bapak/Ibu dalam keadaan sehat dan baik.', size: 22 }),
            ],
          })
        ] : []),
      );

      if (templateType === 'itb_ds') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ', size: 22 }),
              new TextRun({ text: 'ed-tech', italics: true, size: 22 }),
              new TextRun({ text: ' yang fokus pada pengembangan kompetensi profesional di bidang digital. Melalui kolaborasi dengan Institut Teknologi Bandung (ITB), RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan pembelajaran akademis dengan praktik dan kebutuhan dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin berkembangnya pemanfaatan data dan kecerdasan artifisial (AI) dalam proses bisnis, kemampuan untuk tidak hanya menganalisis data, tetapi juga membangun model prediktif dan solusi berbasis AI menjadi semakin penting bagi profesional di berbagai industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Dengan senang hati kami menawarkan ', size: 22 }),
              new TextRun({ text: 'program pengembangan kompetensi Applied Data Science with AI (RevoU X ITB)', bold: true, size: 22 }),
              new TextRun({ text: ' untuk dipertimbangkan oleh ', size: 22 }),
              new TextRun({ text: effectiveCompany, bold: true, size: 22 }),
              new TextRun({ text: ' bagi pengembangan kompetensi karyawan Bapak/Ibu: ', size: 22 }),
              new TextRun({ text: effectiveEmployee, bold: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Program Applied Data Science with AI (RevoU X ITB)', bold: true, size: 22 }),
              new TextRun({ text: ' dirancang bagi profesional yang telah memiliki dasar analitik data dan ingin mengembangkan kemampuan lebih lanjut, mulai dari ', size: 22 }),
              new TextRun({ text: 'predictive modelling', italics: true, size: 22 }),
              new TextRun({ text: ', pemanfaatan AI dalam proses analisis dan pengembangan solusi, hingga membangun ', size: 22 }),
              new TextRun({ text: 'data products', italics: true, size: 22 }),
              new TextRun({ text: ' yang dapat digunakan untuk mendukung kebutuhan bisnis.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya pada permasalahan nyata dari pekerjaan atau organisasi masing-masing. Selama program berlangsung, peserta akan:', size: 22 }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Mengembangkan kemampuan dalam ', size: 22 }),
              new TextRun({ text: 'predictive modelling', bold: true, size: 22 }),
              new TextRun({ text: ' dan validasi model untuk menghasilkan insight yang dapat dipercaya.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Memanfaatkan ', size: 22 }),
              new TextRun({ text: 'AI dan AI coding agents', bold: true, size: 22 }),
              new TextRun({ text: ' untuk mempercepat proses analisis dan pengembangan solusi data.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Membangun ', size: 22 }),
              new TextRun({ text: 'AI-enabled data product', bold: true, size: 22 }),
              new TextRun({ text: ' berdasarkan permasalahan atau keputusan nyata dari pekerjaan peserta.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Mempelajari proses ', size: 22 }),
              new TextRun({ text: 'monitoring, testing, reproducibility, dan responsible AI governance', bold: true, size: 22 }),
              new TextRun({ text: ' untuk memastikan solusi dapat digunakan secara berkelanjutan.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: 'Mempresentasikan dan mempertahankan hasil ', size: 22 }),
              new TextRun({ text: 'capstone project', italics: true, size: 22 }),
              new TextRun({ text: ' di hadapan panel praktisi industri.', size: 22 }),
            ]
          }),
          // PAGE 2 BREAK
          new Paragraph({
            children: [new PageBreak()],
          }),
          createHeaderTable(),
          new Paragraph({
            spacing: { before: 200, after: 80, line: 260 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Durasi: ', bold: true, size: 22 }),
              new TextRun({ text: '13 minggu, mulai ', size: 22 }),
              new TextRun({ text: startDate, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Format: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.format, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Sesi Online: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.onlineSchedule, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Sertifikasi: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.certification, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 140, line: 276 },
            children: [
              new TextRun({ text: 'Biaya Program: ', bold: true, size: 22 }),
              new TextRun({ text: normalPrice, strike: true, color: '4B5563', size: 22 }),
              new TextRun({ text: ' ', size: 22 }),
              new TextRun({ text: fullPromoPrice, bold: true, size: 22 }),
            ]
          }),
          new Paragraph({
            spacing: { before: 140, after: 80, line: 260 },
            children: [new TextRun({ text: 'Manfaat bagi Organisasi:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Memperkuat kapabilitas ', size: 22 }),
              new TextRun({ text: 'data science dan predictive analytics', bold: true, size: 22 }),
              new TextRun({ text: ' di internal perusahaan.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: 'Meningkatkan kemampuan karyawan dalam menerjemahkan permasalahan bisnis menjadi solusi berbasis data dan AI.', size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [new TextRun({ text: 'Mendorong pemanfaatan AI untuk meningkatkan efisiensi proses analisis dan pengembangan solusi.', size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: 'Menghasilkan ', size: 22 }),
              new TextRun({ text: 'data product yang aplikatif', bold: true, size: 22 }),
              new TextRun({ text: ' berdasarkan permasalahan nyata di lingkungan kerja.', size: 22 }),
            ]
          })
        );
      } else if (templateType === 'hr') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari RevoU (PT Revolusi Cita Edukasi), perusahaan ', size: 22 }),
              new TextRun({ text: 'ed-tech', italics: true, size: 22 }),
              new TextRun({ text: ' yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin pentingnya peran HR sebagai mitra strategis bisnis serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan ', size: 22 }),
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
              new TextRun({ text: 'Program Strategic HR with AI (RevoU)', bold: true, size: 22 }),
              new TextRun({ text: ' dirancang untuk menjawab tantangan yang dihadapi fungsi HR modern. Banyak praktisi HR yang kuat di sisi eksekusi, namun belum dilibatkan dalam pengambilan keputusan strategis. Program ini membekali peserta dengan kemampuan HR Business Partner (HRBP) secara menyeluruh, mencakup ', size: 22 }),
              new TextRun({ text: 'Organisation Development', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'Talent Management', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'Performance Management', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'Compensation & Benefits', italics: true, size: 22 }),
              new TextRun({ text: ', serta ', size: 22 }),
              new TextRun({ text: 'HR Operations & Compliance', italics: true, size: 22 }),
              new TextRun({ text: ' — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.', size: 22 }),
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
              new TextRun({ text: 'Mengasah kemampuan mendiagnosa situasi bisnis dan menerjemahkannya menjadi prioritas dan strategi HR yang tepat.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Mengerjakan project portofolio di setiap modul berbasis skenario perusahaan yang realistis (total 6 mini project + 1 capstone).', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Menyusun rencana kerja HRBP 6 bulan (capstone) lengkap dengan AI-enabled solution yang berfungsi, dan mempresentasikannya di hadapan simulated leadership panel.', size: 22 }),
            ]
          }),

          // PAGE 2: Clean Page Break (Header is automatically supplied by section Header)
          new Paragraph({ children: [new PageBreak()] }),

          new Paragraph({
            spacing: { before: 80, after: 60, line: 276 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Durasi: 15 minggu, mulai ', size: 22 }),
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
            children: [new TextRun({ text: `Sertifikat: ${currentTemplate.certification}`, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: `Biaya Program: `, size: 22 }),
              new TextRun({ text: normalPrice, strike: true, size: 22, color: '4B5563' }),
              new TextRun({ text: ` ` }),
              new TextRun({
                text: fullPromoPrice,
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
              new TextRun({ text: 'Membangun kapabilitas HR strategis internal yang mampu menjadi mitra strategi bisnis, bukan sekadar menjalankan proses.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Satu program mencakup seluruh domain HR serta keterkaitannya, tanpa perlu pelatihan terpisah per fungsi.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Meningkatkan kesiapan AI fungsi HR, dengan pendekatan ', size: 22 }),
              new TextRun({ text: 'tool-agnostic', italics: true, size: 22 }),
              new TextRun({ text: ' sehingga relevan dengan tools apa pun yang digunakan perusahaan.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 40, line: 276 },
            children: [
              new TextRun({ text: 'Menghasilkan output nyata: rencana kerja HRBP 6 bulan dan ', size: 22 }),
              new TextRun({ text: 'AI-enabled solution', italics: true, size: 22 }),
              new TextRun({ text: ' yang dapat langsung diadaptasi untuk kebutuhan perusahaan.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [new TextRun({ text: 'Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.', size: 22 })]
          })
        );
      } else if (templateType === 'fsda') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari ', size: 22 }),
              new TextRun({ text: 'RevoU (PT Revolusi Cita Edukasi)', bold: true, size: 22 }),
              new TextRun({ text: ', perusahaan ', size: 22 }),
              new TextRun({ text: 'ed-tech', italics: true, size: 22 }),
              new TextRun({ text: ' yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin pentingnya pengambilan keputusan berbasis data serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan ', size: 22 }),
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
              new TextRun({ text: 'Program Full Stack Data Analytics (RevoU)', bold: true, size: 22 }),
              new TextRun({ text: ' dirancang untuk menjawab kebutuhan organisasi akan talenta yang mampu mengubah data menjadi keputusan bisnis. Banyak tim memiliki data melimpah, namun waktunya habis untuk membersihkan data dan menyusun laporan manual. Program ini membekali peserta dengan kemampuan analisis data secara menyeluruh, mencakup ', size: 22 }),
              new TextRun({ text: 'Business Problem Structuring, Statistics & Spreadsheet, SQL, Python for Data Analysis, Data Visualization, Data Communication', italics: true, size: 22 }),
              new TextRun({ text: ', hingga ', size: 22 }),
              new TextRun({ text: 'Production-Ready Analytics', italics: true, size: 22 }),
              new TextRun({ text: ' — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200, line: 276 },
            children: [
              new TextRun({ text: 'Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Selama program berlangsung, peserta akan:', bold: true, size: 22 }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mengasah kemampuan menstrukturkan masalah bisnis, menyusun hipotesis, dan menentukan metrik yang tepat sebelum mulai menganalisis data.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mengerjakan project portofolio berbasis studi kasus industri yang realistis (total 6 ', size: 22 }),
              new TextRun({ text: 'skill-specific project', italics: true, size: 22 }),
              new TextRun({ text: ' + 1 ', size: 22 }),
              new TextRun({ text: 'end-to-end project', italics: true, size: 22 }),
              new TextRun({ text: ').', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Membangun analisis dengan SQL dan Python, dashboard, serta sistem pelaporan otomatis, lalu mempresentasikan hasilnya di hadapan praktisi data berpengalaman.', size: 22 }),
            ]
          }),

          // PAGE 2: Clean Page Break (Header is automatically supplied by section Header)
          new Paragraph({ children: [new PageBreak()] }),

          new Paragraph({
            spacing: { before: 80, after: 80, line: 276 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Durasi: ', bold: true, size: 22 }),
              new TextRun({ text: (currentTemplate.duration || '4 bulan') + ', mulai ', size: 22 }),
              new TextRun({ text: startDate, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Format: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.format, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Jadwal: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.onlineSchedule, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Sertifikat: ', bold: true, size: 22 }),
              new TextRun({ text: effectiveCertification, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: 'Biaya Program: ', bold: true, size: 22 }),
              new TextRun({ text: normalPrice, strike: true, size: 22, color: '4B5563' }),
              new TextRun({ text: ' ' }),
              new TextRun({
                text: fullPromoPrice,
                bold: true,
                size: 22,
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 100, after: 80, line: 276 },
            children: [new TextRun({ text: 'Manfaat bagi Organisasi:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Membangun kapabilitas analisis data internal sehingga keputusan bisnis didasarkan pada data, bukan sekadar asumsi.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Satu program mencakup seluruh alur kerja analisis — dari spreadsheet, SQL, Python, hingga visualisasi dan otomasi pelaporan — tanpa perlu pelatihan terpisah per ', size: 22 }),
              new TextRun({ text: 'tools', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mempercepat pekerjaan analitik dengan AI: waktu untuk membersihkan data dan menyusun laporan berkurang, sehingga tim punya lebih banyak waktu untuk menghasilkan ', size: 22 }),
              new TextRun({ text: 'insight', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Menghasilkan output nyata: dashboard dan analisis ', size: 22 }),
              new TextRun({ text: 'end-to-end', italics: true, size: 22 }),
              new TextRun({ text: ' yang dapat langsung diadaptasi untuk kebutuhan perusahaan.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [new TextRun({ text: 'Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.', size: 22 })]
          })
        );
      } else if (templateType === 'fsdm') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari ', size: 22 }),
              new TextRun({ text: 'RevoU (PT Revolusi Cita Edukasi)', bold: true, size: 22 }),
              new TextRun({ text: ', perusahaan ', size: 22 }),
              new TextRun({ text: 'ed-tech', italics: true, size: 22 }),
              new TextRun({ text: ' yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin kompetitifnya lanskap pemasaran digital serta pemanfaatan kecerdasan artifisial (AI) dalam meningkatkan produktivitas organisasi, kami dengan senang hati menawarkan ', size: 22 }),
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
              new TextRun({ text: 'Program Full Stack Digital Marketing (RevoU)', bold: true, size: 22 }),
              new TextRun({ text: ' dirancang untuk menjawab tantangan yang dihadapi tim pemasaran modern. Standar kerja marketer telah berubah: tim dituntut menghasilkan output lebih banyak dalam waktu lebih singkat, sambil tetap fokus pada strategi dan hasil bisnis. Program ini membekali peserta dengan kemampuan digital marketing secara menyeluruh melalui 12 modul, mencakup ', size: 22 }),
              new TextRun({ text: 'Performance Measurement & Budget Allocation, Product Marketing & Landing Page, Google Analytics & GTM, Social Media Organic, Influencer Marketing (KOL), Meta Ads, TikTok & Marketplace Ads, Google Ads, SEO', italics: true, size: 22 }),
              new TextRun({ text: ', serta ', size: 22 }),
              new TextRun({ text: 'Customer Relationship Management (CRM)', italics: true, size: 22 }),
              new TextRun({ text: ' — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200, line: 276 },
            children: [
              new TextRun({ text: 'Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap modul.', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Selama program berlangsung, peserta akan:', bold: true, size: 22 }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mengasah kemampuan menerjemahkan tujuan bisnis menjadi KPI pemasaran, alokasi budget per kanal, dan ', size: 22 }),
              new TextRun({ text: 'media plan', italics: true, size: 22 }),
              new TextRun({ text: ' yang terukur.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mengerjakan project portofolio di setiap modul (total 13 project), antara lain kampanye Meta Ads, Google Ads, TikTok/Marketplace, strategi SEO, ', size: 22 }),
              new TextRun({ text: 'content plan', italics: true, size: 22 }),
              new TextRun({ text: ', strategi KOL, hingga CRM ', size: 22 }),
              new TextRun({ text: 'plan', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mempresentasikan hasil kerja kepada instruktur praktisi industri untuk mendapatkan ', size: 22 }),
              new TextRun({ text: 'feedback', italics: true, size: 22 }),
              new TextRun({ text: ' langsung di setiap modul.', size: 22 }),
            ]
          }),

          // PAGE 2: Clean Page Break (Header is automatically supplied by section Header)
          new Paragraph({ children: [new PageBreak()] }),

          new Paragraph({
            spacing: { before: 80, after: 80, line: 276 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Durasi: ', bold: true, size: 22 }),
              new TextRun({ text: (currentTemplate.duration || '4 bulan') + ', mulai ', size: 22 }),
              new TextRun({ text: startDate, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Format: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.format, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Jadwal: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.onlineSchedule, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Sertifikat: ', bold: true, size: 22 }),
              new TextRun({ text: effectiveCertification, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: 'Biaya Program: ', bold: true, size: 22 }),
              new TextRun({ text: normalPrice, strike: true, size: 22, color: '4B5563' }),
              new TextRun({ text: ' ' }),
              new TextRun({
                text: fullPromoPrice,
                bold: true,
                size: 22,
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 100, after: 80, line: 276 },
            children: [new TextRun({ text: 'Manfaat bagi Organisasi:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Membangun kapabilitas pemasaran digital ', size: 22 }),
              new TextRun({ text: 'in-house', italics: true, size: 22 }),
              new TextRun({ text: ' dari strategi hingga eksekusi, sehingga perusahaan tidak sepenuhnya bergantung pada agensi eksternal.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Satu program mencakup seluruh kanal utama — ', size: 22 }),
              new TextRun({ text: 'paid ads', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'organic social', italics: true, size: 22 }),
              new TextRun({ text: ', SEO, KOL, hingga CRM — tanpa perlu pelatihan terpisah per kanal.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Meningkatkan produktivitas tim dengan AI untuk riset, pembuatan konten dan ', size: 22 }),
              new TextRun({ text: 'ad creative', italics: true, size: 22 }),
              new TextRun({ text: ', hingga pelaporan kampanye.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Menghasilkan output nyata: rencana kampanye, laporan performa, dan strategi kanal yang dapat langsung diadaptasi untuk kebutuhan perusahaan.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [new TextRun({ text: 'Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.', size: 22 })]
          })
        );
      } else if (templateType === 'fsse') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Perkenalkan, kami dari ', size: 22 }),
              new TextRun({ text: 'RevoU (PT Revolusi Cita Edukasi)', bold: true, size: 22 }),
              new TextRun({ text: ', perusahaan ', size: 22 }),
              new TextRun({ text: 'ed-tech', italics: true, size: 22 }),
              new TextRun({ text: ' yang fokus pada pengembangan kompetensi profesional di bidang digital. RevoU menghadirkan program ', size: 22 }),
              new TextRun({ text: 'upskilling', italics: true, size: 22 }),
              new TextRun({ text: ' yang memadukan kurikulum berbasis praktik dengan kebutuhan nyata dunia industri.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Sejalan dengan semakin pesatnya transformasi digital serta pemanfaatan kecerdasan artifisial (AI) dalam proses pengembangan perangkat lunak, kami dengan senang hati menawarkan ', size: 22 }),
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
              new TextRun({ text: 'Program Full Stack Software Engineering (RevoU)', bold: true, size: 22 }),
              new TextRun({ text: ' merupakan program ', size: 22 }),
              new TextRun({ text: 'software engineering', italics: true, size: 22 }),
              new TextRun({ text: ' berbasis AI (', size: 22 }),
              new TextRun({ text: 'AI-native', italics: true, size: 22 }),
              new TextRun({ text: ') pertama di Indonesia yang dikembangkan dalam kemitraan dengan ', size: 22 }),
              new TextRun({ text: 'Amazon Web Services (AWS)', bold: true, size: 22 }),
              new TextRun({ text: '. Saat ini, semakin banyak kode ditulis dengan bantuan AI; yang dibutuhkan perusahaan adalah engineer yang mampu mengarahkan, meninjau, dan menyempurnakan output AI dengan fondasi teknis yang kuat. Program ini membekali peserta melalui 4 fase pembelajaran, mencakup ', size: 22 }),
              new TextRun({ text: 'Algorithm', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'Backend', italics: true, size: 22 }),
              new TextRun({ text: ' (Python, Flask, PostgreSQL), ', size: 22 }),
              new TextRun({ text: 'Frontend', italics: true, size: 22 }),
              new TextRun({ text: ' (Next.js, TypeScript, Tailwind), serta ', size: 22 }),
              new TextRun({ text: 'AI-Driven Development', italics: true, size: 22 }),
              new TextRun({ text: ' menggunakan Kiro — dengan AI terintegrasi sebagai mitra kerja di sepanjang program.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 200, line: 276 },
            children: [
              new TextRun({ text: 'Melalui program ini, peserta tidak hanya mempelajari konsep, tetapi juga menerapkannya langsung melalui studi kasus dan project di setiap fase.', size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Selama program berlangsung, peserta akan:', bold: true, size: 22 }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Membangun fondasi logika pemrograman dan algoritma, lalu menerapkannya pada pengembangan API, ', size: 22 }),
              new TextRun({ text: 'backend', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'frontend', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'testing', italics: true, size: 22 }),
              new TextRun({ text: ', hingga ', size: 22 }),
              new TextRun({ text: 'deployment', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mengerjakan 2 project portofolio: 1 ', size: 22 }),
              new TextRun({ text: 'full-stack application', italics: true, size: 22 }),
              new TextRun({ text: ' dengan pendekatan konvensional dan 1 project yang dibangun sepenuhnya dengan ', size: 22 }),
              new TextRun({ text: 'AI-driven development', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Menyelesaikan ', size: 22 }),
              new TextRun({ text: 'HackerRank challenge', italics: true, size: 22 }),
              new TextRun({ text: ' di akhir setiap fase — platform tes teknis standar yang digunakan perusahaan di seluruh dunia.', size: 22 }),
            ]
          }),

          // PAGE 2: Clean Page Break (Header is automatically supplied by section Header)
          new Paragraph({ children: [new PageBreak()] }),

          new Paragraph({
            spacing: { before: 80, after: 80, line: 276 },
            children: [new TextRun({ text: 'Detail Program:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Durasi: ', bold: true, size: 22 }),
              new TextRun({ text: (currentTemplate.duration || '5 bulan (4 fase, 21 minggu)') + ', mulai ', size: 22 }),
              new TextRun({ text: startDate, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Format: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.format, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Jadwal: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.onlineSchedule, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Sertifikat: ', bold: true, size: 22 }),
              new TextRun({ text: effectiveCertification, size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Kebutuhan Perangkat: ', bold: true, size: 22 }),
              new TextRun({ text: currentTemplate.deviceRequirement || 'Laptop Windows (x64, RAM 8 GB, Intel i3 gen 5 ke atas) atau Mac (macOS Mojave 10.14 ke atas)', size: 22 })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 120, line: 276 },
            children: [
              new TextRun({ text: 'Biaya Program: ', bold: true, size: 22 }),
              new TextRun({ text: normalPrice, strike: true, size: 22, color: '4B5563' }),
              new TextRun({ text: ' ' }),
              new TextRun({
                text: fullPromoPrice,
                bold: true,
                size: 22,
              })
            ]
          }),
          new Paragraph({
            spacing: { before: 100, after: 80, line: 276 },
            children: [new TextRun({ text: 'Manfaat bagi Organisasi:', bold: true, size: 22 })]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Membangun kapabilitas engineering internal yang menguasai pendekatan konvensional sekaligus ', size: 22 }),
              new TextRun({ text: 'AI-driven development', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Mempercepat siklus pengembangan produk melalui alur kerja berbantuan AI yang terstruktur, dengan disiplin ', size: 22 }),
              new TextRun({ text: 'review', italics: true, size: 22 }),
              new TextRun({ text: ' yang tetap terjaga.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Membekali tim dengan kemahiran ', size: 22 }),
              new TextRun({ text: 'tools', italics: true, size: 22 }),
              new TextRun({ text: ' AI dari AWS (Kiro) melalui kemitraan eksklusif RevoU dan AWS.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 80, line: 276 },
            children: [
              new TextRun({ text: 'Menghasilkan output nyata: aplikasi ', size: 22 }),
              new TextRun({ text: 'full-stack', italics: true, size: 22 }),
              new TextRun({ text: ' yang telah melalui ', size: 22 }),
              new TextRun({ text: 'unit', italics: true, size: 22 }),
              new TextRun({ text: ', ', size: 22 }),
              new TextRun({ text: 'performance', italics: true, size: 22 }),
              new TextRun({ text: ', dan ', size: 22 }),
              new TextRun({ text: 'end-to-end testing', italics: true, size: 22 }),
              new TextRun({ text: ' serta siap di-', size: 22 }),
              new TextRun({ text: 'deploy', italics: true, size: 22 }),
              new TextRun({ text: '.', size: 22 }),
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 120, line: 276 },
            children: [new TextRun({ text: 'Meningkatkan retensi karyawan melalui investasi pada jalur pengembangan karir yang jelas.', size: 22 })]
          })
        );
      } else if (templateType === 'binus') {
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
                text: fullPromoPrice,
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
                text: fullPromoPrice,
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
      if (templateType === 'itb_ds') {
        bodyParagraphs.push(
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { before: 140, after: 140, line: 276 },
            children: [
              new TextRun({ text: 'Kami percaya program ', size: 22 }),
              new TextRun({ text: 'Applied Data Science with AI (RevoU X ITB)', bold: true, size: 22 }),
              new TextRun({ text: ' dapat memberikan nilai tambah bagi ', size: 22 }),
              new TextRun({ text: effectiveCompany, bold: true, size: 22 }),
              new TextRun({ text: ', khususnya dalam memperkuat kapabilitas sumber daya manusia dan mempersiapkan organisasi menghadapi kebutuhan bisnis yang semakin ', size: 22 }),
              new TextRun({ text: 'data-driven', italics: true, size: 22 }),
              new TextRun({ text: ' serta perkembangan teknologi AI.', size: 22 }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.JUSTIFIED,
            spacing: { after: 160, line: 276 },
            children: [
              new TextRun({ text: 'Demikian penawaran ini kami sampaikan. Terima kasih atas waktu dan perhatian Bapak/Ibu. Kami berharap dapat memperoleh kesempatan untuk berkolaborasi dengan ', size: 22 }),
              new TextRun({ text: effectiveCompany, bold: true, size: 22 }),
              new TextRun({ text: ' dalam mendukung pengembangan kompetensi karyawan dan kapabilitas data & AI di organisasi.', size: 22 }),
            ],
          })
        );
      } else if (templateType === 'fsda') {
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
              new TextRun({ text: ', khususnya dalam memperkuat kemampuan tim mengolah data menjadi ', size: 22 }),
              new TextRun({ text: 'insight', italics: true, size: 22 }),
              new TextRun({ text: ' serta mendukung pengambilan keputusan bisnis yang lebih cepat dan akurat dengan dukungan teknologi AI.', size: 22 }),
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
              new TextRun({ text: ' dalam mendukung pengembangan kompetensi para karyawan.', size: 22 }),
            ],
          })
        );
      } else if (templateType === 'fsdm') {
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
              new TextRun({ text: ', khususnya dalam memperkuat kemampuan tim pemasaran dalam menjalankan kampanye digital yang lebih efektif, terukur, dan efisien dengan dukungan teknologi AI.', size: 22 }),
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
              new TextRun({ text: ' dalam mendukung pengembangan kompetensi para karyawan.', size: 22 }),
            ],
          })
        );
      } else if (templateType === 'fsse') {
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
              new TextRun({ text: ', khususnya dalam memperkuat kapabilitas tim teknologi serta mempercepat transformasi digital perusahaan dengan dukungan teknologi AI.', size: 22 }),
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
              new TextRun({ text: ' dalam mendukung pengembangan kompetensi para karyawan.', size: 22 }),
            ],
          })
        );
      } else {
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
              new TextRun({
                text: templateType === 'binus'
                  ? ', dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.'
                  : templateType === 'hr'
                    ? ' dalam mendukung pengembangan kompetensi para karyawan.'
                    : ' dalam mendukung pengembangan kompetensi para pemimpin dan karyawan.',
                size: 22,
              }),
            ],
          })
        );
      }
      bodyParagraphs.push(
        new Paragraph({
          spacing: { before: 140, after: 720, line: 260 },
          children: [new TextRun({ text: 'Salam hormat,', size: 22 })]
        }),
        new Paragraph({
          spacing: { after: 60, line: 240 },
          children: [
            new TextRun({
              text: '________________________',
              color: '111827',
              size: 22
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 30, line: 240 },
          children: [
            new TextRun({
              text: signerName,
              bold: true,
              size: 22,
            })
          ]
        }),
        new Paragraph({
          spacing: { after: 30, line: 240 },
          children: [
            new ExternalHyperlink({
              children: [
                new TextRun({
                  text: signerEmail,
                  size: 22,
                  color: '1D4ED8',
                  underline: {},
                }),
              ],
              link: `mailto:${signerEmail}`,
            }),
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

}
