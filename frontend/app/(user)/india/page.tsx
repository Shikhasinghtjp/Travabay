import HeroCarousel from "@/components/pages/Trips/Hero";
import SectionsContainer from "@/components/pages/Trips/SectionsContainer";


export default async function IndiaTripsPage() {
  const slides = [
    {
      image: "/images/leh.jpg",
      title: "Leh Ladakh Tour Packages",
      subtitle: "Adventure in the Himalayas - Upto 25% Off",
      price: "Rs. 24,990/-",
    },
    {
      image: "/images/goa.jpg",
      title: "Goa Tour Packages",
      subtitle: "Beaches, Parties & Fun - Special Discounts",
      price: "Rs. 9,990/-",
    },
  ];

  const aboutData = {
    heading: "About India Tour Packages",
    shortText:
      "Planning a trip across India? From the Himalayas to the beaches of Goa, our India tour packages cover it all.",
    fullText:
      "India is a land of incredible diversity – culture, landscapes, and experiences. Whether you are looking for spiritual journeys, mountain adventures, royal palaces, or relaxing beaches, our India trips are designed to give you the best memories.",
  };

  const tripsData = {
    heading: "Best-Selling Indian Trips",
    subheading: "Discover India with WanderOn: Heritage, Adventure, and Memories!",
    trips: [
      {
        image: "/images/rajasthan.jpg",
        title: "Royal Rajasthan Tour",
        oldPrice: "₹34,990/-",
        newPrice: "₹29,990/-",
        tag: "Recommended",
        duration: "6N/7D",
        date: "Oct 15 2025",
        location: "Jaipur - Jodhpur - Udaipur",
      },
      {
        image: "/images/himachal.jpg",
        title: "Himachal Adventure",
        oldPrice: "₹24,990/-",
        newPrice: "₹19,990/-",
        tag: "Popular",
        duration: "5N/6D",
        date: "Nov 01 2025",
        location: "Shimla - Manali - Kasol",
      },
      {
        image: "/images/himachal.jpg",
        title: "Himachal Adventure",
        oldPrice: "₹24,990/-",
        newPrice: "₹19,990/-",
        tag: "Popular",
        duration: "5N/6D",
        date: "Nov 01 2025",
        location: "Shimla - Manali - Kasol",
      },
      {
        image: "/images/rajasthan.jpg",
        title: "Royal Rajasthan Tour",
        oldPrice: "₹34,990/-",
        newPrice: "₹29,990/-",
        tag: "Recommended",
        duration: "6N/7D",
        date: "Oct 15 2025",
        location: "Jaipur - Jodhpur - Udaipur",
      },
       {
        image: "/images/himachal.jpg",
        title: "Himachal Adventure",
        oldPrice: "₹24,990/-",
        newPrice: "₹19,990/-",
        tag: "Popular",
        duration: "5N/6D",
        date: "Nov 01 2025",
        location: "Shimla - Manali - Kasol",
      },
    ],
  };

  const deals = {
    heading: "Exclusive India Travel Deals 2025",
    subheading:
      "Enjoy special discounts on handpicked Indian destinations including mountains, beaches, and cultural cities.",
    trips: [
      {
        image: "/images/kerala.jpg",
        title: "Kerala Backwaters Special",
        oldPrice: "₹19,990/-",
        newPrice: "₹14,990/-",
        tag: "Recommended",
        duration: "4N/5D",
        date: "Dec 2025",
        location: "Cochin - Alleppey - Munnar",
      },
      {
    image: "/images/goa.jpg",
    title: "Goa Beach Vibes",
    oldPrice: "₹24,990/-",
    newPrice: "₹18,490/-",
    tag: "Popular",
    duration: "5N/6D",
    date: "Nov 2025",
    location: "North Goa - South Goa",
  },
  {
    image: "/images/rajasthan.jpg",
    title: "Royal Rajasthan Tour",
    oldPrice: "₹34,990/-",
    newPrice: "₹27,990/-",
    tag: "Family Friendly",
    duration: "6N/7D",
    date: "Jan 2026",
    location: "Jaipur - Jodhpur - Udaipur",
  },
  {
    image: "/images/himachal.jpg",
    title: "Himachal Adventure Trip",
    oldPrice: "₹29,990/-",
    newPrice: "₹22,990/-",
    tag: "Adventure",
    duration: "7N/8D",
    date: "Feb 2026",
    location: "Shimla - Manali - Kasol",
  },
  {
    image: "/images/varanasi.jpg",
    title: "Spiritual Varanasi Experience",
    oldPrice: "₹15,990/-",
    newPrice: "₹11,990/-",
    tag: "Spiritual",
    duration: "3N/4D",
    date: "Oct 2025",
    location: "Varanasi - Sarnath",
  },
    ],
  };

  const trips = {
    heading: "Adventure Trips in India",
    subheading: "Explore mountains, deserts, and beaches in one country!",
    trips: [
      {
        image: "/images/ladakh.jpg",
        title: "Leh Ladakh Bike Trip",
        oldPrice: "₹39,990/-",
        newPrice: "₹34,990/-",
        tag: "Adventure",
        duration: "8N/9D",
        date: "Sept 20 2025",
        location: "Manali - Leh - Nubra - Pangong",
      },
      {
    image: "/images/spiti.jpg",
    title: "Spiti Valley Expedition",
    oldPrice: "₹36,990/-",
    newPrice: "₹29,990/-",
    tag: "Recommended",
    duration: "9N/10D",
    date: "July 2025",
    location: "Manali - Kaza - Chandratal",
  },
  {
    image: "/images/himachal.jpg",
    title: "Kashmir Paradise Tour",
    oldPrice: "₹27,990/-",
    newPrice: "₹21,990/-",
    tag: "Family Friendly",
    duration: "6N/7D",
    date: "Dec 2025",
    location: "Srinagar - Gulmarg - Pahalgam",
  },
 
  {
    image: "/images/uttarakhand.jpg",
    title: "Valley of Flowers Trek",
    oldPrice: "₹18,990/-",
    newPrice: "₹14,490/-",
    tag: "Trekking",
    duration: "5N/6D",
    date: "Aug 2025",
    location: "Joshimath - Ghangaria - Valley of Flowers",
  },
  {
    image:"/images/goa.jpg",
    title: "Andaman Island Getaway",
    oldPrice: "₹41,990/-",
    newPrice: "₹34,490/-",
    tag: "Beach",
    duration: "6N/7D",
    date: "Nov 2025",
    location: "Port Blair - Havelock - Neil Island",
  },
    ],
  };

  const packagesData = [
    {
      image: "/images/varanasi.jpg",
      title: "Varanasi Spiritual Journey",
      oldPrice: "₹14,990/-",
      newPrice: "₹9,990/-",
      duration: "3N/4D",
      location: "Varanasi - Sarnath",
      date: "Every Weekend",
      tags: ["Spiritual", "Budget Friendly"],
    },
    {
    image: "/images/uttarakhand.jpg",
    title: "Valley of Flowers Trek",
    oldPrice: "₹18,990/-",
    newPrice: "₹14,490/-",
    tag: "Trekking",
    duration: "5N/6D",
    date: "Aug 2025",
    location: "Joshimath - Ghangaria - Valley of Flowers",
  },
   {
    image: "/images/rajasthan.jpg",
    title: "Royal Rajasthan Tour",
    oldPrice: "₹34,990/-",
    newPrice: "₹27,990/-",
    tag: "Family Friendly",
    duration: "6N/7D",
    date: "Jan 2026",
    location: "Jaipur - Jodhpur - Udaipur",
  },
  ];

  const bannerData = {
    titleWhite: "Festivals",
    titleHighlight: " of India",
    titleScript: "special",
    destinations: [
      { name: "Diwali in Varanasi", image: "/images/varanasi.jpg" },
      { name: "Holi in Mathura", image: "/images/holi.jpg" },
      { name: "Camel Fair", image: "/images/pushkar.jpg" },
      { name: "Durga Puja in Kolkata", image: "/images/kolkata.jpg" },
      { name: "Onam in Kerala", image: "/images/kerala.jpg" },
     { name: "Camel Fair", image: "/images/pushkar.jpg" },
      { name: "Durga Puja in Kolkata", image: "/images/kolkata.jpg" },
     { name: "Diwali in Varanasi", image: "/images/varanasi.jpg" },
      { name: "Ladakh Hemis Festival", image: "/images/ladakh.jpg" },
      { name: "Diwali in Varanasi", image: "/images/varanasi.jpg" },
      { name: "Holi in Mathura", image: "/images/holi.jpg" },
      { name: "Camel Fair", image: "/images/pushkar.jpg" },
      { name: "Durga Puja in Kolkata", image: "/images/kolkata.jpg" },
      { name: "Onam in Kerala", image: "/images/kerala.jpg" },
     { name: "Camel Fair", image: "/images/pushkar.jpg" },
      { name: "Durga Puja in Kolkata", image: "/images/kolkata.jpg" },
     { name: "Diwali in Varanasi", image: "/images/varanasi.jpg" },
      { name: "Ladakh Hemis Festival", image: "/images/ladakh.jpg" },
    ],
    ctaText: "GET DISCOUNTS UP TO ₹5,000",
  };

  const activities = {
    heading: "Must-Try Activities in India",
    subheading:
      "From trekking in the Himalayas to houseboats in Kerala, India offers endless unique adventures.",
    activities: [
      {
        image: "/images/hiking.jpg",
        country: "India",
        title: "Himalayan Trekking",
        duration: "7 days approx",
        description:
          "Trek through the Himalayas for stunning views, cultural experiences, and unmatched adventure.",
      },
      {
        image: "/images/hiking.jpg",
        country: "India",
        title: "Himalayan Trekking",
        duration: "7 days approx",
        description:
          "Trek through the Himalayas for stunning views, cultural experiences, and unmatched adventure.",
      },
    ],
  };

  const places = {
    heading: "Places to Visit in India",
    subheading:
      "India is a mosaic of cultures and landscapes. Explore our handpicked must-visit places.",
    activities: [
      {
        image: "/images/agra.jpg",
        country: "India",
        title: "Agra",
        duration: "2N/3D",
        description:
          "Home of the Taj Mahal, Agra is a city of history, romance, and Mughal architecture.",
      },
    ],
  };

  const faqData = [
    {
      question: "When is the best time to visit India?",
      answer:
        "The best time is between October and March when the weather is pleasant across most parts of India.",
    },
    {
      question: "What are must-visit destinations in India?",
      answer:
        "Agra (Taj Mahal), Rajasthan, Kerala backwaters, Himachal, Leh Ladakh, Goa, and Varanasi.",
    },
  ];

  const guidelines = {};

  return (
    <>
      <HeroCarousel slides={slides} />
      <SectionsContainer
        aboutData={aboutData}
        tripsData={tripsData}
        deals={deals}
        trips={trips}
        packagesData={packagesData}
        bannerData={bannerData}
        activities={activities}
        places={places}
        faqdata={faqData}
        guidelines={guidelines}
      />
    </>
  );
}
