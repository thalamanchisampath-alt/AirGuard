import { IndiaStateInfo, NavigationStep, AQICategory } from '../types';

export const ALL_INDIA_STATES_DATA: IndiaStateInfo[] = [
  // =================== NORTH INDIA ===================
  {
    state: 'Delhi (NCT)',
    capital: 'New Delhi',
    type: 'Union Territory',
    region: 'North India',
    cities: [
      {
        name: 'New Delhi / Central Delhi',
        state: 'Delhi (NCT)',
        region: 'North India',
        lat: 28.6139,
        lng: 77.2090,
        tier: 1,
        baselineAqi: 245,
        points: [
          { id: 'del-cp', name: 'Connaught Place Central Radial', type: 'commercial', baselineAqi: 210 },
          { id: 'del-lodhi', name: 'Lodhi Gardens Heritage Eco Track', type: 'botanical_park', baselineAqi: 85, isEcoZone: true },
          { id: 'del-ndls', name: 'New Delhi Railway Junction', type: 'transit_hub', baselineAqi: 260 },
          { id: 'del-rajpath', name: 'Kartavya Path Tree Boulevard', type: 'heritage', baselineAqi: 110, isEcoZone: true },
          { id: 'del-aiims', name: 'AIIMS Medical & University Campus', type: 'hospital', baselineAqi: 190 },
        ],
      },
      {
        name: 'South Delhi',
        state: 'Delhi (NCT)',
        region: 'North India',
        lat: 28.5355,
        lng: 77.2100,
        tier: 1,
        baselineAqi: 195,
        points: [
          { id: 'del-sanjay', name: 'Sanjay Van Urban Forest Greenway', type: 'botanical_park', baselineAqi: 62, isEcoZone: true },
          { id: 'del-nehru', name: 'Nehru Place IT Commercial Hub', type: 'tech_park', baselineAqi: 230 },
          { id: 'del-hauzkhas', name: 'Hauz Khas Deer Park & Lake Trail', type: 'riverfront_lake', baselineAqi: 75, isEcoZone: true },
          { id: 'del-saket', name: 'Saket City Centre Corridor', type: 'commercial', baselineAqi: 180 },
        ],
      },
      {
        name: 'East Delhi',
        state: 'Delhi (NCT)',
        region: 'North India',
        lat: 28.6280,
        lng: 77.2950,
        tier: 1,
        baselineAqi: 340,
        points: [
          { id: 'del-anand-vihar', name: 'Anand Vihar ISBT & Metro Hub', type: 'transit_hub', baselineAqi: 368 },
          { id: 'del-mayur', name: 'Mayur Vihar Sanjay Lake Eco Promenade', type: 'riverfront_lake', baselineAqi: 140, isEcoZone: true },
          { id: 'del-akshardham', name: 'Yamuna Riverfront Bio-Corridor', type: 'botanical_park', baselineAqi: 98, isEcoZone: true },
        ],
      },
      {
        name: 'North Delhi',
        state: 'Delhi (NCT)',
        region: 'North India',
        lat: 28.7041,
        lng: 77.1025,
        tier: 1,
        baselineAqi: 270,
        points: [
          { id: 'del-du', name: 'Delhi University North Campus Shaded Belt', type: 'heritage', baselineAqi: 110, isEcoZone: true },
          { id: 'del-kamla', name: 'Kamla Nehru Ridge Forest Trail', type: 'botanical_park', baselineAqi: 70, isEcoZone: true },
          { id: 'del-kashmere', name: 'Kashmere Gate Metro Interchange', type: 'transit_hub', baselineAqi: 295 },
        ],
      },
    ],
  },
  {
    state: 'Haryana',
    capital: 'Chandigarh',
    type: 'State',
    region: 'North India',
    cities: [
      {
        name: 'Gurugram',
        state: 'Haryana',
        region: 'North India',
        lat: 28.4595,
        lng: 77.0266,
        tier: 1,
        baselineAqi: 230,
        points: [
          { id: 'gur-cyber', name: 'Cyber Hub & DLF CyberCity', type: 'tech_park', baselineAqi: 215 },
          { id: 'gur-bio', name: 'Aravalli Biodiversity Forest Path', type: 'botanical_park', baselineAqi: 58, isEcoZone: true },
          { id: 'gur-golf', name: 'Golf Course Road Greenway Corridor', type: 'commercial', baselineAqi: 120, isEcoZone: true },
          { id: 'gur-iffco', name: 'IFFCO Chowk Metro Node', type: 'transit_hub', baselineAqi: 265 },
        ],
      },
      {
        name: 'Faridabad',
        state: 'Haryana',
        region: 'North India',
        lat: 28.4089,
        lng: 77.3178,
        tier: 2,
        baselineAqi: 260,
        points: [
          { id: 'far-suraj', name: 'Surajkund Eco Heritage Belt', type: 'botanical_park', baselineAqi: 92, isEcoZone: true },
          { id: 'far-bata', name: 'Bata Chowk Industrial Junction', type: 'commercial', baselineAqi: 280 },
          { id: 'far-badkhal', name: 'Badkhal Lake Shaded Ridge Way', type: 'riverfront_lake', baselineAqi: 115, isEcoZone: true },
        ],
      },
      {
        name: 'Panipat',
        state: 'Haryana',
        region: 'North India',
        lat: 29.3909,
        lng: 76.9635,
        tier: 2,
        baselineAqi: 285,
        points: [
          { id: 'pan-gt', name: 'GT Road Commercial Corridor', type: 'transit_hub', baselineAqi: 310 },
          { id: 'pan-hali', name: 'Hali Park Shaded Green Trail', type: 'botanical_park', baselineAqi: 120, isEcoZone: true },
        ],
      },
      {
        name: 'Ambala',
        state: 'Haryana',
        region: 'North India',
        lat: 30.3782,
        lng: 76.7767,
        tier: 3,
        baselineAqi: 145,
        points: [
          { id: 'amb-cantt', name: 'Ambala Cantt Railway Junction', type: 'transit_hub', baselineAqi: 175 },
          { id: 'amb-subhash', name: 'Subhash Chandra Bose Park Loop', type: 'botanical_park', baselineAqi: 75, isEcoZone: true },
        ],
      },
      {
        name: 'Karnal',
        state: 'Haryana',
        region: 'North India',
        lat: 29.6857,
        lng: 76.9905,
        tier: 3,
        baselineAqi: 190,
        points: [
          { id: 'kar-karna', name: 'Karna Lake Eco Walking Promenade', type: 'riverfront_lake', baselineAqi: 88, isEcoZone: true },
          { id: 'kar-sector', name: 'Karnal City Centre Junction', type: 'commercial', baselineAqi: 210 },
        ],
      },
    ],
  },
  {
    state: 'Punjab',
    capital: 'Chandigarh',
    type: 'State',
    region: 'North India',
    cities: [
      {
        name: 'Ludhiana',
        state: 'Punjab',
        region: 'North India',
        lat: 30.9010,
        lng: 75.8573,
        tier: 2,
        baselineAqi: 240,
        points: [
          { id: 'lud-pau', name: 'PAU Agricultural University Green Campus', type: 'botanical_park', baselineAqi: 75, isEcoZone: true },
          { id: 'lud-clock', name: 'Chaura Bazar Clock Tower Junction', type: 'transit_hub', baselineAqi: 290 },
          { id: 'lud-feroze', name: 'Ferozepur Road Boulevard Track', type: 'commercial', baselineAqi: 195 },
        ],
      },
      {
        name: 'Amritsar',
        state: 'Punjab',
        region: 'North India',
        lat: 31.6340,
        lng: 74.8723,
        tier: 2,
        baselineAqi: 165,
        points: [
          { id: 'amr-golden', name: 'Golden Temple Heritage Pedestrian Zone', type: 'heritage', baselineAqi: 95, isEcoZone: true },
          { id: 'amr-company', name: 'Company Bagh Shaded Botanical Gardens', type: 'botanical_park', baselineAqi: 68, isEcoZone: true },
          { id: 'amr-junction', name: 'Amritsar Central Railway Station', type: 'transit_hub', baselineAqi: 185 },
        ],
      },
      {
        name: 'Mohali (SAS Nagar)',
        state: 'Punjab',
        region: 'North India',
        lat: 30.7046,
        lng: 76.7179,
        tier: 2,
        baselineAqi: 110,
        points: [
          { id: 'moh-it', name: 'QuarkCity & Sector 67 IT Corridor', type: 'tech_park', baselineAqi: 125 },
          { id: 'moh-rose', name: 'Silvi Park & Shaded Green Belts', type: 'botanical_park', baselineAqi: 50, isEcoZone: true },
        ],
      },
      {
        name: 'Jalandhar',
        state: 'Punjab',
        region: 'North India',
        lat: 31.3260,
        lng: 75.5762,
        tier: 2,
        baselineAqi: 195,
        points: [
          { id: 'jal-model', name: 'Model Town Shaded Market Walk', type: 'commercial', baselineAqi: 155 },
          { id: 'jal-canto', name: 'Jalandhar Cantt Woodland Corridor', type: 'botanical_park', baselineAqi: 78, isEcoZone: true },
        ],
      },
    ],
  },
  {
    state: 'Chandigarh',
    capital: 'Chandigarh',
    type: 'Union Territory',
    region: 'North India',
    cities: [
      {
        name: 'Chandigarh City',
        state: 'Chandigarh',
        region: 'North India',
        lat: 30.7333,
        lng: 76.7794,
        tier: 2,
        baselineAqi: 72,
        points: [
          { id: 'chd-sukhna', name: 'Sukhna Lake Shaded Waterfront Promenade', type: 'riverfront_lake', baselineAqi: 42, isEcoZone: true },
          { id: 'chd-sector17', name: 'Sector 17 Central Plaza Pedestrian Corridor', type: 'commercial', baselineAqi: 85 },
          { id: 'chd-rose', name: 'Zakir Hussain Rose Garden Green Walk', type: 'botanical_park', baselineAqi: 48, isEcoZone: true },
          { id: 'chd-itpark', name: 'Rajiv Gandhi Chandigarh IT Park', type: 'tech_park', baselineAqi: 90 },
        ],
      },
    ],
  },
  {
    state: 'Uttar Pradesh',
    capital: 'Lucknow',
    type: 'State',
    region: 'North India',
    cities: [
      {
        name: 'Lucknow',
        state: 'Uttar Pradesh',
        region: 'North India',
        lat: 26.8467,
        lng: 80.9462,
        tier: 1,
        baselineAqi: 248,
        points: [
          { id: 'lko-gomti', name: 'Gomti Riverfront Park Cycle Greenway', type: 'riverfront_lake', baselineAqi: 85, isEcoZone: true },
          { id: 'lko-hazrat', name: 'Hazratganj Heritage Pedestrian Corridor', type: 'commercial', baselineAqi: 210 },
          { id: 'lko-janeshwar', name: 'Janeshwar Mishra Eco Park Loop', type: 'botanical_park', baselineAqi: 62, isEcoZone: true },
          { id: 'lko-charbagh', name: 'Charbagh Railway Station Hub', type: 'transit_hub', baselineAqi: 285 },
        ],
      },
      {
        name: 'Noida',
        state: 'Uttar Pradesh',
        region: 'North India',
        lat: 28.5355,
        lng: 77.3910,
        tier: 1,
        baselineAqi: 260,
        points: [
          { id: 'noi-sec62', name: 'Sector 62 IT & University Corridor', type: 'tech_park', baselineAqi: 235 },
          { id: 'noi-bio', name: 'Noida Biodiversity Botanic Garden', type: 'botanical_park', baselineAqi: 82, isEcoZone: true },
          { id: 'noi-sec18', name: 'Sector 18 Atta Market Node', type: 'commercial', baselineAqi: 275 },
          { id: 'noi-express', name: 'Noida Expressway Eco Service Lane', type: 'transit_hub', baselineAqi: 195 },
        ],
      },
      {
        name: 'Greater Noida',
        state: 'Uttar Pradesh',
        region: 'North India',
        lat: 28.4744,
        lng: 77.5040,
        tier: 2,
        baselineAqi: 220,
        points: [
          { id: 'grn-pari', name: 'Pari Chowk Central Interchange', type: 'transit_hub', baselineAqi: 245 },
          { id: 'grn-city', name: 'City Park Shaded Woodland Track', type: 'botanical_park', baselineAqi: 88, isEcoZone: true },
          { id: 'grn-know', name: 'Knowledge Park Educational Belt', type: 'tech_park', baselineAqi: 165 },
        ],
      },
      {
        name: 'Kanpur',
        state: 'Uttar Pradesh',
        region: 'North India',
        lat: 26.4499,
        lng: 80.3319,
        tier: 2,
        baselineAqi: 310,
        points: [
          { id: 'knp-central', name: 'Kanpur Central Railway Interchange', type: 'transit_hub', baselineAqi: 345 },
          { id: 'knp-ganga', name: 'Ganga Barrage Eco Promenade', type: 'riverfront_lake', baselineAqi: 110, isEcoZone: true },
          { id: 'knp-motijheel', name: 'Moti Jheel Shaded Waterfront Garden', type: 'botanical_park', baselineAqi: 125, isEcoZone: true },
        ],
      },
      {
        name: 'Varanasi',
        state: 'Uttar Pradesh',
        region: 'North India',
        lat: 25.3176,
        lng: 82.9739,
        tier: 2,
        baselineAqi: 195,
        points: [
          { id: 'vns-bhu', name: 'BHU Malaviya Green Shaded Campus', type: 'botanical_park', baselineAqi: 72, isEcoZone: true },
          { id: 'vns-ghat', name: 'Assi Ghat Riverfront Heritage Walkway', type: 'riverfront_lake', baselineAqi: 115, isEcoZone: true },
          { id: 'vns-cantt', name: 'Varanasi Junction Cantt Station', type: 'transit_hub', baselineAqi: 235 },
        ],
      },
      {
        name: 'Agra',
        state: 'Uttar Pradesh',
        region: 'North India',
        lat: 27.1767,
        lng: 78.0081,
        tier: 2,
        baselineAqi: 215,
        points: [
          { id: 'agr-taj', name: 'Taj Protected Non-Motorized Eco Zone', type: 'heritage', baselineAqi: 82, isEcoZone: true },
          { id: 'agr-paliwal', name: 'Paliwal Park Shaded Canopy Loop', type: 'botanical_park', baselineAqi: 95, isEcoZone: true },
          { id: 'agr-cantt', name: 'Agra Cantt Railway Node', type: 'transit_hub', baselineAqi: 250 },
        ],
      },
    ],
  },
  {
    state: 'Rajasthan',
    capital: 'Jaipur',
    type: 'State',
    region: 'North India',
    cities: [
      {
        name: 'Jaipur',
        state: 'Rajasthan',
        region: 'North India',
        lat: 26.9124,
        lng: 75.7873,
        tier: 1,
        baselineAqi: 178,
        points: [
          { id: 'jai-central', name: 'Central Park 5km Shaded Jogging Belt', type: 'botanical_park', baselineAqi: 55, isEcoZone: true },
          { id: 'jai-jlnd', name: 'JLN Marg Eco Boulevard', type: 'commercial', baselineAqi: 125, isEcoZone: true },
          { id: 'jai-mi', name: 'MI Road Heritage Commercial Corridor', type: 'commercial', baselineAqi: 215 },
          { id: 'jai-junction', name: 'Jaipur Junction Railway Station', type: 'transit_hub', baselineAqi: 220 },
        ],
      },
      {
        name: 'Jodhpur',
        state: 'Rajasthan',
        region: 'North India',
        lat: 26.2389,
        lng: 73.0243,
        tier: 2,
        baselineAqi: 145,
        points: [
          { id: 'jod-kaylana', name: 'Kaylana Lake Eco Shoreline Path', type: 'riverfront_lake', baselineAqi: 65, isEcoZone: true },
          { id: 'jod-umeid', name: 'Umaid Heritage Gardens', type: 'botanical_park', baselineAqi: 75, isEcoZone: true },
          { id: 'jod-station', name: 'Jodhpur Railway Station Hub', type: 'transit_hub', baselineAqi: 180 },
        ],
      },
      {
        name: 'Udaipur',
        state: 'Rajasthan',
        region: 'North India',
        lat: 24.5854,
        lng: 73.7125,
        tier: 2,
        baselineAqi: 95,
        points: [
          { id: 'uda-fateh', name: 'Fateh Sagar Lake Shaded Promenade', type: 'riverfront_lake', baselineAqi: 45, isEcoZone: true },
          { id: 'uda-gulab', name: 'Gulab Bagh Historic Eco Park', type: 'botanical_park', baselineAqi: 52, isEcoZone: true },
          { id: 'uda-city', name: 'City Palace Heritage Transit Point', type: 'heritage', baselineAqi: 110 },
        ],
      },
    ],
  },
  {
    state: 'Himachal Pradesh',
    capital: 'Shimla',
    type: 'State',
    region: 'North India',
    cities: [
      {
        name: 'Shimla',
        state: 'Himachal Pradesh',
        region: 'North India',
        lat: 31.1048,
        lng: 77.1734,
        tier: 2,
        baselineAqi: 48,
        points: [
          { id: 'shm-mall', name: 'The Mall Road Non-Vehicular Clean Zone', type: 'commercial', baselineAqi: 35, isEcoZone: true },
          { id: 'shm-ridge', name: 'The Ridge Pine Forest Overlook', type: 'botanical_park', baselineAqi: 38, isEcoZone: true },
          { id: 'shm-isbt', name: 'Shimla ISBT Tutikandi Hub', type: 'transit_hub', baselineAqi: 85 },
        ],
      },
      {
        name: 'Dharamshala / McLeod Ganj',
        state: 'Himachal Pradesh',
        region: 'North India',
        lat: 32.2190,
        lng: 76.3234,
        tier: 3,
        baselineAqi: 38,
        points: [
          { id: 'dhm-dal', name: 'Dal Lake & Deodar Forest Pathway', type: 'riverfront_lake', baselineAqi: 28, isEcoZone: true },
          { id: 'dhm-kotwali', name: 'Kotwali Bazaar Main Node', type: 'commercial', baselineAqi: 65 },
        ],
      },
      {
        name: 'Manali',
        state: 'Himachal Pradesh',
        region: 'North India',
        lat: 32.2396,
        lng: 77.1887,
        tier: 3,
        baselineAqi: 35,
        points: [
          { id: 'mnl-van', name: 'Van Vihar Pine Forest River Trail', type: 'botanical_park', baselineAqi: 25, isEcoZone: true },
          { id: 'mnl-mall', name: 'Mall Road Pedestrian Promenade', type: 'commercial', baselineAqi: 52 },
        ],
      },
    ],
  },
  {
    state: 'Uttarakhand',
    capital: 'Dehradun',
    type: 'State',
    region: 'North India',
    cities: [
      {
        name: 'Dehradun',
        state: 'Uttarakhand',
        region: 'North India',
        lat: 30.3165,
        lng: 78.0322,
        tier: 2,
        baselineAqi: 115,
        points: [
          { id: 'ddn-fri', name: 'Forest Research Institute (FRI) Eco Estate', type: 'botanical_park', baselineAqi: 48, isEcoZone: true },
          { id: 'ddn-rajpur', name: 'Rajpur Road Shaded Hillside Boulevard', type: 'commercial', baselineAqi: 95, isEcoZone: true },
          { id: 'ddn-clock', name: 'Ghanta Ghar City Centre', type: 'transit_hub', baselineAqi: 165 },
        ],
      },
      {
        name: 'Rishikesh',
        state: 'Uttarakhand',
        region: 'North India',
        lat: 30.0869,
        lng: 78.2676,
        tier: 3,
        baselineAqi: 52,
        points: [
          { id: 'rsh-ganga', name: 'Ganga Riverbank Walkway (Ram Jhula - Laxman Jhula)', type: 'riverfront_lake', baselineAqi: 32, isEcoZone: true },
          { id: 'rsh-triveni', name: 'Triveni Ghat Heritage Promenade', type: 'heritage', baselineAqi: 65 },
        ],
      },
      {
        name: 'Haridwar',
        state: 'Uttarakhand',
        region: 'North India',
        lat: 29.9457,
        lng: 78.1642,
        tier: 3,
        baselineAqi: 128,
        points: [
          { id: 'hrd-har', name: 'Har Ki Pauri Non-Vehicular Clean Zone', type: 'heritage', baselineAqi: 75, isEcoZone: true },
          { id: 'hrd-station', name: 'Haridwar Junction Interchange', type: 'transit_hub', baselineAqi: 165 },
        ],
      },
    ],
  },
  {
    state: 'Jammu & Kashmir',
    capital: 'Srinagar / Jammu',
    type: 'Union Territory',
    region: 'North India',
    cities: [
      {
        name: 'Srinagar',
        state: 'Jammu & Kashmir',
        region: 'North India',
        lat: 34.0837,
        lng: 74.7973,
        tier: 2,
        baselineAqi: 46,
        points: [
          { id: 'srn-dal', name: 'Dal Lake Boulevard Eco Cycling Track', type: 'riverfront_lake', baselineAqi: 28, isEcoZone: true },
          { id: 'srn-shalimar', name: 'Mughal Gardens Shaded Chinar Corridor', type: 'botanical_park', baselineAqi: 32, isEcoZone: true },
          { id: 'srn-lal', name: 'Lal Chowk Smart City Pedestrian Mall', type: 'commercial', baselineAqi: 75 },
        ],
      },
      {
        name: 'Jammu',
        state: 'Jammu & Kashmir',
        region: 'North India',
        lat: 32.7266,
        lng: 74.8570,
        tier: 2,
        baselineAqi: 120,
        points: [
          { id: 'jmu-tawi', name: 'Tawi Riverfront Shaded Pathway', type: 'riverfront_lake', baselineAqi: 68, isEcoZone: true },
          { id: 'jmu-bahu', name: 'Bahu Fort Woodland Belt', type: 'heritage', baselineAqi: 55, isEcoZone: true },
          { id: 'jmu-station', name: 'Jammu Tawi Railway Station', type: 'transit_hub', baselineAqi: 160 },
        ],
      },
    ],
  },

  // =================== WEST INDIA ===================
  {
    state: 'Maharashtra',
    capital: 'Mumbai',
    type: 'State',
    region: 'West India',
    cities: [
      {
        name: 'Mumbai',
        state: 'Maharashtra',
        region: 'West India',
        lat: 19.0760,
        lng: 72.8777,
        tier: 1,
        baselineAqi: 155,
        points: [
          { id: 'mum-bkc', name: 'BKC Financial District Smart Greenway', type: 'tech_park', baselineAqi: 145 },
          { id: 'mum-marine', name: 'Marine Drive Queen’s Necklace Sea Promenade', type: 'riverfront_lake', baselineAqi: 62, isEcoZone: true },
          { id: 'mum-bandra', name: 'Bandra Carter Road & Bandstand Sea Trail', type: 'riverfront_lake', baselineAqi: 58, isEcoZone: true },
          { id: 'mum-cst', name: 'CSMT Heritage Metro & Rail Interchange', type: 'transit_hub', baselineAqi: 190 },
          { id: 'mum-sanjay', name: 'Sanjay Gandhi National Park Canopy Trail', type: 'botanical_park', baselineAqi: 38, isEcoZone: true },
          { id: 'mum-dadar', name: 'Dadar Shivaji Park Shaded Outer Belt', type: 'residential', baselineAqi: 110, isEcoZone: true },
        ],
      },
      {
        name: 'Pune',
        state: 'Maharashtra',
        region: 'West India',
        lat: 18.5204,
        lng: 73.8567,
        tier: 1,
        baselineAqi: 118,
        points: [
          { id: 'pun-hinjewadi', name: 'Hinjewadi Infotech Park Corridor', type: 'tech_park', baselineAqi: 135 },
          { id: 'pun-pashan', name: 'Pashan Lake Bird Sanctuary Eco Loop', type: 'riverfront_lake', baselineAqi: 48, isEcoZone: true },
          { id: 'pun-fc', name: 'FC Road & Model Colony Shaded Avenue', type: 'commercial', baselineAqi: 105 },
          { id: 'pun-station', name: 'Pune Central Junction Station', type: 'transit_hub', baselineAqi: 175 },
          { id: 'pun-viman', name: 'Viman Nagar IT & Airport Corridor', type: 'tech_park', baselineAqi: 120 },
        ],
      },
      {
        name: 'Nagpur',
        state: 'Maharashtra',
        region: 'West India',
        lat: 21.1458,
        lng: 79.0882,
        tier: 2,
        baselineAqi: 125,
        points: [
          { id: 'nag-futala', name: 'Futala Lake Clean Air Boardwalk', type: 'riverfront_lake', baselineAqi: 55, isEcoZone: true },
          { id: 'nag-sitabuldi', name: 'Sitabuldi Interchange & Metro Hub', type: 'transit_hub', baselineAqi: 165 },
          { id: 'nag-mihan', name: 'MIHAN SEZ Multi-Modal Transit Belt', type: 'tech_park', baselineAqi: 95 },
        ],
      },
      {
        name: 'Nashik',
        state: 'Maharashtra',
        region: 'West India',
        lat: 19.9975,
        lng: 73.7898,
        tier: 2,
        baselineAqi: 88,
        points: [
          { id: 'nsk-godavari', name: 'Godavari Riverfront Shaded Promenade', type: 'riverfront_lake', baselineAqi: 45, isEcoZone: true },
          { id: 'nsk-gangapur', name: 'Gangapur Dam Vineyard Eco Belt', type: 'botanical_park', baselineAqi: 40, isEcoZone: true },
          { id: 'nsk-station', name: 'Nashik Road Railway Hub', type: 'transit_hub', baselineAqi: 130 },
        ],
      },
      {
        name: 'Thane',
        state: 'Maharashtra',
        region: 'West India',
        lat: 19.2183,
        lng: 72.9781,
        tier: 2,
        baselineAqi: 142,
        points: [
          { id: 'thn-upvan', name: 'Upvan Lake & Yeoor Hills Shaded Path', type: 'riverfront_lake', baselineAqi: 48, isEcoZone: true },
          { id: 'thn-station', name: 'Thane Central Railway Hub', type: 'transit_hub', baselineAqi: 195 },
        ],
      },
    ],
  },
  {
    state: 'Gujarat',
    capital: 'Gandhinagar',
    type: 'State',
    region: 'West India',
    cities: [
      {
        name: 'Ahmedabad',
        state: 'Gujarat',
        region: 'West India',
        lat: 23.0225,
        lng: 72.5714,
        tier: 1,
        baselineAqi: 168,
        points: [
          { id: 'ahm-riverfront', name: 'Sabarmati Riverfront 11km Non-Motor Greenway', type: 'riverfront_lake', baselineAqi: 62, isEcoZone: true },
          { id: 'ahm-sg', name: 'SG Highway Commercial Corridor', type: 'tech_park', baselineAqi: 185 },
          { id: 'ahm-kankaria', name: 'Kankaria Lake Eco Walking Circuit', type: 'riverfront_lake', baselineAqi: 75, isEcoZone: true },
          { id: 'ahm-kalupur', name: 'Kalupur Central Railway Station', type: 'transit_hub', baselineAqi: 235 },
        ],
      },
      {
        name: 'Gandhinagar',
        state: 'Gujarat',
        region: 'West India',
        lat: 23.2156,
        lng: 72.6369,
        tier: 2,
        baselineAqi: 82,
        points: [
          { id: 'gan-gift', name: 'GIFT City International Tech Hub', type: 'tech_park', baselineAqi: 78 },
          { id: 'gan-indroda', name: 'Indroda Nature Park Forest Greenway', type: 'botanical_park', baselineAqi: 35, isEcoZone: true },
          { id: 'gan-akshar', name: 'Sector 20 Botanical Heritage Corridor', type: 'heritage', baselineAqi: 45, isEcoZone: true },
        ],
      },
      {
        name: 'Surat',
        state: 'Gujarat',
        region: 'West India',
        lat: 21.1702,
        lng: 72.8311,
        tier: 1,
        baselineAqi: 135,
        points: [
          { id: 'srt-tapi', name: 'Tapi Riverfront Shaded Walkway', type: 'riverfront_lake', baselineAqi: 65, isEcoZone: true },
          { id: 'srt-dumas', name: 'Dumas Sea Breeze Promenade', type: 'riverfront_lake', baselineAqi: 52, isEcoZone: true },
          { id: 'srt-station', name: 'Surat Railway Junction Interchange', type: 'transit_hub', baselineAqi: 190 },
        ],
      },
      {
        name: 'Vadodara',
        state: 'Gujarat',
        region: 'West India',
        lat: 22.3072,
        lng: 73.1812,
        tier: 2,
        baselineAqi: 120,
        points: [
          { id: 'vad-sayaji', name: 'Sayaji Baug 113-Acre Shaded Botanical Park', type: 'botanical_park', baselineAqi: 48, isEcoZone: true },
          { id: 'vad-station', name: 'Vadodara Junction Railway Terminal', type: 'transit_hub', baselineAqi: 165 },
          { id: 'vad-alkapuri', name: 'Alkapuri Shaded Avenue', type: 'commercial', baselineAqi: 115 },
        ],
      },
    ],
  },
  {
    state: 'Goa',
    capital: 'Panaji',
    type: 'State',
    region: 'West India',
    cities: [
      {
        name: 'Panaji',
        state: 'Goa',
        region: 'West India',
        lat: 15.4909,
        lng: 73.8278,
        tier: 2,
        baselineAqi: 42,
        points: [
          { id: 'goa-miramar', name: 'Miramar Beach Mandovi River Walk', type: 'riverfront_lake', baselineAqi: 28, isEcoZone: true },
          { id: 'goa-campal', name: 'Campal Heritage Shaded Boulevard', type: 'botanical_park', baselineAqi: 32, isEcoZone: true },
          { id: 'goa-kadamba', name: 'Kadamba Panaji Central Bus Terminal', type: 'transit_hub', baselineAqi: 75 },
        ],
      },
      {
        name: 'Margao',
        state: 'Goa',
        region: 'West India',
        lat: 15.2832,
        lng: 73.9862,
        tier: 3,
        baselineAqi: 45,
        points: [
          { id: 'goa-colva', name: 'Colva Coastal Palm Greenway', type: 'riverfront_lake', baselineAqi: 30, isEcoZone: true },
          { id: 'goa-madgaon', name: 'Madgaon Junction Konkan Railway Hub', type: 'transit_hub', baselineAqi: 78 },
        ],
      },
    ],
  },

  // =================== SOUTH INDIA ===================
  {
    state: 'Karnataka',
    capital: 'Bengaluru',
    type: 'State',
    region: 'South India',
    cities: [
      {
        name: 'Bengaluru',
        state: 'Karnataka',
        region: 'South India',
        lat: 12.9716,
        lng: 77.5946,
        tier: 1,
        baselineAqi: 92,
        points: [
          { id: 'blr-cubbon', name: 'Cubbon Park 300-Acre Tree Canopy Greenway', type: 'botanical_park', baselineAqi: 38, isEcoZone: true },
          { id: 'blr-lalbagh', name: 'Lalbagh Botanical Gardens Lake Track', type: 'botanical_park', baselineAqi: 42, isEcoZone: true },
          { id: 'blr-ecospace', name: 'Outer Ring Road (Bellandur) Tech Corridor', type: 'tech_park', baselineAqi: 165 },
          { id: 'blr-electronic', name: 'Electronic City Phase 1 Elevated Express Path', type: 'tech_park', baselineAqi: 110 },
          { id: 'blr-indiranagar', name: '100ft Road Shaded Avenue & Metro', type: 'commercial', baselineAqi: 98 },
          { id: 'blr-majestic', name: 'KSR Majestic Central Interchange', type: 'transit_hub', baselineAqi: 180 },
          { id: 'blr-whitefield', name: 'Whitefield ITPL Tech Corridor', type: 'tech_park', baselineAqi: 125 },
        ],
      },
      {
        name: 'Mysuru',
        state: 'Karnataka',
        region: 'South India',
        lat: 12.2958,
        lng: 76.6394,
        tier: 2,
        baselineAqi: 48,
        points: [
          { id: 'mys-karanji', name: 'Karanji Lake Nature Park & Butterfly Trail', type: 'riverfront_lake', baselineAqi: 28, isEcoZone: true },
          { id: 'mys-palace', name: 'Mysore Palace Heritage Boulevard', type: 'heritage', baselineAqi: 52, isEcoZone: true },
          { id: 'mys-station', name: 'Mysuru City Railway Junction', type: 'transit_hub', baselineAqi: 85 },
        ],
      },
      {
        name: 'Mangaluru',
        state: 'Karnataka',
        region: 'South India',
        lat: 12.9141,
        lng: 74.8560,
        tier: 2,
        baselineAqi: 62,
        points: [
          { id: 'mng-panambur', name: 'Panambur Coastal Marine Belt', type: 'riverfront_lake', baselineAqi: 35, isEcoZone: true },
          { id: 'mng-kadri', name: 'Kadri Hills Park Shaded Walkway', type: 'botanical_park', baselineAqi: 45, isEcoZone: true },
          { id: 'mng-central', name: 'Mangalore Central Railway Station', type: 'transit_hub', baselineAqi: 95 },
        ],
      },
    ],
  },
  {
    state: 'Tamil Nadu',
    capital: 'Chennai',
    type: 'State',
    region: 'South India',
    cities: [
      {
        name: 'Chennai',
        state: 'Tamil Nadu',
        region: 'South India',
        lat: 13.0827,
        lng: 80.2707,
        tier: 1,
        baselineAqi: 88,
        points: [
          { id: 'chn-marina', name: 'Marina Beach Sea Breeze Coastal Corridor', type: 'riverfront_lake', baselineAqi: 42, isEcoZone: true },
          { id: 'chn-besant', name: 'Besant Nagar Elliot’s Promenade', type: 'riverfront_lake', baselineAqi: 38, isEcoZone: true },
          { id: 'chn-guindy', name: 'Guindy National Park Forest Border', type: 'botanical_park', baselineAqi: 45, isEcoZone: true },
          { id: 'chn-omr', name: 'OMR Rajiv Gandhi IT Expressway', type: 'tech_park', baselineAqi: 130 },
          { id: 'chn-central', name: 'Puratchi Thalaivar MGR Central Station', type: 'transit_hub', baselineAqi: 165 },
          { id: 'chn-tnagar', name: 'T. Nagar Pedestrian Shopping Plaza', type: 'commercial', baselineAqi: 140 },
        ],
      },
      {
        name: 'Coimbatore',
        state: 'Tamil Nadu',
        region: 'South India',
        lat: 11.0168,
        lng: 76.9558,
        tier: 2,
        baselineAqi: 75,
        points: [
          { id: 'cbe-race', name: 'Race Course 2.5km Shaded Walking Loop', type: 'botanical_park', baselineAqi: 38, isEcoZone: true },
          { id: 'cbe-tidel', name: 'TIDEL Park & Avinashi Road IT Belt', type: 'tech_park', baselineAqi: 95 },
          { id: 'cbe-junction', name: 'Coimbatore Junction Terminal', type: 'transit_hub', baselineAqi: 120 },
        ],
      },
      {
        name: 'Madurai',
        state: 'Tamil Nadu',
        region: 'South India',
        lat: 9.9252,
        lng: 78.1198,
        tier: 2,
        baselineAqi: 85,
        points: [
          { id: 'mdu-vaigai', name: 'Vaigai Riverbank Heritage Corridor', type: 'riverfront_lake', baselineAqi: 52, isEcoZone: true },
          { id: 'mdu-meenakshi', name: 'Meenakshi Temple Pedestrian Ring', type: 'heritage', baselineAqi: 72 },
          { id: 'mdu-junction', name: 'Madurai Junction Railway Station', type: 'transit_hub', baselineAqi: 135 },
        ],
      },
    ],
  },
  {
    state: 'Telangana',
    capital: 'Hyderabad',
    type: 'State',
    region: 'South India',
    cities: [
      {
        name: 'Hyderabad',
        state: 'Telangana',
        region: 'South India',
        lat: 17.3850,
        lng: 78.4867,
        tier: 1,
        baselineAqi: 115,
        points: [
          { id: 'hyd-kbr', name: 'KBR National Park 400-Acre Tree Canopy Loop', type: 'botanical_park', baselineAqi: 42, isEcoZone: true },
          { id: 'hyd-hitec', name: 'HITEC City Cyber Towers Tech Corridor', type: 'tech_park', baselineAqi: 145 },
          { id: 'hyd-necklace', name: 'Hussain Sagar Lake Necklace Road Promenade', type: 'riverfront_lake', baselineAqi: 55, isEcoZone: true },
          { id: 'hyd-gachibowli', name: 'Gachibowli Financial District Expressway', type: 'tech_park', baselineAqi: 120 },
          { id: 'hyd-secunderabad', name: 'Secunderabad Junction Railway Hub', type: 'transit_hub', baselineAqi: 175 },
          { id: 'hyd-charminar', name: 'Charminar Pedestrian Heritage Zone', type: 'heritage', baselineAqi: 130 },
        ],
      },
      {
        name: 'Warangal',
        state: 'Telangana',
        region: 'South India',
        lat: 17.9689,
        lng: 79.5941,
        tier: 2,
        baselineAqi: 82,
        points: [
          { id: 'wgl-bhadrakali', name: 'Bhadrakali Lake Promenade & Geodesic Park', type: 'riverfront_lake', baselineAqi: 40, isEcoZone: true },
          { id: 'wgl-nit', name: 'NIT Warangal Shaded Green Campus', type: 'tech_park', baselineAqi: 58, isEcoZone: true },
          { id: 'wgl-station', name: 'Warangal Railway Station Terminal', type: 'transit_hub', baselineAqi: 115 },
        ],
      },
    ],
  },
  {
    state: 'Andhra Pradesh',
    capital: 'Amaravati',
    type: 'State',
    region: 'South India',
    cities: [
      {
        name: 'Visakhapatnam',
        state: 'Andhra Pradesh',
        region: 'South India',
        lat: 17.6868,
        lng: 83.2185,
        tier: 1,
        baselineAqi: 76,
        points: [
          { id: 'viz-rk', name: 'RK Beach Bay Road Ocean Promenade', type: 'riverfront_lake', baselineAqi: 36, isEcoZone: true },
          { id: 'viz-kailasagiri', name: 'Kailasagiri Hilltop Pine Reserve', type: 'botanical_park', baselineAqi: 30, isEcoZone: true },
          { id: 'viz-rushikonda', name: 'Rushikonda IT SEZ Coastal Belt', type: 'tech_park', baselineAqi: 52, isEcoZone: true },
          { id: 'viz-station', name: 'Visakhapatnam Junction Railway Terminal', type: 'transit_hub', baselineAqi: 125 },
        ],
      },
      {
        name: 'Vijayawada',
        state: 'Andhra Pradesh',
        region: 'South India',
        lat: 16.5062,
        lng: 80.6480,
        tier: 2,
        baselineAqi: 105,
        points: [
          { id: 'vjw-prakasam', name: 'Prakasam Barrage Krishna River Walkway', type: 'riverfront_lake', baselineAqi: 58, isEcoZone: true },
          { id: 'vjw-bhavani', name: 'Bhavani Island Riverine Eco Park', type: 'botanical_park', baselineAqi: 42, isEcoZone: true },
          { id: 'vjw-station', name: 'Vijayawada Junction Major Rail Hub', type: 'transit_hub', baselineAqi: 155 },
        ],
      },
      {
        name: 'Tirupati',
        state: 'Andhra Pradesh',
        region: 'South India',
        lat: 13.6288,
        lng: 79.4192,
        tier: 2,
        baselineAqi: 58,
        points: [
          { id: 'tir-zoo', name: 'SV Zoological Forest Eco Corridor', type: 'botanical_park', baselineAqi: 32, isEcoZone: true },
          { id: 'tir-station', name: 'Tirupati Main Railway Station', type: 'transit_hub', baselineAqi: 85 },
        ],
      },
    ],
  },
  {
    state: 'Kerala',
    capital: 'Thiruvananthapuram',
    type: 'State',
    region: 'South India',
    cities: [
      {
        name: 'Kochi',
        state: 'Kerala',
        region: 'South India',
        lat: 9.9312,
        lng: 76.2673,
        tier: 1,
        baselineAqi: 52,
        points: [
          { id: 'koc-marine', name: 'Marine Drive Backwaters Shaded Walk', type: 'riverfront_lake', baselineAqi: 32, isEcoZone: true },
          { id: 'koc-infopark', name: 'Infopark Kakkanad Eco IT Zone', type: 'tech_park', baselineAqi: 65 },
          { id: 'koc-fort', name: 'Fort Kochi Heritage Coastal Trail', type: 'heritage', baselineAqi: 30, isEcoZone: true },
          { id: 'koc-south', name: 'Ernakulam South Railway Junction', type: 'transit_hub', baselineAqi: 92 },
        ],
      },
      {
        name: 'Thiruvananthapuram',
        state: 'Kerala',
        region: 'South India',
        lat: 8.5241,
        lng: 76.9366,
        tier: 2,
        baselineAqi: 45,
        points: [
          { id: 'tvm-technopark', name: 'Technopark Campus Greenery', type: 'tech_park', baselineAqi: 42, isEcoZone: true },
          { id: 'tvm-museum', name: 'Museum Botanical Gardens Canopy Trail', type: 'botanical_park', baselineAqi: 28, isEcoZone: true },
          { id: 'tvm-central', name: 'Thiruvananthapuram Central Station', type: 'transit_hub', baselineAqi: 75 },
          { id: 'tvm-kovalam', name: 'Kovalam Beach Ocean Breeze Way', type: 'riverfront_lake', baselineAqi: 25, isEcoZone: true },
        ],
      },
      {
        name: 'Kozhikode (Calicut)',
        state: 'Kerala',
        region: 'South India',
        lat: 11.2588,
        lng: 75.7804,
        tier: 2,
        baselineAqi: 48,
        points: [
          { id: 'clt-beach', name: 'Calicut Beach Shaded Open Walkway', type: 'riverfront_lake', baselineAqi: 28, isEcoZone: true },
          { id: 'clt-mananchira', name: 'Mananchira Square Heritage Park', type: 'botanical_park', baselineAqi: 35, isEcoZone: true },
          { id: 'clt-station', name: 'Kozhikode Railway Terminal', type: 'transit_hub', baselineAqi: 78 },
        ],
      },
    ],
  },

  // =================== EAST INDIA ===================
  {
    state: 'West Bengal',
    capital: 'Kolkata',
    type: 'State',
    region: 'East India',
    cities: [
      {
        name: 'Kolkata',
        state: 'West Bengal',
        region: 'East India',
        lat: 22.5726,
        lng: 88.3639,
        tier: 1,
        baselineAqi: 198,
        points: [
          { id: 'kol-maidan', name: 'Maidan 1000-Acre Green Ring Promenade', type: 'botanical_park', baselineAqi: 68, isEcoZone: true },
          { id: 'kol-victoria', name: 'Victoria Memorial Gardens Canopy Belt', type: 'heritage', baselineAqi: 72, isEcoZone: true },
          { id: 'kol-saltlake', name: 'Salt Lake Sector V IT Corridor', type: 'tech_park', baselineAqi: 180 },
          { id: 'kol-ecopark', name: 'New Town Eco Park 480-Acre Reserve', type: 'botanical_park', baselineAqi: 62, isEcoZone: true },
          { id: 'kol-howrah', name: 'Howrah Railway Station Terminal Hub', type: 'transit_hub', baselineAqi: 285 },
          { id: 'kol-parkst', name: 'Park Street Heritage Avenue', type: 'commercial', baselineAqi: 195 },
        ],
      },
      {
        name: 'Siliguri',
        state: 'West Bengal',
        region: 'East India',
        lat: 26.7271,
        lng: 88.3953,
        tier: 2,
        baselineAqi: 110,
        points: [
          { id: 'slg-teesta', name: 'Teesta Riverfront Valley Corridor', type: 'riverfront_lake', baselineAqi: 48, isEcoZone: true },
          { id: 'slg-njip', name: 'New Jalpaiguri (NJP) Railway Junction', type: 'transit_hub', baselineAqi: 145 },
        ],
      },
      {
        name: 'Durgapur',
        state: 'West Bengal',
        region: 'East India',
        lat: 23.5204,
        lng: 87.3119,
        tier: 2,
        baselineAqi: 185,
        points: [
          { id: 'dgp-city', name: 'City Centre Green Shaded Park', type: 'botanical_park', baselineAqi: 95, isEcoZone: true },
          { id: 'dgp-station', name: 'Durgapur Railway Junction', type: 'transit_hub', baselineAqi: 220 },
        ],
      },
    ],
  },
  {
    state: 'Bihar',
    capital: 'Patna',
    type: 'State',
    region: 'East India',
    cities: [
      {
        name: 'Patna',
        state: 'Bihar',
        region: 'East India',
        lat: 25.5941,
        lng: 85.1376,
        tier: 1,
        baselineAqi: 285,
        points: [
          { id: 'pat-ganga', name: 'Ganga Marine Drive Eco Promenade', type: 'riverfront_lake', baselineAqi: 95, isEcoZone: true },
          { id: 'pat-gandhi', name: 'Gandhi Maidan Outer Tree Ring', type: 'botanical_park', baselineAqi: 140, isEcoZone: true },
          { id: 'pat-ecopark', name: 'Rajdhani Vatika (Eco Park) Loop', type: 'botanical_park', baselineAqi: 82, isEcoZone: true },
          { id: 'pat-junction', name: 'Patna Junction Railway Terminal', type: 'transit_hub', baselineAqi: 340 },
        ],
      },
      {
        name: 'Gaya',
        state: 'Bihar',
        region: 'East India',
        lat: 24.7914,
        lng: 85.0002,
        tier: 2,
        baselineAqi: 195,
        points: [
          { id: 'gay-bodh', name: 'Bodh Gaya Mahabodhi Serenity Green Zone', type: 'heritage', baselineAqi: 75, isEcoZone: true },
          { id: 'gay-station', name: 'Gaya Junction Rail Hub', type: 'transit_hub', baselineAqi: 225 },
        ],
      },
    ],
  },
  {
    state: 'Odisha',
    capital: 'Bhubaneswar',
    type: 'State',
    region: 'East India',
    cities: [
      {
        name: 'Bhubaneswar',
        state: 'Odisha',
        region: 'East India',
        lat: 20.2961,
        lng: 85.8245,
        tier: 2,
        baselineAqi: 95,
        points: [
          { id: 'bhu-ekamra', name: 'Ekamra Kanan Botanical Forest Trail', type: 'botanical_park', baselineAqi: 42, isEcoZone: true },
          { id: 'bhu-infocity', name: 'Infocity IT Corridor Chandrasekharpur', type: 'tech_park', baselineAqi: 110 },
          { id: 'bhu-station', name: 'Bhubaneswar Master Canteen Junction', type: 'transit_hub', baselineAqi: 145 },
          { id: 'bhu-bindu', name: 'Bindu Sagar Heritage Lakeside Track', type: 'riverfront_lake', baselineAqi: 58, isEcoZone: true },
        ],
      },
      {
        name: 'Cuttack',
        state: 'Odisha',
        region: 'East India',
        lat: 20.4625,
        lng: 85.8828,
        tier: 2,
        baselineAqi: 115,
        points: [
          { id: 'ctk-mahanadi', name: 'Mahanadi Riverfront Ring Road Path', type: 'riverfront_lake', baselineAqi: 55, isEcoZone: true },
          { id: 'ctk-station', name: 'Cuttack Railway Junction Hub', type: 'transit_hub', baselineAqi: 155 },
        ],
      },
      {
        name: 'Puri',
        state: 'Odisha',
        region: 'East India',
        lat: 19.8135,
        lng: 85.8312,
        tier: 3,
        baselineAqi: 48,
        points: [
          { id: 'pri-beach', name: 'Golden Beach Non-Motor Ocean Promenade', type: 'riverfront_lake', baselineAqi: 28, isEcoZone: true },
          { id: 'pri-station', name: 'Puri Railway Terminal', type: 'transit_hub', baselineAqi: 75 },
        ],
      },
    ],
  },
  {
    state: 'Jharkhand',
    capital: 'Ranchi',
    type: 'State',
    region: 'East India',
    cities: [
      {
        name: 'Ranchi',
        state: 'Jharkhand',
        region: 'East India',
        lat: 23.3441,
        lng: 85.3096,
        tier: 2,
        baselineAqi: 112,
        points: [
          { id: 'rnc-kanke', name: 'Kanke Dam & Rock Garden Shaded Walk', type: 'riverfront_lake', baselineAqi: 45, isEcoZone: true },
          { id: 'rnc-morabadi', name: 'Morabadi Ground Oxygen Park Loop', type: 'botanical_park', baselineAqi: 48, isEcoZone: true },
          { id: 'rnc-station', name: 'Ranchi Railway Station Hub', type: 'transit_hub', baselineAqi: 150 },
        ],
      },
      {
        name: 'Jamshedpur',
        state: 'Jharkhand',
        region: 'East India',
        lat: 22.8046,
        lng: 86.2029,
        tier: 2,
        baselineAqi: 135,
        points: [
          { id: 'jsr-jubilee', name: 'Jubilee Park 200-Acre Tree Canopy', type: 'botanical_park', baselineAqi: 52, isEcoZone: true },
          { id: 'jsr-dimna', name: 'Dimna Lake Foothill Nature Trail', type: 'riverfront_lake', baselineAqi: 42, isEcoZone: true },
          { id: 'jsr-tatanagar', name: 'Tatanagar Junction Rail Hub', type: 'transit_hub', baselineAqi: 185 },
        ],
      },
    ],
  },

  // =================== CENTRAL INDIA ===================
  {
    state: 'Madhya Pradesh',
    capital: 'Bhopal',
    type: 'State',
    region: 'Central India',
    cities: [
      {
        name: 'Bhopal',
        state: 'Madhya Pradesh',
        region: 'Central India',
        lat: 23.2599,
        lng: 77.4126,
        tier: 2,
        baselineAqi: 125,
        points: [
          { id: 'bpl-upperlake', name: 'VIP Road Upper Lake Promenade (Bada Talab)', type: 'riverfront_lake', baselineAqi: 48, isEcoZone: true },
          { id: 'bpl-vanvihar', name: 'Van Vihar National Park Safari Greenway', type: 'botanical_park', baselineAqi: 35, isEcoZone: true },
          { id: 'bpl-rani', name: 'Rani Kamlapati Modern Metro Terminal', type: 'transit_hub', baselineAqi: 140 },
          { id: 'bpl-newmarket', name: 'New Market TT Nagar Center', type: 'commercial', baselineAqi: 175 },
        ],
      },
      {
        name: 'Indore',
        state: 'Madhya Pradesh',
        region: 'Central India',
        lat: 22.7196,
        lng: 75.8577,
        tier: 1,
        baselineAqi: 110,
        points: [
          { id: 'ind-super', name: 'Super Corridor IT & Tech Belt', type: 'tech_park', baselineAqi: 95 },
          { id: 'ind-pipliyapala', name: 'Regional Park (Pipliyapala) Lake Circuit', type: 'riverfront_lake', baselineAqi: 42, isEcoZone: true },
          { id: 'ind-chappan', name: 'Chappan Dukan Clean Pedestrian Square', type: 'commercial', baselineAqi: 88, isEcoZone: true },
          { id: 'ind-station', name: 'Indore Junction Rail Hub', type: 'transit_hub', baselineAqi: 160 },
        ],
      },
      {
        name: 'Gwalior',
        state: 'Madhya Pradesh',
        region: 'Central India',
        lat: 26.2183,
        lng: 78.1828,
        tier: 2,
        baselineAqi: 195,
        points: [
          { id: 'gwl-fort', name: 'Gwalior Fort Heritage Ridge Track', type: 'heritage', baselineAqi: 82, isEcoZone: true },
          { id: 'gwl-phool', name: 'Phool Bagh Shaded Botanical Gardens', type: 'botanical_park', baselineAqi: 95, isEcoZone: true },
          { id: 'gwl-station', name: 'Gwalior Junction Interchange', type: 'transit_hub', baselineAqi: 240 },
        ],
      },
    ],
  },
  {
    state: 'Chhattisgarh',
    capital: 'Raipur',
    type: 'State',
    region: 'Central India',
    cities: [
      {
        name: 'Raipur',
        state: 'Chhattisgarh',
        region: 'Central India',
        lat: 21.2514,
        lng: 81.6296,
        tier: 2,
        baselineAqi: 165,
        points: [
          { id: 'rpr-telibandha', name: 'Marine Drive Telibandha Lake Walking Track', type: 'riverfront_lake', baselineAqi: 62, isEcoZone: true },
          { id: 'rpr-nawa', name: 'Atal Nagar (Nava Raipur) Forest Greenway', type: 'botanical_park', baselineAqi: 45, isEcoZone: true },
          { id: 'rpr-junction', name: 'Raipur Junction Railway Terminal', type: 'transit_hub', baselineAqi: 210 },
        ],
      },
      {
        name: 'Bhilai',
        state: 'Chhattisgarh',
        region: 'Central India',
        lat: 21.1938,
        lng: 81.3509,
        tier: 2,
        baselineAqi: 185,
        points: [
          { id: 'bhl-maitribagh', name: 'Maitri Bagh Eco Zoo & Lake Loop', type: 'botanical_park', baselineAqi: 75, isEcoZone: true },
          { id: 'bhl-civic', name: 'Civic Centre Cultural Plaza', type: 'commercial', baselineAqi: 160 },
        ],
      },
    ],
  },

  // =================== NORTH-EAST INDIA ===================
  {
    state: 'Assam',
    capital: 'Dispur / Guwahati',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Guwahati',
        state: 'Assam',
        region: 'North-East',
        lat: 26.1445,
        lng: 91.7362,
        tier: 2,
        baselineAqi: 65,
        points: [
          { id: 'gah-brahma', name: 'Brahmaputra Riverfront Heritage Walkway', type: 'riverfront_lake', baselineAqi: 35, isEcoZone: true },
          { id: 'gah-dighali', name: 'Dighalipukhuri Lakeside Shaded Park', type: 'riverfront_lake', baselineAqi: 38, isEcoZone: true },
          { id: 'gah-iit', name: 'IIT Guwahati Hillside Green Campus', type: 'tech_park', baselineAqi: 28, isEcoZone: true },
          { id: 'gah-paltan', name: 'Paltan Bazaar Railway Interchange', type: 'transit_hub', baselineAqi: 110 },
        ],
      },
      {
        name: 'Dibrugarh',
        state: 'Assam',
        region: 'North-East',
        lat: 27.4728,
        lng: 94.9120,
        tier: 3,
        baselineAqi: 40,
        points: [
          { id: 'dib-tea', name: 'Tea Garden Scenic Shaded Cycle Belt', type: 'botanical_park', baselineAqi: 22, isEcoZone: true },
          { id: 'dib-bogibeel', name: 'Bogibeel River Overlook Track', type: 'riverfront_lake', baselineAqi: 26, isEcoZone: true },
        ],
      },
    ],
  },
  {
    state: 'Meghalaya',
    capital: 'Shillong',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Shillong',
        state: 'Meghalaya',
        region: 'North-East',
        lat: 25.5788,
        lng: 91.8933,
        tier: 2,
        baselineAqi: 32,
        points: [
          { id: 'shl-ward', name: 'Ward’s Lake Pine Woodland Circuit', type: 'riverfront_lake', baselineAqi: 18, isEcoZone: true },
          { id: 'shl-lady', name: 'Lady Hydari Botanical Gardens', type: 'botanical_park', baselineAqi: 20, isEcoZone: true },
          { id: 'shl-police', name: 'Police Bazar Central Node', type: 'commercial', baselineAqi: 52 },
        ],
      },
    ],
  },
  {
    state: 'Sikkim',
    capital: 'Gangtok',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Gangtok',
        state: 'Sikkim',
        region: 'North-East',
        lat: 27.3314,
        lng: 88.6138,
        tier: 3,
        baselineAqi: 28,
        points: [
          { id: 'gtk-mg', name: 'MG Marg Non-Vehicular Clean Air Promenade', type: 'commercial', baselineAqi: 16, isEcoZone: true },
          { id: 'gtk-ridge', name: 'The Ridge Flower Park Overlook', type: 'botanical_park', baselineAqi: 18, isEcoZone: true },
        ],
      },
    ],
  },
  {
    state: 'Arunachal Pradesh',
    capital: 'Itanagar',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Itanagar',
        state: 'Arunachal Pradesh',
        region: 'North-East',
        lat: 27.0844,
        lng: 93.6053,
        tier: 3,
        baselineAqi: 26,
        points: [
          { id: 'ita-ganga', name: 'Ganga Lake (Gekar Sinyi) Forest Trail', type: 'riverfront_lake', baselineAqi: 15, isEcoZone: true },
          { id: 'ita-zero', name: 'Zero Point Commercial Interchange', type: 'transit_hub', baselineAqi: 45 },
        ],
      },
    ],
  },
  {
    state: 'Tripura',
    capital: 'Agartala',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Agartala',
        state: 'Tripura',
        region: 'North-East',
        lat: 23.8315,
        lng: 91.2868,
        tier: 3,
        baselineAqi: 52,
        points: [
          { id: 'agt-ujjayanta', name: 'Ujjayanta Palace Heritage Gardens', type: 'heritage', baselineAqi: 32, isEcoZone: true },
          { id: 'agt-station', name: 'Agartala Badharghat Rail Hub', type: 'transit_hub', baselineAqi: 75 },
        ],
      },
    ],
  },
  {
    state: 'Nagaland',
    capital: 'Kohima',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Kohima',
        state: 'Nagaland',
        region: 'North-East',
        lat: 25.6751,
        lng: 94.1086,
        tier: 3,
        baselineAqi: 25,
        points: [
          { id: 'koh-war', name: 'War Cemetery Heritage Shaded Terraces', type: 'heritage', baselineAqi: 18, isEcoZone: true },
          { id: 'koh-bazaar', name: 'BOC Main Transit Point', type: 'transit_hub', baselineAqi: 48 },
        ],
      },
    ],
  },
  {
    state: 'Manipur',
    capital: 'Imphal',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Imphal',
        state: 'Manipur',
        region: 'North-East',
        lat: 24.8170,
        lng: 93.9368,
        tier: 3,
        baselineAqi: 38,
        points: [
          { id: 'imp-kangla', name: 'Kangla Fort Moat & Shaded Greenway', type: 'heritage', baselineAqi: 22, isEcoZone: true },
          { id: 'imp-ima', name: 'Ima Keithel Central Market Node', type: 'commercial', baselineAqi: 65 },
        ],
      },
    ],
  },
  {
    state: 'Mizoram',
    capital: 'Aizawl',
    type: 'State',
    region: 'North-East',
    cities: [
      {
        name: 'Aizawl',
        state: 'Mizoram',
        region: 'North-East',
        lat: 23.7271,
        lng: 92.7176,
        tier: 3,
        baselineAqi: 22,
        points: [
          { id: 'aiz-durtlang', name: 'Durtlang Hills Skyline Ridge Way', type: 'botanical_park', baselineAqi: 14, isEcoZone: true },
          { id: 'aiz-dawrpui', name: 'Dawrpui Commercial Square', type: 'commercial', baselineAqi: 38 },
        ],
      },
    ],
  },

  // =================== ISLAND TERRITORIES & OTHER UTS ===================
  {
    state: 'Andaman & Nicobar',
    capital: 'Port Blair',
    type: 'Union Territory',
    region: 'South India',
    cities: [
      {
        name: 'Port Blair',
        state: 'Andaman & Nicobar',
        region: 'South India',
        lat: 11.6234,
        lng: 92.7265,
        tier: 3,
        baselineAqi: 24,
        points: [
          { id: 'pbl-marina', name: 'Marina Park Coastal Oceanfront Promenade', type: 'riverfront_lake', baselineAqi: 15, isEcoZone: true },
          { id: 'pbl-cellular', name: 'Cellular Jail Heritage Avenue', type: 'heritage', baselineAqi: 22, isEcoZone: true },
          { id: 'pbl-aberdeen', name: 'Aberdeen Bazaar Interchange', type: 'commercial', baselineAqi: 45 },
        ],
      },
    ],
  },
  {
    state: 'Puducherry',
    capital: 'Pondicherry',
    type: 'Union Territory',
    region: 'South India',
    cities: [
      {
        name: 'Puducherry City',
        state: 'Puducherry',
        region: 'South India',
        lat: 11.9416,
        lng: 79.8083,
        tier: 2,
        baselineAqi: 48,
        points: [
          { id: 'pud-promenade', name: 'Goubert Avenue Rock Beach Non-Vehicular Promenade', type: 'riverfront_lake', baselineAqi: 25, isEcoZone: true },
          { id: 'pud-french', name: 'White Town French Quarter Shaded Cycle Path', type: 'heritage', baselineAqi: 30, isEcoZone: true },
          { id: 'pud-auroville', name: 'Auroville International Forest Greenway', type: 'botanical_park', baselineAqi: 22, isEcoZone: true },
          { id: 'pud-bus', name: 'New Bus Stand Maraimalai Adigal Hub', type: 'transit_hub', baselineAqi: 82 },
        ],
      },
    ],
  },
  {
    state: 'Ladakh',
    capital: 'Leh',
    type: 'Union Territory',
    region: 'North India',
    cities: [
      {
        name: 'Leh',
        state: 'Ladakh',
        region: 'North India',
        lat: 34.1526,
        lng: 77.5771,
        tier: 3,
        baselineAqi: 22,
        points: [
          { id: 'leh-shanti', name: 'Shanti Stupa Hilltop Clean Air Path', type: 'heritage', baselineAqi: 12, isEcoZone: true },
          { id: 'leh-main', name: 'Leh Main Bazaar Solar-Lit Pedestrian Walk', type: 'commercial', baselineAqi: 28, isEcoZone: true },
          { id: 'leh-airport', name: 'Kushok Bakula Rimpochee Station Way', type: 'transit_hub', baselineAqi: 35 },
        ],
      },
    ],
  },
];

