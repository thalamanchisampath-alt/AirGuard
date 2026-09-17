import React from 'react';
import { useApp } from '../../context/AppContext';
import { AQIGauge } from '../common/AQIGauge';
import { AQISummaryCards } from './AQISummaryCards';
import { HourlyChart } from './HourlyChart';
import { QuickActions } from './QuickActions';
import { HackathonHighlights } from './HackathonHighlights';
import {
  Compass,
  HeartPulse,
  Sparkles,
  MapPin,
  RefreshCw,
  TrendingDown,
  Shield,
  Activity,
  Layers
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { currentLocation, setActiveTab, showToast } = useApp();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 p-6 sm:p-10 shadow-sm">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-60 h-60 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-4 border border-emerald-300/40 dark:border-emerald-700/40">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Autonomous Smart City Sensing Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Cleaner Air. Smarter Cities.{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
              Healthier Lives.
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Real-time urban air quality intelligence powered by data and AI. Monitor hyper-local pollution, predict atmospheric spikes, and plan clean-air transit paths across your city.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              id="hero-explore-btn"
              onClick={() => {
                setActiveTab('map');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Air Quality Map</span>
            </button>

            <button
              id="hero-health-btn"
              onClick={() => {
                setActiveTab('health');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 text-sm font-bold shadow-sm flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Check My Health Risk</span>
            </button>

            <button
              onClick={() => {
                showToast(`Refreshed sensor telemetry for ${currentLocation.name}!`, 'info');
              }}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-colors"
              title="Refresh Live Sensor Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main AQI Status Grid: Large Circular Gauge + Pollutant Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-4 flex flex-col">
          <AQIGauge
            aqi={currentLocation.aqi}
            category={currentLocation.category}
            locationName={currentLocation.name}
            dominantPollutant={currentLocation.dominantPollutant}
          />
        </div>

        <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Atmospheric Pollutant Spectrum
                </h3>
                {currentLocation.cpcbStationCode && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-700">
                    CPCB: {currentLocation.cpcbStationCode}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentLocation.name}, {currentLocation.city}, {currentLocation.state} ({currentLocation.region || 'India'}) • Updated {currentLocation.lastUpdated}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono">
                Temp: {currentLocation.temp}°C
              </span>
              <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 font-mono">
                Wind: {currentLocation.windSpeed} km/h
              </span>
            </div>
          </div>

          <AQISummaryCards location={currentLocation} />

          {/* Quick Action Navigation Buttons */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Instant Intelligence Actions
            </h4>
            <QuickActions />
          </div>
        </div>
      </div>

      {/* 24-Hour Line Chart */}
      <HourlyChart />

      {/* Hackathon Distinctive Innovations: Exposure Calculator, Smart Alerts, CO2 Engine */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              AirGuard Innovation Engine
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive urban environmental modules engineered for hackathon presentation
            </p>
          </div>
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300/30">
            Hackathon Suite
          </span>
        </div>
        <HackathonHighlights />
      </div>
    </div>
  );
};
