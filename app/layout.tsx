import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/globals.scss';
// Подключение шрифта Geist Sans
const geistSans = localFont({
  src: '../public/fonts/GeistVF.woff', // Лучше использовать .woff2 для более быстрой загрузки
  variable: '--font-geist-sans',
});

// Подключение шрифта Geist Mono
const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff', // Лучше использовать .woff2
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'Engineer Pro',
  description: 'Your engineering solution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
