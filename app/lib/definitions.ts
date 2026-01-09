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
  year?: number; // Menambahkan tahun untuk filter
}

// Data simulasi Hotspots untuk Heatmap (Area Rawan Kebakaran/Perambahan)
export const MOCK_HEATMAP_DATA: [number, number, number][] = [
  [5.2, 95.8, 0.8], [5.1, 95.9, 0.5], [4.8, 96.2, 0.7],
  [3.8, 98.1, 0.9], [3.6, 98.3, 0.6], [3.4, 97.6, 0.8],
  [0.6, 101.3, 0.7], [0.4, 101.5, 0.9], [0.3, 101.2, 0.5],
  [4.2, 96.3, 0.4], [4.1, 96.0, 0.6], [3.9, 97.2, 0.8]
];

// Data Historis untuk Timeline (Simulasi perubahan tutupan hutan)
export const MOCK_TIMELINE_DATA: Record<number, [number, number, number][]> = {
  2015: [[5.2, 95.8, 0.2], [3.8, 98.1, 0.3], [0.6, 101.3, 0.1], [4.2, 96.3, 0.2]],
  2018: [[5.2, 95.8, 0.4], [3.8, 98.1, 0.5], [0.6, 101.3, 0.3], [4.2, 96.3, 0.4], [1.2, 102.0, 0.4]],
  2021: [[5.2, 95.8, 0.6], [3.8, 98.1, 0.7], [0.6, 101.3, 0.6], [4.2, 96.3, 0.6], [1.2, 102.0, 0.7], [-0.5, 102.5, 0.5]],
  2024: [[5.2, 95.8, 0.8], [3.8, 98.1, 0.9], [0.6, 101.3, 0.8], [4.2, 96.3, 0.8], [1.2, 102.0, 0.9], [-0.5, 102.5, 0.8], [2.5, 99.0, 0.7]],
  2025: MOCK_HEATMAP_DATA
};

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