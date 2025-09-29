import GallerySlider from '../home/sections/GallerySlider';
import Hero from './sections/Hero';
import TripDetails from './sections/TripDetails';

export default function HomePage() {
  const images = [
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
      <TripDetails/>
      <GallerySlider images = {images}/>
    </>
  );
}
