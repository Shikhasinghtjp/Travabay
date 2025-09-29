"use client";
import { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import Image from "next/image";

export default function HeroSection() {
  const [images, setImages] = useState([
    "https://picsum.photos/id/1018/1200/600",
    "https://picsum.photos/id/1015/1200/600",
    "https://picsum.photos/id/1016/1200/600"
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fileUrl, setFileUrl] = useState("/dummy-itinerary.pdf"); // public folder me file rakho
  const [shareIcon, setShareIcon] = useState(
    "https://cdn-icons-png.flaticon.com/512/929/929610.png"
  );

  // Auto image change every 5 sec
  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  // File Download
  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "Itinerary.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `url(${images[currentIndex] || ""})`,
      }}
    >
      <div className={styles.overlay}>
        <button onClick={handleDownload} className={styles.downloadBtn}>
          ⬇ Download Itinerary
        </button>

        {shareIcon && (
          <a href="#" onClick={() => alert("Share clicked!")}>
            <Image src={shareIcon} alt="share" className={styles.shareIcon} width={30} height={30}/>
          </a>
        )}
      </div>
    </section>
    
  );
}
