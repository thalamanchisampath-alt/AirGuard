import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Award, ShieldCheck, Sparkles, Wind, CheckCircle2, TrendingDown, Leaf } from 'lucide-react';
import { BADGES } from '../../data/mockData';

export const ProfileModal: React.FC = () => {
  const {
    isProfileModalOpen,
    setIsProfileModalOpen,
    userPoints,
    co2SavedTotalKg,
    completedActionsCount,
    dailyExposureScore,
    reports,
  } = useApp();

  if (!isProfileModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 overflow-hidden">
        {/* Header pattern */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 opacity-90" />
        
        {/* Close Button */}
        <button
          onClick={() => setIsProfileModalOpen(false)}
          className="absolute top-4 right-4 z-10 p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Card Content */}
        <div className="relative pt-6">
          <div className="flex items-end gap-4 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center text-white font-bold text-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500">
              <Wind className="w-10 h-10 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Alex Chen</h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Citizen Scientist
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AirGuard Contributor #AG-9428 • Hackathon Edition
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 my-5">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Eco Points</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{userPoints}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Top 5% in sector</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">CO₂ Averted</span>
              <span className="text-xl font-black text-teal-600 dark:text-teal-400">{co2SavedTotalKg} <span className="text-xs font-normal">kg</span></span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Through eco transit</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Exposure</span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">{dailyExposureScore}/100</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Daily score</span>
            </div>
          </div>

          {/* Badges Progress */}
          <div className="mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center justify-between">
              <span>Earned Badges & Credentials</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {userPoints >= 150 ? '3 of 4' : '2 of 4'} Unlocked
              </span>
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {BADGES.map((badge) => {
                const isUnlocked = badge.unlocked || userPoints >= badge.requiredPoints;
                return (
                  <div
                    key={badge.id}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 ${
                      isUnlocked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                        : 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200/60 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isUnlocked ? 'bg-emerald-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                      }`}
                    >
                      {badge.id === 'badge-champion' && <Award className="w-4 h-4" />}
                      {badge.id === 'badge-commuter' && <Sparkles className="w-4 h-4" />}
                      {badge.id === 'badge-reporter' && <ShieldCheck className="w-4 h-4" />}
                      {badge.id === 'badge-guardian' && <Leaf className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{badge.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{badge.criteria}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick activity summary */}
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
            <div className="flex justify-between">
              <span>Completed Community Actions:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{completedActionsCount} tasks</span>
            </div>
            <div className="flex justify-between">
              <span>Submitted Pollution Reports:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{reports.length} reports</span>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
