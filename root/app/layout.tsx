"use client";
import './global.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
 
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}  
        <Footer />
      </body>
    </html>
  );
}
