import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CITY_LOCATIONS, AQI_CATEGORIES, getCategoryFromAQI } from '../../data/mockData';
import { CityLocation, PollutionReport } from '../../types';
import {
  MapPin,
  Layers,
  Search,
  Filter,
  AlertTriangle,
  Flame,
  HardHat,
  Car,
  Factory,
  CheckCircle2,
  Info,
  Navigation,
  Wind,
  Shield,
  Eye,
  PlusCircle
} from 'lucide-react';

export const LiveAQIMap: React.FC = () => {
  const {
    currentLocation,
    setCurrentLocation,
    reports,
    setActiveTab,
    showToast
  } = useApp();

  const [selectedStation, setSelectedStation] = useState<CityLocation>(currentLocation);
  const [selectedLayer, setSelectedLayer] = useState<'overall' | 'traffic' | 'industrial' | 'construction'>('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<PollutionReport | null>(null);
  const [showCitizenReports, setShowCitizenReports] = useState(true);

  // Filter stations by search
  const filteredStations = CITY_LOCATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get color for marker based on selected filter layer
  const getMarkerColor = (station: CityLocation) => {
    if (selectedLayer === 'traffic') {
      if (station.mainSource === 'Traffic Emissions') return '#EF4444';
      return station.no2 > 40 ? '#F59E0B' : '#10B981';
    }
    if (selectedLayer === 'industrial') {
      if (station.mainSource === 'Industrial Zone' || station.mainSource === 'Port Marine') return '#EF4444';
      return station.so2 > 15 ? '#F59E0B' : '#10B981';
    }
    if (selectedLayer === 'construction') {
      if (station.mainSource === 'Construction Dust') return '#EF4444';
      return station.pm10 > 100 ? '#F59E0B' : '#10B981';
    }
    // Overall AQI
    return AQI_CATEGORIES[station.category].color;
  };

  const getStationValueByLayer = (station: CityLocation) => {
    if (selectedLayer === 'traffic') return `${station.no2} ppb NO₂`;
    if (selectedLayer === 'industrial') return `${station.so2} ppb SO₂`;
    if (selectedLayer === 'construction') return `${station.pm10} µg PM10`;
    return `${station.aqi} AQI`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Layer Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Live Urban Air Quality Map
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Interactive simulated geospatial sensor grid across Metropolis District
          </p>
        </div>

        {/* Layer Dropdown & Search & Citizen Toggle */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Layer Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <span className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Layer:
            </span>
            <select
              value={selectedLayer}
              onChange={(e) =>
                setSelectedLayer(
                  e.target.value as 'overall' | 'traffic' | 'industrial' | 'construction'
                )
              }
              className="bg-white dark:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-lg border-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="overall">Overall AQI</option>
              <option value="traffic">Traffic Pollution (NO₂)</option>
              <option value="industrial">Industrial Pollution (SO₂)</option>
              <option value="construction">Construction Dust (PM10)</option>
            </select>
          </div>

          {/* Citizen Reports Overlay Toggle */}
          <button
            onClick={() => setShowCitizenReports(!showCitizenReports)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              showCitizenReports
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Citizen Reports ({reports.length})</span>
          </button>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search station or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl text-xs border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 w-44 sm:w-56 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Main Map Visualization and Station Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive SVG / Canvas Map Container */}
        <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 relative shadow-md">
          {/* Top Map Floating Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/90 text-white px-3 py-1.5 rounded-xl border border-slate-700 backdrop-blur-md text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold">Simulated Urban Grid: Metropolis</span>
            <span className="text-[10px] text-slate-400">| Layer: {selectedLayer.toUpperCase()}</span>
          </div>

          {/* Map Canvas (SVG) */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden select-none">
            <svg
              viewBox="0 0 1000 650"
              className="w-full h-full object-cover"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                {/* City Terrain Gradients */}
                <linearGradient id="waterGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="parkGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#064e3b" />
                  <stop offset="100%" stopColor="#065f46" />
                </linearGradient>
                <linearGradient id="industrialGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#450a0a" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                </pattern>
                {/* Pollution Heatmap Filter blurs */}
                <filter id="blurHeat" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="35" />
                </filter>
              </defs>

              {/* Background dark terrain */}
              <rect width="1000" height="650" fill="#0f172a" />
              <rect width="1000" height="650" fill="url(#grid)" />

              {/* Natural Topography: Green Sanctuary Park */}
              <path
                d="M 120,40 C 220,30 380,80 340,240 C 300,320 180,300 120,240 Z"
                fill="url(#parkGradient)"
                opacity="0.85"
              />
              <text x="200" y="160" fill="#6ee7b7" fontSize="14" fontWeight="600" opacity="0.6">
                Eco Green Sanctuary
              </text>

              {/* Natural Topography: Industrial Zone Sector */}
              <path
                d="M 720,120 C 850,110 980,180 960,380 C 900,420 780,360 740,260 Z"
                fill="url(#industrialGradient)"
                opacity="0.75"
              />
              <text x="800" y="240" fill="#fca5a5" fontSize="14" fontWeight="600" opacity="0.6">
                East Manufacturing Zone
              </text>

              {/* City River (Grand Estuary) */}
              <path
                d="M 0,280 C 240,270 380,380 520,360 C 660,340 760,480 820,650 L 730,650 C 680,510 590,410 480,420 C 340,430 200,350 0,350 Z"
                fill="url(#waterGradient)"
                opacity="0.7"
              />
              <text x="320" y="345" fill="#38bdf8" fontSize="13" fontWeight="500" opacity="0.5" transform="rotate(-6 320 345)">
                Metropolis River Estuary
              </text>

              {/* Major Highway Ring (Arterials) */}
              <path
                d="M 80,120 L 900,90 L 920,560 L 100,560 Z"
                fill="none"
                stroke="#334155"
                strokeWidth="8"
                strokeDasharray="16 6"
                opacity="0.6"
              />
              <path
                d="M 500,40 L 500,600"
                fill="none"
                stroke="#334155"
                strokeWidth="6"
                opacity="0.5"
              />
              <path
                d="M 60,300 L 950,300"
                fill="none"
                stroke="#334155"
                strokeWidth="6"
                opacity="0.5"
              />

              {/* Simulated Atmospheric Heatmap Overlay based on layer */}
              <g filter="url(#blurHeat)" opacity="0.55">
                {CITY_LOCATIONS.map((st) => {
                  const x = (st.coordinates.x / 100) * 1000;
                  const y = (st.coordinates.y / 100) * 650;
                  const color = getMarkerColor(st);
                  const radius = st.aqi > 200 ? 90 : st.aqi > 100 ? 70 : 45;
                  return (
                    <circle
                      key={`heat-${st.id}`}
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={color}
                    />
                  );
                })}
              </g>

              {/* Clickable Sensor Stations */}
              {filteredStations.map((station) => {
                const x = (station.coordinates.x / 100) * 1000;
                const y = (station.coordinates.y / 100) * 650;
                const isSelected = station.id === selectedStation.id;
                const isCurrent = station.id === currentLocation.id;
                const color = getMarkerColor(station);

                return (
                  <g
                    key={station.id}
                    onClick={() => {
                      setSelectedStation(station);
                      setSelectedReport(null);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for active/selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r="28"
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                        className="animate-spin"
                        style={{ transformOrigin: `${x}px ${y}px`, animationDuration: '6s' }}
                      />
                    )}

                    {/* Outer glow ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r="18"
                      fill={color}
                      opacity="0.25"
                      className="group-hover:scale-125 transition-transform"
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />

                    {/* Center Core Marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r="11"
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="2.5"
                    />

                    {/* Location Label Badge */}
                    <g transform={`translate(${x}, ${y - 20})`}>
                      <rect
                        x="-55"
                        y="-18"
                        width="110"
                        height="20"
                        rx="10"
                        fill="#0f172ae6"
                        stroke={isSelected ? '#10b981' : '#334155'}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="10"
                        fontWeight="700"
                        className="pointer-events-none"
                      >
                        {station.name.split(' ')[0]} ({station.aqi})
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Citizen Reported Hazards (If toggled) */}
              {showCitizenReports &&
                reports.map((rep) => {
                  if (!rep.coordinates) return null;
                  const x = (rep.coordinates.x / 100) * 1000;
                  const y = (rep.coordinates.y / 100) * 650;
                  const isRepSelected = selectedReport?.id === rep.id;

                  return (
                    <g
                      key={rep.id}
                      onClick={() => setSelectedReport(rep)}
                      className="cursor-pointer group"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r="14"
                        fill="#f59e0b"
                        opacity="0.3"
                        className="animate-ping"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="9"
                        fill="#f59e0b"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <g transform={`translate(${x}, ${y + 20})`}>
                        <rect
                          x="-45"
                          y="0"
                          width="90"
                          height="16"
                          rx="8"
                          fill="#451a03e6"
                          stroke="#f59e0b"
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="11"
                          textAnchor="middle"
                          fill="#fef3c7"
                          fontSize="9"
                          fontWeight="700"
                        >
                          ⚠ {rep.type.split(' ')[0]}
                        </text>
                      </g>
                    </g>
                  );
                })}
            </svg>
          </div>

          {/* Map Color Legend Footer */}
          <div className="p-3 bg-slate-900/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white uppercase text-[10px]">AQI Legend:</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>0-50 Good</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span>51-100 Satisfactory</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>101-200 Moderate</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                <span>201-300 Poor</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>301-500 Severe</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Citizen Verified Smoke / Dust Alerts</span>
            </div>
          </div>
        </div>

        {/* Station / Citizen Report Detail Side Panel */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Station Card */}
          {selectedStation && !selectedReport && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Station Telemetry
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedStation.district}
                  </p>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm"
                  style={{
                    backgroundColor: AQI_CATEGORIES[selectedStation.category].color,
                  }}
                >
                  {selectedStation.category}
                </div>
              </div>

              {/* Big AQI Callout */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Air Quality Index</span>
                  <div className="text-4xl font-black text-slate-900 dark:text-white mt-0.5">
                    {selectedStation.aqi}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    Dominant: <strong>{selectedStation.dominantPollutant}</strong>
                  </span>
                </div>
                <div className="text-right text-xs space-y-1">
                  <div>
                    <span className="text-slate-400">Layer View: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {getStationValueByLayer(selectedStation)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Temp: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedStation.temp}°C
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Wind: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedStation.windSpeed} km/h
                    </strong>
                  </div>
                </div>
              </div>

              {/* Pollutants details */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PM2.5 (Fine)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.pm25} µg/m³
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">PM10 (Coarse)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.pm10} µg/m³
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">NO₂ (Diesel)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.no2} ppb
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block text-[10px]">SO₂ (Industrial)</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    {selectedStation.so2} ppb
                  </span>
                </div>
              </div>

              {/* Primary Pollution Source */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">Main Source Driver:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  {selectedStation.mainSource === 'Traffic Emissions' && <Car className="w-3.5 h-3.5 text-blue-500" />}
                  {selectedStation.mainSource === 'Industrial Zone' && <Factory className="w-3.5 h-3.5 text-rose-500" />}
                  {selectedStation.mainSource === 'Construction Dust' && <HardHat className="w-3.5 h-3.5 text-amber-500" />}
                  {selectedStation.mainSource}
                </span>
              </div>

              {/* Set as Active Dashboard Location Button */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    setCurrentLocation(selectedStation);
                    showToast(`Updated active city monitor to ${selectedStation.name}!`, 'success');
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    currentLocation.id === selectedStation.id
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {currentLocation.id === selectedStation.id
                      ? 'Currently Active Dashboard Station'
                      : 'Set as Active Dashboard Station'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('health');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Evaluate Health Risk For This Zone
                </button>
              </div>
            </div>
          )}

          {/* Citizen Report Modal Preview if a citizen marker was clicked */}
          {selectedReport && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-amber-600 shadow-lg space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Citizen Report Active
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedReport.id}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedReport.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕ Close
                </button>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hazard Type:</span>
                  <strong className="text-slate-900 dark:text-white">{selectedReport.type}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Severity:</span>
                  <span className="font-bold text-rose-600">{selectedReport.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
                    {selectedReport.status}
                  </span>
                </div>
                <p className="pt-1 text-slate-700 dark:text-slate-300 italic border-t border-amber-200/40">
                  "{selectedReport.description}"
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveTab('report');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
              >
                View in Citizen Reports Hub
              </button>
            </div>
          )}

          {/* Quick Citizen Reporting CTA */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600/10 via-teal-600/10 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Spot a local smog or dust plume?
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Log a photo report to add warning pins directly to this live map.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('report');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shrink-0 flex items-center gap-1 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Report</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
