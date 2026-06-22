/**
 * App principal — landing del producto Mati por AtentIA.
 */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Product from './components/Product';
import HowItWorks from './components/HowItWorks';
import ContentLibrary from './components/ContentLibrary';
import ForParents from './components/ForParents';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Product />
        <HowItWorks />
        <ContentLibrary />
        <ForParents />
        <Testimonials />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
