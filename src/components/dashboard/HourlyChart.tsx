import React, { useState } from 'react';
import { HOURLY_24H_DATA, getCategoryFromAQI, AQI_CATEGORIES } from '../../data/mockData';
import { Activity, Clock, Flame, Info } from 'lucide-react';

export const HourlyChart: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'aqi' | 'pm25' | 'pm10'>('aqi');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = HOURLY_24H_DATA;
  const values = data.map((d) => d[selectedMetric]);
  const maxValue = Math.max(...values) * 1.15;
  const minValue = 0;

  const width = 800;
  const height = 240;
  const paddingX = 45;
  const paddingY = 30;

  const getX = (index: number) => paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - ((val - minValue) / (maxValue - minValue)) * (height - paddingY * 2);

  // Generate SVG smooth bezier path
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d[selectedMetric]) }));
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x},${point.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + point.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${point.y} ${point.x},${point.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  // Find peak hour
  const peakIndex = values.indexOf(Math.max(...values));
  const peakPoint = points[peakIndex];

  const hoveredData = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all">
      {/* Chart Header & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              24-Hour Air Quality Dynamics
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Hourly trends illustrating morning & evening urban traffic emissions
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setSelectedMetric('aqi')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              selectedMetric === 'aqi'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            AQI Index
          </button>
          <button
            onClick={() => setSelectedMetric('pm25')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              selectedMetric === 'pm25'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            PM2.5
          </button>
          <button
            onClick={() => setSelectedMetric('pm10')}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              selectedMetric === 'pm10'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            PM10
          </button>
        </div>
      </div>

      {/* SVG Responsive Chart */}
      <div className="relative w-full aspect-[21/9] min-h-[220px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = height - paddingY - pct * (height - paddingY * 2);
            const val = Math.round(minValue + pct * (maxValue - minValue));
            return (
              <g key={i} className="text-slate-200 dark:text-slate-800">
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={paddingX - 10}
                  y={y + 3}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-mono"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaD} fill="url(#chartGradient)" />

          {/* Main Trend Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Peak pollution marker */}
          {peakPoint && (
            <g className="animate-pulse">
              <circle
                cx={peakPoint.x}
                cy={peakPoint.y}
                r="6"
                fill="#EF4444"
                className="opacity-75"
              />
              <circle cx={peakPoint.x} cy={peakPoint.y} r="3" fill="#FFFFFF" />
            </g>
          )}

          {/* Interactive points & hover listeners */}
          {points.map((p, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
            >
              {/* Invisible wide hit target */}
              <rect
                x={p.x - 20}
                y={0}
                width={40}
                height={height}
                fill="transparent"
              />
              {/* Visible small circle */}
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredIndex === idx ? 6 : 3.5}
                className={`transition-all duration-150 ${
                  hoveredIndex === idx
                    ? 'fill-emerald-500 stroke-2 stroke-white dark:stroke-slate-900 shadow'
                    : 'fill-slate-600 dark:fill-slate-300'
                }`}
              />
              {/* X Axis Time Labels */}
              <text
                x={p.x}
                y={height - 8}
                textAnchor="middle"
                className={`text-[10px] font-mono transition-colors ${
                  hoveredIndex === idx
                    ? 'fill-emerald-600 dark:fill-emerald-400 font-bold'
                    : 'fill-slate-400'
                }`}
              >
                {data[idx].hour}
              </text>
            </g>
          ))}

          {/* Active Hover vertical line */}
          {hoveredIndex !== null && (
            <line
              x1={points[hoveredIndex].x}
              y1={paddingY}
              x2={points[hoveredIndex].x}
              y2={height - paddingY}
              stroke="#10B981"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}
        </svg>

        {/* Floating Tooltip */}
        {hoveredData && hoveredIndex !== null && (
          <div
            className="absolute top-2 pointer-events-none transform -translate-x-1/2 p-2.5 rounded-xl bg-slate-900/95 text-white shadow-xl border border-slate-700 text-xs backdrop-blur-md z-20 animate-in fade-in zoom-in-95 duration-100"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
            }}
          >
            <div className="flex items-center gap-1.5 text-slate-300 text-[10px] mb-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{hoveredData.hour} Reading</span>
            </div>
            <div className="flex items-baseline gap-1.5 font-bold">
              <span className="text-emerald-400 text-lg">
                {hoveredData[selectedMetric]}
              </span>
              <span className="text-[10px] text-slate-400 uppercase">
                {selectedMetric === 'aqi' ? 'AQI' : 'µg/m³'}
              </span>
            </div>
            <div className="text-[10px] text-slate-300 mt-0.5">
              Category:{' '}
              <span className="text-amber-300 font-semibold">
                {getCategoryFromAQI(hoveredData.aqi)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-slate-400 mt-1 pt-1 border-t border-slate-800">
              <span>PM2.5: {hoveredData.pm25}</span>
              <span>•</span>
              <span>PM10: {hoveredData.pm10}</span>
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer with Insight */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          <span>
            Peak recorded at <strong>18:00 (184 AQI)</strong> during evening peak traffic
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> &lt; 50 Clean
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> 101-200 Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> &gt; 200 Poor
          </span>
        </div>
      </div>
    </div>
  );
};
