export type AQICategory = 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';

export interface PollutantDetail {
  code: string;
  name: string;
  value: number;
  unit: string;
  status: string;
  trend: 'up' | 'down' | 'neutral';
  percentChange: number;
  lastUpdated: string;
  safeThreshold: number;
  description: string;
}

export interface CityLocation {
  id: string;
  name: string;
  district: string;
  aqi: number;
  category: AQICategory;
  pm25: number;
  pm10: number;
  co: number;
  no2: number;
  o3: number;
  so2: number;
  mainSource: 'Traffic Emissions' | 'Industrial Zone' | 'Construction Dust' | 'Mixed Urban' | 'Port Marine';
  lastUpdated: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  temp: number;
  humidity: number;
  windSpeed: number;
  dominantPollutant: string;
}

export interface HourlyDataPoint {
  hour: string;
  aqi: number;
  pm25: number;
  pm10: number;
  no2: number;
}

export interface PredictionDataPoint {
  timestamp: string;
  label: string;
  historicalAqi?: number;
  currentAqi?: number;
  predictedAqi: number;
  confidenceMin: number;
  confidenceMax: number;
  status: AQICategory;
  weatherFactor: string;
}

export interface HealthAssessmentInput {
  ageGroup: 'child' | 'adult' | 'senior';
  activityLevel: 'low' | 'moderate' | 'high';
  sensitivity: 'none' | 'asthma' | 'respiratory' | 'heart';
}

export interface HealthAssessmentResult {
  riskScore: number; // 0 - 100
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  badgeColor: string;
  primaryAdvice: string;
  outdoorDuration: string;
  maskRecommendation: string;
  hydrationReminder: string;
  roomVentilationAdvice: string;
  symptomsToWatch: string[];
}

export type TravelMode = 'walking' | 'cycling' | 'two-wheeler' | 'car' | 'public-transport';

export interface CleanAirRoute {
  id: string;
  type: 'fastest' | 'cleanest' | 'balanced';
  title: string;
  distanceKm: number;
  durationMins: number;
  exposureScore: number; // lower is better
  averageAqi: number;
  aqiCategory: AQICategory;
  description: string;
  keyFeature: string;
  routeHighlights: string[];
  co2Grams: number;
}

export interface PollutionReport {
  id: string;
  type: 'Vehicle Smoke' | 'Garbage Burning' | 'Construction Dust' | 'Industrial Smoke' | 'Sewage Odour' | 'Other';
  location: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  imageUrl?: string;
  imageName?: string;
  status: 'Submitted' | 'Under Review' | 'Resolved';
  timestamp: string;
  coordinates?: { x: number; y: number };
}

export interface CommunityAction {
  id: string;
  title: string;
  description: string;
  category: 'Transport' | 'Energy' | 'Civic' | 'Nature' | 'Greening' | 'Mobility' | 'Monitoring' | 'Education' | 'Indoor Air' | string;
  impactText: string;
  co2SavedKg: number;
  points: number;
  iconName: string;
  completed: boolean;
  completedDate?: string;
  isJoined?: boolean;
  participants?: number;
  targetParticipants?: number;
  date?: string;
  impact?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredPoints: number;
  criteria: string;
}

export interface PollutionSource {
  id: string;
  name: string;
  percentage: number;
  color: string;
  icon: string;
  summary: string;
  description?: string;
  primaryPollutants: string[];
  primaryPollutant?: string;
  peakTimes: string;
  peakHours?: string;
  urbanHotspots: string;
  mitigationStrategies: string[];
  caseStudy: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success' | 'tip';
  timestamp: string;
  read: boolean;
}