/**
 * Returns preset popular Indian clean-air routes with rich turn-by-turn narratives.
 */
export const POPULAR_INDIAN_ROUTE_PRESETS = [
  {
    id: 'delhi-cp-to-lodhi',
    city: 'Delhi NCR',
    state: 'Delhi (NCT)',
    origin: 'Connaught Place Central Radial, New Delhi / Central Delhi, Delhi (NCT)',
    destination: 'Lodhi Gardens Heritage Eco Track, New Delhi / Central Delhi, Delhi (NCT)',
    tag: 'Delhi NCR • 68% PM2.5 Inhalation Cut',
  },
  {
    id: 'mumbai-bkc-to-bandra',
    city: 'Mumbai',
    state: 'Maharashtra',
    origin: 'BKC Financial District Smart Greenway, Mumbai, Maharashtra',
    destination: 'Bandra Carter Road & Bandstand Sea Trail, Mumbai, Maharashtra',
    tag: 'Mumbai • Sea Breeze Ozone Corridor',
  },
  {
    id: 'blr-cubbon-to-indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    origin: 'Cubbon Park 300-Acre Tree Canopy Greenway, Bengaluru, Karnataka',
    destination: '100ft Road Shaded Avenue & Metro, Bengaluru, Karnataka',
    tag: 'Bengaluru • Garden City Green Belt',
  },
  {
    id: 'hyd-hitec-to-kbr',
    city: 'Hyderabad',
    state: 'Telangana',
    origin: 'HITEC City Cyber Towers Tech Corridor, Hyderabad, Telangana',
    destination: 'KBR National Park 400-Acre Tree Canopy Loop, Hyderabad, Telangana',
    tag: 'Hyderabad • Urban Forest Protected Route',
  },
  {
    id: 'kol-saltlake-to-victoria',
    city: 'Kolkata',
    state: 'West Bengal',
    origin: 'Salt Lake Sector V IT Corridor, Kolkata, West Bengal',
    destination: 'Victoria Memorial Gardens Canopy Belt, Kolkata, West Bengal',
    tag: 'Kolkata • Maidan Green Buffer Pass',
  },
  {
    id: 'chn-central-to-marina',
    city: 'Chennai',
    state: 'Tamil Nadu',
    origin: 'Puratchi Thalaivar MGR Central Station, Chennai, Tamil Nadu',
    destination: 'Marina Beach Sea Breeze Coastal Corridor, Chennai, Tamil Nadu',
    tag: 'Chennai • Coastal Non-Diesel Route',
  },
  {
    id: 'pun-hinjewadi-to-pashan',
    city: 'Pune',
    state: 'Maharashtra',
    origin: 'Hinjewadi Infotech Park Corridor, Pune, Maharashtra',
    destination: 'Pashan Lake Bird Sanctuary Eco Loop, Pune, Maharashtra',
    tag: 'Pune • Biodiversity Lake Sanctuary',
  },
  {
    id: 'ahm-sg-to-riverfront',
    city: 'Ahmedabad',
    state: 'Gujarat',
    origin: 'SG Highway Commercial Corridor, Ahmedabad, Gujarat',
    destination: 'Sabarmati Riverfront 11km Non-Motor Greenway, Ahmedabad, Gujarat',
    tag: 'Ahmedabad • Sabarmati Zero-Emission Path',
  },
];

