"use client";
import React from "react";
import AboutSection from "./About";
import TripsSection from "./BestTrips";
import AllPackages from "./AllPackages";
import SpecialBanner from "./SpecialBanner";
import ActivitiesSection from "./Activities";
import PlacesSection from "./Places";
import FAQSection from "./FAQ";
import EuropeSection from "./Packages";
import EnquiryForm from "./EnquiryForm";
import BlogSection from "./BlogSection"
const SectionsContainer = ({ aboutData, tripsData, deals, trips, packagesData, bannerData, activities, places, faqdata, guidelines}) => {
  return (
  
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* About Section */}
      <AboutSection data={aboutData} />

      {/* Trips Section */}
      <TripsSection data={tripsData} />
      <TripsSection data={deals} />
      <TripsSection data={trips} />
      <AllPackages data={packagesData} />
      <SpecialBanner data={bannerData} />
      <ActivitiesSection data={activities} />
      <PlacesSection data={places} />
      <FAQSection data={faqdata} />
      <EnquiryForm data= {EnquiryForm}/>
     <BlogSection />
      <EuropeSection data={guidelines} />
    </div>
  );
};

export default SectionsContainer;
