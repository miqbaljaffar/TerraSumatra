export interface Donation {
  id: number;
  name: string;
  amount: number;
  message: string;
  timestamp: Date;
}

export interface LeaderboardEntry {
  id: number;
  name: string;
  amount: number;
  type: 'individual' | 'corporate';
  avatar?: string;
}

export interface ForestDataPoint {
  id: number;
  geoLat: number; 
  geoLng: number;
  status: 'critical' | 'healthy' | 'recovering';
  location: string;
  intensity: number; 
  year?: number; 
}

// Model untuk Success Stories
export interface SuccessStory {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: string;
  category: 'Petani Lokal' | 'Komunitas Adat' | 'Restorasi';
  excerpt: string;
  content: string;
  imageUrl: string;
  readTime: string;
}

// Model Baru untuk Ensiklopedia
export interface Species {
  id: number;
  name: string;
  latinName: string;
  type: 'flora' | 'fauna';
  status: 'Critically Endangered' | 'Endangered' | 'Vulnerable';
  description: string;
  uniqueFact: string;
  imageUrl: string;
  habitat: string;
}

export const MOCK_STORIES: SuccessStory[] = [
  {
    id: 1,
    title: "Bangkitnya Kopi Hutan Gayo: Kisah Pak Darwin",
    slug: "kisah-pak-darwin-gayo",
    author: "Tim Terra",
    date: "12 Mei 2024",
    category: "Petani Lokal",
    excerpt: "Bagaimana sistem agroforestri menyelamatkan lahan miring di Gayo sekaligus meningkatkan pendapatan petani hingga 40%.",
    content: "...",
    imageUrl: "https://images.unsplash.com/photo-1501333198107-b09e436734a7?q=80&w=800&auto=format&fit=crop",
    readTime: "5 menit"
  },
  {
    id: 2,
    title: "Suku Anak Dalam: Penjaga Terakhir Rimba Jambi",
    slug: "penjaga-rimba-jambi",
    author: "Rina Kartika",
    date: "05 Juni 2024",
    category: "Komunitas Adat",
    excerpt: "Kolaborasi pemetaan wilayah adat untuk mencegah konflik lahan dan melestarikan pohon-pohon sialang tempat lebah bersarang.",
    content: "...",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    readTime: "8 menit"
  },
  {
    id: 3,
    title: "Transformasi Bekas Tambang Menjadi Hutan Madu",
    slug: "transformasi-bekas-tambang",
    author: "Andi Wijaya",
    date: "20 Juni 2024",
    category: "Restorasi",
    excerpt: "Proyek pemulihan lahan di Bangka Belitung yang kini menjadi habitat baru bagi flora lokal dan sumber madu hutan.",
    content: "...",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop",
    readTime: "6 menit"
  }
];

