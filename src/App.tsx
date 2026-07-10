import { useState, useRef } from 'react';
import { Leaf, Brain, Sun, Wind, Tractor, ArrowDown, ScanLine, BarChart3, ShieldCheck } from 'lucide-react';
import FertilizerForm from './components/FertilizerForm';
import ResultCard from './components/ResultCard';
import { recommendFertilizer, type FertilizerInput, type FertilizerResult } from './lib/recommend';

export default function App() {
  const [result, setResult] = useState<FertilizerResult | null>(null);
  const [input, setInput] = useState<FertilizerInput | null>(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handlePredict = (data: FertilizerInput) => {
    setLoading(true);
    setResult(null);
    // Simulate analysis for a premium feel
    setTimeout(() => {
      const rec = recommendFertilizer(data);
      setResult(rec);
      setInput(data);
      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 via-white to-brand-50/40">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-200/30 blur-3xl" />
        <div className="animate-blob absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-200/25 blur-3xl" style={{ animationDelay: '4s' }} />
        <div className="animate-blob absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lime-200/20 blur-3xl" style={{ animationDelay: '8s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-brand-100/60 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-glow">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold leading-none text-brand-800">FertiSense<span className="text-brand-500"> AI</span></p>
              <p className="text-[11px] font-medium text-brand-400">Smart Fertilizer Advisory</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-600 sm:flex">
            <ShieldCheck className="h-3.5 w-3.5" />
            Soil-Tested Recommendations
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
              <Brain className="h-3.5 w-3.5" />
              AI-Powered Agriculture
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] text-brand-900 sm:text-5xl lg:text-6xl">
              AI Fertilizer <br />
              <span className="bg-gradient-to-r from-brand-500 to-emerald-600 bg-clip-text text-transparent">Recommendation</span> System
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-brand-700/80 sm:text-lg">
              Enter your soil, crop and climate parameters. Our intelligent engine analyzes NPK levels, soil texture and environmental conditions to recommend the optimal fertilizer for maximum yield.
            </p>
            <div className="mt-7 flex flex-wrap gap-5">
              <Stat icon={<ScanLine className="h-4 w-4" />} value="10+" label="Fertilizer types" />
              <Stat icon={<BarChart3 className="h-4 w-4" />} value="11" label="Crop varieties" />
              <Stat icon={<Tractor className="h-4 w-4" />} value="5" label="Soil profiles" />
            </div>
            <a
              href="#form"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-glow transition-all hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/30"
            >
              Start Analysis
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>

          {/* Illustration card */}
          <div className="animate-fade-up relative hidden lg:block" style={{ animationDelay: '0.15s' }}>
            <div className="relative overflow-hidden rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-500 to-brand-700 p-8 shadow-card">
              <div className="grain absolute inset-0 opacity-10" />
              <div className="relative space-y-4">
                <FeatureRow icon={<Sun className="h-5 w-5" />} title="Climate-Aware" desc="Temperature & humidity tuned dosing" />
                <FeatureRow icon={<Wind className="h-5 w-5" />} title="Moisture Optimized" desc="Adjusts for leaching & water stress" />
                <FeatureRow icon={<Leaf className="h-5 w-5" />} title="Crop-Specific" desc="Tailored to 11 major crop types" />
                <FeatureRow icon={<Brain className="h-5 w-5" />} title="NPK Balanced" desc="Detects deficiencies & excesses" />
              </div>
              <div className="relative mt-6 rounded-2xl bg-white/15 p-4 backdrop-blur-sm ring-1 ring-white/20">
                <p className="text-xs font-medium text-brand-50">
                  "Soil health is the foundation of food security. Every recommendation is backed by agronomic science."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Result */}
      <section id="form" className="relative z-10 mx-auto max-w-6xl scroll-mt-20 px-5 pb-16 sm:px-8">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-semibold text-brand-900 sm:text-3xl">Enter Your Field Parameters</h2>
          <p className="mt-2 text-sm text-brand-600/80">Fill in the readings from your soil test and local weather data.</p>
        </div>

        <div className="mx-auto max-w-3xl">
          <FertilizerForm onPredict={handlePredict} loading={loading} />
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="mx-auto mt-8 max-w-3xl">
            <div className="overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
              <div className="h-32 bg-gradient-to-r from-brand-200 to-brand-100">
                <div className="shimmer h-full w-full" />
              </div>
              <div className="space-y-4 p-8">
                <div className="h-6 w-2/3 rounded-lg bg-brand-100" />
                <div className="h-4 w-1/2 rounded-lg bg-brand-100" />
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="h-20 rounded-xl bg-brand-50" />
                  <div className="h-20 rounded-xl bg-brand-50" />
                  <div className="h-20 rounded-xl bg-brand-50" />
                  <div className="h-20 rounded-xl bg-brand-50" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && input && !loading && (
          <div ref={resultRef} className="mx-auto mt-8 max-w-3xl scroll-mt-20">
            <ResultCard result={result} input={input} />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-brand-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:flex-row sm:px-8 sm:text-left">
          <div className="flex items-center gap-2 text-sm font-medium text-brand-700">
            <Leaf className="h-4 w-4 text-brand-500" />
            FertiSense AI — Smart Fertilizer Advisory
          </div>
          <p className="text-xs text-brand-400">
            Recommendations are advisory. Always confirm with a certified agronomist.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-brand-600">{icon}</span>
      <div>
        <p className="font-display text-xl font-semibold leading-none text-brand-800">{value}</p>
        <p className="text-xs text-brand-500">{label}</p>
      </div>
    </div>
  );
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/15 transition-all hover:bg-white/15">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">{icon}</span>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-sm text-brand-50/80">{desc}</p>
      </div>
    </div>
  );
}
