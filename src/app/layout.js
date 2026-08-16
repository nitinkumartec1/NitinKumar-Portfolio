import { Syne, Instrument_Serif, Inter, DM_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Nitin Kumar — Full-Stack Web Developer',
  description:
    'Nitin Kumar — Full-Stack Web Developer crafting scalable, high-performance web applications with the MERN stack.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'Nitin Kumar — Full-Stack Web Developer',
    description:
      'Premium portfolio of Nitin Kumar — building bold, fast, human-centered web experiences.',
  },
  other: {
    'theme-color': '#0a0a0b',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${inter.variable} ${dmMono.variable}`}
    >
      <body id="top">{children}</body>
    </html>
  );
}
