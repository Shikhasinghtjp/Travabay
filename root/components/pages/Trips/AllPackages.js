"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaMoon, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"; 
import styles from "../../styles/Trips/BestTrips.module.css"; // reuse same CSS

const AllPackages = ({ data }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleExplore = () => {
    setVisibleCount((prev) => prev + 4); 
  };

  return (
    <section className={styles.tripsSection}>
      <h2 className={styles.heading}>All Packages</h2>

      <div className={styles.grid}>
        {data.slice(0, visibleCount).map((trip, idx) => (
          <div key={idx} className={styles.card}>
            {/* Background Image */}
            <Image
              src={trip.image}
              alt={trip.title}
              fill
              className={styles.image}
            />

            {/* Price Tag */}
            <div className={styles.priceTag}>
              <span className={styles.oldPrice}>{trip.oldPrice}</span>{" "}
              <span className={styles.newPrice}>{trip.newPrice}</span>
              <span className={styles.onwards}> onwards</span>
            </div>

            {/* Transparent overlay body */}
            <div className={styles.cardBody}>
              {trip.tags?.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
              <h3 className={styles.title}>{trip.title}</h3>

              <div className={styles.meta}>
                <FaMoon /> <span>{trip.duration}</span>
              </div>
              <div className={styles.meta}>
                <FaMapMarkerAlt/> <span>{trip.location}</span>
              </div>
              <div className={styles.meta}>
                <FaCalendarAlt /> <span>{trip.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      {visibleCount < data.length && (
        <div className={styles.exploreWrapper}>
          <button onClick={handleExplore} className={styles.exploreBtn}>
            Explore More
          </button>
        </div>
      )}
    </section>
  );
};

export default AllPackages;
