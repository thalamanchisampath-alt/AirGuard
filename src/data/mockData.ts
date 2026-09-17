import { CityLocation, HourlyDataPoint, PredictionDataPoint, PollutionReport, CommunityAction, Badge, PollutionSource, AppNotification } from '../types';

export const AQI_CATEGORIES = {
  Good: { range: '0–50', color: '#10B981', bg: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-400', label: 'Good', border: 'border-emerald-500' },
  Satisfactory: { range: '51–100', color: '#06B6D4', bg: 'bg-cyan-500', text: 'text-cyan-700 dark:text-cyan-400', label: 'Satisfactory', border: 'border-cyan-500' },
  Moderate: { range: '101–200', color: '#F59E0B', bg: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-400', label: 'Moderate', border: 'border-amber-500' },
  Poor: { range: '201–300', color: '#F97316', bg: 'bg-orange-500', text: 'text-orange-700 dark:text-orange-400', label: 'Poor', border: 'border-orange-500' },
  'Very Poor': { range: '301–400', color: '#EF4444', bg: 'bg-red-500', text: 'text-red-700 dark:text-red-400', label: 'Very Poor', border: 'border-red-500' },
  Severe: { range: '401–500', color: '#881337', bg: 'bg-rose-900', text: 'text-rose-900 dark:text-rose-400', label: 'Severe', border: 'border-rose-900' },
};

export function getCategoryFromAQI(aqi: number): 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe' {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Satisfactory';
  if (aqi <= 200) return 'Moderate';
  if (aqi <= 300) return 'Poor';
  if (aqi <= 400) return 'Very Poor';
  return 'Severe';
}

export const CITY_LOCATIONS: CityLocation[] = [
  {
    id: 'metro-center',
    name: 'Downtown Metro Center',
    district: 'Central Commercial District',
    aqi: 142,
    category: 'Moderate',
    pm25: 58.4,
    pm10: 112.8,
    co: 1.8,
    no2: 46.2,
    o3: 32.5,
    so2: 12.1,
    mainSource: 'Traffic Emissions',
    lastUpdated: '2 mins ago',
    coordinates: { x: 50, y: 48, lat: 40.7128, lng: -74.006 },
    temp: 24,
    humidity: 58,
    windSpeed: 8.2,
    dominantPollutant: 'PM2.5',
  },
  {
    id: 'green-lake',
    name: 'Green Lake Botanical Park',
    district: 'North Eco Sanctuary',
    aqi: 38,
    category: 'Good',
    pm25: 11.2,
    pm10: 24.5,
    co: 0.4,
    no2: 12.0,
    o3: 21.3,
    so2: 3.2,
    mainSource: 'Mixed Urban',
    lastUpdated: 'Just now',
    coordinates: { x: 28, y: 22, lat: 40.7306, lng: -74.015 },
    temp: 22,
    humidity: 64,
    windSpeed: 11.5,
    dominantPollutant: 'O₃',
  },
  {
    id: 'port-riverside',
    name: 'Port Riverside & Freight Terminal',
    district: 'South Cargo Logistics Port',
    aqi: 224,
    category: 'Poor',
    pm25: 98.6,
    pm10: 184.2,
    co: 3.4,
    no2: 68.9,
    o3: 41.0,
    so2: 28.5,
    mainSource: 'Port Marine',
    lastUpdated: '5 mins ago',
    coordinates: { x: 74, y: 76, lat: 40.6892, lng: -74.044 },
    temp: 25,
    humidity: 62,
    windSpeed: 6.4,
    dominantPollutant: 'NO₂',
  },
  {
    id: 'tech-corridor',
    name: 'Silicon Corridor Innovation Park',
    district: 'Westside Hi-Tech Hub',
    aqi: 76,
    category: 'Satisfactory',
    pm25: 26.3,
    pm10: 48.7,
    co: 0.9,
    no2: 24.1,
    o3: 28.0,
    so2: 5.1,
    mainSource: 'Traffic Emissions',
    lastUpdated: '1 min ago',
    coordinates: { x: 22, y: 65, lat: 40.718, lng: -74.02 },
    temp: 23,
    humidity: 55,
    windSpeed: 9.8,
    dominantPollutant: 'PM2.5',
  },
  {
    id: 'industrial-east',
    name: 'Sunrise Industrial Estate',
    district: 'East Manufacturing Ring',
    aqi: 312,
    category: 'Very Poor',
    pm25: 148.0,
    pm10: 275.4,
    co: 4.8,
    no2: 84.6,
    o3: 54.2,
    so2: 44.0,
    mainSource: 'Industrial Zone',
    lastUpdated: '4 mins ago',
    coordinates: { x: 86, y: 35, lat: 40.74, lng: -73.98 },
    temp: 27,
    humidity: 49,
    windSpeed: 4.5,
    dominantPollutant: 'PM10',
  },
  {
    id: 'old-town',
    name: 'Heritage Old Town Square',
    district: 'Historic Cultural Sector',
    aqi: 94,
    category: 'Satisfactory',
    pm25: 33.1,
    pm10: 62.0,
    co: 1.1,
    no2: 31.4,
    o3: 25.6,
    so2: 6.8,
    mainSource: 'Mixed Urban',
    lastUpdated: '6 mins ago',
    coordinates: { x: 42, y: 38, lat: 40.725, lng: -74.0 },
    temp: 23,
    humidity: 60,
    windSpeed: 7.5,
    dominantPollutant: 'PM2.5',
  },
  {
    id: 'airport-district',
    name: 'AeroHub International Corridor',
    district: 'North East Aviation Zone',
    aqi: 168,
    category: 'Moderate',
    pm25: 72.5,
    pm10: 135.0,
    co: 2.2,
    no2: 52.8,
    o3: 39.4,
    so2: 18.2,
    mainSource: 'Construction Dust',
    lastUpdated: '3 mins ago',
    coordinates: { x: 68, y: 18, lat: 40.76, lng: -73.99 },
    temp: 24,
    humidity: 53,
    windSpeed: 10.2,
    dominantPollutant: 'PM10',
  }
];

export const HOURLY_24H_DATA: HourlyDataPoint[] = [
  { hour: '00:00', aqi: 82, pm25: 29.1, pm10: 54.2, no2: 24.1 },
  { hour: '02:00', aqi: 74, pm25: 25.3, pm10: 48.0, no2: 20.4 },
  { hour: '04:00', aqi: 68, pm25: 22.0, pm10: 42.5, no2: 18.0 },
  { hour: '06:00', aqi: 95, pm25: 36.4, pm10: 68.2, no2: 32.5 },
  { hour: '08:00', aqi: 158, pm25: 64.8, pm10: 124.0, no2: 52.1 }, // morning peak
  { hour: '10:00', aqi: 172, pm25: 70.2, pm10: 138.5, no2: 58.4 },
  { hour: '12:00', aqi: 148, pm25: 61.0, pm10: 119.0, no2: 44.0 },
  { hour: '14:00', aqi: 132, pm25: 54.5, pm10: 104.2, no2: 38.6 },
  { hour: '16:00', aqi: 155, pm25: 63.8, pm10: 122.4, no2: 48.2 },
  { hour: '18:00', aqi: 184, pm25: 78.4, pm10: 146.0, no2: 64.5 }, // evening commute peak
  { hour: '20:00', aqi: 162, pm25: 67.2, pm10: 128.5, no2: 54.0 },
  { hour: '22:00', aqi: 142, pm25: 58.4, pm10: 112.8, no2: 46.2 }, // current time
];

export const INITIAL_PREDICTIONS: PredictionDataPoint[] = [
  { timestamp: '-12h', label: '10:00 AM', historicalAqi: 172, predictedAqi: 172, confidenceMin: 165, confidenceMax: 178, status: 'Moderate', weatherFactor: 'High traffic' },
  { timestamp: '-8h', label: '02:00 PM', historicalAqi: 132, predictedAqi: 132, confidenceMin: 128, confidenceMax: 138, status: 'Moderate', weatherFactor: 'Midday dispersion' },
  { timestamp: '-4h', label: '06:00 PM', historicalAqi: 184, predictedAqi: 184, confidenceMin: 175, confidenceMax: 190, status: 'Moderate', weatherFactor: 'Evening rush hour' },
  { timestamp: '0h', label: 'Now (10 PM)', historicalAqi: 142, currentAqi: 142, predictedAqi: 142, confidenceMin: 139, confidenceMax: 145, status: 'Moderate', weatherFactor: 'Moderate breeze' },
  { timestamp: '+1h', label: '11:00 PM', predictedAqi: 128, confidenceMin: 118, confidenceMax: 138, status: 'Moderate', weatherFactor: 'Decreasing traffic flow' },
  { timestamp: '+6h', label: '04:00 AM', predictedAqi: 88, confidenceMin: 76, confidenceMax: 98, status: 'Satisfactory', weatherFactor: 'Overnight clearing & dew deposition' },
  { timestamp: '+12h', label: '10:00 AM', predictedAqi: 165, confidenceMin: 148, confidenceMax: 180, status: 'Moderate', weatherFactor: 'Morning peak traffic spike' },
  { timestamp: '+24h', label: 'Tomorrow Night', predictedAqi: 115, confidenceMin: 98, confidenceMax: 132, status: 'Moderate', weatherFactor: 'Anticipated 40% shower probability' },
];

export const INITIAL_REPORTS: PollutionReport[] = [
  {
    id: 'AG-2026-9041',
    type: 'Vehicle Smoke',
    location: 'Arterial Ring Road, Exit 14',
    description: 'Heavy diesel transport convoy spewing dense black soot exhaust during morning jam.',
    severity: 'High',
    status: 'Under Review',
    timestamp: '2026-09-16 18:45',
    coordinates: { x: 52, y: 55 },
  },
  {
    id: 'AG-2026-8924',
    type: 'Garbage Burning',
    location: 'Near Old Canal Waste Transfer Point',
    description: 'Illegal plastic and mixed municipal waste open incineration creating noxious white plume.',
    severity: 'High',
    status: 'Resolved',
    timestamp: '2026-09-16 11:20',
    coordinates: { x: 38, y: 72 },
  },
  {
    id: 'AG-2026-8812',
    type: 'Construction Dust',
    location: 'Metro Rail Phase 3 Extension Site',
    description: 'Uncovered aggregate gravel mounds without required water sprinkler dust suppression.',
    severity: 'Medium',
    status: 'Submitted',
    timestamp: '2026-09-16 09:15',
    coordinates: { x: 67, y: 25 },
  },
  {
    id: 'AG-2026-8750',
    type: 'Industrial Smoke',
    location: 'East Industrial Gate 4 Chimney',
    description: 'Sulfurous odour and thick yellow flare exhaust detected past permitted operating hours.',
    severity: 'High',
    status: 'Under Review',
    timestamp: '2026-09-15 22:30',
    coordinates: { x: 88, y: 38 },
  },
];

export const INITIAL_COMMUNITY_ACTIONS: CommunityAction[] = [
  {
    id: 'action-1',
    title: 'Use Public Transit',
    description: 'Take the subway, electric tram, or hybrid commuter bus for daily office trips.',
    category: 'Transport',
    impactText: 'Averts ~2.4 kg CO₂ and 45g PM2.5 per commute trip',
    co2SavedKg: 2.4,
    points: 50,
    iconName: 'Bus',
    completed: false,
  },
  {
    id: 'action-2',
    title: 'Zero Vehicle Idling',
    description: 'Turn off engine at railway crossings, school drop-offs, and signals over 45 seconds.',
    category: 'Transport',
    impactText: 'Saves 0.8 kg CO₂ and eliminates toxic ground-level benzene',
    co2SavedKg: 0.8,
    points: 25,
    iconName: 'TimerReset',
    completed: false,
  },
  {
    id: 'action-3',
    title: 'Urban Tree Adoption',
    description: 'Plant or care for canopy saplings along local residential sidewalk borders.',
    category: 'Nature',
    impactText: 'Absorbs ~22 kg CO₂/year and captures 1.4 kg micro-particulates',
    co2SavedKg: 22.0,
    points: 100,
    iconName: 'Trees',
    completed: false,
  },
  {
    id: 'action-4',
    title: 'Report Illegal Open Burning',
    description: 'Submit an immediate geolocated photo report on AirGuard when you spot open refuse fires.',
    category: 'Civic',
    impactText: 'Prevents acute localized PM2.5 spikes reaching up to 600+ AQI',
    co2SavedKg: 5.0,
    points: 75,
    iconName: 'Flame',
    completed: false,
  },
  {
    id: 'action-5',
    title: 'Zero Household Waste Burning',
    description: 'Opt for municipal organic composting and segregating dry recyclable plastics.',
    category: 'Civic',
    impactText: 'Avoids 3.2 kg soot and eliminates carcinogenic dioxins',
    co2SavedKg: 3.2,
    points: 60,
    iconName: 'Recycle',
    completed: false,
  },
  {
    id: 'action-6',
    title: 'Cycle or Walk Short Trips',
    description: 'Use bicycle or pedestrian greenways for grocery errands under 3 km.',
    category: 'Transport',
    impactText: 'Eliminates 1.8 kg CO₂ and promotes cardiovascular resilience',
    co2SavedKg: 1.8,
    points: 40,
    iconName: 'Bike',
    completed: false,
  },
];

export const BADGES: Badge[] = [
  {
    id: 'badge-champion',
    name: 'Clean Air Champion',
    description: 'Completed 5 or more community eco-actions in your urban sector.',
    icon: 'Award',
    unlocked: false,
    requiredPoints: 150,
    criteria: 'Earn 150+ eco points',
  },
  {
    id: 'badge-commuter',
    name: 'Green Commuter',
    description: 'Adopted zero-emission or mass transit alternatives for travel.',
    icon: 'Sparkles',
    unlocked: false,
    requiredPoints: 75,
    criteria: 'Complete transit & cycling actions',
  },
  {
    id: 'badge-reporter',
    name: 'Pollution Reporter',
    description: 'Submitted an active verified citizen pollution hazard report.',
    icon: 'ShieldCheck',
    unlocked: true,
    requiredPoints: 0,
    criteria: 'Submit 1 civic pollution alert',
  },
  {
    id: 'badge-guardian',
    name: 'Urban Guardian',
    description: 'Maintained low personal exposure and logged 300+ green points.',
    icon: 'Compass',
    unlocked: false,
    requiredPoints: 300,
    criteria: 'Achieve 300 total community points',
  }
];

export const POLLUTION_SOURCES: PollutionSource[] = [
  {
    id: 'source-vehicular',
    name: 'Vehicular Emissions',
    percentage: 34,
    color: '#3B82F6', // Blue
    icon: 'Car',
    summary: 'Tailpipe exhaust from heavy commercial diesel trucks, passenger cars, and motorcycles accounts for more than a third of urban PM2.5 and primary nitrogen dioxide.',
    primaryPollutants: ['NO₂', 'PM2.5', 'CO', 'Black Carbon', 'Volatile Organics'],
    peakTimes: '07:30 - 10:30 & 17:30 - 20:30 (Workday Commute Spikes)',
    urbanHotspots: 'Highway ring intersections, central downtown crossings, tunnel portals, logistics freight gates',
    mitigationStrategies: [
      'Transition municipal bus fleets and taxis to 100% battery electric',
      'Deploy intelligent adaptive traffic signal synchronization to reduce idle choke points',
      'Establish Low Emission Zones (LEZ) with congestion toll gating in central commercial cores',
      'Incentivize protected electric bike and micro-mobility express lanes'
    ],
    caseStudy: 'After implementing Low Emission Zone cameras, London documented a 44% decline in roadside nitrogen dioxide concentrations within central zones over four years.'
  },
  {
    id: 'source-industrial',
    name: 'Industrial Emissions',
    percentage: 26,
    color: '#8B5CF6', // Purple
    icon: 'Factory',
    summary: 'Smokestack emissions from chemical processing units, metal manufacturing, brick kilns, and captive thermal generators flanking the municipal boundaries.',
    primaryPollutants: ['SO₂', 'NO₂', 'PM10', 'Heavy Metal particulates'],
    peakTimes: 'Continuous baseline with night flare releases between 22:00 - 05:00',
    urbanHotspots: 'Sunrise Industrial Estate, Port Logistics Ring, Chemical Corridor',
    mitigationStrategies: [
      'Continuous Emission Monitoring Systems (CEMS) connected directly to municipal regulators',
      'Mandatory high-efficiency electrostatic precipitators and wet flue scrubbers',
      'Shift industrial process steam generation from coal to piped natural gas or green hydrogen',
      'Buffer zone reforestation belts around industrial perimeters'
    ],
    caseStudy: 'Real-time telemetry and immediate automatic regulatory fines in Shenzhen led to a 32% reduction in industrial sulfur dioxide emissions within 18 months.'
  },
  {
    id: 'source-construction',
    name: 'Construction Dust',
    percentage: 18,
    color: '#F59E0B', // Amber
    icon: 'HardHat',
    summary: 'Fugitive mineral dust blown from excavation pits, demolition sites, uncapped cement mixers, and unpaved arterial construction corridors.',
    primaryPollutants: ['PM10 (Coarse Silica)', 'Respirable dust', 'Suspended solids'],
    peakTimes: '09:00 - 17:00 during active heavy machinery earthworks',
    urbanHotspots: 'Metro rail extension zones, high-rise residential projects, airport expansion',
    mitigationStrategies: [
      'Automated anti-smog mist cannon spraying during earth-moving hours',
      'Mandatory green safety netting and acoustic windbreak hoardings over 6m high',
      'Wheel-washing automated stations at all construction truck exit gates',
      'Strict covering of aggregate transport trucks with secured tarpaulins'
    ],
    caseStudy: 'Mandatory mist cannons and wheel wash bays in Singapore reduced construction-site perimeter PM10 levels by over 50% across 220 active infrastructure sites.'
  },
  {
    id: 'source-waste',
    name: 'Waste Burning',
    percentage: 14,
    color: '#EF4444', // Red
    icon: 'Flame',
    summary: 'Open bonfire disposal of municipal municipal solid waste, leaf litter, plastic wrappings, and landfill surface fires generating toxic acrid fumes.',
    primaryPollutants: ['PM2.5', 'Dioxins & Furans', 'Black Carbon', 'Carbon Monoxide'],
    peakTimes: 'Early morning (05:00 - 07:00) and post-sunset (19:00 - 22:00)',
    urbanHotspots: 'Suburban waste transit stations, undeveloped open plots, canal banks',
    mitigationStrategies: [
      'Decentralized doorstep bio-waste composting and material recovery facilities',
      'Drone thermal infrared night patrols over known illegal dumping grounds',
      'Community reporting reward bounties via AirGuard citizen reporting system',
      'Elimination of open transit dumpsites in favor of enclosed sorting centers'
    ],
    caseStudy: 'Drone patrol surveillance coupled with zero-tolerance municipal spot fines in Bogota dropped open burning complaints by 68% in priority southern districts.'
  },
  {
    id: 'source-household',
    name: 'Household Pollution',
    percentage: 8,
    color: '#10B981', // Emerald
    icon: 'Home',
    summary: 'Domestic fossil fuel usage, unvented kerosene cookers, biomass fire heating in informal settlements, and solvent volatile organic vapors.',
    primaryPollutants: ['Indoor PM2.5', 'Carbon Monoxide', 'Formaldehyde', 'VOCs'],
    peakTimes: '06:00 - 08:30 & 18:30 - 21:30 during meal prep and heating hours',
    urbanHotspots: 'High-density uninsulated neighborhoods, old residential tenements',
    mitigationStrategies: [
      'Subsidized clean LPG and induction cooking electrification programs',
      'Municipal insulation retrofit grants for low-income residential buildings',
      'Public awareness campaigns on proper indoor cross-ventilation during cooking',
      'Banning high-VOC consumer aerosol paints and varnishes'
    ],
    caseStudy: 'Subsidized induction stoves distributed across 15,000 households in Santiago decreased indoor winter PM2.5 concentrations by 72% in participating homes.'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Pollution Spike Warning',
    message: 'Downtown Metro Center AQI elevated to 142 (Moderate). Consider wearing an N95 mask if outdoors for over 45 minutes.',
    type: 'alert',
    timestamp: '10 mins ago',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'AI Smart Alert: Safe Outdoor Window',
    message: 'Forecasting model predicts air quality in Green Lake Park will remain Good (AQI 38) for the next 4 hours.',
    type: 'success',
    timestamp: '35 mins ago',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Citizen Report Update',
    message: 'Report AG-2026-8924 (Garbage Burning) marked as Resolved by Municipal Green Squad.',
    type: 'info',
    timestamp: '2 hours ago',
    read: true,
  },
  {
    id: 'notif-4',
    title: 'Weather Impact Forecast',
    message: 'Predicted 3 AM light rainfall is expected to wash out up to 35% of suspended PM10 particles.',
    type: 'tip',
    timestamp: '4 hours ago',
    read: true,
  }
];
