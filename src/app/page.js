import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import ProgressBar from '@/components/ProgressBar';
import { ToastProvider } from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Work from '@/components/Work';
import Services from '@/components/Services';
import Testimonial from '@/components/Testimonial';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <ToastProvider>
      <div className="noise"></div>
      <ProgressBar />
      <CustomCursor />
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Services />
        <Testimonial />
      </main>
      <Footer />
    </ToastProvider>
  );
}
