import React from 'react';
import { Wind, ShieldCheck, Activity, Globe, Cpu } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand and Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Wind className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                AirGuard
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300/40 dark:border-emerald-700/40">
                Urban Air Quality Hackathon
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Cleaner Air. Smarter Cities. Healthier Lives. An intelligent platform synthesizing real-time IoT sensory data, AI predictive forecasting, dynamic route exposure mitigation, and citizen action to improve urban atmospheric quality.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Sensor Mesh: 99.4% Operational
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                AI Inference Engine v3.2
              </span>
            </div>
          </div>

          {/* Core Modules Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Intelligence Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => { setActiveTab('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Dashboard Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('map'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Live City AQI Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('prediction'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  AI Pollution Prediction
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('health'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Personal Health Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('routes'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Clean Air Route Planner
                </button>
              </li>
            </ul>
          </div>

          {/* Citizen & Project */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3">
              Citizen & Impact
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => { setActiveTab('report'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Report Pollution Hazard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('community'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Community Actions & Badges
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('sources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Urban Pollution Sources
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  About the Project & Tech Stack
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>© 2026 AirGuard. College Urban Environmental Tech Hackathon Project.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Open Public Data
            </span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-500" />
              WHO Air Standards Grounded
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
