import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Courses from '@/components/Courses';
import Cases from '@/components/Cases';
import About from '@/components/About';
import Resources from '@/components/Resources';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Courses />
      <Cases />
      <About />
      <Resources />
      <Footer />
      <AIAssistant />
    </main>
  );
}
