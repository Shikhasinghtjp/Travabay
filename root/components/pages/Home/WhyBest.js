"use client";
import React from "react";
import styles from "../../styles/Home/WhyBest.module.css";
import Image from "next/image";
import third_party from "../../../public/images/third_party.png";
import security from "../../../public/images/security.png";
import cotraveler from "../../../public/images/co-traveler.png";
import hassle from "../../../public/images/hassle.png";

// Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const WhyBest = () => {
  const features = [
    {
      img: third_party,
      title: "No Third Party Mess",
      description:
        "100 percent in-house operations for all trips! No third parties involved, hence no fishy claims!",
    },
    {
      img: security,
      title: "Transparency & Security",
      description:
        "Real time monitoring of all trips by ground team! All routes and weather conditions are accurately updated!",
    },
    {
      img: cotraveler,
      title: "Co-Travelers Filtering",
      description:
        "Multi-step filtering to bring only like-minded people together! That's our key to have fuss-free trips!",
    },
    {
      img: hassle,
      title: "One Stop Hassle Free Experience",
      description:
        "Comfortable stays, trained drivers, hospitable staff and friendly trip leaders put together that one memorable trip for you!",
    },
  ];

  return (
    <section className={styles.whyBestSection}>
      <h2 className={styles.title}>WHY TO CHOOSE US</h2>

      {/* ✅ Desktop View (Grid/Flex) */}
      <div className={styles.cardsContainerDesktop}>
        {features.map((feature, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={feature.img}
              alt={feature.title}
              className={styles.image}
              width={100}
              height={100}
            />
            <h3 className={styles.cardTitle}>{feature.title}</h3>
            <p className={styles.cardDescription}>{feature.description}</p>
          </div>
        ))}
      </div>

      {/* ✅ Mobile View (Swiper) */}
      <div className={styles.cardsContainerMobile}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1.2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className={styles.mySwiper}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className={styles.card}>
                <Image
                  src={feature.img}
                  alt={feature.title}
                  className={styles.image}
                  width={100}
                  height={100}
                />
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WhyBest;
