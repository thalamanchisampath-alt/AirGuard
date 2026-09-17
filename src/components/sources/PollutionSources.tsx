import React, { useState } from 'react';
import { POLLUTION_SOURCES } from '../../data/mockData';
import {
  Factory,
  Car,
  HardHat,
  Flame,
  PieChart,
  ShieldCheck,
  TrendingDown,
  AlertTriangle,
  FileCheck2,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export const PollutionSources: React.FC = () => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(POLLUTION_SOURCES[0].id);

  const selectedSource = POLLUTION_SOURCES.find((s) => s.id === selectedSourceId) || POLLUTION_SOURCES[0];

  const getSourceIcon = (name: string) => {
    if (name.includes('Vehicular') || name.includes('Traffic')) return <Car className="w-5 h-5 text-blue-500" />;
    if (name.includes('Industrial')) return <Factory className="w-5 h-5 text-rose-500" />;
    if (name.includes('Construction')) return <HardHat className="w-5 h-5 text-amber-500" />;
    return <Flame className="w-5 h-5 text-purple-500" />;
  };

  // Mitigation interventions dataset
  const municipalInterventions = [
    {
      title: 'Ultra-Low Emission Zone (ULEZ)',
      target: 'Vehicular Emissions',
      status: 'Active Enforced',
      reduction: '28% NO₂ reduction in core radius',
      icon: Car,
      color: '#3B82F6',
    },
    {
      title: 'Continuous Industrial Emission Monitors (CEMS)',
      target: 'Heavy Manufacturing',
      status: 'Mandatory 24/7 Telemetry',
      reduction: '19% SO₂ curtailment achieved',
      icon: Factory,
      color: '#EF4444',
    },
    {
      title: 'Autonomous Dust Suppression Mist Cannons',
      target: 'Construction Corridors',
      status: 'Pilot Deployed (18 Zones)',
      reduction: '34% localized PM10 capture',
      icon: HardHat,
      color: '#F59E0B',
    },
    {
      title: 'Thermal Drone Anti-Waste Burning Patrols',
      target: 'Open Incineration',
      status: 'Nightly Aerial Monitoring',
      reduction: '42% decrease in black carbon hotspots',
      icon: Flame,
      color: '#8B5CF6',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Factory className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Urban Pollution Source Apportionment
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Atmospheric chemical profiling, emission inventories, and smart city mitigation enforcement
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300">
          <PieChart className="w-4 h-4 text-indigo-500" />
          <span>Apportionment Model: <strong>EPA Chemical Mass Balance (CMB)</strong></span>
        </div>
      </div>

      {/* Main Grid: Visual Donut Chart + Source Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Apportionment Donut Visualizer */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sector Share Contribution
            </h3>
            <span className="text-xs text-slate-400">Annual Average</span>
          </div>

          {/* SVG Donut Chart */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-4">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Slices:
                  Vehicular: 42% (offset 0 to 42)
                  Industrial: 28% (offset 42 to 70)
                  Construction: 18% (offset 70 to 88)
                  Waste: 12% (offset 88 to 100)
              */}
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="16"
                strokeDasharray="94.95 131.33" // 42% of 226.2
                strokeDashoffset="0"
                className="hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setSelectedSourceId('src-traffic')}
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#EF4444"
                strokeWidth="16"
                strokeDasharray="63.33 162.87" // 28%
                strokeDashoffset="-94.95"
                className="hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setSelectedSourceId('src-industrial')}
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="16"
                strokeDasharray="40.71 185.49" // 18%
                strokeDashoffset="-158.28"
                className="hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setSelectedSourceId('src-construction')}
              />
              <circle
                cx="50"
                cy="50"
                r="36"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="16"
                strokeDasharray="27.14 199.06" // 12%
                strokeDashoffset="-198.99"
                className="hover:opacity-80 transition-opacity cursor-pointer"
                onClick={() => setSelectedSourceId('src-waste')}
              />
            </svg>

            {/* Centered Donut Value */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {selectedSource.percentage}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {selectedSource.name.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Clickable Legend */}
          <div className="space-y-2 pt-2">
            {POLLUTION_SOURCES.map((source) => {
              const isSelected = source.id === selectedSource.id;
              return (
                <div
                  key={source.id}
                  onClick={() => setSelectedSourceId(source.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-50 dark:bg-slate-800 border-slate-400 dark:border-slate-600 shadow-sm'
                      : 'border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: source.color }}
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {source.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black" style={{ color: source.color }}>
                      {source.percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Analysis for Selected Source */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            {/* Header info */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="p-3 rounded-2xl text-white"
                  style={{ backgroundColor: selectedSource.color }}
                >
                  {getSourceIcon(selectedSource.name)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedSource.name}
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: selectedSource.color }}
                    >
                      {selectedSource.percentage}% of City Air Mass
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Primary Atmospheric Pollutants: <strong>{selectedSource.primaryPollutants?.join(', ') || selectedSource.primaryPollutant}</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedSource.summary || selectedSource.description}
            </p>

            {/* Deep dive metrics grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Temporal Peak Hours</span>
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {selectedSource.peakTimes || selectedSource.peakHours}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Toxic Byproducts</span>
                </div>
                <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  NO₂, VOCs, Ultra-fine Carbon
                </div>
              </div>
            </div>

            {/* Regulatory Solutions */}
            <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/40">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Municipal Mitigation Strategies</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-800/90 dark:text-emerald-300/90">
                {selectedSource.mitigationStrategies.map((strat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{strat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* Real-world Municipal Smart City Interventions */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
            <span>Active Smart City Clean Air Regulations</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time compliance tracking across municipal regulatory enforcement programs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {municipalInterventions.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="p-2 rounded-lg text-white"
                      style={{ backgroundColor: prog.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300/40">
                      {prog.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                    {prog.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Target: {prog.target}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{prog.reduction}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
