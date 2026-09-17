import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, Navigation, AlertOctagon, PieChart, ArrowRight } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { setActiveTab } = useApp();

  const actions = [
    {
      id: 'quick-health',
      title: 'Check Health Risk',
      subtitle: 'Personalized vulnerability evaluation',
      icon: HeartPulse,
      color: 'from-rose-500 to-pink-600',
      bgLight: 'bg-rose-50/80 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/40',
      textColor: 'text-rose-700 dark:text-rose-300',
      iconColor: 'text-rose-600 dark:text-rose-400',
      targetTab: 'health',
    },
    {
      id: 'quick-route',
      title: 'Find Cleaner Route',
      subtitle: 'Lowest air exposure commute paths',
      icon: Navigation,
      color: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/40',
      textColor: 'text-emerald-700 dark:text-emerald-300',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'routes',
    },
    {
      id: 'quick-report',
      title: 'Report Pollution',
      subtitle: 'Log real-time smoke & dust hazards',
      icon: AlertOctagon,
      color: 'from-amber-500 to-orange-600',
      bgLight: 'bg-amber-50/80 dark:bg-amber-950/20 border-amber-200/80 dark:border-amber-900/40',
      textColor: 'text-amber-700 dark:text-amber-300',
      iconColor: 'text-amber-600 dark:text-amber-400',
      targetTab: 'report',
    },
    {
      id: 'quick-sources',
      title: 'View Pollution Sources',
      subtitle: 'Urban emission analytics & policies',
      icon: PieChart,
      color: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50/80 dark:bg-blue-950/20 border-blue-200/80 dark:border-blue-900/40',
      textColor: 'text-blue-700 dark:text-blue-300',
      iconColor: 'text-blue-600 dark:text-blue-400',
      targetTab: 'sources',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            id={act.id}
            onClick={() => {
              setActiveTab(act.targetTab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`group text-left p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${act.bgLight}`}
          >
            <div className="flex items-start justify-between w-full mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center ${act.iconColor} group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="p-1 rounded-full text-slate-400 group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-bold ${act.textColor} group-hover:underline`}>
                {act.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                {act.subtitle}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