// Data Mock Ensiklopedia
export const MOCK_SPECIES: Species[] = [
  {
    id: 1,
    name: "Harimau Sumatera",
    latinName: "Panthera tigris sumatrae",
    type: "fauna",
    status: "Critically Endangered",
    description: "Subspesies harimau terkecil yang masih bertahan hidup di dunia. Predator puncak ini memegang peranan kunci dalam menjaga keseimbangan ekosistem hutan hujan Sumatera.",
    uniqueFact: "Memiliki selaput di sela-sela jarinya yang menjadikan mereka perenang ulung.",
    imageUrl: "https://images.unsplash.com/photo-1500479694472-551d1fb6258d?q=80&w=800&auto=format&fit=crop",
    habitat: "Hutan hujan dataran rendah hingga pegunungan"
  },
  {
    id: 2,
    name: "Pohon Andalas",
    latinName: "Morus macroura",
    type: "flora",
    status: "Vulnerable",
    description: "Flora identitas provinsi Sumatera Barat. Kayunya sangat kuat dan tahan rayap, sering digunakan untuk tiang rumah Gadang tradisional.",
    uniqueFact: "Sering disebut sebagai 'Jati-nya Sumatera' karena kekuatan kayunya.",
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=800&auto=format&fit=crop", // Placeholder tree image
    habitat: "Hutan sekunder dan dataran tinggi"
  },
  {
    id: 3,
    name: "Gajah Sumatera",
    latinName: "Elephas maximus sumatranus",
    type: "fauna",
    status: "Critically Endangered",
    description: "Gajah Asia subspesies Sumatera. Mereka adalah 'penyebar benih' alami yang sangat vital bagi regenerasi hutan.",
    uniqueFact: "Dapat memakan hingga 150 kg tumbuhan per hari dan menjelajah hingga 20 km.",
    imageUrl: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=800&auto=format&fit=crop",
    habitat: "Hutan dataran rendah"
  },
  {
    id: 4,
    name: "Meranti Merah",
    latinName: "Shorea leprosula",
    type: "flora",
    status: "Endangered",
    description: "Salah satu pohon penghasil kayu utama di hutan dipterocarpa. Pertumbuhannya cepat namun populasinya terancam akibat penebangan liar.",
    uniqueFact: "Memiliki resin (damar) yang bernilai ekonomi tinggi.",
    imageUrl: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=800&auto=format&fit=crop",
    habitat: "Hutan Dipterocarpa pamah"
  },
  {
    id: 5,
    name: "Orangutan Sumatera",
    latinName: "Pongo abelii",
    type: "fauna",
    status: "Critically Endangered",
    description: "Kera besar yang hampir seluruh hidupnya dihabiskan di atas pohon (arboreal). Memiliki peran penting dalam menyebarkan biji buah-buahan hutan.",
    uniqueFact: "Memiliki rentang reproduksi yang sangat lambat, melahirkan hanya setiap 8-9 tahun sekali.",
    imageUrl: "https://images.unsplash.com/photo-1628174780075-81230193235b?q=80&w=800&auto=format&fit=crop",
    habitat: "Hutan rawa gambut dan hutan hujan tropis"
  },
  {
    id: 6,
    name: "Rafflesia Arnoldii",
    latinName: "Rafflesia arnoldii",
    type: "flora",
    status: "Endangered",
    description: "Bunga terbesar di dunia yang tumbuh parasit pada tanaman rambat Tetrastigma. Ikon keanekaragaman hayati hutan hujan Bengkulu dan Sumatera.",
    uniqueFact: "Tidak memiliki daun, batang, atau akar yang terlihat, dan mengeluarkan bau busuk untuk menarik lalat penyerbuk.",
    imageUrl: "https://images.unsplash.com/photo-1695738096279-d56711977e20?q=80&w=800&auto=format&fit=crop",
    habitat: "Lantai hutan hujan primer"
  }
];

export const MOCK_HEATMAP_DATA: [number, number, number][] = [
  [5.2, 95.8, 0.8], [5.1, 95.9, 0.5], [4.8, 96.2, 0.7],
  [3.8, 98.1, 0.9], [3.6, 98.3, 0.6], [3.4, 97.6, 0.8],
  [0.6, 101.3, 0.7], [0.4, 101.5, 0.9], [0.3, 101.2, 0.5],
  [4.2, 96.3, 0.4], [4.1, 96.0, 0.6], [3.9, 97.2, 0.8]
];

export const MOCK_TIMELINE_DATA: Record<number, [number, number, number][]> = {
  2015: [[5.2, 95.8, 0.2], [3.8, 98.1, 0.3], [0.6, 101.3, 0.1], [4.2, 96.3, 0.2]],
  2018: [[5.2, 95.8, 0.4], [3.8, 98.1, 0.5], [0.6, 101.3, 0.3], [4.2, 96.3, 0.4], [1.2, 102.0, 0.4]],
  2021: [[5.2, 95.8, 0.6], [3.8, 98.1, 0.7], [0.6, 101.3, 0.6], [4.2, 96.3, 0.6], [1.2, 102.0, 0.7], [-0.5, 102.5, 0.5]],
  2024: [[5.2, 95.8, 0.8], [3.8, 98.1, 0.9], [0.6, 101.3, 0.8], [4.2, 96.3, 0.8], [1.2, 102.0, 0.9], [-0.5, 102.5, 0.8], [2.5, 99.0, 0.7]],
  2025: MOCK_HEATMAP_DATA
};

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

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 1, name: "PT. Eco Nusantara", amount: 50000000, type: "corporate" },
  { id: 2, name: "Yayasan Bumi Hijau", amount: 25000000, type: "corporate" },
  { id: 3, name: "Sultan Andara", amount: 15000000, type: "individual" },
  { id: 4, name: "CV. Sawit Lestari", amount: 10000000, type: "corporate" },
  { id: 5, name: "Sarah Amalia", amount: 7500000, type: "individual" },
  { id: 6, name: "Komunitas Gowes Jambi", amount: 5000000, type: "individual" },
  { id: 7, name: "Dr. Budi Santoso", amount: 2500000, type: "individual" },
];