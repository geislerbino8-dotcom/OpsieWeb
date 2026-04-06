import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components
import ProductItemCTA from '@/components/cards/ProductItemCTA';
import AnalyticsCards from '@/components/cards/AnalyticsCards';

// Assets
import heroImg from '../assets/samples/HRIS/image.png';
import ss1 from '../assets/samples/HRIS/ss1.png';
import ss2 from '../assets/samples/HRIS/ss2.png';
import ss3 from '../assets/samples/HRIS/ss3.png';
import ss4 from '../assets/samples/HRIS/ss4.png';

const sampleKeyFeatures = [
  { title: "Employee Onboarding", description: "Easily add new employees and manage their records in one place." },
  { title: "Attendance Tracking", description: "Monitor time-in, time-out, and leave requests in real-time." },
  { title: "Payroll Processing", description: "Automate salary computation, taxes, and payslips." },
  { title: "Performance Review", description: "Evaluate employee progress and set measurable goals." },
];

const sampleFeatureImg = [ss1, ss2, ss3, ss4];

const faqs = [
  { q: "How long does setup take?", a: "Most teams are up and running within 24 to 48 hours depending on data volume." },
  { q: "Is my data secure?", a: "We use enterprise-grade AES-256 encryption and follow strict SOC2 compliance protocols." },
  { q: "Can I export my reports?", a: "Yes, all analytics can be exported to PDF, CSV, or integrated directly with Excel." },
];

function ProductItemPage() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-gray-950 text-white overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-600/10 blur-[100px] rounded-full -z-10" />

      {/* --- HERO SECTION --- */}
      <section className="w-full min-h-screen flex items-center justify-center px-6 py-20 relative border-b border-white/5"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/PBG.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image with Floating Effect */}
          <div data-aos="zoom-in" className="flex justify-center relative">
             <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-75 animate-pulse" />
             <img
              src={heroImg}
              alt={id}
              className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl border border-white/10 hover:scale-[1.02] transition-transform duration-700"
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="inline-flex items-center self-center lg:self-start px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
              Product Overview
            </div>
            <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
              {id}
            </h1>
            <p data-aos="fade-up" data-aos-delay="100" className="text-gray-400 leading-relaxed text-xl max-w-xl mx-auto lg:mx-0">
              Transform your workflow with the next generation of management. Seamlessly integrated, hyper-efficient, and built for scale.
            </p>
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap justify-center lg:justify-start gap-4">
              <button 
                onClick={() => window.location.href = "mailto:support@example.com"}
                className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                Request Live Demo
              </button>
              <button className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="w-full max-w-6xl py-24 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnalyticsCards numbers="99" desc="Uptime Percentage" />
          <AnalyticsCards numbers="120" desc="Countries Supported" />
          <AnalyticsCards numbers="25" desc="Ms Average Latency" />
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE (Video & Gallery) --- */}
      <section className="w-full max-w-6xl px-6 space-y-24">
        <div data-aos="fade-up" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <iframe
            className="relative w-full h-[300px] md:h-[600px] rounded-3xl shadow-2xl border border-white/10 bg-black"
            src="https://www.youtube.com/embed/aAvDI1qae-U"
            title="Product Demo"
            allowFullScreen
          />
        </div>

        {/* Dynamic Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sampleFeatureImg.map((img, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="overflow-hidden rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors">
              <img 
                src={img} 
                alt={`Interface ${index}`} 
                className="w-full grayscale hover:grayscale-0 transition-all duration-500 cursor-zoom-in" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS (Stepper) --- */}
      <section className="w-full max-w-6xl py-32 px-6">
        <h2 className="text-4xl font-bold text-center mb-20">Seamless Implementation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Connect", desc: "Integrate your existing workspace data in seconds." },
            { step: "02", title: "Automate", desc: "Set up smart rules and AI-driven workflows." },
            { step: "03", title: "Optimize", desc: "Monitor real-time health scores and scale." }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black mb-8 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-500 transform group-hover:rotate-12">
                {item.step}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="w-full max-w-6xl py-20 px-6 bg-white/5 rounded-[4rem] border border-white/10 mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 italic">🚀 Enterprise Features</h2>
          <div className="h-1 w-24 bg-cyan-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 px-4 md:px-10">
          {sampleKeyFeatures.map((item, index) => (
            <div key={index} className="flex gap-6 items-start p-4 hover:bg-white/5 rounded-2xl transition-colors">
              <span className="text-2xl text-cyan-500 mt-1">✦</span>
              <div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="w-full max-w-4xl py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 uppercase tracking-tighter">Common Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer">
              <summary className="list-none flex justify-between items-center font-bold text-lg">
                {faq.q}
                <span className="group-open:rotate-180 transition-transform text-cyan-400 text-sm">▼</span>
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <ProductItemCTA />
      
      {/* Footer Buffer */}
      <div className="h-20" />
    </div>
  );
}

export default ProductItemPage;