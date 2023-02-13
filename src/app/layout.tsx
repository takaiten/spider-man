import localFont from '@next/font/local';
import './globals.css';

const shinGo = localFont({
  src: [
    {
      path: '../../public/assets/fonts/G-OTF Shin Go Pro/G-OTF Shin Go Pro L.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/G-OTF Shin Go Pro/G-OTF Shin Go Pro R.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/G-OTF Shin Go Pro/G-OTF Shin Go Pro B.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={shinGo.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
