import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  MapPin,
  Leaf,
  Building2,
  Train,
  Landmark,
  Trees,
  Waves,
  Sparkles,
  ChevronRight,
  Compass
} from 'lucide-react';
import { ALL_INDIA_STATES_DATA } from '../../data/indiaLocationsData';
import { IndiaLocationPoint } from '../../types';

interface IndiaLocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (fullLocationName: string) => void;
  title: string;
  currentValue: string;
}

export const IndiaLocationSelectorModal: React.FC<IndiaLocationSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectLocation,
  title,
  currentValue,
}) => {
  const [activeTab, setActiveTab] = useState<'hierarchy' | 'search'>('hierarchy');
  const [selectedRegion, setSelectedRegion] = useState<string>('All India');
  const [selectedStateName, setSelectedStateName] = useState<string>('Delhi (NCT)');
  const [selectedCityName, setSelectedCityName] = useState<string>('New Delhi / Central Delhi');
  const [searchQuery, setSearchQuery] = useState('');

  // Regions list
  const regions = ['All India', 'North India', 'West India', 'South India', 'East India', 'Central India', 'North-East'];

  // Filtered States based on Region
  const availableStates = useMemo(() => {
    if (selectedRegion === 'All India') return ALL_INDIA_STATES_DATA;
    return ALL_INDIA_STATES_DATA.filter((s) => s.region === selectedRegion);
  }, [selectedRegion]);

  // Currently chosen State object
  const activeStateObj = useMemo(() => {
    return availableStates.find((s) => s.state === selectedStateName) || availableStates[0] || ALL_INDIA_STATES_DATA[0];
  }, [availableStates, selectedStateName]);

  // Currently chosen City object
  const activeCityObj = useMemo(() => {
    if (!activeStateObj) return null;
    return activeStateObj.cities.find((c) => c.name === selectedCityName) || activeStateObj.cities[0] || null;
  }, [activeStateObj, selectedCityName]);

  // Global search across all Indian states, cities, and points
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    const results: {
      pointName: string;
      cityName: string;
      stateName: string;
      fullName: string;
      type: string;
      isEcoZone?: boolean;
      baselineAqi?: number;
    }[] = [];

    for (const state of ALL_INDIA_STATES_DATA) {
      for (const city of state.cities) {
        // If city name or state name matches query, include city as a whole too
        if (city.name.toLowerCase().includes(q) || state.state.toLowerCase().includes(q)) {
          results.push({
            pointName: `${city.name} Central Zone`,
            cityName: city.name,
            stateName: state.state,
            fullName: `${city.name} Central Zone, ${city.name}, ${state.state}`,
            type: 'commercial',
            baselineAqi: city.baselineAqi,
          });
        }
        for (const pt of city.points) {
          if (
            pt.name.toLowerCase().includes(q) ||
            city.name.toLowerCase().includes(q) ||
            state.state.toLowerCase().includes(q)
          ) {
            results.push({
              pointName: pt.name,
              cityName: city.name,
              stateName: state.state,
              fullName: `${pt.name}, ${city.name}, ${state.state}`,
              type: pt.type,
              isEcoZone: pt.isEcoZone,
              baselineAqi: pt.baselineAqi,
            });
          }
        }
      }
    }
    return results.slice(0, 30);
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelect = (fullName: string) => {
    onSelectLocation(fullName);
    onClose();
  };

  const getPointIcon = (type: string, isEco?: boolean) => {
    if (isEco) return <Leaf className="w-4 h-4 text-emerald-500" />;
    switch (type) {
      case 'transit_hub':
        return <Train className="w-4 h-4 text-blue-500" />;
      case 'tech_park':
        return <Building2 className="w-4 h-4 text-indigo-500" />;
      case 'riverfront_lake':
        return <Waves className="w-4 h-4 text-cyan-500" />;
      case 'botanical_park':
        return <Trees className="w-4 h-4 text-emerald-600" />;
      case 'heritage':
        return <Landmark className="w-4 h-4 text-amber-500" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select verified Indian states, cities, CAAQMS monitored nodes, and clean air greenways
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Toggle & Search */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('hierarchy')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'hierarchy'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Browse State & City Hierarchy
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'search'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Instant Search (All-India)
              </button>
            </div>

            {/* Current selection summary */}
            {currentValue && (
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-sm">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Selected: </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">{currentValue}</span>
              </div>
            )}
          </div>

          {activeTab === 'search' ? (
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Type city, state, or landmark (e.g., Pune, BKC, Cubbon Park, Cyber Hub)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          ) : (
            /* Region Filter Chips */
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {regions.map((reg) => (
                <button
                  type="button"
                  key={reg}
                  onClick={() => {
                    setSelectedRegion(reg);
                    const matching = reg === 'All India' ? ALL_INDIA_STATES_DATA : ALL_INDIA_STATES_DATA.filter((s) => s.region === reg);
                    if (matching.length > 0) {
                      setSelectedStateName(matching[0].state);
                      if (matching[0].cities.length > 0) {
                        setSelectedCityName(matching[0].cities[0].name);
                      }
                    }
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    selectedRegion === reg
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'search' ? (
            <div>
              {searchQuery.trim() === '' ? (
                <div className="text-center py-12 text-slate-400">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">Search across 36 States & UTs and 50+ Cities in India</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for &quot;Lodhi&quot;, &quot;Cubbon&quot;, &quot;Sabarmati&quot;, or &quot;Marina Beach&quot;</p>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p className="text-sm font-medium">No Indian landmark or city matched &quot;{searchQuery}&quot;</p>
                  <button
                    type="button"
                    onClick={() => handleSelect(`${searchQuery.trim()}, India`)}
                    className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Use custom location: &quot;{searchQuery}&quot;
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {searchResults.map((res, idx) => (
                    <div
                      key={`${res.fullName}-${idx}`}
                      onClick={() => handleSelect(res.fullName)}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-emerald-500 dark:hover:border-emerald-500 cursor-pointer transition-all hover:shadow-md flex items-start gap-3 group"
                    >
                      <div className="mt-0.5 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950 transition-colors">
                        {getPointIcon(res.type, res.isEcoZone)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {res.pointName}
                          </h4>
                          {res.isEcoZone && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                              Eco Zone
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {res.cityName}, {res.stateName}
                        </p>
                        {res.baselineAqi !== undefined && (
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-[10px] text-slate-400 font-medium">
                              Typical AQI: <strong className="text-slate-700 dark:text-slate-200">{res.baselineAqi}</strong>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Hierarchy 3-Column Layout: States -> Cities -> Specific Points/Corridors */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Column 1: State / UT List (4 cols) */}
              <div className="md:col-span-4 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                  Select State / UT ({availableStates.length})
                </div>
                <div className="max-h-72 sm:max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {availableStates.map((st) => {
                    const isSelected = st.state === activeStateObj?.state;
                    return (
                      <button
                        type="button"
                        key={st.state}
                        onClick={() => {
                          setSelectedStateName(st.state);
                          if (st.cities.length > 0) {
                            setSelectedCityName(st.cities[0].name);
                          }
                        }}
                        className={`w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-l-4 border-emerald-600'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="truncate">
                          <span>{st.state}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">{st.region}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: City List (3 cols) */}
              <div className="md:col-span-3 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-900/40">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                  Select City / District
                </div>
                <div className="max-h-72 sm:max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {activeStateObj?.cities.map((ct) => {
                    const isSelected = ct.name === activeCityObj?.name;
                    return (
                      <button
                        type="button"
                        key={ct.name}
                        onClick={() => setSelectedCityName(ct.name)}
                        className={`w-full px-3 py-2.5 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-l-4 border-emerald-600'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="truncate">
                          <span>{ct.name}</span>
                          <span className="text-[10px] text-slate-400 block font-normal">
                            Avg AQI: {ct.baselineAqi}
                          </span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Specific Points & Eco Corridors (5 cols) */}
              <div className="md:col-span-5 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span>Hubs & Eco Corridors</span>
                  {activeCityObj && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      {activeCityObj.name}
                    </span>
                  )}
                </div>

                <div className="max-h-72 sm:max-h-96 overflow-y-auto p-2.5 space-y-2">
                  {/* Option to select the entire city center */}
                  {activeCityObj && (
                    <div
                      onClick={() => handleSelect(`${activeCityObj.name} Central Zone, ${activeCityObj.name}, ${activeStateObj?.state}`)}
                      className="p-2.5 rounded-xl border border-dashed border-emerald-500/80 bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 cursor-pointer transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-600" />
                        <div>
                          <strong className="text-xs text-slate-900 dark:text-white block">
                            {activeCityObj.name} (General City Center)
                          </strong>
                          <span className="text-[10px] text-slate-500">Fast default destination</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">
                        Select
                      </span>
                    </div>
                  )}

                  {activeCityObj?.points.map((pt: IndiaLocationPoint) => (
                    <div
                      key={pt.id}
                      onClick={() => handleSelect(`${pt.name}, ${activeCityObj.name}, ${activeStateObj?.state}`)}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 cursor-pointer transition-all flex items-start gap-2.5 group"
                    >
                      <div className="mt-0.5 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700">
                        {getPointIcon(pt.type, pt.isEcoZone)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {pt.name}
                          </h4>
                          {pt.isEcoZone && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold shrink-0">
                              Eco Zone
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                          <span className="capitalize">{pt.type.replace('_', ' ')}</span>
                          {pt.baselineAqi !== undefined && (
                            <span>• Baseline AQI: <strong className="text-slate-700 dark:text-slate-200">{pt.baselineAqi}</strong></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Covers all 28 States & 8 UTs of India</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
