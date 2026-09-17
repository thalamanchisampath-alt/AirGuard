import React from 'react';
import { AQICategory } from '../../types';
import { AQI_CATEGORIES, getCategoryFromAQI } from '../../data/mockData';
import { AlertCircle, CheckCircle, ShieldAlert, Wind } from 'lucide-react';

interface AQIGaugeProps {
  aqi: number;
  category?: AQICategory;
  locationName?: string;
  dominantPollutant?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AQIGauge: React.FC<AQIGaugeProps> = ({
  aqi,
  category = getCategoryFromAQI(aqi),
  locationName,
  dominantPollutant = 'PM2.5',
  size = 'lg',
}) => {
  const currentCategory = AQI_CATEGORIES[category] || AQI_CATEGORIES.Moderate;

  // Scale AQI to percentage 0 - 100 for gauge arc (500 max AQI)
  const normalizedValue = Math.min(Math.max(aqi, 0), 500);
  const percentage = (normalizedValue / 500) * 100;

  // Gauge calculations for SVG Arc
  const strokeWidth = size === 'lg' ? 14 : 10;
  const radius = size === 'lg' ? 88 : 60;
  const circumference = 2 * Math.PI * radius;
  // We use a 240 degree arc (leaving 120 degree open at bottom)
  const arcFraction = 240 / 360;
  const totalArcLength = circumference * arcFraction;
  const strokeDashoffset = totalArcLength - (totalArcLength * percentage) / 100;

  const getAdviceSummary = (cat: AQICategory) => {
    switch (cat) {
      case 'Good':
        return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
      case 'Satisfactory':
        return 'Acceptable air quality; minor concern for very sensitive individuals with asthma.';
      case 'Moderate':
        return 'Air quality is acceptable; breathing discomfort possible for sensitive children and seniors.';
      case 'Poor':
        return 'Breathing discomfort to most people on prolonged exposure. Mask recommended outdoors.';
      case 'Very Poor':
        return 'Respiratory illness on prolonged exposure. Avoid strenuous outdoor activity.';
      case 'Severe':
        return 'Emergency health warning. Entire population likely affected. Stay indoors.';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all relative overflow-hidden">
      {/* Subtle ambient back glow based on category color */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: currentCategory.color }}
      />

      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Real-Time AQI Gauge
          </span>
        </div>
        {locationName && (
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 truncate max-w-[160px]">
            {locationName}
          </span>
        )}
      </div>

      {/* Main Circular SVG Gauge */}
      <div className="relative flex items-center justify-center my-3">
        <svg
          width={size === 'lg' ? 240 : 180}
          height={size === 'lg' ? 200 : 150}
          viewBox="0 0 220 190"
          className="overflow-visible transform rotate-[150deg]"
        >
          {/* Background Track Arc */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-slate-100 dark:text-slate-800"
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Colored Progress Arc */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke={currentCategory.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${totalArcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Numbers and Labels */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4 pointer-events-none">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Air Quality Index
          </span>
          <div className="flex items-baseline gap-1 my-0.5">
            <span
              className="text-5xl font-black tracking-tight transition-colors duration-500"
              style={{ color: currentCategory.color }}
            >
              {aqi}
            </span>
            <span className="text-xs font-bold text-slate-400">AQI</span>
          </div>

          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm mt-1 transition-colors duration-300"
            style={{ backgroundColor: currentCategory.color }}
          >
            {category}
          </div>

          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2">
            Primary: <strong className="text-slate-700 dark:text-slate-300">{dominantPollutant}</strong>
          </span>
        </div>
      </div>

      {/* Health Impact Summary */}
      <div className="w-full mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-2.5">
        {category === 'Good' || category === 'Satisfactory' ? (
          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
        ) : category === 'Moderate' ? (
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        ) : (
          <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
        )}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          {getAdviceSummary(category)}
        </p>
      </div>

      {/* AQI Categories Reference Bar */}
      <div className="w-full mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 text-center">
          Official AQI Reference Scale
        </span>
        <div className="grid grid-cols-6 gap-1 text-center">
          {Object.entries(AQI_CATEGORIES).map(([catName, meta]) => {
            const isCurrent = catName === category;
            return (
              <div
                key={catName}
                className={`py-1 px-0.5 rounded transition-all ${
                  isCurrent ? 'ring-2 ring-slate-900 dark:ring-white scale-105 shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: `${meta.color}20` }}
                title={`${catName}: ${meta.range}`}
              >
                <div
                  className="w-2 h-2 rounded-full mx-auto mb-0.5"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="block text-[9px] font-bold leading-none text-slate-700 dark:text-slate-300 truncate">
                  {catName.split(' ')[0]}
                </span>
                <span className="block text-[8px] text-slate-400 leading-tight">
                  {meta.range.replace('–', '-')}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
