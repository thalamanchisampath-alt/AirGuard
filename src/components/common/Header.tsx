import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  MapPin,
  Bell,
  Sun,
  Moon,
  User,
  Menu,
  X,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  Wind,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CITY_LOCATIONS, AQI_CATEGORIES } from '../../data/mockData';

export const Header: React.FC = () => {
  const {
    currentLocation,
    setCurrentLocation,
    isDarkMode,
    toggleDarkMode,
    activeTab,
    setActiveTab,
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    userPoints,
    setIsProfileModalOpen,
  } = useApp();

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locRef.current && !locRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'map', label: 'Live AQI Map' },
    { id: 'prediction', label: 'Pollution Prediction' },
    { id: 'health', label: 'Health Advisor' },
    { id: 'routes', label: 'Smart Route Planner' },
    { id: 'report', label: 'Report Pollution' },
    { id: 'community', label: 'Community Actions' },
    { id: 'sources', label: 'Pollution Sources' },
    { id: 'about', label: 'About Project' },
  ];

  const currentCategoryMeta = AQI_CATEGORIES[currentLocation.category];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      {/* Top Bar: Brand + Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Wind className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-700 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
                    AirGuard
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40">
                    Smart Urban AI
                  </span>
                </div>
                <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Urban Air Quality Intelligence Platform
                </p>
              </div>
            </button>
          </div>

          {/* Right Controls: Location, Notifs, Profile, DarkMode */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Location Selector */}
            <div className="relative" ref={locRef}>
              <button
                id="location-selector-btn"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 transition-colors"
                title="Select City Station"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="max-w-[110px] sm:max-w-[150px] truncate">{currentLocation.name}</span>
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: currentCategoryMeta.color }}
                  title={`AQI ${currentLocation.aqi}`}
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* Location Dropdown Menu */}
              {showLocationDropdown && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      City Sensor Stations
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {CITY_LOCATIONS.length} Active
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1 divide-y divide-slate-100 dark:divide-slate-800/60">
                    {CITY_LOCATIONS.map((loc) => {
                      const cat = AQI_CATEGORIES[loc.category];
                      const isSelected = loc.id === currentLocation.id;
                      return (
                        <button
                          key={loc.id}
                          onClick={() => {
                            setCurrentLocation(loc);
                            setShowLocationDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="pr-2">
                            <p className="text-xs font-medium leading-tight">{loc.name}</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                              {loc.district}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: cat.color }}
                            >
                              {loc.aqi}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Menu */}
            <div className="relative" ref={notifRef}>
              <button
                id="notifications-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-ping" />
                )}
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        Smart AI Alerts & Notifications
                      </span>
                      {unreadNotificationsCount > 0 && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                          {unreadNotificationsCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 py-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationRead(notif.id)}
                          className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
                            notif.read
                              ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                              : 'bg-emerald-50/50 dark:bg-emerald-950/20 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            {notif.type === 'alert' && (
                              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            )}
                            {notif.type === 'success' && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            )}
                            {notif.type === 'info' && (
                              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            )}
                            {notif.type === 'tip' && (
                              <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                {notif.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                                {notif.message}
                              </p>
                              <span className="text-[10px] text-slate-400 mt-1 block">
                                {notif.timestamp}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Button */}
            <button
              id="profile-btn"
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
              title="User Profile & Hackathon Stats"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-[11px] font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline-block font-semibold text-xs text-emerald-700 dark:text-emerald-400">
                {userPoints} pts
              </span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 -mb-px overflow-x-auto py-1 border-t border-slate-100 dark:border-slate-800/60 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-600/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Active</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
