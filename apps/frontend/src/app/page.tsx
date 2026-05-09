import Link from "next/link";
import { Activity, ShieldCheck, Zap, BarChart3, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Activity size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">InspectorAI Pro</span>
          </div>
          <Link 
            href="/inspector" 
            className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            Launch Terminal <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Zap size={14} /> Next-Gen AI Inspection
            </div>
            <h1 className="text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
              Precision Defect Analysis at Scale.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Autonomous surface inspection powered by Vertex AI and Gemini 2.0. Identify anomalies, visualize metrics, and optimize quality control in real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/inspector" 
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all flex items-center gap-3 text-lg"
              >
                Start Free Inspection <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-3xl group-hover:bg-blue-600/30 transition-all" />
            <div className="relative rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/id/1050/1200/800" 
                alt="Industrial Steel Analysis" 
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-blue-400">Live Engine Analysis</span>
                  <span className="text-xs font-mono text-emerald-400">99.2% Accuracy</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold mb-6">Engineered for Industry 4.0</h2>
            <p className="text-gray-400 text-lg">
              Transform your manufacturing line with our proprietary Agentic AI tutor and real-time surface analysis suite.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="text-emerald-400" />,
                title: "Reliability Detection",
                desc: "Enterprise-grade CNN models trained on the NEU-CLS dataset for ultra-precise defect classification."
              },
              {
                icon: <BarChart3 className="text-blue-400" />,
                title: "Advanced Metrics",
                desc: "Live pixel intensity histograms and confidence trend analysis built directly into the inspection canvas."
              },
              {
                icon: <Activity className="text-purple-400" />,
                title: "Agentic Tutoring",
                desc: "An intelligent companion that guides beginners and experts through complex metallurgical findings."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block p-4 rounded-3xl bg-blue-600/10 border border-blue-600/20 mb-8 animate-bounce">
            <Activity className="text-blue-500 size-8" />
          </div>
          <h2 className="text-5xl font-bold mb-8">Ready to analyze your first slab?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Join the future of industrial quality control. Launch our Agentic Inspector and start identifying surface defects in seconds.
          </p>
          <Link 
            href="/inspector" 
            className="px-12 py-5 bg-white text-black font-extrabold text-xl rounded-full hover:bg-gray-200 transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            Launch InspectorAI Pro
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-500 text-sm">© 2026 InspectorAI Pro. Global Hackathon Project.</div>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link href="#" className="hover:text-white">Documentation</Link>
            <Link href="#" className="hover:text-white">API Reference</Link>
            <Link href="#" className="hover:text-white">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
