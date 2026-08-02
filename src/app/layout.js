import { Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

export const metadata = {
  title: 'Patient Dashboard | Jessica Taylor',
  description:
    'Responsive patient health dashboard for Jessica Taylor — diagnosis history, vitals, blood pressure trends, diagnostic list, and lab results.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={manrope.className}>{children}</body>
    </html>
  );
}