/**
 * Generates turn-by-turn navigation instructions tailored for the chosen route and endpoints.
 */
export function generateTurnByTurnSteps(
  originStr: string,
  destStr: string,
  routeType: 'cleanest' | 'fastest' | 'balanced',
  mode: string
): NavigationStep[] {
  const originName = originStr.split(',')[0] || 'Origin';
  const destName = destStr.split(',')[0] || 'Destination';

  if (routeType === 'cleanest') {
    return [
      {
        id: 'step-1',
        instruction: `Depart from ${originName} and follow the shaded lane towards the secondary avenue`,
        distanceMeters: 450,
        durationSeconds: 120,
        turnType: 'depart',
        roadName: 'Greenway Access Way',
        segmentAqi: 48,
        segmentCategory: 'Good',
        isGreenCorridor: true,
        airQualityAlert: 'Dense foliage providing 42% micro-climate particle filtration',
        landmarksNearby: 'Pedestrian plaza & filtered water fountain',
      },
      {
        id: 'step-2',
        instruction: 'Turn right into the Dedicated Tree-Canopy Cycle & Pedestrian Expressway',
        distanceMeters: 1400,
        durationSeconds: 320,
        turnType: 'turn-right',
        roadName: 'Neem & Peepal Shaded Corridor',
        segmentAqi: 36,
        segmentCategory: 'Good',
        isGreenCorridor: true,
        airQualityAlert: 'Zero commercial diesel vehicles permitted on this pathway',
        landmarksNearby: 'Municipal botanical nursery & solar telemetry sensor',
      },
      {
        id: 'step-3',
        instruction: 'Enter Riverfront & Lake Buffer Promenade; keep left along water-cooled track',
        distanceMeters: 2100,
        durationSeconds: 480,
        turnType: 'greenway-entry',
        roadName: 'Waterfront Clean Air Promenade',
        segmentAqi: 32,
        segmentCategory: 'Good',
        isGreenCorridor: true,
        airQualityAlert: 'Thermal updraft clearing particulate matter; PM2.5 at safe 14 µg/m³',
        landmarksNearby: 'Heritage stone pavilion & air monitoring kiosk',
      },
      {
        id: 'step-4',
        instruction: 'At the roundabout, take the 2nd exit into the residential quiet zone',
        distanceMeters: 850,
        durationSeconds: 210,
        turnType: 'roundabout',
        roadName: 'Gulmohar Shaded Crescent',
        segmentAqi: 45,
        segmentCategory: 'Good',
        isGreenCorridor: true,
        airQualityAlert: 'Traffic calmed to 20 km/h; negligible tailpipe emissions',
        landmarksNearby: 'Community solar microgrid center',
      },
      {
        id: 'step-5',
        instruction: 'Slight left onto the pedestrian paved promenade approaching the final corridor',
        distanceMeters: 620,
        durationSeconds: 150,
        turnType: 'slight-left',
        roadName: 'Eco Walkway',
        segmentAqi: 42,
        segmentCategory: 'Good',
        isGreenCorridor: true,
        airQualityAlert: 'Surrounded by bio-retention swales and bamboo hedges',
        landmarksNearby: 'Green building gateway',
      },
      {
        id: 'step-6',
        instruction: `Arrive safely at ${destName}; breathe easy in low-exposure zone`,
        distanceMeters: 180,
        durationSeconds: 50,
        turnType: 'destination',
        roadName: 'Destination Concourse',
        segmentAqi: 35,
        segmentCategory: 'Good',
        isGreenCorridor: true,
        airQualityAlert: 'Total inhaled PM2.5 reduced by 68% compared to main arterial highway',
        landmarksNearby: `${destName} Entry Gates`,
      },
    ];
  } else if (routeType === 'fastest') {
    return [
      {
        id: 'step-1',
        instruction: `Depart from ${originName} and merge directly onto the 6-lane Ring Road Arterial`,
        distanceMeters: 500,
        durationSeconds: 90,
        turnType: 'depart',
        roadName: 'Ring Highway Arterial',
        segmentAqi: 195,
        segmentCategory: 'Moderate',
        isGreenCorridor: false,
        airQualityAlert: '⚠️ Heavy diesel truck & bus idling; PM2.5 elevated at 98 µg/m³',
        landmarksNearby: 'Elevated flyover pier 14',
      },
      {
        id: 'step-2',
        instruction: 'Continue straight through the congested multi-signal interchange',
        distanceMeters: 2800,
        durationSeconds: 420,
        turnType: 'straight',
        roadName: 'Grand Trunk Expressway Corridor',
        segmentAqi: 245,
        segmentCategory: 'Poor',
        isGreenCorridor: false,
        airQualityAlert: '⚠️ High NO₂ concentration (88 ppb) from stop-and-go heavy vehicles',
        landmarksNearby: 'Central fuel distribution node & commercial depots',
      },
      {
        id: 'step-3',
        instruction: 'Take flyover ramp to bypass ground traffic choke',
        distanceMeters: 1900,
        durationSeconds: 240,
        turnType: 'slight-right',
        roadName: 'Expressway Elevated Deck',
        segmentAqi: 175,
        segmentCategory: 'Moderate',
        isGreenCorridor: false,
        airQualityAlert: 'High wind velocity disperses soot, but road dust resuspension is high',
        landmarksNearby: 'Toll plaza bypass',
      },
      {
        id: 'step-4',
        instruction: 'Turn left down the exit ramp into the commercial district',
        distanceMeters: 1100,
        durationSeconds: 180,
        turnType: 'turn-left',
        roadName: 'Market Arterial Road',
        segmentAqi: 188,
        segmentCategory: 'Moderate',
        isGreenCorridor: false,
        airQualityAlert: 'Commercial diesel delivery vans present',
        landmarksNearby: 'Wholesale terminal junction',
      },
      {
        id: 'step-5',
        instruction: `Arrive at ${destName} via front main arterial road entrance`,
        distanceMeters: 250,
        durationSeconds: 60,
        turnType: 'destination',
        roadName: 'Front Terminal Access',
        segmentAqi: 165,
        segmentCategory: 'Moderate',
        isGreenCorridor: false,
        airQualityAlert: 'Arrived quickly, but high accumulated toxic aerosol exposure',
        landmarksNearby: `${destName} Main Gate`,
      },
    ];
  } else {
    // Balanced
    return [
      {
        id: 'step-1',
        instruction: `Depart from ${originName} and proceed along the tree-lined secondary boulevard`,
        distanceMeters: 650,
        durationSeconds: 140,
        turnType: 'depart',
        roadName: 'Boulevard West',
        segmentAqi: 85,
        segmentCategory: 'Satisfactory',
        isGreenCorridor: true,
        airQualityAlert: 'Median tree line absorbs brake dust emissions',
        landmarksNearby: 'Metro station entry gate 3',
      },
      {
        id: 'step-2',
        instruction: 'Turn right onto the parallel service corridor with designated transit lane',
        distanceMeters: 2200,
        durationSeconds: 380,
        turnType: 'turn-right',
        roadName: 'Parallel Service Boulevard',
        segmentAqi: 92,
        segmentCategory: 'Satisfactory',
        isGreenCorridor: false,
        airQualityAlert: 'Moderate traffic flow with low idle congestion',
        landmarksNearby: 'District post office & green bus shelter',
      },
      {
        id: 'step-3',
        instruction: 'Take the bypass avenue crossing through university campus buffer',
        distanceMeters: 1700,
        durationSeconds: 310,
        turnType: 'slight-left',
        roadName: 'Campus Perimeter Drive',
        segmentAqi: 68,
        segmentCategory: 'Satisfactory',
        isGreenCorridor: true,
        airQualityAlert: 'Campus canopy shields cyclists and pedestrians from highway soot',
        landmarksNearby: 'University botanical greenhouse',
      },
      {
        id: 'step-4',
        instruction: `Turn right into ${destName} approach road`,
        distanceMeters: 450,
        durationSeconds: 90,
        turnType: 'destination',
        roadName: 'Approach Boulevard',
        segmentAqi: 75,
        segmentCategory: 'Satisfactory',
        isGreenCorridor: false,
        airQualityAlert: 'Balanced compromise between travel velocity and clean air preservation',
        landmarksNearby: `${destName} Entrance`,
      },
    ];
  }
}

