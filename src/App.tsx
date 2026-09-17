/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { ProfileModal } from './components/common/ProfileModal';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { LiveAQIMap } from './components/map/LiveAQIMap';
import { AIPrediction } from './components/prediction/AIPrediction';
import { HealthAdvisor } from './components/health/HealthAdvisor';
import { RoutePlanner } from './components/routes/RoutePlanner';
import { ReportPollution } from './components/report/ReportPollution';
import { CommunityActions } from './components/community/CommunityActions';
import { PollutionSources } from './components/sources/PollutionSources';
import { AboutProject } from './components/about/AboutProject';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'map':
        return <LiveAQIMap />;
      case 'prediction':
        return <AIPrediction />;
      case 'health':
        return <HealthAdvisor />;
      case 'routes':
        return <RoutePlanner />;
      case 'report':
        return <ReportPollution />;
      case 'community':
        return <CommunityActions />;
      case 'sources':
        return <PollutionSources />;
      case 'about':
        return <AboutProject />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {renderActivePage()}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Header />
        <MainContent />
        <Footer />
        <ToastContainer />
        <ProfileModal />
      </div>
    </AppProvider>
  );
}
