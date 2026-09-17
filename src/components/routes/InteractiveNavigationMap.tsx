import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { CleanAirRoute, NavigationStep } from '../../types';
import {
  generateRouteCoordinates,
  resolveLocationLatLng,
} from '../../data/indiaLocationsData';
import { AQI_CATEGORIES } from '../../data/mockData';
import {
  Navigation,
  Layers,
  Maximize2,
  Minimize2,
  Crosshair,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Trees,
  AlertTriangle,
  Compass,
  MapPin,
  ChevronRight,
  Info
} from 'lucide-react';

interface InteractiveNavigationMapProps {
  route: CleanAirRoute;
  origin: string;
  destination: string;
  travelMode: string;
  activeStepIndex?: number;
  onStepChange?: (index: number) => void;
  isSimulatingNav?: boolean;
  onToggleSimulation?: () => void;
}

type MapLayerTheme = 'voyager' | 'satellite' | 'dark' | 'standard';

export const InteractiveNavigationMap: React.FC<InteractiveNavigationMapProps> = ({
  route,
  origin,
  destination,
  travelMode,
  activeStepIndex = 0,
  onStepChange,
  isSimulatingNav = false,
  onToggleSimulation,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markerPuckRef = useRef<L.Marker | null>(null);

  const [mapTheme, setMapTheme] = useState<MapLayerTheme>('voyager');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);

  // Compute route coordinates and intermediate milestones
  const { coords, waypoints } = useMemo(() => {
    return generateRouteCoordinates(origin, destination, route.type);
  }, [origin, destination, route.type]);

  const originCoords = useMemo(() => resolveLocationLatLng(origin), [origin]);
  const destCoords = useMemo(() => resolveLocationLatLng(destination), [destination]);

  const steps: NavigationStep[] = route.steps || [];
  const currentStep = steps[activeStepIndex] || steps[0];

  // Speech synthesis for turn announcements
  const speakInstruction = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore iframe speech issues
    }
  };

  // Announce turn changes
  useEffect(() => {
    if (voiceEnabled && currentStep) {
      speakInstruction(`${currentStep.instruction}. Current segment air quality is ${currentStep.segmentCategory}`);
    }
  }, [activeStepIndex, voiceEnabled]);

  // Tile layer URLs
  const getTileUrl = (theme: MapLayerTheme) => {
    switch (theme) {
      case 'satellite':
        return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      case 'dark':
        return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      case 'standard':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      case 'voyager':
      default:
        return 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up if already initialized
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const startLat = originCoords.lat;
    const startLng = originCoords.lng;

    const map = L.map(mapContainerRef.current, {
      center: [startLat, startLng],
      zoom: 13,
      zoomControl: false,
    });

    // Custom zoom control in bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const tile = L.tileLayer(getTileUrl(mapTheme), {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map);

    tileLayerRef.current = tile;

    const lg = L.layerGroup().addTo(map);
    layerGroupRef.current = lg;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Run on mount

  // Update Tile Layer when theme changes
  useEffect(() => {
    if (!mapInstanceRef.current || !tileLayerRef.current) return;
    tileLayerRef.current.setUrl(getTileUrl(mapTheme));
  }, [mapTheme]);

  // Draw Polylines, Markers, and Waypoints when Route or Coords Change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const lg = layerGroupRef.current;
    if (!map || !lg || coords.length === 0) return;

    lg.clearLayers();

    // 1. Route Polyline Glow (Shadow/Aura)
    const glowColor =
      route.type === 'cleanest'
        ? '#10b981'
        : route.type === 'fastest'
        ? '#ef4444'
        : '#f59e0b';

    L.polyline(coords, {
      color: glowColor,
      weight: 12,
      opacity: 0.35,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(lg);

    // 2. Core Route Polyline
    const mainPolyline = L.polyline(coords, {
      color: glowColor,
      weight: 5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
    }).addTo(lg);

    // Fit bounds smoothly to contain the whole route
    const bounds = L.latLngBounds(coords);
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });

    // 3. Custom Origin Icon (Green Pin)
    const originIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          position: relative;
          width: 32px;
          height: 32px;
          background: #10B981;
          border: 3px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
        ">
          <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
          <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #10B981;
          "></div>
        </div>
      `,
      iconSize: [32, 36],
      iconAnchor: [16, 36],
      popupAnchor: [0, -36],
    });

    const startPoint = coords[0];
    const originMarker = L.marker(startPoint, { icon: originIcon }).addTo(lg);
    originMarker.bindPopup(`
      <div style="font-family: system-ui, sans-serif; padding: 4px;">
        <strong style="color: #047857; font-size: 13px; display: block;">Starting Point</strong>
        <span style="font-size: 11px; color: #334155;">${origin}</span>
        <div style="margin-top: 4px; font-size: 10px; font-weight: bold; color: #059669;">
          Departure Zone • Monitored Station
        </div>
      </div>
    `);

    // 4. Custom Destination Icon (Red Pin)
    const destIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="
          position: relative;
          width: 32px;
          height: 32px;
          background: #EF4444;
          border: 3px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
        ">
          <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
          <div style="
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #EF4444;
          "></div>
        </div>
      `,
      iconSize: [32, 36],
      iconAnchor: [16, 36],
      popupAnchor: [0, -36],
    });

    const endPoint = coords[coords.length - 1];
    const destMarker = L.marker(endPoint, { icon: destIcon }).addTo(lg);
    destMarker.bindPopup(`
      <div style="font-family: system-ui, sans-serif; padding: 4px;">
        <strong style="color: #B91C1C; font-size: 13px; display: block;">Destination</strong>
        <span style="font-size: 11px; color: #334155;">${destination}</span>
        <div style="margin-top: 4px; font-size: 10px; font-weight: bold; color: #10B981;">
          Arrival Point • ${route.distanceKm} km total
        </div>
      </div>
    `);

    // 5. Waypoints along the trajectory
    waypoints.forEach((wp, idx) => {
      const wpColor = wp.aqi <= 50 ? '#10B981' : wp.aqi <= 100 ? '#3B82F6' : wp.aqi <= 200 ? '#F59E0B' : '#EF4444';
      const wpIcon = L.divIcon({
        className: 'custom-waypoint-icon',
        html: `
          <div style="
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: ${wpColor};
            border: 2px solid white;
            color: white;
            font-size: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          ">
            ${idx + 1}
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
        popupAnchor: [0, -11],
      });

      const wpMarker = L.marker([wp.lat, wp.lng], { icon: wpIcon }).addTo(lg);
      wpMarker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; padding: 4px;">
          <strong style="font-size: 12px; color: #0f172a; display: block;">${wp.label}</strong>
          <div style="font-size: 11px; margin-top: 2px; color: #475569;">
            Segment Air Quality: <strong style="color: ${wpColor};">AQI ${wp.aqi}</strong>
          </div>
          <div style="font-size: 10px; color: #64748b; margin-top: 2px;">
            ${route.type === 'cleanest' ? 'Tree-canopy protected passage' : 'Commercial corridor'}
          </div>
        </div>
      `);
    });

    // 6. Avoided Hotspot Warning Markers (if enabled)
    if (showHotspots && route.type === 'cleanest') {
      // Add a simulated avoided pollution hotspot nearby
      const midCoord = coords[Math.floor(coords.length / 2)];
      const hotspotLat = midCoord[0] - 0.015;
      const hotspotLng = midCoord[1] + 0.018;

      const hotspotIcon = L.divIcon({
        className: 'custom-hotspot-marker',
        html: `
          <div style="
            background: rgba(239, 68, 68, 0.95);
            color: white;
            padding: 3px 8px;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: 800;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 2px 8px rgba(239,68,68,0.4);
            border: 1.5px solid white;
          ">
            <span>⚠️</span>
            <span>Avoided Choke (AQI 290)</span>
          </div>
        `,
        iconSize: [140, 24],
        iconAnchor: [70, 12],
      });

      const hotspotMarker = L.marker([hotspotLat, hotspotLng], { icon: hotspotIcon }).addTo(lg);
      hotspotMarker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; padding: 4px;">
          <strong style="color: #dc2626; font-size: 12px; display: block;">⚠️ Avoided Pollution Choke Point</strong>
          <p style="font-size: 11px; color: #475569; margin: 4px 0 0 0;">
            Major ring-road truck intersection with intense diesel soot and resuspension. Your clean route circumnavigates this area via the protected botanical buffer.
          </p>
        </div>
      `);
    }

    // 7. Dynamic GPS Vehicle/User Puck Marker
    const puckIcon = L.divIcon({
      className: 'custom-gps-puck',
      html: `
        <div style="
          position: relative;
          width: 28px;
          height: 28px;
          background: #0284C7;
          border: 3px solid #ffffff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 0 6px rgba(2, 132, 199, 0.3), 0 4px 12px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        ">
          <div style="
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-bottom: 9px solid white;
            transform: rotate(45deg);
          "></div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const puckMarker = L.marker(startPoint, { icon: puckIcon, zIndexOffset: 1000 }).addTo(lg);
    markerPuckRef.current = puckMarker;
  }, [coords, waypoints, route.type, showHotspots, origin, destination]);

  // Animate GPS Puck when activeStepIndex changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const puck = markerPuckRef.current;
    if (!map || !puck || coords.length === 0 || steps.length === 0) return;

    // Calculate approximate coordinate index corresponding to step
    const stepRatio = steps.length > 1 ? activeStepIndex / (steps.length - 1) : 0;
    const targetCoordIndex = Math.min(
      Math.round(stepRatio * (coords.length - 1)),
      coords.length - 1
    );
    const targetCoord = coords[targetCoordIndex];

    if (targetCoord) {
      puck.setLatLng([targetCoord[0], targetCoord[1]]);

      // If live navigating, gently pan map to follow the vehicle
      if (isSimulatingNav) {
        map.panTo([targetCoord[0], targetCoord[1]], { animate: true, duration: 1.2 });
      }
    }
  }, [activeStepIndex, coords, steps.length, isSimulatingNav]);

  const handleFitBounds = () => {
    if (!mapInstanceRef.current || coords.length === 0) return;
    const bounds = L.latLngBounds(coords);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-900 shadow-md overflow-hidden relative transition-all duration-300 ${
        isFullscreen ? 'fixed inset-2 z-50 rounded-2xl shadow-2xl flex flex-col' : 'w-full h-[520px] sm:h-[600px]'
      }`}
    >
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full relative z-0" />

      {/* Top Floating Navigation HUD Card */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-md z-10 pointer-events-auto">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 backdrop-blur-md border border-slate-700/70 shadow-xl text-white">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Compass className="w-3 h-3" />
              <span>Turn {activeStepIndex + 1} of {steps.length}</span>
            </span>

            {/* Segment AQI pill */}
            {currentStep && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                style={{
                  backgroundColor:
                    AQI_CATEGORIES[currentStep.segmentCategory]?.color || '#10B981',
                }}
              >
                AQI {currentStep.segmentAqi} • {currentStep.segmentCategory}
              </span>
            )}
          </div>

          {/* Maneuver Instruction */}
          <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
            {currentStep?.instruction || 'Proceed along the designated clean corridor'}
          </h4>

          <div className="flex items-center justify-between text-[11px] text-slate-300 mt-2 pt-2 border-t border-slate-800">
            <span className="text-slate-400">
              Next in: <strong className="text-white">{currentStep?.distanceMeters || 500}m</strong>
            </span>
            <span className="text-emerald-400 font-semibold truncate max-w-[200px]">
              {currentStep?.roadName || 'Eco Greenway'}
            </span>
          </div>

          {/* Stepper Buttons inside HUD */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800 gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onStepChange?.(Math.max(activeStepIndex - 1, 0))}
                disabled={activeStepIndex === 0}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
                title="Previous step"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onStepChange?.(Math.min(activeStepIndex + 1, steps.length - 1))}
                disabled={activeStepIndex === steps.length - 1}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-colors"
                title="Next step"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onToggleSimulation}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  isSimulatingNav
                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isSimulatingNav ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Simulate</span>
                  </>
                )}
              </button>
            </div>

            {/* Voice guidance button */}
            <button
              type="button"
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (next && currentStep) {
                  speakInstruction(currentStep.instruction);
                }
              }}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                voiceEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title={voiceEnabled ? 'Voice guide active' : 'Turn voice on'}
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Top-Right Control Buttons (Layer Switcher, Re-center, Fullscreen) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col items-end gap-2 pointer-events-auto">
        {/* Map Layers Palette Toggle */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 shadow-lg text-xs">
          {[
            { id: 'voyager', label: 'Clean Street' },
            { id: 'satellite', label: 'Satellite' },
            { id: 'dark', label: 'Night' },
            { id: 'standard', label: 'OSM' },
          ].map((theme) => (
            <button
              type="button"
              key={theme.id}
              onClick={() => setMapTheme(theme.id as MapLayerTheme)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                mapTheme === theme.id
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Action icons stack */}
        <div className="flex items-center gap-2">
          {/* Avoided Hotspots Toggle */}
          <button
            type="button"
            onClick={() => setShowHotspots(!showHotspots)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 shadow-md ${
              showHotspots
                ? 'bg-emerald-600/90 text-white border-emerald-500'
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="Toggle avoided high pollution zones overlay"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eco Filters</span>
          </button>

          {/* Re-center / Fit bounds */}
          <button
            type="button"
            onClick={handleFitBounds}
            className="p-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 shadow-md transition-colors"
            title="Fit route to screen"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={handleToggleFullscreen}
            className="p-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 shadow-md transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Open Fullscreen Navigation Map'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Floating Stats Bar */}
      <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-auto z-10 pointer-events-auto">
        <div className="p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl text-white flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full animate-ping"
              style={{
                backgroundColor:
                  route.type === 'cleanest'
                    ? '#10B981'
                    : route.type === 'fastest'
                    ? '#EF4444'
                    : '#F59E0B',
              }}
            />
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Active Path</span>
              <strong className="text-white capitalize">{route.type} Route ({route.distanceKm} km)</strong>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-700" />

          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Est. Duration</span>
            <strong className="text-emerald-400">{route.durationMins} mins</strong>
          </div>

          <div className="h-6 w-px bg-slate-700" />

          <div>
            <span className="text-[10px] text-slate-400 block font-bold uppercase">Average AQI</span>
            <strong className="text-white">{route.averageAqi} ({route.aqiCategory})</strong>
          </div>

          <div className="hidden md:block h-6 w-px bg-slate-700" />

          <div className="hidden md:block">
            <span className="text-[10px] text-slate-400 block font-bold uppercase">PM2.5 Avoided</span>
            <strong className="text-emerald-400">
              {route.type === 'cleanest' ? '68% Less Inhaled' : route.type === 'balanced' ? '38% Less Inhaled' : '0%'}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};
