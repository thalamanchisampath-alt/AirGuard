import React from 'react';
import { CityLocation } from '../../types';
import { AQI_CATEGORIES, getCategoryFromAQI } from '../../data/mockData';
import { TrendingUp, TrendingDown, Minus, Clock, Info } from 'lucide-react';

interface AQISummaryCardsProps {
  location: CityLocation;
}

export const AQISummaryCards: React.FC<AQISummaryCardsProps> = ({ location }) => {
  const overallCat = getCategoryFromAQI(location.aqi);

  const getPM25Status = (val: number) => {
    if (val <= 12) return { status: 'Good', color: '#10B981' };
    if (val <= 35.4) return { status: 'Moderate', color: '#F59E0B' };
    if (val <= 55.4) return { status: 'Unhealthy for Sensitive', color: '#F97316' };
    if (val <= 150.4) return { status: 'Unhealthy', color: '#EF4444' };
    return { status: 'Hazardous', color: '#881337' };
  };

  const getPM10Status = (val: number) => {
    if (val <= 54) return { status: 'Good', color: '#10B981' };
    if (val <= 154) return { status: 'Moderate', color: '#F59E0B' };
    if (val <= 254) return { status: 'Unhealthy', color: '#EF4444' };
    return { status: 'Hazardous', color: '#881337' };
  };

  const getCOStatus = (val: number) => {
    if (val <= 4.4) return { status: 'Good', color: '#10B981' };
    if (val <= 9.4) return { status: 'Moderate', color: '#F59E0B' };
    return { status: 'Unhealthy', color: '#EF4444' };
  };

  const getNO2Status = (val: number) => {
    if (val <= 53) return { status: 'Good', color: '#10B981' };
    if (val <= 100) return { status: 'Moderate', color: '#F59E0B' };
    return { status: 'Unhealthy', color: '#EF4444' };
  };

  const getO3Status = (val: number) => {
    if (val <= 54) return { status: 'Good', color: '#10B981' };
    if (val <= 70) return { status: 'Moderate', color: '#F59E0B' };
    return { status: 'Unhealthy', color: '#EF4444' };
  };

  const pm25Meta = getPM25Status(location.pm25);
  const pm10Meta = getPM10Status(location.pm10);
  const coMeta = getCOStatus(location.co);
  const no2Meta = getNO2Status(location.no2);
  const o3Meta = getO3Status(location.o3);

  const cards = [
    {
      id: 'overall-aqi',
      title: 'Overall AQI',
      subtitle: 'Air Quality Index',
      value: location.aqi,
      unit: 'Index',
      status: overallCat,
      statusColor: AQI_CATEGORIES[overallCat].color,
      trend: location.aqi > 150 ? 'up' : 'down',
      trendPercent: 4.2,
      lastUpdated: location.lastUpdated,
      description: 'Composite metric evaluating respirable particulate and gaseous air pollutants',
    },
    {
      id: 'pm25',
      title: 'PM2.5',
      subtitle: 'Fine Inhalable Particles',
      value: location.pm25,
      unit: 'µg/m³',
      status: pm25Meta.status,
      statusColor: pm25Meta.color,
      trend: 'up',
      trendPercent: 6.8,
      lastUpdated: location.lastUpdated,
      description: 'Particles ≤ 2.5 µm that penetrate deep into lung alveoli and bloodstream',
    },
    {
      id: 'pm10',
      title: 'PM10',
      subtitle: 'Respirable Coarse Dust',
      value: location.pm10,
      unit: 'µg/m³',
      status: pm10Meta.status,
      statusColor: pm10Meta.color,
      trend: 'down',
      trendPercent: 2.1,
      lastUpdated: location.lastUpdated,
      description: 'Road dust, construction silt, and pollen affecting upper respiratory tracts',
    },
    {
      id: 'co',
      title: 'CO',
      subtitle: 'Carbon Monoxide',
      value: location.co,
      unit: 'mg/m³',
      status: coMeta.status,
      statusColor: coMeta.color,
      trend: 'neutral',
      trendPercent: 0.3,
      lastUpdated: location.lastUpdated,
      description: 'Incomplete vehicular fuel combustion gas reducing blood oxygen transport',
    },
    {
      id: 'no2',
      title: 'NO₂',
      subtitle: 'Nitrogen Dioxide',
      value: location.no2,
      unit: 'ppb',
      status: no2Meta.status,
      statusColor: no2Meta.color,
      trend: 'up',
      trendPercent: 5.4,
      lastUpdated: location.lastUpdated,
      description: 'High-temperature diesel combustion byproduct causing bronchial inflammation',
    },
    {
      id: 'o3',
      title: 'O₃',
      subtitle: 'Ground-Level Ozone',
      value: location.o3,
      unit: 'ppb',
      status: o3Meta.status,
      statusColor: o3Meta.color,
      trend: 'down',
      trendPercent: 3.0,
      lastUpdated: location.lastUpdated,
      description: 'Secondary photochemical pollutant formed under sunlight from VOCs & NOx',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {cards.map((card) => (
        <div
          key={card.id}
          className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
        >
          {/* Top color indicator accent */}
          <div
            className="absolute top-0 left-0 right-0 h-1 transition-colors"
            style={{ backgroundColor: card.statusColor }}
          />

          <div>
            {/* Header with Title & Trend */}
            <div className="flex items-start justify-between gap-1 mb-1">
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                  {card.title}
                </h4>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
                  {card.subtitle}
                </span>
              </div>
              <div
                className={`flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                  card.trend === 'up'
                    ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                    : card.trend === 'down'
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                    : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
                title={
                  card.trend === 'up'
                    ? 'Increasing pollution'
                    : card.trend === 'down'
                    ? 'Improving'
                    : 'Stable'
                }
              >
                {card.trend === 'up' && <TrendingUp className="w-3 h-3 mr-0.5" />}
                {card.trend === 'down' && <TrendingDown className="w-3 h-3 mr-0.5" />}
                {card.trend === 'neutral' && <Minus className="w-3 h-3 mr-0.5" />}
                {card.trendPercent}%
              </div>
            </div>

            {/* Value & Unit */}
            <div className="my-2.5 flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                {card.unit}
              </span>
            </div>
          </div>

          {/* Bottom Status & Last Updated */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded-full truncate"
                style={{
                  color: card.statusColor,
                  backgroundColor: `${card.statusColor}18`,
                }}
              >
                {card.status}
              </span>
            </div>
            <div className="flex items-center text-[10px] text-slate-400 dark:text-slate-500">
              <Clock className="w-3 h-3 mr-1 shrink-0" />
              <span className="truncate">{card.lastUpdated}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
