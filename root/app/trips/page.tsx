import HeroCarousel from "@/components/pages/Trips/Hero";
import SectionsContainer from "@/components/pages/Trips/SectionsContainer";

export default async function HomePage() {
  
  const slides = [
    {
      image: "/images/leh.jpg",
      title: "Europe Tour Packages",
      subtitle: "Europe: The Land Of Endless Discoveries - Upto 30% Off",
      price: "Rs. 1,44,990/-",
    },
    {
      image: "/images/europe.jpg",
      title: "Bali Tour Packages",
      subtitle: "Island of Gods - Special Discounts",
      price: "Rs. 89,990/-",
    },
  ];
  const aboutData = {
    heading: "About Europe Tour Packages",
    shortText:
      "How long have you been planning a Europe Trip, and struggling with choosing the right Europe Tour Packages...",
    fullText:
      "How long have you been planning a Europe Trip, and struggling with choosing the right Europe Tour Packages from India? If it’s been too long, then it’s time to stop worrying about the hassles in planning your perfect Europe travel package, because now you have WanderOn to the rescue, with luxury as well as budget-friendly options...",
  };

  const tripsData = {
    heading: "Best-Selling Community Trips",
    subheading:
      "Discover Europe with WanderOn: Epic Journeys, New Bonds, Unforgettable Memories!",
    trips: [
      {
        image: "/images/spain.jpg",
        title: "11 Days European Pathways - France, Netherlands",
        oldPrice: "₹2,19,990/-",
        newPrice: "₹1,69,990/-",
        tag: "Recommended",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "10N/11D | Paris Airport - Prague",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
    ],
  };

  const deals = {
    heading: "Exclusive Europe Summer Deals 2025",
    subheading:
      "Spend a perfect summer soaking in the scenic landscapes of Europe with our best deals on Europe Summer packages. Combined with best experiences, outdoor activities, city tours and adventures, these trips are perfect for a memorable summer vacation.",
    trips: [
      {
        image: "/images/spain.jpg",
        title: "11 Days European Pathways - France, Netherlands",
        oldPrice: "₹2,19,990/-",
        newPrice: "₹1,69,990/-",
        tag: "Recommended",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "10N/11D | Paris Airport - Prague",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
    ],
  };


  const trips={
    heading: "Europe with UK",
    subheading:
      "Explore Timeless Europe, Embrace Royal UK - One Epic Journey Awaits!",
    trips: [
      {
        image: "/images/spain.jpg",
        title: "11 Days European Pathways - France, Netherlands",
        oldPrice: "₹2,19,990/-",
        newPrice: "₹1,69,990/-",
        tag: "Recommended",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "10N/11D | Paris Airport - Prague",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      {
        image: "/images/shimla.jpg",
        title: "10 Days Finland & Sweden - Northern Lights",
        oldPrice: "₹2,24,990/-",
        newPrice: "₹1,89,990/-",
        tag: "Popular",
        duration: "4N/5D",
        date: "Sept 05 2025",
        location: "9N/10D | Helsinki - Stockholm",
      },
      
    ],
  }
  const packagesData = [
    {
      image: "/images/spain.jpg",
      title: "13 Days Splendid Europe Tour Package | Summer Special",
      oldPrice: "₹3,29,990/-",
      newPrice: "₹2,74,990/-",
      duration: "12N/13D",
      location: "Paris Airport - Rome Airport",
      date: "19 Sep, 27 Sep +6 batches",
      tags: ["Recommended", "Family Friendly"],
    },
    {
      image: "/images/spain.jpg",
      title: "13 Days Splendid Europe Tour Package | Summer Special",
      oldPrice: "₹3,29,990/-",
      newPrice: "₹2,74,990/-",
      duration: "12N/13D",
      location: "Paris Airport - Rome Airport",
      date: "19 Sep, 27 Sep +6 batches",
      tags: ["Recommended", "Family Friendly"],
    },
    {
      image: "/images/spain.jpg",
      title: "13 Days Splendid Europe Tour Package | Summer Special",
      oldPrice: "₹3,29,990/-",
      newPrice: "₹2,74,990/-",
      duration: "12N/13D",
      location: "Paris Airport - Rome Airport",
      date: "19 Sep, 27 Sep +6 batches",
      tags: ["Recommended", "Family Friendly"],
    },
    {
      image: "/images/spain.jpg",
      title: "13 Days Splendid Europe Tour Package | Summer Special",
      oldPrice: "₹3,29,990/-",
      newPrice: "₹2,74,990/-",
      duration: "12N/13D",
      location: "Paris Airport - Rome Airport",
      date: "19 Sep, 27 Sep +6 batches",
      tags: ["Recommended", "Family Friendly"],
    },
  
  
  ];
  const bannerData = {
    titleWhite: "Christmas",
    titleHighlight: "& NEW YEAR",
    titleScript: "special",
    destinations: [
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Bali", image: "/images/spain.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
      { name: "Vietnam", image: "/images/europe.jpg" },
    ],
    ctaText: "GET DISCOUNTS UP TO ₹10,000",
  }
  const activities = {
    heading: "Must-Try Activities In Europe",
    subheading:
      "From skiing in the Alps to hiking ancient trails, Europe offers diverse adventure activities in stunning settings. Explore thrilling experiences across the continent.",
    activities: [
      {
        image: "/images/hiking.jpg",
        country: "Switzerland",
        title: "Hiking",
        duration: "4 hours approx",
        description:
          "Hiking in Switzerland offers breathtaking alpine vistas. Explore pristine trails through lush valleys and towering peaks, a true outdoor paradise.",
      },
      {
        image: "/images/hiking.jpg",
        country: "Austria",
        title: "Snowboarding",
        duration: "2 hours approx",
        description:
          "Snowboarding in Austria offers world-class slopes and après-ski culture. Experience thrilling descents amidst the stunning Alpine scenery and vibrant resorts.",
      },
      {
        image: "/images/hiking.jpg",
        country: "France",
        title: "Mountain Biking",
        duration: "4 hours approx",
        description:
          "Mountain biking in France offers diverse trails through picturesque landscapes, from the Alps to Provence. Thrilling rides await amid stunning scenery.",
      },
    ],
  };
  const places = {
    heading: "Places to visit In Europe",
    subheading:
      "Discover Europe's diverse beauty and rich history. Explore our curated list of must-visit destinations, from historic cities to scenic landscapes, and plan your unforgettable European adventure.",
    activities: [
      {
        image: "/images/hiking.jpg",
        country: "Switzerland",
        title: "Hiking",
        duration: "4 hours approx",
        description:
          "Italy, in southern Europe, enchants with its art, history, cuisine, and picturesque landscapes. From Roman ruins to Renaissance masterpieces, Italy captivates visitors.",
      },
      {
        image: "/images/hiking.jpg",
        country: "Austria",
        title: "Snowboarding",
        duration: "2 hours approx",
        description:
          "France, a European gem, boasts iconic landmarks, world-class cuisine, and diverse landscapes. Rich culture and timeless charm await in every corner.",
      },
      {
        image: "/images/hiking.jpg",
        country: "France",
        title: "Mountain Biking",
        duration: "4 hours approx",
        description:
          "Prague, in Central Europe, is a fairy-tale city with its stunning architecture, historic charm, and a vibrant arts and culture scene.",
      },
      {
        image: "/images/hiking.jpg",
        country: "France",
        title: "Mountain Biking",
        duration: "4 hours approx",
        description:
          "Prague, in Central Europe, is a fairy-tale city with its stunning architecture, historic charm, and a vibrant arts and culture scene.",
      },
    ],
  };
  const faqData = [
    {
      question: "When is the best time to visit Europe?",
      answer:
        "The best time is usually spring (April to June) or fall (September to October) when the weather is pleasant and crowds are fewer.",
    },
    {
      question: "What should I carry on my Europe Tour?",
      answer:
        "Carry essentials like valid passport, travel insurance, comfortable shoes, weather-appropriate clothing, and local currency.",
    },
    {
      question: "What is the average price for a 7-day trip to Europe?",
      answer:
        "It can range from ₹1,00,000 to ₹2,00,000 depending on country, accommodation, travel style, and season.",
    },
    {
      question: "What is the best Europe itinerary for a first-time visitor?",
      answer:
        "Start with popular cities like Paris, Amsterdam, Rome, and Barcelona. 7–10 days is ideal for a sampler tour.",
    },
    {
      question: "Can I customize my Europe Travel Itinerary?",
      answer:
        "Absolutely! Many agencies and platforms allow you to tailor your itinerary based on interests, pace, and budget.",
    },
  ];
  const guidelines = {

  }
  
  return(
    <>
     <HeroCarousel slides={slides} />
     <SectionsContainer aboutData={aboutData} tripsData={tripsData} deals={deals} trips={trips} packagesData={packagesData} bannerData={bannerData} activities={activities} places={places} faqdata={faqData} guidelines={guidelines}/>
  </>
  )   
  
}
