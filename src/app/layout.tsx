import './globals.css';
import { shinGo } from '~/helpers/font';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={shinGo.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
