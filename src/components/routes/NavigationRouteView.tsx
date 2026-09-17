import React, { useState, useEffect } from 'react';
import { CleanAirRoute, NavigationStep } from '../../types';
import { AQI_CATEGORIES } from '../../data/mockData';
import {
  Navigation,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  CornerUpLeft,
  CornerUpRight,
  Flag,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  ShieldCheck,
  Trees,
  Compass,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

interface NavigationRouteViewProps {
  route: CleanAirRoute;
  origin: string;
  destination: string;
  travelMode: string;
  onSelectAlternative?: (id: string) => void;
  activeStepIndex?: number;
  onStepChange?: (index: number) => void;
  isNavigating?: boolean;
  onToggleNavigation?: () => void;
}

export const NavigationRouteView: React.FC<NavigationRouteViewProps> = ({
  route,
  origin,
  destination,
  travelMode,
  activeStepIndex: controlledStepIndex,
  onStepChange,
  isNavigating: controlledIsNavigating,
  onToggleNavigation,
}) => {
  const [internalStepIndex, setInternalStepIndex] = useState<number>(0);
  const [internalIsNavigating, setInternalIsNavigating] = useState<boolean>(false);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [avoidHotspots, setAvoidHotspots] = useState<boolean>(true);

  const activeStepIndex = controlledStepIndex !== undefined ? controlledStepIndex : internalStepIndex;
  const isNavigating = controlledIsNavigating !== undefined ? controlledIsNavigating : internalIsNavigating;

  const setActiveStepIndex = (newIndex: number | ((prev: number) => number)) => {
    if (typeof newIndex === 'function') {
      const computed = newIndex(activeStepIndex);
      if (onStepChange) onStepChange(computed);
      else setInternalStepIndex(computed);
    } else {
      if (onStepChange) onStepChange(newIndex);
      else setInternalStepIndex(newIndex);
    }
  };

  const setIsNavigating = (navState: boolean) => {
    if (onToggleNavigation) onToggleNavigation();
    else setInternalIsNavigating(navState);
  };

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
      // Graceful fallback if speech API is unavailable in iframe
    }
  };

  // When step changes while navigating, announce it
  useEffect(() => {
    if (isNavigating && currentStep) {
      speakInstruction(`${currentStep.instruction}. Current segment air quality is ${currentStep.segmentCategory}`);
    }
  }, [activeStepIndex, isNavigating]);

  // Simulation timer for live navigation progression
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isNavigating) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsNavigating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 5500);
    }
    return () => clearInterval(timer);
  }, [isNavigating, steps.length]);

  const handleToggleNavigation = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      if (activeStepIndex >= steps.length - 1) {
        setActiveStepIndex(0);
      }
      speakInstruction(`Starting clean air navigation towards ${destination}. Follow the shaded eco path.`);
    } else {
      setIsNavigating(false);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleReset = () => {
    setIsNavigating(false);
    setActiveStepIndex(0);
  };

  const getManeuverIcon = (turnType: string) => {
    switch (turnType) {
      case 'turn-left':
        return <ArrowLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'turn-right':
        return <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'slight-left':
        return <CornerUpLeft className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'slight-right':
        return <CornerUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'roundabout':
        return <RotateCw className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'destination':
        return <Flag className="w-5 h-5 text-rose-500" />;
      case 'greenway-entry':
        return <Leaf className="w-5 h-5 text-emerald-500" />;
      case 'depart':
      case 'straight':
      default:
        return <ArrowUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
    }
  };

  // Progress percentage
  const progressPercent = steps.length > 1 ? Math.round((activeStepIndex / (steps.length - 1)) * 100) : 0;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Active Navigation HUD Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white shadow-lg border border-slate-700/60 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Turn-by-Turn Clean Air Guidance</span>
              </span>
              <span className="text-[10px] text-slate-400 font-semibold capitalize">
                Mode: {travelMode}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{origin.split(',')[0]}</span>
              <span className="text-emerald-400">→</span>
              <span>{destination.split(',')[0]}</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {route.title} • {route.distanceKm} km • Approx. {route.durationMins} mins
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Voice Announcement Toggle */}
            <button
              type="button"
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (next && currentStep) {
                  speakInstruction(`Audio navigation enabled. ${currentStep.instruction}`);
                }
              }}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                voiceEnabled
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
              title={voiceEnabled ? 'Mute voice instructions' : 'Enable voice turn instructions'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
            </button>

            {/* Live Navigation Play/Pause Button */}
            <button
              type="button"
              onClick={handleToggleNavigation}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
                isNavigating
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
              }`}
            >
              {isNavigating ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Nav</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>{activeStepIndex === 0 ? 'Start Live Navigation' : 'Resume Nav'}</span>
                </>
              )}
            </button>

            {/* Reset Nav */}
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs transition-colors"
              title="Reset to departure point"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
          <span>Route Progress: {progressPercent}% Completed</span>
          <span>Step {activeStepIndex + 1} of {steps.length}</span>
        </div>
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Current Turn Focus Box (Large GPS View) */}
      {currentStep && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 shrink-0">
                {getManeuverIcon(currentStep.turnType)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Current Navigation Maneuver ({currentStep.distanceMeters}m)
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: AQI_CATEGORIES[currentStep.segmentCategory]?.color || '#10B981' }}
                  >
                    AQI {currentStep.segmentAqi} • {currentStep.segmentCategory}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {currentStep.instruction}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  <span>On {currentStep.roadName}</span>
                  {currentStep.landmarksNearby && (
                    <span>• Near {currentStep.landmarksNearby}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={activeStepIndex === 0}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                disabled={activeStepIndex === steps.length - 1}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold disabled:opacity-40 flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span>Next Step</span>
                <SkipForward className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Micro-climate / Air Quality Advisory */}
          {currentStep.airQualityAlert && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">{currentStep.airQualityAlert}</span>
            </div>
          )}
        </div>
      )}

      {/* Environmental & Health Insights Along This Route */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <Trees className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Tree Canopy</span>
          <strong className="text-sm font-bold text-slate-900 dark:text-white">
            {route.type === 'cleanest' ? '78% Shaded' : route.type === 'balanced' ? '45% Shaded' : '12% Shaded'}
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <Leaf className="w-4 h-4 text-cyan-600 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">PM2.5 Avoidance</span>
          <strong className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {route.type === 'cleanest' ? '68% Less Inhaled' : route.type === 'balanced' ? '38% Less Inhaled' : '0% (Direct Arterial)'}
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <Clock className="w-4 h-4 text-amber-500 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Clean Transit Time</span>
          <strong className="text-sm font-bold text-slate-900 dark:text-white">
            {route.durationMins} Mins
          </strong>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <Sparkles className="w-4 h-4 text-indigo-500 mx-auto mb-1" />
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">Exposure Index</span>
          <strong
            className="text-sm font-bold"
            style={{ color: route.type === 'cleanest' ? '#10B981' : route.type === 'balanced' ? '#F59E0B' : '#EF4444' }}
          >
            {route.exposureScore}/100 ({route.type === 'cleanest' ? 'Minimal Risk' : route.type === 'balanced' ? 'Moderate Risk' : 'High Risk'})
          </strong>
        </div>
      </div>

      {/* Complete Step-by-Step Directions Table / List */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Complete Navigation Itinerary ({steps.length} Segments)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Click any instruction to inspect segment air quality telemetry
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Greenway segments prioritized</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {steps.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            const catMeta = AQI_CATEGORIES[step.segmentCategory] || AQI_CATEGORIES.Good;

            return (
              <div
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`py-3.5 px-3 rounded-xl cursor-pointer transition-all flex items-start gap-3.5 ${
                  isCurrent
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 shadow-sm'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {/* Number / Maneuver Icon */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-emerald-600 text-white shadow'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-slate-200 dark:bg-slate-700 my-1" />
                  )}
                </div>

                {/* Instruction details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className={`text-xs font-semibold leading-relaxed ${isCurrent ? 'text-emerald-950 dark:text-emerald-200 font-bold' : 'text-slate-800 dark:text-slate-200'}`}>
                      {step.instruction}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-500">
                        {step.distanceMeters} m
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded text-white shrink-0"
                        style={{ backgroundColor: catMeta.color }}
                      >
                        AQI {step.segmentAqi}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{step.roadName}</span>
                    {step.isGreenCorridor && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                        <Leaf className="w-3 h-3" />
                        <span>Canopy Protected</span>
                      </span>
                    )}
                    {step.landmarksNearby && (
                      <span>• Landmark: {step.landmarksNearby}</span>
                    )}
                  </div>

                  {step.airQualityAlert && isCurrent && (
                    <p className="mt-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-100/60 dark:bg-emerald-950/60 p-2 rounded-lg">
                      {step.airQualityAlert}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
