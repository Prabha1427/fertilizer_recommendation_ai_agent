import { useState } from 'react';
import { Thermometer, Droplets, Waves, Mountain, Sprout, FlaskConical, Beaker, Atom, Sparkles, Loader2 } from 'lucide-react';
import { soilTypes, cropTypes, type FertilizerInput, type SoilType, type CropType } from '../lib/recommend';

interface Props {
  onPredict: (input: FertilizerInput) => void;
  loading: boolean;
}

const initial: FertilizerInput = {
  temperature: 28,
  humidity: 65,
  moisture: 45,
  soilType: 'Loamy',
  cropType: 'Wheat',
  nitrogen: 50,
  potassium: 45,
  phosphorous: 48,
};

interface NumberFieldProps {
  label: string;
  icon: React.ReactNode;
  unit: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  hint: string;
}

function NumberField({ label, icon, unit, value, onChange, min, max, hint }: NumberFieldProps) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-sm font-semibold text-brand-800 mb-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600 group-focus-within:bg-brand-500 group-focus-within:text-white transition-colors">
          {icon}
        </span>
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
          className="w-full rounded-xl border border-brand-200 bg-white/70 px-4 py-3 pr-14 text-brand-900 font-medium shadow-soft transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-400">
          {unit}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-brand-400">{hint}</p>
    </div>
  );
}

export default function FertilizerForm({ onPredict, loading }: Props) {
  const [form, setForm] = useState<FertilizerInput>(initial);

  const set = <K extends keyof FertilizerInput>(key: K, value: FertilizerInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(form);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-brand-100 bg-white/80 p-6 sm:p-8 shadow-card backdrop-blur-sm">
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
        <NumberField
          label="Temperature"
          icon={<Thermometer className="h-4 w-4" />}
          unit="°C"
          value={form.temperature}
          onChange={(v) => set('temperature', v)}
          min={-10}
          max={60}
          hint="Soil & air temperature"
        />
        <NumberField
          label="Humidity"
          icon={<Droplets className="h-4 w-4" />}
          unit="%"
          value={form.humidity}
          onChange={(v) => set('humidity', v)}
          min={0}
          max={100}
          hint="Relative humidity"
        />
        <NumberField
          label="Moisture"
          icon={<Waves className="h-4 w-4" />}
          unit="%"
          value={form.moisture}
          onChange={(v) => set('moisture', v)}
          min={0}
          max={100}
          hint="Soil moisture content"
        />

        {/* Soil Type */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-brand-800 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600 group-focus-within:bg-brand-500 group-focus-within:text-white transition-colors">
              <Mountain className="h-4 w-4" />
            </span>
            Soil Type
          </label>
          <select
            value={form.soilType}
            onChange={(e) => set('soilType', e.target.value as SoilType)}
            className="w-full rounded-xl border border-brand-200 bg-white/70 px-4 py-3 pr-10 text-brand-900 font-medium shadow-soft transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none"
          >
            {soilTypes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-brand-400">Texture of your soil</p>
        </div>

        {/* Crop Type */}
        <div className="group">
          <label className="flex items-center gap-2 text-sm font-semibold text-brand-800 mb-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-100 text-brand-600 group-focus-within:bg-brand-500 group-focus-within:text-white transition-colors">
              <Sprout className="h-4 w-4" />
            </span>
            Crop Type
          </label>
          <select
            value={form.cropType}
            onChange={(e) => set('cropType', e.target.value as CropType)}
            className="w-full rounded-xl border border-brand-200 bg-white/70 px-4 py-3 pr-10 text-brand-900 font-medium shadow-soft transition-all focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100 focus:outline-none"
          >
            {cropTypes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-brand-400">Target crop</p>
        </div>

        <NumberField
          label="Nitrogen"
          icon={<Atom className="h-4 w-4" />}
          unit="N"
          value={form.nitrogen}
          onChange={(v) => set('nitrogen', v)}
          min={0}
          max={140}
          hint="Available nitrogen"
        />
        <NumberField
          label="Phosphorous"
          icon={<FlaskConical className="h-4 w-4" />}
          unit="P"
          value={form.phosphorous}
          onChange={(v) => set('phosphorous', v)}
          min={0}
          max={145}
          hint="Available phosphorus"
        />
        <NumberField
          label="Potassium"
          icon={<Beaker className="h-4 w-4" />}
          unit="K"
          value={form.potassium}
          onChange={(v) => set('potassium', v)}
          min={0}
          max={205}
          hint="Available potassium"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-600 bg-[length:200%_100%] px-8 py-4 text-base font-bold text-white shadow-glow transition-all hover:bg-[position:100%_0] hover:shadow-lg hover:shadow-brand-500/30 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.99]"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing soil data...
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5 transition-transform group-hover:scale-110" />
            Predict Fertilizer
          </>
        )}
      </button>
    </form>
  );
}
