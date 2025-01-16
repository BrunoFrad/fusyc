import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Fusyc"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://kit.fontawesome.com/d4016e4929.js" crossOrigin="anonymous"></Script>
        {children}
      </body>
    </html>
  );
}
