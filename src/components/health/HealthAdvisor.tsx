import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HealthAssessmentInput, HealthAssessmentResult } from '../../types';
import {
  HeartPulse,
  User,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Droplets,
  Wind,
  Home,
  AlertTriangle,
  Info,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const HealthAdvisor: React.FC = () => {
  const { currentLocation, showToast } = useApp();

  const [inputs, setInputs] = useState<HealthAssessmentInput>({
    ageGroup: 'adult',
    activityLevel: 'moderate',
    sensitivity: 'none',
  });

  const [hasCalculated, setHasCalculated] = useState<boolean>(true);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  // Health risk calculator based on current AQI and user inputs
  const calculateResult = (): HealthAssessmentResult => {
    const aqi = currentLocation.aqi;

    // Weight coefficients
    let ageMultiplier = 1.0;
    if (inputs.ageGroup === 'child') ageMultiplier = 1.35;
    if (inputs.ageGroup === 'senior') ageMultiplier = 1.45;

    let activityMultiplier = 1.0;
    if (inputs.activityLevel === 'low') activityMultiplier = 0.85;
    if (inputs.activityLevel === 'high') activityMultiplier = 1.45;

    let sensitivityMultiplier = 1.0;
    if (inputs.sensitivity === 'asthma') sensitivityMultiplier = 1.6;
    if (inputs.sensitivity === 'respiratory') sensitivityMultiplier = 1.5;
    if (inputs.sensitivity === 'heart') sensitivityMultiplier = 1.65;

    // Base risk calculation (0 - 100)
    const baseScore = (aqi / 350) * 60;
    const computedRaw = baseScore * ageMultiplier * activityMultiplier * sensitivityMultiplier;
    const finalScore = Math.min(100, Math.max(8, Math.round(computedRaw)));

    let riskLevel: HealthAssessmentResult['riskLevel'] = 'Low';
    let badgeColor = '#10B981';

    if (finalScore <= 30) {
      riskLevel = 'Low';
      badgeColor = '#10B981';
    } else if (finalScore <= 60) {
      riskLevel = 'Moderate';
      badgeColor = '#F59E0B';
    } else if (finalScore <= 85) {
      riskLevel = 'High';
      badgeColor = '#F97316';
    } else {
      riskLevel = 'Very High';
      badgeColor = '#EF4444';
    }

    // Outdoor duration advice
    let outdoorDuration = 'Normal outdoor exposure acceptable (unrestricted)';
    if (riskLevel === 'Moderate') outdoorDuration = 'Limit intense outdoor exercise to < 45–60 minutes';
    if (riskLevel === 'High') outdoorDuration = 'Restrict outdoor activity to < 20–30 minutes, avoid rush hours';
    if (riskLevel === 'Very High') outdoorDuration = 'Avoid outdoor exertion entirely; remain indoors with filtration';

    // Mask recommendation
    let maskRecommendation = 'No mask strictly required for healthy individuals';
    if (riskLevel === 'Moderate') maskRecommendation = 'Standard surgical or cloth mask recommended if sensitive';
    if (riskLevel === 'High') maskRecommendation = 'Fitted N95 or KN95 particulate respirator recommended outdoors';
    if (riskLevel === 'Very High') maskRecommendation = 'Strict N95 / FFP2 mask mandatory for any outdoor exposure';

    // Hydration reminder
    let hydrationReminder = 'Drink 2.0–2.5 L of water to keep upper airway mucosal lining moist and clear';
    if (riskLevel === 'High' || riskLevel === 'Very High') {
      hydrationReminder = 'Increase fluids to 3.0 L; warm herbal fluids help soothe particulate bronchial irritation';
    }

    // Ventilation advice
    let roomVentilationAdvice = 'Natural ventilation permitted during off-peak morning hours';
    if (aqi > 150) {
      roomVentilationAdvice = 'Keep windows closed; operate HEPA air purifiers on continuous recirculate mode';
    }

    // Primary customized advice
    let primaryAdvice = `Current AQI of ${aqi} in ${currentLocation.name} presents low health risk for your profile.`;
    if (riskLevel === 'Moderate') {
      primaryAdvice = `Moderate atmospheric particulates detected (${aqi} AQI). Sensitive individuals should take precautionary rests during strenuous exercise.`;
    } else if (riskLevel === 'High') {
      primaryAdvice = `Unhealthy air quality (${aqi} AQI). Heightened inflammatory stress likely for ${inputs.ageGroup}s with ${inputs.sensitivity !== 'none' ? inputs.sensitivity : 'extended exposure'}.`;
    } else if (riskLevel === 'Very High') {
      primaryAdvice = `Severe air pollution warning (${aqi} AQI). Elevated cardiovascular & respiratory strain. Follow immediate protective protocols.`;
    }

    const symptomsToWatch = [
      'Coughing or throat tickle',
      'Shortness of breath / wheezing',
      'Watery, stinging eyes',
      'Mild fatigue or headache',
    ];

    return {
      riskScore: finalScore,
      riskLevel,
      badgeColor,
      primaryAdvice,
      outdoorDuration,
      maskRecommendation,
      hydrationReminder,
      roomVentilationAdvice,
      symptomsToWatch,
    };
  };

  const result = calculateResult();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setHasCalculated(true);
      showToast('Personalized health risk profile updated!', 'success');
    }, 400);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Personal Health Risk Advisor
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Epidemiological assessment aligned with WHO & EPA outdoor air quality indices
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl text-slate-600 dark:text-slate-300">
          <span>Active Location:</span>
          <strong className="text-slate-900 dark:text-white">{currentLocation.name}</strong>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">({currentLocation.aqi} AQI)</span>
        </div>
      </div>

      {/* Main Form and Assessment Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Assessment Input Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600" />
            <span>Health & Vulnerability Profile</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
            Configure your demographic and activity baseline for hyper-targeted recommendations.
          </p>

          <form onSubmit={handleCalculate} className="space-y-4">
            {/* Age Group */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Age Group
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'child', label: 'Child', sub: '< 14 yrs' },
                  { id: 'adult', label: 'Adult', sub: '15-64 yrs' },
                  { id: 'senior', label: 'Senior', sub: '65+ yrs' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        ageGroup: item.id as HealthAssessmentInput['ageGroup'],
                      }))
                    }
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      inputs.ageGroup === item.id
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] opacity-70">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Outdoor Activity Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Outdoor Activity Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', label: 'Low', sub: 'Indoor / Driving' },
                  { id: 'moderate', label: 'Moderate', sub: 'Brisk Walk' },
                  { id: 'high', label: 'High', sub: 'Running / Sport' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        activityLevel: item.id as HealthAssessmentInput['activityLevel'],
                      }))
                    }
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      inputs.activityLevel === item.id
                        ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-500 text-cyan-800 dark:text-cyan-300 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs">{item.label}</div>
                    <div className="text-[10px] opacity-70">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Health Sensitivity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Pre-existing Sensitivity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'No Known Sensitivity' },
                  { id: 'asthma', label: 'Asthma / Bronchial' },
                  { id: 'respiratory', label: 'Respiratory / COPD' },
                  { id: 'heart', label: 'Heart / Cardiovascular' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() =>
                      setInputs((prev) => ({
                        ...prev,
                        sensitivity: item.id as HealthAssessmentInput['sensitivity'],
                      }))
                    }
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all ${
                      inputs.sensitivity === item.id
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 font-bold shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-xs leading-snug">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                id="check-health-risk-btn"
                disabled={isCalculating}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                <HeartPulse className="w-4 h-4" />
                <span>{isCalculating ? 'Evaluating Biomarkers...' : 'Check My Health Risk'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Assessment Results Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
            {/* Top Score and Risk Status Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                {/* Circular Risk Score Indicator */}
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="currentColor"
                      className="text-slate-100 dark:text-slate-800"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={result.badgeColor}
                      strokeWidth="10"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * result.riskScore) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white leading-none">
                      {result.riskScore}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">/100</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Health Vulnerability Index
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                      {result.riskLevel} Risk
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: result.badgeColor }}
                    >
                      Score {result.riskScore}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Adjusted for current AQI {currentLocation.aqi} & individual profile
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Advice */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Personalized Recommendation
              </h4>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {result.primaryAdvice}
              </p>
            </div>

            {/* Actionable Health Guideline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                  <Clock className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>Outdoor Activity Limit</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {result.outdoorDuration}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                  <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Mask Guidance</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {result.maskRecommendation}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                  <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Hydration Protocol</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {result.hydrationReminder}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
                  <Home className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Indoor Ventilation</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {result.roomVentilationAdvice}
                </p>
              </div>
            </div>

            {/* Warning Symptoms to Watch */}
            <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
              <h5 className="text-xs font-bold text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Symptoms To Monitor
              </h5>
              <div className="grid grid-cols-2 gap-1 text-[11px] text-amber-800 dark:text-amber-400">
                {result.symptomsToWatch.map((sym, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Disclaimer as required */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                "This tool provides general awareness information and is not a medical diagnosis."
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
