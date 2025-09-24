"use client";
import { useState, useRef, useEffect } from "react";
import styles from "../../styles/TripInfo/TripDetails.module.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaMinus,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function TourDetails() {
  // Dummy data
  const tour = {
    title: "4 Days Kasol to Manali: Exploring Himalayan Serenity",
    pickup: "Delhi - Delhi",
    duration: "3N - 4D",
    price: "₹15,999/-",
    overview: `The Himalayas, fulfilling its promise, are a reservoir of the immense amount of ‘Him’ in the forms of Ice, Fresh and Underground Water. And the seeping of this moisture originates several rivers, which flows through the land of Himachal, namely Sutlej, Beas, Ravi, Chenab, and the Yamuna. It is also the reason for dozens of lakes that covered Himachal Pradesh. The Himalayas also nurture breathtaking valleys, snow-capped peaks, and lush green meadows that mesmerize every traveler.`,
    inclusions: [
      "Airport pick up according to maximum flight arrival timing.",
      "7 nights accommodation in Double/Twin sharing with Breakfast",
      "Dinner is included in Sigiriya and Kandy hotel",
      "Bentota Mangrove Forest River Safari",
      "Tea Plantation visit is Included.",
      "Nine Arch Bridge visit is included.",
      "Entry ticket to Sigiriya Rock Fortress and Dambulla Cave Temple",
      "All transfer as per the itinerary in a private vehicle",
      "Trip captain throughout the trip",
      "English-speaking guide throughout your journey in Sri Lanka",
    ],
    exclusions: [
      "GST (5%) is applicable extra.",
      "Food & Beverage not mentioned in package.",
      "Tips, monument entry fee, or staff charges.",
      "Any other expense not mentioned in inclusions.",
      "Cost arises due to change or delay in flight timings.",
      "Any cost arising due to natural calamities like landslides, roadblocks etc.",
      "Any personal expenses like a tip to the drivers, camera/video camera charges, laundry, telephone bills, tips, etc",
    ],
  };

  const itinerary = [
    {
      day: "Day 0",
      title: "Evening departure from Delhi to Kasol.",
      details: "",
    },
    {
      day: "Day 1",
      title:
        "Reach Kasol - Visit Manikaran & Chalal Village - Overnight at Kasol",
      details: "",
    },
    {
      day: "Day 2",
      title:
        "Transfer to Manali - Visit Jogini Falls - Overnight stay at Manali",
      details: "",
    },
    {
      day: "Day 3",
      title: "Manali - Lahaul Valley via Atal Tunnel & Solang Valley",
      details: "",
    },
    {
      day: "Day 4",
      title: "Local Manali (DIY) - Departure to Delhi",
      details: "",
    },
    { day: "Day 5", title: "Reach Delhi in morning", details: "" },
  ];

  const otherInfo = [
    {
      title: "Must Carry",
      items: [
        "Authentic Government ID Card",
        "Comfortable warm clothing",
        "Sunscreen & lip balm",
        "Personal Medicines (if any)",
      ],
    },
    {
      title: "Travel Essentials",
      subSections: [
        {
          title: "Gears",
          items: [
            "A rucksack bag and a day pack",
            "3-litre water bottle / bladder",
          ],
        },
        {
          title: "Clothes",
          items: [
            "1 cotton long sleeve & 2 short sleeves t-shirts",
            "1 pair of gloves",
            "At least 2 trek/cargo pants",
          ],
        },
      ],
    },
    {
      title: "Safety Tips",
      items: [
        "Always stay hydrated",
        "Follow guide instructions",
        "Keep cash handy",
      ],
    },
  ];

  // States
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState(false);
  const [openDay, setOpenDay] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const overviewRef = useRef(null);
  const itineraryRef = useRef(null);
  const inclusionsRef = useRef(null);
  const exclusionsRef = useRef(null);
  const otherRef = useRef(null);
  // Refs
  const sectionRefs = {
    overview: overviewRef,
    itinerary: itineraryRef,
    inclusions: inclusionsRef,
    exclusions: exclusionsRef,
    other: otherRef,
  };

  const handleTabClick = (tab, ref) => {
    setActiveTab(tab);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleDay = (index) => {
    setOpenDay(openDay === index ? null : index);
  };

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    }, observerOptions);

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current) {
        ref.current.setAttribute("id", key); // har section ko id assign kar do
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <section className={styles.container}>
      {/* Left Side */}
      <div className={styles.left}>
        <h2 className={styles.title}>{tour.title}</h2>

        <div className={styles.info}>
          <div className={styles.card}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <span>Pickup & Drop</span>
              <p>{tour.pickup}</p>
            </div>
          </div>
          <div className={styles.card}>
            <FaClock className={styles.icon} />
            <div>
              <span>Duration</span>
              <p>{tour.duration}</p>
            </div>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            onClick={() => handleTabClick("overview", overviewRef)}
            className={activeTab === "overview" ? styles.activeTab : ""}
          >
            Overview
          </button>
          <button
            onClick={() => handleTabClick("itinerary", itineraryRef)}
            className={activeTab === "itinerary" ? styles.activeTab : ""}
          >
            Itinerary
          </button>
          <button
            onClick={() => handleTabClick("inclusions", inclusionsRef)}
            className={activeTab === "inclusions" ? styles.activeTab : ""}
          >
            Inclusions
          </button>
          <button
            onClick={() => handleTabClick("exclusions", exclusionsRef)}
            className={activeTab === "exclusions" ? styles.activeTab : ""}
          >
            Exclusions
          </button>
          <button
            onClick={() => handleTabClick("other", otherRef)}
            className={activeTab === "other" ? styles.activeTab : ""}
          >
            Other Info
          </button>
        </div>

        {/* Sections */}
        <div className={styles.tabContent}>
          {/* Overview */}
          <div ref={overviewRef} className={styles.section}>
            <h3>Overview & Highlights</h3>
            <p>
              {expanded ? tour.overview : `${tour.overview.slice(0, 220)}...`}
            </p>
            <button
              className={styles.readMore}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Itinerary */}
          <div
            ref={itineraryRef}
            className={`${styles.section}  ${styles.itinerarySection}`}
          >
            <h3>Itinerary</h3>
            {itinerary.map((item, index) => (
              <div
                key={index}
                className={`${styles.itineraryCard} ${
                  openDay === index ? styles.activeCard : ""
                }`}
              >
                <div className={styles.itineraryHeader}>
                  <button className={styles.dayBtn}>{item.day}</button>
                  <p>{item.title}</p>
                  <span
                    className={styles.iconBtn}
                    onClick={() => toggleDay(index)}
                  >
                    {openDay === index ? <FaMinus /> : <FaPlus />}
                  </span>
                </div>
                {openDay === index && (
                  <div className={styles.itineraryDetails}>
                    <p>
                      {item.details || "More info will be displayed here..."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Inclusions */}
          <div
            ref={inclusionsRef}
            className={`${styles.section} ${styles.inclusionBox}`}
          >
            <h3>Inclusions</h3>
            <ul>
              {tour.inclusions.map((item, idx) => (
                <li key={idx}>
                  <FaCheckCircle className={styles.checkIcon} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div
            ref={exclusionsRef}
            className={`${styles.section} ${styles.exclusionBox}`}
          >
            <h3>Exclusions</h3>
            <ul>
              {tour.exclusions.map((item, idx) => (
                <li key={idx}>
                  <FaTimesCircle className={styles.crossIcon} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Other Info */}
          <div
            ref={otherRef}
            className={`${styles.section} ${styles.otherBox}`}
          >
            <h3>Other Info</h3>

            {otherInfo.map((section, idx) => (
              <div key={idx} className={styles.infoBlock}>
                <h4>{section.title}</h4>

                {/* If subsection exists */}
                {section.subSections ? (
                  section.subSections.map((sub, sIdx) => (
                    <div key={sIdx} className={styles.subSection}>
                      <h5>{sub.title}</h5>
                      <ul>
                        {(expandedSections[sub.title]
                          ? sub.items
                          : sub.items.slice(0, 2)
                        ).map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      {sub.items.length > 2 && (
                        <button
                          className={styles.readMore}
                          onClick={() => toggleSection(sub.title)}
                        >
                          {expandedSections[sub.title]
                            ? "Read Less"
                            : "Read More"}
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className={styles.subSection}>
                    <ul>
                      {(expandedSections[section.title]
                        ? section.items
                        : section.items.slice(0, 3)
                      ).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                    {section.items.length > 3 && (
                      <button
                        className={styles.readMore}
                        onClick={() => toggleSection(section.title)}
                      >
                        {expandedSections[section.title]
                          ? "Read Less"
                          : "Read More"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <div className={styles.priceCard}>
          <p>
            Starting from <br />
            <span className={styles.price}>{tour.price}</span> per person
          </p>
          <button className={styles.ctaBtn}>Dates & Costing</button>
        </div>

        <form className={styles.form}>
          <h4>
            Wanderlust Calling? <br /> Allow Us to Call You Back!
          </h4>
          <div className={styles.inputGroup}>
            <i>
              <FaUser />
            </i>
            <input type="text" placeholder="Full Name *" required />
          </div>
          <div className={styles.inputGroup}>
            <i>
              <FaPhoneAlt />
            </i>
            <input type="tel" placeholder="Phone No. *" required />
          </div>
          <div className={styles.inputGroup}>
            <i>
              <FaEnvelope />
            </i>
            <input type="email" placeholder="Email ID *" required />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
