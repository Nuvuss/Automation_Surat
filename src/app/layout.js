import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Generator Surat Penawaran RevoU - Enterprise Partnership",
  description: "Aplikasi otomatisasi pembuatan surat penawaran program RevoU ke perusahaan mitra.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={jakartaSans.variable}>
      <body>{children}</body>
    </html>
  );
}