/**
 * Resolves a human-readable location string into geographic latitude and longitude
 */
export function resolveLocationLatLng(locationString: string): { lat: number; lng: number; label: string } {
  if (!locationString) {
    return { lat: 28.6139, lng: 77.2090, label: 'New Delhi' };
  }

  const query = locationString.toLowerCase();

  // Search across ALL_INDIA_STATES_DATA
  for (const state of ALL_INDIA_STATES_DATA) {
    for (const city of state.cities) {
      // Check points first
      for (let i = 0; i < city.points.length; i++) {
        const pt = city.points[i];
        if (query.includes(pt.name.toLowerCase())) {
          // Provide realistic offset for points within city
          const angle = (i * (2 * Math.PI)) / Math.max(city.points.length, 1);
          const offsetDist = 0.025 + (i % 3) * 0.012; // ~2-4 km
          return {
            lat: city.lat + Math.sin(angle) * offsetDist,
            lng: city.lng + Math.cos(angle) * offsetDist,
            label: pt.name,
          };
        }
      }

      // Check city name
      if (query.includes(city.name.toLowerCase())) {
        return {
          lat: city.lat,
          lng: city.lng,
          label: city.name,
        };
      }
    }

    // Check state name
    if (query.includes(state.state.toLowerCase()) && state.cities.length > 0) {
      return {
        lat: state.cities[0].lat,
        lng: state.cities[0].lng,
        label: state.cities[0].name,
      };
    }
  }

  // Fallback defaults for major Indian cities
  if (query.includes('mumbai')) return { lat: 19.0760, lng: 72.8777, label: 'Mumbai' };
  if (query.includes('bengaluru') || query.includes('bangalore')) return { lat: 12.9716, lng: 77.5946, label: 'Bengaluru' };
  if (query.includes('hyderabad')) return { lat: 17.3850, lng: 78.4867, label: 'Hyderabad' };
  if (query.includes('chennai')) return { lat: 13.0827, lng: 80.2707, label: 'Chennai' };
  if (query.includes('kolkata')) return { lat: 22.5726, lng: 88.3639, label: 'Kolkata' };
  if (query.includes('pune')) return { lat: 18.5204, lng: 73.8567, label: 'Pune' };
  if (query.includes('ahmedabad')) return { lat: 23.0225, lng: 72.5714, label: 'Ahmedabad' };
  if (query.includes('jaipur')) return { lat: 26.9124, lng: 75.7873, label: 'Jaipur' };
  if (query.includes('lucknow')) return { lat: 26.8467, lng: 80.9462, label: 'Lucknow' };
  if (query.includes('kochi') || query.includes('cochin')) return { lat: 9.9312, lng: 76.2673, label: 'Kochi' };
  if (query.includes('chandigarh')) return { lat: 30.7333, lng: 76.7794, label: 'Chandigarh' };

  // Default New Delhi
  return { lat: 28.6139, lng: 77.2090, label: locationString.split(',')[0] };
}

