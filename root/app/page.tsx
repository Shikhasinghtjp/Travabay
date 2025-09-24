import Hero from '../components/pages/Home/Hero';
import WhyBest from '../components/pages/Home/WhyBest';
import GallerySlider from '../components/pages/Home/GallerySlider';
import { GalleryImage } from "@/components/types/galleryslider";
import Contact from '@/components/pages/Contact/contact';
import CommunityTrips from '../components/pages/Home/Upcomingtrip';
import FeaturedPackages from '../components/pages/Home/FeaturedPackages';
import International from '../components/pages/Home/International';
import Romantic from '../components/pages/Home/Romantic';
import SliderBanner from '../components/pages/Home/SliderBanner';
import Stats from '../components/pages/Home/Stats';


export default function HomePage() {
  const images: GalleryImage[] = [
    { url: "/images/leh.jpg", title: "leh", location: "leh" },
    { url: "/images/shimla.jpg", title: "shimla", location: "shimla" },
    { url: "/images/spain.jpg", title: "spain", location: "spain" },
    { url: "/images/europe.jpg", title: "europe", location: "europe" },
    { url: "/images/leh.jpg", title: "leh", location: "leh" },
    { url: "/images/shimla.jpg", title: "shimla", location: "shimla" },
    { url: "/images/spain.jpg", title: "spain", location: "spain" },
    { url: "/images/europe.jpg", title: "europe", location: "europe" },
    { url: "/images/leh.jpg", title: "leh", location: "leh" },
    { url: "/images/shimla.jpg", title: "shimla", location: "shimla" },
    { url: "/images/spain.jpg", title: "spain", location: "spain" },
    { url: "/images/europe.jpg", title: "europe", location: "europe" },
  ];

  return (
    <>
      <Hero />
      <SliderBanner />
      <International /> 
      <CommunityTrips />
      <Romantic />
      <SliderBanner />
      <FeaturedPackages />
      <WhyBest />
      <GallerySlider images={images} />
      <Stats />
      <Contact />
    </>
  );
}
