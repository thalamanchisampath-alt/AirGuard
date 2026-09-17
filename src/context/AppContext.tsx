import React, { createContext, useContext, useState, useEffect } from 'react';
import { CityLocation, PollutionReport, CommunityAction, AppNotification, PollutionSource } from '../types';
import { CITY_LOCATIONS, INITIAL_REPORTS, INITIAL_COMMUNITY_ACTIONS, INITIAL_NOTIFICATIONS, POLLUTION_SOURCES } from '../data/mockData';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface ExposureInputs {
  outdoorsHours: number;
  travelMode: 'walking' | 'cycling' | 'two-wheeler' | 'car' | 'public-transport';
  useMask: boolean;
}

interface AppContextType {
  currentLocation: CityLocation;
  setCurrentLocation: (loc: CityLocation) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  reports: PollutionReport[];
  addReport: (report: {
    type: PollutionReport['type'];
    location: string;
    description: string;
    severity: PollutionReport['severity'];
    imageName?: string;
    imageUrl?: string;
  }) => string;
  communityActions: CommunityAction[];
  toggleCommunityAction: (id: string) => void;
  userPoints: number;
  co2SavedTotalKg: number;
  completedActionsCount: number;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  exposureInputs: ExposureInputs;
  setExposureInputs: React.Dispatch<React.SetStateAction<ExposureInputs>>;
  dailyExposureScore: number;
  selectedSourceForModal: PollutionSource | null;
  setSelectedSourceForModal: (source: PollutionSource | null) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('airguard_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('airguard_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('airguard_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Location state
  const [currentLocation, setCurrentLocation] = useState<CityLocation>(CITY_LOCATIONS[0]);

  // Reports state with localStorage persistence
  const [reports, setReports] = useState<PollutionReport[]>(() => {
    try {
      const saved = localStorage.getItem('airguard_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('airguard_reports', JSON.stringify(reports));
    } catch (e) {
      console.error('Failed to persist reports', e);
    }
  }, [reports]);

  // Community actions state with localStorage persistence
  const [communityActions, setCommunityActions] = useState<CommunityAction[]>(() => {
    try {
      const saved = localStorage.getItem('airguard_community_actions');
      return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_ACTIONS;
    } catch {
      return INITIAL_COMMUNITY_ACTIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('airguard_community_actions', JSON.stringify(communityActions));
    } catch (e) {
      console.error('Failed to persist actions', e);
    }
  }, [communityActions]);

  // Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);

  // Modals & Popovers
  const [selectedSourceForModal, setSelectedSourceForModal] = useState<PollutionSource | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Add report handler
  const addReport = (reportData: {
    type: PollutionReport['type'];
    location: string;
    description: string;
    severity: PollutionReport['severity'];
    imageName?: string;
    imageUrl?: string;
  }): string => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const complaintId = `AG-2026-${randomNum}`;

    // Compute coordinate near current location or default
    const xCoord = Math.min(85, Math.max(15, currentLocation.coordinates.x + (Math.random() * 12 - 6)));
    const yCoord = Math.min(85, Math.max(15, currentLocation.coordinates.y + (Math.random() * 12 - 6)));

    const newReport: PollutionReport = {
      id: complaintId,
      ...reportData,
      status: 'Submitted',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      coordinates: { x: Math.round(xCoord), y: Math.round(yCoord) },
    };

    setReports((prev) => [newReport, ...prev]);

    // Also inject into notifications
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Pollution Report Submitted: ${complaintId}`,
      message: `Your report on ${reportData.type} at ${reportData.location} has been registered and dispatched to the Municipal Control Center.`,
      type: 'success',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`Complaint ${complaintId} registered successfully!`, 'success');
    return complaintId;
  };

  // Toggle community action
  const toggleCommunityAction = (id: string) => {
    setCommunityActions((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          const nextCompleted = !act.completed;
          if (nextCompleted) {
            showToast(`+${act.points} Eco Points! "${act.title}" completed.`, 'success');
          }
          return {
            ...act,
            completed: nextCompleted,
            completedDate: nextCompleted ? new Date().toLocaleDateString() : undefined,
          };
        }
        return act;
      })
    );
  };

  // Computed metrics from community actions
  const completedActions = communityActions.filter((a) => a.completed);
  const completedActionsCount = completedActions.length;
  const userPoints = completedActions.reduce((acc, curr) => acc + curr.points, 85); // Baseline 85 welcome points
  const co2SavedTotalKg = parseFloat(
    completedActions.reduce((acc, curr) => acc + curr.co2SavedKg, 12.4).toFixed(1)
  );

  // Notification management
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Personal Exposure Calculator state
  const [exposureInputs, setExposureInputs] = useState<ExposureInputs>({
    outdoorsHours: 2.5,
    travelMode: 'public-transport',
    useMask: false,
  });

  // Calculate daily exposure score (0 - 100)
  // Higher = more exposure / risk
  const travelModeFactors: Record<ExposureInputs['travelMode'], number> = {
    walking: 1.25,
    cycling: 1.4,
    'two-wheeler': 1.6,
    car: 0.8,
    'public-transport': 0.7,
  };

  const maskFactor = exposureInputs.useMask ? 0.35 : 1.0;
  const rawExposure =
    (currentLocation.aqi / 300) *
    (exposureInputs.outdoorsHours / 8) *
    travelModeFactors[exposureInputs.travelMode] *
    maskFactor *
    100;
  const dailyExposureScore = Math.min(100, Math.max(5, Math.round(rawExposure)));

  return (
    <AppContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        isDarkMode,
        toggleDarkMode,
        activeTab,
        setActiveTab,
        reports,
        addReport,
        communityActions,
        toggleCommunityAction,
        userPoints,
        co2SavedTotalKg,
        completedActionsCount,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        toasts,
        showToast,
        exposureInputs,
        setExposureInputs,
        dailyExposureScore,
        selectedSourceForModal,
        setSelectedSourceForModal,
        isProfileModalOpen,
        setIsProfileModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
