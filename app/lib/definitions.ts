export interface Donation {
  id: number;
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
}

export interface ForestDataPoint {
  id: number;
  geoLat: number; 
  geoLng: number;
  status: 'critical' | 'healthy' | 'recovering';
  location: string;
  intensity: number; // skala 1-10
}

// Simulasi Database dengan Koordinat Asli Sumatera
export const MOCK_FOREST_DATA: ForestDataPoint[] = [
  { id: 1, geoLat: 5.39, geoLng: 95.58, status: 'critical', location: 'Aceh Besar', intensity: 8 }, 
  { id: 2, geoLat: 5.05, geoLng: 96.02, status: 'recovering', location: 'Pidie', intensity: 3 },
  { id: 3, geoLat: 3.75, geoLng: 98.22, status: 'critical', location: 'Langkat', intensity: 9 }, 
  { id: 4, geoLat: 3.50, geoLng: 97.50, status: 'healthy', location: 'Taman Nasional Leuser', intensity: 1 },
  { id: 5, geoLat: 0.50, geoLng: 101.45, status: 'critical', location: 'Perbatasan Riau', intensity: 7 },
  { id: 6, geoLat: 4.14, geoLng: 96.12, status: 'recovering', location: 'Meulaboh', intensity: 4 },
];

export const EDUCATION_FACTS = [
  {
    iconName: "PawPrint",
    title: "Rumah Satwa Langka",
    desc: "Hutan Sumatera adalah satu-satunya tempat di dunia di mana Harimau, Badak, Orangutan, dan Gajah hidup berdampingan di alam liar."
  },
  {
    iconName: "Wind",
    title: "Paru-Paru Dunia",
    desc: "Hutan hujan tropis Sumatera menyerap jutaan ton CO2 setiap tahunnya, menjadi benteng utama melawan perubahan iklim global."
  },
  {
    iconName: "CloudRain",
    title: "Siklus Air",
    desc: "Hutan yang sehat mencegah banjir dan tanah longsor serta menjamin ketersediaan air bersih bagi jutaan masyarakat di sekitarnya."
  },
  {
    iconName: "Sprout",
    title: "Ekonomi Hijau",
    desc: "Pemberdayaan masyarakat lokal melalui agroforestri (kopi, kakao) mengurangi ketergantungan pada penebangan liar."
  }
];