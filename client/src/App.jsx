/**
 * App principal — landing del producto Mati por AtentIA.
 * Incluye ruta /device-preview para visualizar el modelo 3D.
 */
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Product from './components/Product';
import HowItWorks from './components/HowItWorks';
import ContentLibrary from './components/ContentLibrary';
import ForParents from './components/ForParents';
import Pricing from './components/Pricing';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';

const DevicePreviewPage = lazy(() => import('./pages/DevicePreviewPage'));

/** Contenido de la landing (sin cambios respecto a la versión anterior) */
function LandingPage() {
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
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-offwhite" />}>
        <Routes>
          <Route path="/device-preview" element={<DevicePreviewPage />} />
          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