/**
 * Generates smooth, realistic geographic route coordinates (lat/lng pairs) between origin and destination.
 */
export function generateRouteCoordinates(
  originStr: string,
  destStr: string,
  routeType: 'cleanest' | 'fastest' | 'balanced'
): { coords: [number, number][]; waypoints: { lat: number; lng: number; label: string; aqi: number }[] } {
  let start = resolveLocationLatLng(originStr);
  let end = resolveLocationLatLng(destStr);

  // If start and end resolved to the exact same point, separate them slightly
  if (Math.abs(start.lat - end.lat) < 0.005 && Math.abs(start.lng - end.lng) < 0.005) {
    end = {
      lat: start.lat + 0.045,
      lng: start.lng + 0.040,
      label: end.label,
    };
  }

  const dLat = end.lat - start.lat;
  const dLng = end.lng - start.lng;
  const totalDist = Math.sqrt(dLat * dLat + dLng * dLng);

  // Normal vector for curvature
  const normalLat = -dLng / (totalDist || 1);
  const normalLng = dLat / (totalDist || 1);

  // Offset magnitude depends on route type
  // cleanest curves through green riverbanks/parks, fastest stays straighter along highway
  let curveStrength = 0.25;
  if (routeType === 'cleanest') curveStrength = 0.35;
  else if (routeType === 'fastest') curveStrength = 0.08;
  else curveStrength = 0.18;

  const numPoints = 25;
  const coords: [number, number][] = [];

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    // Parabolic curve perpendicular to direct line
    const curve = Math.sin(t * Math.PI) * totalDist * curveStrength;

    // Small jitter for realistic road turns
    const roadWiggle = (Math.sin(t * 12) * totalDist * 0.03);

    const lat = start.lat + dLat * t + (normalLat * (curve + roadWiggle));
    const lng = start.lng + dLng * t + (normalLng * (curve + roadWiggle));
    coords.push([Number(lat.toFixed(6)), Number(lng.toFixed(6))]);
  }

  // Select 3 intermediate waypoints for display on the map
  const p1 = coords[Math.floor(numPoints * 0.25)];
  const p2 = coords[Math.floor(numPoints * 0.5)];
  const p3 = coords[Math.floor(numPoints * 0.75)];

  const waypoints = [
    {
      lat: p1[0],
      lng: p1[1],
      label: routeType === 'cleanest' ? 'Tree Canopy River Greenway' : routeType === 'fastest' ? 'Flyover Expressway Choke' : 'Central Boulevard Transit',
      aqi: routeType === 'cleanest' ? 42 : routeType === 'fastest' ? 185 : 88,
    },
    {
      lat: p2[0],
      lng: p2[1],
      label: routeType === 'cleanest' ? 'Botanical Park Buffer Way' : routeType === 'fastest' ? 'Industrial Ring Junction' : 'Median Garden Crossing',
      aqi: routeType === 'cleanest' ? 38 : routeType === 'fastest' ? 220 : 92,
    },
    {
      lat: p3[0],
      lng: p3[1],
      label: routeType === 'cleanest' ? 'Protected Cycle Boulevard' : routeType === 'fastest' ? 'Toll Plaza Resuspension Zone' : 'Campus Perimeter Corridor',
      aqi: routeType === 'cleanest' ? 45 : routeType === 'fastest' ? 190 : 78,
    },
  ];

  return { coords, waypoints };
}

