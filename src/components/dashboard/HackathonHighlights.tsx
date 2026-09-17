import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Zap,
  Leaf,
  Sliders,
  Sparkles,
  TrendingDown,
  Info,
  Clock,
  Car,
  Bike,
  Footprints,
  Bus,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const HackathonHighlights: React.FC = () => {
  const {
    currentLocation,
    exposureInputs,
    setExposureInputs,
    dailyExposureScore,
    setActiveTab,
    showToast,
  } = useApp();

  // Environmental Impact Calculator state
  const [transitTrips, setTransitTrips] = useState(4);
  const [cyclingKm, setCyclingKm] = useState(15);
  const [idlingMinsSaved, setIdlingMinsSaved] = useState(20);

  // CO2 reduction calculations
  // Transit: 1 trip saves ~2.4 kg CO2 vs car
  // Cycling: 1 km saves ~0.19 kg CO2
  // Idling: 1 min saves ~0.035 kg CO2
  const transitCo2 = transitTrips * 2.4;
  const cyclingCo2 = cyclingKm * 0.19;
  const idlingCo2 = idlingMinsSaved * 0.035;
  const totalCo2SavedWeekly = (transitCo2 + cyclingCo2 + idlingCo2).toFixed(1);

  const getExposureLevel = (score: number) => {
    if (score <= 25) return { label: 'Minimal Exposure', color: '#10B981', desc: 'Safe for all activities' };
    if (score <= 50) return { label: 'Moderate Exposure', color: '#06B6D4', desc: 'Acceptable daily threshold' };
    if (score <= 75) return { label: 'Elevated Risk', color: '#F59E0B', desc: 'Consider reducing outdoor exercise' };
    return { label: 'High Exposure Risk', color: '#EF4444', desc: 'Protective mask & air filtration advised' };
  };

  const exposureMeta = getExposureLevel(dailyExposureScore);

  return (
    <div className="space-y-6">
      {/* 3 Bento Cards: Exposure Score, AI Smart Alerts, Impact Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Personal Pollution Exposure Score */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Personal Exposure Score
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Hackathon Feature #1
                  </span>
                </div>
              </div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  color: exposureMeta.color,
                  backgroundColor: `${exposureMeta.color}20`,
                }}
              >
                {exposureMeta.label}
              </span>
            </div>

            {/* Score Ring & Value */}
            <div className="my-4 flex items-center justify-center gap-5">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={exposureMeta.color}
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * dailyExposureScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                    {dailyExposureScore}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">/100</span>
                </div>
              </div>

              <div className="flex-1 text-xs space-y-1.5">
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  {exposureMeta.desc}
                </p>
                <p className="text-[11px] text-slate-400">
                  Calculated from <strong>{currentLocation.name}</strong> ({currentLocation.aqi} AQI), your commute mode, and outdoor duration.
                </p>
              </div>
            </div>

            {/* Interactive Sliders for Customization */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Hours Outdoors Today:</span>
                  <strong className="text-slate-800 dark:text-slate-200">
                    {exposureInputs.outdoorsHours} hrs
                  </strong>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={exposureInputs.outdoorsHours}
                  onChange={(e) =>
                    setExposureInputs((prev) => ({
                      ...prev,
                      outdoorsHours: parseFloat(e.target.value),
                    }))
                  }
                  className="w-full accent-emerald-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Commute Mode Select */}
              <div className="flex items-center justify-between gap-1 text-[11px]">
                {(
                  [
                    { mode: 'walking', icon: Footprints, label: 'Walk' },
                    { mode: 'cycling', icon: Bike, label: 'Cycle' },
                    { mode: 'public-transport', icon: Bus, label: 'Transit' },
                    { mode: 'car', icon: Car, label: 'Car' },
                  ] as const
                ).map(({ mode, icon: Icon, label }) => (
                  <button
                    key={mode}
                    onClick={() =>
                      setExposureInputs((prev) => ({
                        ...prev,
                        travelMode: mode,
                      }))
                    }
                    className={`flex-1 py-1.5 px-1 rounded-lg border text-center flex flex-col items-center gap-0.5 transition-all ${
                      exposureInputs.travelMode === mode
                        ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Mask toggle */}
              <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={exposureInputs.useMask}
                  onChange={(e) =>
                    setExposureInputs((prev) => ({
                      ...prev,
                      useMask: e.target.checked,
                    }))
                  }
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Wearing protective N95 / anti-pollution mask (-65% inhalation)</span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. AI Smart Alerts */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    AI Smart Alerts
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Hackathon Feature #2
                  </span>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-300 border border-cyan-300/30">
                Neural Guard
              </span>
            </div>

            <div className="space-y-3 my-3">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-900 dark:text-amber-300">
                      Pollution Spike Warning
                    </h5>
                    <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 mt-0.5 leading-relaxed">
                      Elevated NO₂ levels detected along the Central Commercial Expressway between 17:30 and 19:30.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                      Optimal Outdoor Window
                    </h5>
                    <p className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 mt-0.5 leading-relaxed">
                      Safe aerobic exercise window: <strong>05:30 – 07:30 AM tomorrow</strong> before solar heating triggers thermal ozone inversion.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Precipitation Air Wash
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                      Impending 12 mm shower forecast to reduce suspended PM10 by ~40% overnight.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('prediction')}
            className="w-full py-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 flex items-center justify-center gap-1 group"
          >
            <span>Explore Full 24-Hour AI Forecast</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3. Environmental Impact Calculator */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Environmental Impact Calculator
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Hackathon Feature #5
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                CO₂ Reduction
              </span>
            </div>

            {/* Total Saved Callout */}
            <div className="my-3 p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center shadow-md shadow-teal-700/10">
              <span className="text-xs font-medium text-emerald-100 block">
                Estimated Weekly Reduction
              </span>
              <div className="flex items-baseline justify-center gap-1 my-0.5">
                <span className="text-3xl font-black">{totalCo2SavedWeekly}</span>
                <span className="text-sm font-semibold">kg CO₂</span>
              </div>
              <span className="text-[10px] text-emerald-100/90 block">
                Equivalent to ~{Math.round(parseFloat(totalCo2SavedWeekly) * 0.45)} mature trees absorbing carbon for a month
              </span>
            </div>

            {/* Interactive Commute Sliders */}
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Weekly Transit Commutes:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{transitTrips} trips</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="14"
                  value={transitTrips}
                  onChange={(e) => setTransitTrips(parseInt(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-slate-200 dark:bg-slate-700 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Cycling / Walking Distance:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{cyclingKm} km/week</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={cyclingKm}
                  onChange={(e) => setCyclingKm(parseInt(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-slate-200 dark:bg-slate-700 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400 mb-0.5">
                  <span>Engine Idling Eliminated:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{idlingMinsSaved} mins</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={idlingMinsSaved}
                  onChange={(e) => setIdlingMinsSaved(parseInt(e.target.value))}
                  className="w-full accent-teal-600 h-1 bg-slate-200 dark:bg-slate-700 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
            <button
              onClick={() => {
                showToast(`Calculated: ${totalCo2SavedWeekly} kg CO2 reduction saved to session!`, 'success');
                setActiveTab('community');
              }}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Commit Actions in Community Hub</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
