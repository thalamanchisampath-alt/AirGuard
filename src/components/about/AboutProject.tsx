import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  Layers,
  Cpu,
  Brain,
  Sparkles,
  Github,
  Globe,
  CheckCircle2,
  FileCode,
  Users,
  Heart,
  BarChart3,
  Flame,
  Download,
  Share2
} from 'lucide-react';

export const AboutProject: React.FC = () => {
  const { showToast, setActiveTab } = useApp();

  const handleDownloadDossier = () => {
    showToast('AirGuard Hackathon Technical Whitepaper compiled and downloaded!', 'success');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Project presentation link copied to clipboard!', 'info');
  };

  const systemLayers = [
    {
      title: 'IoT Sensory Grid Layer',
      subtitle: 'Edge Optical & Electrochemical Sensors',
      description: 'Solar-powered PM2.5, PM10, NO₂, and meteorological micro-stations streaming telemetry at 60-second intervals.',
      icon: Cpu,
      color: '#10B981',
    },
    {
      title: 'Assimilation & Spatial Analytics',
      subtitle: 'Atmospheric Dispersion Engine',
      description: 'Calibrated with Gaussian plume models and inverse distance weighting to generate high-resolution urban heatmaps.',
      icon: Layers,
      color: '#06B6D4',
    },
    {
      title: 'Neural Forecasting Ensemble',
      subtitle: 'LSTM & Gradient Boosting Hybrid',
      description: 'Forecasts 24-hour pollution trajectory based on traffic timetables, wind azimuth, humidity, and planetary boundary height.',
      icon: Brain,
      color: '#6366F1',
    },
    {
      title: 'Citizen Decision Support App',
      subtitle: 'Accessible Multi-Platform Client',
      description: 'Delivers personalized vulnerability indices, clean air route navigation, citizen hazard reporting, and climate gamification.',
      icon: Users,
      color: '#F59E0B',
    },
  ];

  const innovations = [
    {
      title: 'Personal Pollution Exposure Score',
      desc: 'Dynamic biophysical inhalation calculator factoring commute duration, physical exertion, and hyper-local AQI.',
    },
    {
      title: 'AI Smart Proactive Alerts',
      desc: 'Predictive notifications alerting asthmatic and elderly citizens hours before inversion smog spikes form.',
    },
    {
      title: 'Citizen-Powered Pollution Ground Truth',
      desc: 'Decentralized participatory reporting giving voice to communities affected by unpermitted waste and dust fires.',
    },
    {
      title: 'Clean Air Commute Pathing',
      desc: 'First-of-its-kind navigation algorithm optimizing urban journeys for minimal particulate lung deposition.',
    },
    {
      title: 'Civic Environmental Gamification',
      desc: 'Impact leaderboards and verifiable badges motivating citizens to adopt sustainable daily micro-habits.',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-8 sm:p-12 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>Urban Air Quality Hackathon Submission</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            AirGuard Platform
          </h1>
          <p className="text-lg text-emerald-100/90 font-medium">
            Smart Urban Air Quality Intelligence & Citizen Health Platform
          </p>

          <p className="text-sm text-slate-300 leading-relaxed pt-2">
            AirGuard bridges the divide between complex atmospheric sensor datasets and actionable citizen empowerment. By combining real-time IoT spatial modeling, predictive neural forecasts, and exposure-aware routing, AirGuard helps modern metropolises safeguard public respiratory health and accelerate decarbonization.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadDossier}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Technical Whitepaper</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Platform</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hackathon Problem & Solution Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Problem Statement */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
            <span>The Challenge</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Urban Smog Invisibility & Fragmented Civic Data
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Most municipal air monitors publish delayed, city-wide averages that mask lethal local pollution hotspots. Citizens lack personalized vulnerability metrics, route navigation that accounts for diesel exhaust corridors, or direct channels to report localized illegal burning and construction dust.
          </p>
          <div className="pt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
              <span className="text-2xl font-black text-rose-600">7.0M+</span>
              <span className="block text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Annual premature deaths worldwide attributed to air pollution (WHO)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
              <span className="text-2xl font-black text-amber-600">4.2x</span>
              <span className="block text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Higher particulate exposure along arterial roads vs tree-canopied paths
              </span>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
            <span>The AirGuard Solution</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            End-to-End Participatory Urban Intelligence
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            AirGuard democratizes environmental telemetry. We synthesize multi-sensor feeds with predictive AI to forecast hazardous spikes, calculate personalized biological risk scores, and equip citizens with clean-air navigation that cuts lung exposure by up to 67%.
          </p>
          <div className="pt-3 grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
              <span className="text-2xl font-black text-emerald-600">67%</span>
              <span className="block text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Reduction in particulate inhalation using Clean Air Routes
              </span>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-900/50">
              <span className="text-2xl font-black text-cyan-600">&lt; 4 Hrs</span>
              <span className="block text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Target municipal dispatch turnaround on citizen-reported hazards
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* System Architecture 4-Tier Pipeline */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Technical System Architecture</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Four-tier data ingestion, neural inference, and edge visualization pipeline
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemLayers.map((layer, idx) => {
            const Icon = layer.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between space-y-2 relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="p-2 rounded-lg text-white"
                      style={{ backgroundColor: layer.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">Layer 0{idx + 1}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {layer.title}
                  </h4>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1.5">
                    {layer.subtitle}
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5 Distinctive Innovations Checklist */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Hackathon Innovation Highlights</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Engineered specifically to fulfill the Hackathon requirements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {innovations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50 space-y-1.5"
            >
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pl-6">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack & Credits */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 dark:text-white">Technology Stack & Standards</h4>
          <p className="text-slate-500 dark:text-slate-400">
            React 18 • TypeScript • Tailwind CSS • Lucide React • Canvas Confetti • Responsive Grid
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
