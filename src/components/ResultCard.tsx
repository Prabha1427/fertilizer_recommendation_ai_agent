import { Leaf, CheckCircle2, AlertTriangle, Gauge, Calendar, Hand, TrendingUp, Layers, Sprout, Mountain } from 'lucide-react';
import type { FertilizerResult, FertilizerInput } from '../lib/recommend';

interface Props {
  result: FertilizerResult;
  input: FertilizerInput;
}

const categoryStyles: Record<FertilizerResult['category'], string> = {
  'Balanced NPK': 'bg-brand-100 text-brand-700 border-brand-200',
  'Nitrogen-rich': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Phosphorus-rich': 'bg-amber-100 text-amber-700 border-amber-200',
  'Potassium-rich': 'bg-sky-100 text-sky-700 border-sky-200',
  'Organic': 'bg-earth-100 text-earth-700 border-earth-200',
  'Micronutrient': 'bg-violet-100 text-violet-700 border-violet-200',
};

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-brand-50/60 p-3.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-600 shadow-soft">
        {icon}
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-400">{label}</p>
        <p className="text-sm font-medium text-brand-800 leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function ResultCard({ result, input }: Props) {
  return (
    <div className="animate-fade-up overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card">
      {/* Header band */}
      <div className="relative bg-gradient-to-br from-brand-600 via-brand-500 to-brand-700 px-6 py-7 sm:px-8">
        <div className="grain absolute inset-0 opacity-20" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-100/80">Recommended Fertilizer</p>
              <h3 className="font-display text-2xl font-semibold text-white sm:text-3xl">{result.name}</h3>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${categoryStyles[result.category]}`}>
              {result.category}
            </span>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm ring-1 ring-white/20">
              <Gauge className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-bold text-white">{result.confidence}% confidence</span>
            </div>
          </div>
        </div>
        <div className="relative mt-5 flex flex-wrap gap-2">
          <span className="rounded-lg bg-white/15 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm ring-1 ring-white/20">
            NPK {result.npkRatio}
          </span>
          <span className="rounded-lg bg-white/15 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
            {input.cropType} · {input.soilType} soil
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        {/* Confidence bar */}
        <div className="mb-6">
          <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-brand-500">
            <span>Model confidence</span>
            <span>{result.confidence}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-700"
              style={{ width: `${result.confidence}%` }}
            />
          </div>
        </div>

        {/* Application details */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <InfoRow icon={<TrendingUp className="h-4 w-4" />} label="Application Rate" value={result.applicationRate} />
          <InfoRow icon={<Calendar className="h-4 w-4" />} label="Timing" value={result.timing} />
          <InfoRow icon={<Hand className="h-4 w-4" />} label="Method" value={result.method} />
          <InfoRow icon={<Layers className="h-4 w-4" />} label="Soil Fit" value={result.soilFit} />
        </div>

        {/* Benefits & Precautions */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-brand-700">
              <CheckCircle2 className="h-4 w-4 text-brand-500" />
              Key Benefits
            </h4>
            <ul className="space-y-2.5">
              {result.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-brand-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span className="leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-amber-700">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Precautions
            </h4>
            <ul className="space-y-2.5">
              {result.precautions.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-amber-800">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Crop fit */}
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-brand-50 to-brand-100/40 p-5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 shadow-soft">
            <Sprout className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">Crop Suitability</p>
            <p className="text-sm font-medium text-brand-800 leading-relaxed">{result.cropFit}</p>
          </div>
        </div>

        {/* Adjustments */}
        <div className="mt-5 rounded-2xl border border-brand-200 bg-white p-5">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-bold text-brand-700">
            <Mountain className="h-4 w-4 text-brand-500" />
            Smart Adjustments for Your Conditions
          </h4>
          <ul className="space-y-2.5">
            {result.adjustments.map((a, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-brand-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 text-[10px] font-bold">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-5 text-center text-xs text-brand-300">
          Recommendation generated from soil, crop, climate and NPK parameters. Always validate with a local soil test.
        </p>
      </div>
    </div>
  );
}
