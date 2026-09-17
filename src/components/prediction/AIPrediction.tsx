import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_PREDICTIONS, AQI_CATEGORIES, getCategoryFromAQI } from '../../data/mockData';
import { PredictionDataPoint } from '../../types';
import {
  Brain,
  Sparkles,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Cpu,
  Clock,
  CloudRain,
  Car,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  Wind
} from 'lucide-react';

export const AIPrediction: React.FC = () => {
  const { currentLocation, showToast } = useApp();
  const [predictions, setPredictions] = useState<PredictionDataPoint[]>(INITIAL_PREDICTIONS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modelVersion, setModelVersion] = useState('Atmospheric-LSTM-v4.2');
  const [hoveredPoint, setHoveredPoint] = useState<PredictionDataPoint | null>(null);

  // Generate new prediction simulation
  const handleGeneratePrediction = () => {
    setIsGenerating(true);
    showToast('Synthesizing atmospheric telemetry with neural ensemble model...', 'info');

    setTimeout(() => {
      // Perturb prediction values slightly for realism
      const updated = predictions.map((p) => {
        if (p.timestamp.startsWith('-') || p.timestamp === '0h') return p;
        const delta = Math.floor(Math.random() * 24 - 12);
        const nextAqi = Math.max(25, Math.min(320, p.predictedAqi + delta));
        return {
          ...p,
          predictedAqi: nextAqi,
          confidenceMin: Math.max(20, nextAqi - Math.floor(10 + Math.random() * 8)),
          confidenceMax: nextAqi + Math.floor(10 + Math.random() * 8),
          status: getCategoryFromAQI(nextAqi),
        };
      });

      setPredictions(updated);
      setIsGenerating(false);
      setModelVersion(`Atmospheric-LSTM-v4.2-run#${Math.floor(100 + Math.random() * 900)}`);
      showToast('AI prediction models updated with newly assimilated forecast!', 'success');
    }, 900);
  };

  // Forecast milestone cards
  const next1h = predictions.find((p) => p.timestamp === '+1h') || predictions[4];
  const next6h = predictions.find((p) => p.timestamp === '+6h') || predictions[5];
  const next12h = predictions.find((p) => p.timestamp === '+12h') || predictions[6];
  const tomorrow = predictions.find((p) => p.timestamp === '+24h') || predictions[7];

  const milestoneCards = [
    {
      title: 'Next 1 Hour',
      timeLabel: next1h.label,
      aqi: next1h.predictedAqi,
      category: next1h.status,
      trend: next1h.predictedAqi >= currentLocation.aqi ? 'up' : 'down',
      weather: next1h.weatherFactor,
      confidence: '96% confidence',
    },
    {
      title: 'Next 6 Hours',
      timeLabel: next6h.label,
      aqi: next6h.predictedAqi,
      category: next6h.status,
      trend: next6h.predictedAqi >= next1h.predictedAqi ? 'up' : 'down',
      weather: next6h.weatherFactor,
      confidence: '91% confidence',
    },
    {
      title: 'Next 12 Hours',
      timeLabel: next12h.label,
      aqi: next12h.predictedAqi,
      category: next12h.status,
      trend: next12h.predictedAqi >= next6h.predictedAqi ? 'up' : 'down',
      weather: next12h.weatherFactor,
      confidence: '86% confidence',
    },
    {
      title: 'Tomorrow',
      timeLabel: tomorrow.label,
      aqi: tomorrow.predictedAqi,
      category: tomorrow.status,
      trend: tomorrow.predictedAqi >= next12h.predictedAqi ? 'up' : 'down',
      weather: tomorrow.weatherFactor,
      confidence: '82% confidence',
    },
  ];

  // SVG Chart Dimensions
  const width = 800;
  const height = 260;
  const paddingX = 50;
  const paddingY = 40;

  const aqiValues = predictions.flatMap((p) => [
    p.historicalAqi || 0,
    p.predictedAqi || 0,
    p.confidenceMax || 0,
  ]);
  const maxVal = Math.max(...aqiValues) * 1.15;
  const minVal = 0;

  const getX = (index: number) => paddingX + (index / (predictions.length - 1)) * (width - paddingX * 2);
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);

  // Split into historical line vs predicted line
  const nowIndex = predictions.findIndex((p) => p.timestamp === '0h');

  const historicalPoints = predictions.slice(0, nowIndex + 1).map((d, i) => ({
    x: getX(i),
    y: getY(d.historicalAqi ?? d.predictedAqi),
  }));

  const predictedPoints = predictions.slice(nowIndex).map((d, i) => ({
    x: getX(nowIndex + i),
    y: getY(d.predictedAqi),
  }));

  // Confidence interval polygon
  const confidenceTop = predictions.slice(nowIndex).map((d, i) => `${getX(nowIndex + i)},${getY(d.confidenceMax)}`);
  const confidenceBottom = predictions.slice(nowIndex).reverse().map((d, i) => `${getX(predictions.length - 1 - i)},${getY(d.confidenceMin)}`);
  const confidenceAreaD = `M ${confidenceTop.join(' L ')} L ${confidenceBottom.join(' L ')} Z`;

  const historicalPath = historicalPoints.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');
  const predictedPath = predictedPoints.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400">
              <Brain className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Pollution Forecasting & Neural Predictions
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Temporal LSTM neural network trained on meteorological, traffic, and satellite sensory streams
          </p>
        </div>

        {/* Generate Prediction Button */}
        <button
          id="generate-prediction-btn"
          disabled={isGenerating}
          onClick={handleGeneratePrediction}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Computing Neural Inference...' : 'Generate New Prediction'}</span>
        </button>
      </div>

      {/* 4 Prediction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {milestoneCards.map((card, idx) => {
          const catMeta = AQI_CATEGORIES[card.category];
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: catMeta.color }}
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {card.title}
                  </span>
                  <span
                    className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      card.trend === 'up'
                        ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/40'
                        : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40'
                    }`}
                  >
                    {card.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                    {card.trend === 'up' ? 'Worsening' : 'Improving'}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 my-2">
                  <span
                    className="text-3xl font-black"
                    style={{ color: catMeta.color }}
                  >
                    {card.aqi}
                  </span>
                  <span className="text-xs font-bold text-slate-400">AQI</span>
                  <span
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-full ml-auto"
                    style={{
                      color: catMeta.color,
                      backgroundColor: `${catMeta.color}18`,
                    }}
                  >
                    {card.category}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                  {card.weather}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>{card.timeLabel}</span>
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{card.confidence}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Prediction Comparison Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Historical vs AI Predicted AQI Trajectory
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Demonstration simulated dataset comparing observed telemetry with 24-hour neural forecast envelope
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-3 h-0.5 bg-slate-500" /> Historical
            </span>
            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 font-semibold">
              <span className="w-3 h-0.5 bg-cyan-500 border-t border-dashed" /> AI Predicted
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400/60">
              <span className="w-3 h-2 bg-cyan-500/20 rounded-sm" /> 95% Confidence Band
            </span>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="relative w-full aspect-[21/9] min-h-[240px]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Horizontal Grid */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
              const y = height - paddingY - pct * (height - paddingY * 2);
              const val = Math.round(minVal + pct * (maxVal - minVal));
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

            {/* Vertical dividing line between Past and Future */}
            {nowIndex >= 0 && (
              <g>
                <line
                  x1={getX(nowIndex)}
                  y1={paddingY}
                  x2={getX(nowIndex)}
                  y2={height - paddingY}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={getX(nowIndex)}
                  y={paddingY - 10}
                  textAnchor="middle"
                  fill="#10b981"
                  fontSize="10"
                  fontWeight="700"
                >
                  NOW
                </text>
              </g>
            )}

            {/* Confidence Envelope Polygon */}
            <path d={confidenceAreaD} fill="#06b6d4" opacity="0.15" />

            {/* Historical Solid Line */}
            <path
              d={historicalPath}
              fill="none"
              stroke="#64748b"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Predicted Dashed / Vibrant Line */}
            <path
              d={predictedPath}
              fill="none"
              stroke="#06b6d4"
              strokeWidth="3"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Data Points */}
            {predictions.map((p, idx) => {
              const x = getX(idx);
              const val = idx <= nowIndex ? (p.historicalAqi ?? p.predictedAqi) : p.predictedAqi;
              const y = getY(val);
              const isNow = idx === nowIndex;
              const isFuture = idx > nowIndex;

              return (
                <g
                  key={idx}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint(p)}
                >
                  <rect x={x - 20} y={0} width={40} height={height} fill="transparent" />
                  <circle
                    cx={x}
                    cy={y}
                    r={isNow ? 6 : 4}
                    fill={isNow ? '#10b981' : isFuture ? '#06b6d4' : '#64748b'}
                    stroke="#ffffff"
                    strokeWidth={isNow ? '2.5' : '1.5'}
                  />
                  <text
                    x={x}
                    y={height - 12}
                    textAnchor="middle"
                    className="text-[10px] font-mono fill-slate-400"
                  >
                    {p.label.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredPoint && (
            <div className="absolute top-2 right-4 p-3 rounded-xl bg-slate-900/95 text-white border border-slate-700 shadow-xl text-xs z-20 max-w-xs pointer-events-none">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-slate-200">{hoveredPoint.label}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
                  {hoveredPoint.timestamp}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-cyan-400">
                  {hoveredPoint.historicalAqi ?? hoveredPoint.predictedAqi} AQI
                </span>
                <span className="text-[10px] text-slate-400 uppercase">
                  ({hoveredPoint.status})
                </span>
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Factor: {hoveredPoint.weatherFactor}
              </div>
              {hoveredPoint.confidenceMin && (
                <div className="text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-800">
                  Model Range: {hoveredPoint.confidenceMin} – {hoveredPoint.confidenceMax} AQI
                </div>
              )}
            </div>
          )}
        </div>

        {/* Model Disclaimer Label */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Active Architecture: <strong>{modelVersion}</strong></span>
          <span className="italic">Demonstration data generated for hackathon benchmarking</span>
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            AI Atmospheric Intelligence Insights
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Peak Commute Inversion
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Traffic-related particulate and NO₂ pollution is projected to spike sharply between <strong>17:30 and 19:30</strong> along central ring roads.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 shrink-0">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Precipitation Deposition
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Air quality will substantially improve after overnight rainfall (35-40% reduction in PM10 particulates expected post-shower).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Vulnerable Group Advisory
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Sensitive cohorts (pediatric asthma, COPD, seniors) should reduce prolonged outdoor cardiovascular exertion near industrial corridors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
