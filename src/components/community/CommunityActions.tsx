import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityAction } from '../../types';
import confetti from 'canvas-confetti';
import {
  Users,
  Award,
  Trophy,
  CheckCircle2,
  TreePine,
  Car,
  School,
  Wind,
  Bus,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Heart,
  PlusCircle,
  Clock
} from 'lucide-react';

export const CommunityActions: React.FC = () => {
  const {
    communityActions,
    joinCommunityAction,
    toggleCommunityAction,
    userProfile,
    userPoints,
    showToast,
    openProfileModal,
    setIsProfileModalOpen,
  } = useApp();

  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Transport', 'Nature', 'Civic', 'Energy'];

  const filteredActions = communityActions.filter(
    (action) => filterCategory === 'All' || action.category === filterCategory
  );

  const handleJoin = (action: CommunityAction) => {
    const isAlreadyJoined = action.completed || action.isJoined;
    if (isAlreadyJoined) {
      showToast(`You have already completed or joined "${action.title}"!`, 'info');
      return;
    }

    if (joinCommunityAction) {
      joinCommunityAction(action.id);
    } else if (toggleCommunityAction) {
      toggleCommunityAction(action.id);
    }

    showToast(`You joined "${action.title}"! +${action?.points || 100} Eco Points awarded!`, 'success');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {
      // ignore
    }
  };

  const getActionIcon = (cat: string) => {
    switch (cat) {
      case 'Nature':
      case 'Greening':
        return <TreePine className="w-5 h-5 text-emerald-500" />;
      case 'Transport':
      case 'Mobility':
        return <Bus className="w-5 h-5 text-blue-500" />;
      case 'Civic':
      case 'Monitoring':
        return <Wind className="w-5 h-5 text-cyan-500" />;
      case 'Education':
        return <School className="w-5 h-5 text-amber-500" />;
      default:
        return <Users className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Community Actions & Clean Air Challenge
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Grassroots urban air quality initiatives and civic impact gamification
          </p>
        </div>

        {/* User Eco Status Trigger */}
        <button
          onClick={() => {
            if (openProfileModal) {
              openProfileModal();
            } else if (setIsProfileModalOpen) {
              setIsProfileModalOpen(true);
            }
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/20 text-xs text-slate-800 dark:text-slate-200 hover:scale-105 transition-all"
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>My Eco Score: <strong>{userProfile?.points ?? userPoints ?? 85} Pts</strong></span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Rank {userProfile?.rank || '#14'}</span>
        </button>
      </div>

      {/* Gamification Highlight: Active Clean Air Challenge Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-950 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Weekly Civic Hackathon Challenge</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              7-Day Clean Commute Sprint
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl leading-relaxed">
              Ditch solo car trips for walking, biking, or electric transit. Prevent smog spikes, lower city PM2.5, and claim your verified <strong>"Clean Air Pioneer"</strong> digital credential.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
              <div>
                <span className="text-emerald-300/80 block text-[10px]">Challenge Progress</span>
                <span className="font-bold text-base text-white">4 of 7 Days Logged</span>
              </div>
              <div className="w-px h-8 bg-emerald-700/50" />
              <div>
                <span className="text-emerald-300/80 block text-[10px]">Community CO₂ Averted</span>
                <span className="font-bold text-base text-emerald-300">1,840 kg CO₂</span>
              </div>
              <div className="w-px h-8 bg-emerald-700/50" />
              <div>
                <span className="text-emerald-300/80 block text-[10px]">Active Challengers</span>
                <span className="font-bold text-base text-white">412 Citizens</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center space-y-3">
            <Award className="w-12 h-12 text-amber-300 animate-bounce" />
            <div>
              <h4 className="font-bold text-sm text-white">Unlock Badge: Green Commuter</h4>
              <p className="text-[11px] text-emerald-100/70">Complete 3 more days of clean transit</p>
            </div>
            <button
              onClick={() => {
                showToast('Today\'s clean transit logged! +50 Eco Points earned!', 'success');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              Log Today's Green Commute
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong>{filteredActions.length}</strong> active initiatives
        </span>
      </div>

      {/* Community Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredActions.map((action, idx) => {
          const participantsCount = action.participants ?? (120 + idx * 35);
          const targetCount = action.targetParticipants ?? 250;
          const progressPct = Math.min(100, Math.round((participantsCount / targetCount) * 100));
          const isDone = action.completed || action.isJoined;

          return (
            <div
              key={action.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                      {getActionIcon(action.category)}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {action.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {action.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                    {action.date || '+ ' + action.points + ' Pts'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                  {action.description}
                </p>

                {/* Impact metric highlight */}
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/40 text-xs flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[11px]">{action.impactText || action.impact}</span>
                </div>

                {/* Participant progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Volunteers / Participants</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {participantsCount} / {targetCount} ({progressPct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Join / Participated Button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleJoin(action)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isDone
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? 'Joined • Challenge Active' : `Join Civic Initiative (+${action.points} Pts)`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
