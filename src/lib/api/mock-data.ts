/* ========================================================
   Mock Data — Portal Desa Jlubang
   Data realistis untuk 2 dusun: Citro & Wonodadi
   ======================================================== */

import type {
  Dusun, NewsArticle, AgendaItem, UMKMItem, WisataItem,
  KebudayaanItem, GalleryItem, MapMarker, GovernmentMember,
  PaginatedResponse,
} from '@/types/content';

/* --------------------------------------------------------
   Dusun
   -------------------------------------------------------- */
export const mockDusunList: Dusun[] = [
  {
    id: 1, slug: 'citro', name: 'Dusun Citro',
    description: 'Dusun Citro dikenal sebagai pusat kerajinan dan kesenian tradisional Desa Jlubang. Warganya yang kreatif menjadikan dusun ini sebagai sentra budaya yang hidup.',
    history: 'Dusun Citro telah berdiri sejak ratusan tahun lalu. Nama "Citro" berasal dari bahasa Jawa yang berarti "gambar" atau "lukisan", merujuk pada tradisi seni rupa yang kuat di kalangan warganya. Sejak dahulu, dusun ini terkenal dengan para pengrajin batik dan ukiran kayu yang menghasilkan karya-karya bernilai seni tinggi.',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    latitude: -8.078, longitude: 112.138, headName: 'Bpk. Suroto',
    population: 3200, area: '6.2 km²', rt: 12, rw: 4,
  },
  {
    id: 2, slug: 'wonodadi', name: 'Dusun Wonodadi',
    description: 'Dusun Wonodadi merupakan dusun yang dikelilingi alam pegunungan dan hamparan sawah. Potensi wisata alam dan pertanian organik menjadi keunggulan utamanya.',
    history: 'Nama "Wonodadi" berasal dari bahasa Jawa: "Wono" (hutan) dan "Dadi" (menjadi), menggambarkan transformasi dari hutan menjadi pemukiman yang produktif. Dusun ini berkembang menjadi sentra pertanian organik dan destinasi wisata alam yang menarik.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    latitude: -8.082, longitude: 112.142, headName: 'Bpk. Haryanto',
    population: 3300, area: '6.3 km²', rt: 12, rw: 4,
  },
];

/* --------------------------------------------------------
   Pemerintahan
   -------------------------------------------------------- */
export const mockGovernment: GovernmentMember[] = [
  { id: 1, name: 'Bpk. Suharto', role: 'Kepala Desa', period: '2024–2030' },
  { id: 2, name: 'Bpk. Bambang S.', role: 'Sekretaris Desa', period: '2024–2030' },
  { id: 3, name: 'Ibu Retno W.', role: 'Bendahara Desa', period: '2024–2030' },
  { id: 4, name: 'Bpk. Suroto', role: 'Kepala Dusun Citro', period: '2024–2030' },
  { id: 5, name: 'Bpk. Haryanto', role: 'Kepala Dusun Wonodadi', period: '2024–2030' },
  { id: 6, name: 'Ibu Sumarni', role: 'Kaur Perencanaan', period: '2024–2030' },
];

/* --------------------------------------------------------
   Berita
   -------------------------------------------------------- */
export const mockNews: NewsArticle[] = [
  {
    id: 1, slug: 'festival-budaya-jlubang-2026', title: 'Festival Budaya Desa Jlubang 2026: Melestarikan Tradisi Lokal',
    excerpt: 'Desa Jlubang menggelar Festival Budaya tahunan yang menampilkan kesenian dari seluruh dusun. Ribuan pengunjung memadati acara ini.',
    content: `<p>Desa Jlubang kembali menggelar Festival Budaya tahunan yang menampilkan berbagai kesenian tradisional dari seluruh dusun. Acara yang berlangsung selama tiga hari ini dihadiri ribuan warga dan wisatawan.</p><h2>Rangkaian Acara</h2><p>Hari pertama dibuka dengan upacara adat, dilanjutkan lomba tradisional dan pertunjukan wayang kulit semalam suntuk. Setiap dusun menampilkan kesenian khasnya masing-masing.</p><p>Festival ini juga menjadi ajang promosi UMKM dan potensi wisata desa kepada masyarakat luas.</p>`,
    date: '2026-06-20T08:00:00', imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80', imageAlt: 'Festival Budaya Jlubang', category: 'Budaya', author: 'Admin Desa',
  },
  {
    id: 2, slug: 'pelatihan-umkm-digital', title: 'Pelatihan Digital Marketing untuk 50 Pelaku UMKM Desa Jlubang',
    excerpt: 'Pelaku UMKM dari seluruh dusun mengikuti pelatihan digital marketing bekerja sama dengan Dinas Koperasi Kabupaten Blitar.',
    content: `<p>Sebanyak 50 pelaku UMKM dari seluruh dusun di Desa Jlubang mengikuti pelatihan digital marketing. Pelatihan ini bertujuan meningkatkan kemampuan pemasaran online.</p><p>Materi meliputi pengelolaan media sosial, fotografi produk, dan strategi penjualan di marketplace.</p>`,
    date: '2026-06-18T10:00:00', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', imageAlt: 'Pelatihan UMKM Digital', category: 'UMKM', author: 'Admin Desa',
  },
  {
    id: 3, slug: 'pembangunan-jalan-desa', title: 'Pembangunan Jalan Penghubung Dusun Rampung, Akses Makin Lancar',
    excerpt: 'Proyek jalan penghubung antar dusun sepanjang 3 km selesai, memperlancar akses transportasi dan ekonomi warga.',
    content: `<p>Proyek pembangunan jalan penghubung antar dusun sepanjang 3 kilometer akhirnya rampung. Jalan ini menghubungkan Dusun Citro dan Dusun Wonodadi secara langsung.</p><p>Pembangunan ini merupakan hasil kolaborasi pemerintah desa, kabupaten, dan swadaya masyarakat.</p>`,
    date: '2026-06-15T14:00:00', imageUrl: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&q=80', imageAlt: 'Pembangunan Jalan Desa', category: 'Pembangunan', author: 'Admin Desa',
  },
  {
    id: 4, slug: 'posyandu-lansia-rutin', title: 'Program Posyandu Lansia Berjalan Rutin di Seluruh Dusun',
    excerpt: 'Posyandu lansia melayani pemeriksaan kesehatan rutin setiap bulan di setiap dusun, diikuti lebih dari 100 lansia.',
    content: `<p>Program Posyandu Lansia di Desa Jlubang terus berjalan rutin setiap bulan di seluruh dusun. Program ini melayani pemeriksaan kesehatan dan senam lansia.</p>`,
    date: '2026-06-12T09:00:00', imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', imageAlt: 'Posyandu Lansia', category: 'Kesehatan', author: 'Admin Desa',
  },
  {
    id: 5, slug: 'panen-raya-padi-organik', title: 'Panen Raya Padi Organik Dusun Wonodadi, Hasil Meningkat 30%',
    excerpt: 'Program pertanian organik selama 3 tahun di Dusun Wonodadi menunjukkan peningkatan hasil panen hingga 30%.',
    content: `<p>Dusun Wonodadi berhasil panen raya padi organik dengan peningkatan hasil 30%. Beras organik Wonodadi mulai diminati pasar yang lebih luas.</p>`,
    date: '2026-06-10T11:00:00', imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', imageAlt: 'Panen Raya Padi', category: 'Pertanian', author: 'Admin Desa',
  },
  {
    id: 6, slug: 'air-terjun-wonodadi-viral', title: 'Air Terjun Wonodadi Viral di Media Sosial, Wisatawan Membludak',
    excerpt: 'Air Terjun Wonodadi viral setelah konten kreator memposting videonya. Pemerintah desa siapkan fasilitas tambahan.',
    content: `<p>Air Terjun Wonodadi mendadak viral di media sosial. Jumlah wisatawan melonjak drastis dalam beberapa pekan terakhir.</p><p>Pemerintah desa segera menyiapkan parkir, warung makan, dan pos keamanan untuk mengakomodasi pengunjung.</p>`,
    date: '2026-06-08T13:00:00', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', imageAlt: 'Air Terjun Wonodadi', category: 'Wisata', author: 'Admin Desa',
  },
];

/* --------------------------------------------------------
   UMKM — Relasi ke Dusun
   -------------------------------------------------------- */
export const mockUMKMItems: UMKMItem[] = [
  {
    id: 1, slug: 'batik-citro', name: 'Batik Citro', description: 'Batik khas Dusun Citro dengan motif terinspirasi alam dan budaya lokal. Diproduksi secara tradisional oleh para pengrajin batik yang sudah turun-temurun menjaga warisan budaya.',
    imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80', images: [], category: 'Kerajinan', owner: 'Ibu Sartini', phone: '0812-3456-7890', address: 'RT 02/RW 01, Dusun Citro', products: ['Batik Tulis', 'Batik Cap', 'Kain Panjang', 'Selendang'],
    latitude: -8.077, longitude: 112.137, dusunSlug: 'citro', dusunName: 'Dusun Citro',
  },
  {
    id: 2, slug: 'ukiran-kayu-citro', name: 'Ukiran Kayu Pak Darmo', description: 'Kerajinan ukiran kayu jati berkualitas tinggi. Berbagai produk mulai dari furniture hingga souvenir dengan motif tradisional Jawa.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', images: [], category: 'Kerajinan', owner: 'Bpk. Darmo', phone: '0813-4567-8901', address: 'RT 04/RW 02, Dusun Citro', products: ['Relief Dinding', 'Patung', 'Furniture', 'Souvenir'],
    latitude: -8.079, longitude: 112.139, dusunSlug: 'citro', dusunName: 'Dusun Citro',
  },
  {
    id: 3, slug: 'jamu-tradisional-citro', name: 'Jamu Tradisional Bu Sumi', description: 'Jamu tradisional dari resep warisan turun-temurun dengan bahan herbal alami dari kebun sendiri.',
    imageUrl: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80', images: [], category: 'Kuliner', owner: 'Ibu Sumi', phone: '0852-3456-7890', address: 'RT 01/RW 01, Dusun Citro', products: ['Kunyit Asam', 'Beras Kencur', 'Temulawak', 'Wedang Jahe'],
    latitude: -8.076, longitude: 112.136, dusunSlug: 'citro', dusunName: 'Dusun Citro',
  },
  {
    id: 4, slug: 'kopi-wonodadi', name: 'Kopi Wonodadi', description: 'Kopi arabika pilihan dari perkebunan kopi Wonodadi yang diproses secara natural. Rasa khas dengan notes cokelat dan rempah.',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80', images: [], category: 'Kuliner', owner: 'Bpk. Sugeng', phone: '0813-5678-9012', address: 'RT 04/RW 02, Dusun Wonodadi', products: ['Kopi Bubuk', 'Kopi Biji', 'Green Bean', 'Drip Bag'],
    latitude: -8.083, longitude: 112.143, dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi',
  },
  {
    id: 5, slug: 'keripik-singkong-wonodadi', name: 'Keripik Singkong Bu Darmi', description: 'Keripik singkong renyah dengan berbagai varian rasa dari singkong organik petani Wonodadi.',
    imageUrl: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=800&q=80', images: [], category: 'Kuliner', owner: 'Ibu Darmi', phone: '0856-7890-1234', address: 'RT 01/RW 01, Dusun Wonodadi', products: ['Original', 'Pedas', 'Keju', 'Balado', 'BBQ'],
    latitude: -8.081, longitude: 112.141, dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi',
  },
  {
    id: 6, slug: 'madu-hutan-wonodadi', name: 'Madu Hutan Wonodadi', description: 'Madu murni dari lebah liar di hutan Wonodadi. Kaya nutrisi dan khasiat kesehatan.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80', images: [], category: 'Kesehatan', owner: 'Bpk. Warsito', phone: '0878-9012-3456', address: 'RT 05/RW 03, Dusun Wonodadi', products: ['Madu 250ml', 'Madu 500ml', 'Madu 1L', 'Sarang Madu'],
    latitude: -8.084, longitude: 112.144, dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi',
  },
];

/* --------------------------------------------------------
   Wisata — Relasi ke Dusun
   -------------------------------------------------------- */
export const mockWisataItems: WisataItem[] = [
  {
    id: 1, slug: 'sentra-batik-citro', name: 'Sentra Batik Citro', description: 'Kawasan wisata budaya yang menampilkan proses pembuatan batik khas Citro. Pengunjung dapat belajar membatik langsung dari pengrajin.',
    imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80', images: [], category: 'Budaya',
    facilities: ['Parkir', 'Workshop Batik', 'Toko Oleh-oleh', 'Toilet', 'Mushola'], ticketPrice: 'Rp 15.000 (termasuk workshop)', openHours: '08:00 - 16:00 WIB',
    latitude: -8.077, longitude: 112.137, address: 'RT 02/RW 01, Dusun Citro', rating: 4.4,
    dusunSlug: 'citro', dusunName: 'Dusun Citro', googleMapsUrl: 'https://maps.google.com/?q=-8.077,112.137',
  },
  {
    id: 2, slug: 'kampung-seni-citro', name: 'Kampung Seni Citro', description: 'Kampung seni yang menampilkan berbagai karya seni rupa, ukiran, dan pertunjukan seni tradisional. Tempat berkumpulnya seniman lokal.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', images: [], category: 'Budaya',
    facilities: ['Parkir', 'Galeri Seni', 'Panggung', 'Kafe', 'Toilet'], ticketPrice: 'Rp 10.000', openHours: '09:00 - 17:00 WIB',
    latitude: -8.079, longitude: 112.139, address: 'RT 04/RW 02, Dusun Citro', rating: 4.2,
    dusunSlug: 'citro', dusunName: 'Dusun Citro', googleMapsUrl: 'https://maps.google.com/?q=-8.079,112.139',
  },
  {
    id: 3, slug: 'air-terjun-wonodadi', name: 'Air Terjun Wonodadi', description: 'Air terjun alami setinggi 25 meter dikelilingi tebing batu dan pepohonan rindang. Destinasi utama wisata alam Desa Jlubang.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', images: [], category: 'Alam',
    facilities: ['Parkir', 'Toilet', 'Warung', 'Gazebo', 'Spot Foto'], ticketPrice: 'Rp 10.000', openHours: '07:00 - 17:00 WIB',
    latitude: -8.085, longitude: 112.145, address: 'RT 06/RW 04, Dusun Wonodadi', rating: 4.7,
    dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi', googleMapsUrl: 'https://maps.google.com/?q=-8.085,112.145',
  },
  {
    id: 4, slug: 'hutan-pinus-wonodadi', name: 'Hutan Pinus Wonodadi', description: 'Hutan pinus yang asri dengan udara segar. Cocok untuk camping, hiking, dan fotografi alam.',
    imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', images: [], category: 'Alam',
    facilities: ['Parkir', 'Area Camping', 'Toilet', 'Spot Foto', 'Tracking Trail'], ticketPrice: 'Rp 5.000', openHours: '06:00 - 18:00 WIB',
    latitude: -8.086, longitude: 112.146, address: 'RT 05/RW 03, Dusun Wonodadi', rating: 4.5,
    dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi', googleMapsUrl: 'https://maps.google.com/?q=-8.086,112.146',
  },
  {
    id: 5, slug: 'telaga-biru-wonodadi', name: 'Telaga Biru Wonodadi', description: 'Telaga alami dengan air biru jernih. Pengunjung dapat menikmati perahu tradisional dan memancing.',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', images: [], category: 'Alam',
    facilities: ['Parkir', 'Perahu', 'Warung', 'Toilet', 'Mushola'], ticketPrice: 'Rp 15.000', openHours: '06:00 - 17:30 WIB',
    latitude: -8.083, longitude: 112.148, address: 'RT 03/RW 02, Dusun Wonodadi', rating: 4.6,
    dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi', googleMapsUrl: 'https://maps.google.com/?q=-8.083,112.148',
  },
];

/* --------------------------------------------------------
   Kebudayaan — Relasi ke Dusun
   -------------------------------------------------------- */
export const mockKebudayaan: KebudayaanItem[] = [
  {
    id: 1, slug: 'tari-gambyong-citro', title: 'Tari Gambyong Citro', description: 'Tarian tradisional yang ditampilkan pada acara penyambutan dan festival budaya.',
    content: '<p>Tari Gambyong Citro merupakan tarian khas Dusun Citro yang dibawakan oleh para penari wanita. Gerakan lemah gemulai menggambarkan keanggunan dan keramahan warga dusun.</p><p>Tarian ini biasanya ditampilkan pada acara penyambutan tamu agung, festival budaya, dan peringatan hari besar desa.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80', images: [], category: 'kesenian', dusunSlug: 'citro', dusunName: 'Dusun Citro',
  },
  {
    id: 2, slug: 'batik-motif-citro', title: 'Batik Motif Khas Citro', description: 'Motif batik unik yang terinspirasi dari flora dan fauna sekitar Dusun Citro.',
    content: '<p>Batik Citro memiliki motif khas yang tidak ditemukan di daerah lain. Motif-motif ini terinspirasi dari tumbuhan dan hewan yang hidup di sekitar dusun.</p><p>Proses pembuatan batik Citro masih menggunakan teknik tradisional dengan canting dan malam panas.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80', images: [], category: 'kerajinan', dusunSlug: 'citro', dusunName: 'Dusun Citro',
  },
  {
    id: 3, slug: 'nasi-pecel-jlubang', title: 'Nasi Pecel Khas Jlubang', description: 'Kuliner tradisional nasi pecel dengan bumbu kacang khas yang menjadi kebanggaan warga.',
    content: '<p>Nasi Pecel Jlubang terkenal dengan bumbu kacangnya yang kaya rempah. Sayuran segar dari kebun warga dipadukan dengan sambal pecel yang pedas gurih.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=800&q=80', images: [], category: 'makanan', dusunSlug: 'citro', dusunName: 'Dusun Citro',
  },
  {
    id: 4, slug: 'upacara-sedekah-bumi', title: 'Upacara Sedekah Bumi', description: 'Tradisi tahunan sebagai wujud rasa syukur atas hasil panen dan berkah dari alam.',
    content: '<p>Upacara Sedekah Bumi merupakan tradisi tahunan yang dilaksanakan setelah masa panen. Warga berkumpul untuk berdoa bersama dan berbagi makanan sebagai wujud rasa syukur.</p><p>Acara ini diiringi pertunjukan seni tradisional dan makan bersama seluruh warga dusun.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', images: [], category: 'tradisi', dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi',
  },
  {
    id: 5, slug: 'reog-wonodadi', title: 'Reog Wonodadi', description: 'Kesenian Reog yang telah dipertahankan secara turun-temurun oleh warga Dusun Wonodadi.',
    content: '<p>Reog Wonodadi merupakan kesenian yang menjadi identitas budaya Dusun Wonodadi. Pertunjukan ini menampilkan tarian, musik gamelan, dan atraksi topeng.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80', images: [], category: 'kesenian', dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi',
  },
  {
    id: 6, slug: 'legenda-telaga-biru', title: 'Legenda Telaga Biru', description: 'Cerita rakyat tentang asal-usul Telaga Biru yang dipercaya warga Wonodadi.',
    content: '<p>Menurut cerita yang diturunkan dari generasi ke generasi, Telaga Biru terbentuk dari air mata seorang putri yang menangisi kepergian kekasihnya. Air mata yang suci itu menggenang dan membentuk telaga dengan air berwarna biru jernih.</p><p>Hingga kini, warga mempercayai bahwa air telaga ini membawa keberuntungan bagi siapa saja yang meminumnya.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', images: [], category: 'cerita-rakyat', dusunSlug: 'wonodadi', dusunName: 'Dusun Wonodadi',
  },
];

/* --------------------------------------------------------
   Agenda
   -------------------------------------------------------- */
export const mockAgendaItems: AgendaItem[] = [
  { id: 1, title: 'Musyawarah Desa', description: 'Musyawarah rutin warga Desa Jlubang untuk membahas program pembangunan.', date: '2026-07-05', time: '09:00 - 12:00 WIB', location: 'Balai Desa Jlubang', category: 'Pemerintahan', status: 'upcoming' },
  { id: 2, title: 'Kerja Bakti Lingkungan', description: 'Kerja bakti membersihkan lingkungan seluruh dusun dan penanaman pohon.', date: '2026-07-12', time: '07:00 - 11:00 WIB', location: 'Seluruh Dusun', category: 'Sosial', status: 'upcoming' },
  { id: 3, title: 'Pelatihan Pertanian Organik', description: 'Pelatihan teknik pertanian organik untuk kelompok tani, bekerja sama dengan Dinas Pertanian.', date: '2026-07-20', time: '08:00 - 15:00 WIB', location: 'Balai Dusun Wonodadi', category: 'Pertanian', status: 'upcoming' },
  { id: 4, title: 'Posyandu Balita', description: 'Pemeriksaan kesehatan rutin dan imunisasi untuk balita di seluruh dusun.', date: '2026-07-15', time: '08:00 - 12:00 WIB', location: 'Posyandu Desa Jlubang', category: 'Kesehatan', status: 'upcoming' },
  { id: 5, title: 'Lomba HUT RI ke-81', description: 'Rangkaian lomba memperingati HUT Kemerdekaan RI di Desa Jlubang.', date: '2026-08-10', time: '07:00 - 17:00 WIB', location: 'Lapangan Desa Jlubang', category: 'Peringatan', status: 'upcoming' },
  { id: 6, title: 'Festival Budaya Jlubang', description: 'Festival budaya tahunan menampilkan kesenian dari seluruh dusun.', date: '2026-06-20', time: '08:00 - 22:00 WIB', location: 'Lapangan Desa Jlubang', category: 'Budaya', status: 'completed' },
];

/* --------------------------------------------------------
   Galeri
   -------------------------------------------------------- */
export const mockGallery: GalleryItem[] = [
  { id: 1, title: 'Pemandangan Sawah', caption: 'Hamparan sawah hijau di Desa Jlubang', imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&q=80', altText: 'Sawah hijau', width: 800, height: 533, dusunSlug: 'wonodadi' },
  { id: 2, title: 'Air Terjun Wonodadi', caption: 'Air terjun alami yang memukau', imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80', altText: 'Air terjun', width: 800, height: 533, dusunSlug: 'wonodadi' },
  { id: 3, title: 'Gotong Royong', caption: 'Warga bergotong royong', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80', altText: 'Gotong royong', width: 800, height: 533, dusunSlug: 'citro' },
  { id: 4, title: 'Upacara Adat', caption: 'Upacara adat desa', imageUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=80', altText: 'Upacara adat', width: 800, height: 533 },
  { id: 5, title: 'Produk UMKM', caption: 'Produk unggulan UMKM desa', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80', altText: 'Produk UMKM', width: 800, height: 533 },
  { id: 6, title: 'Hutan Pinus', caption: 'Hutan pinus yang asri', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80', altText: 'Hutan pinus', width: 800, height: 533, dusunSlug: 'wonodadi' },
  { id: 7, title: 'Telaga Biru', caption: 'Telaga biru yang jernih', imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80', altText: 'Telaga biru', width: 800, height: 533, dusunSlug: 'wonodadi' },
  { id: 8, title: 'Batik Citro', caption: 'Proses pembuatan batik', imageUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80', thumbnailUrl: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80', altText: 'Batik Citro', width: 800, height: 533, dusunSlug: 'citro' },
];

/* --------------------------------------------------------
   Map Markers (generated from all data)
   -------------------------------------------------------- */
export const mockMapMarkers: MapMarker[] = [
  // Dusun markers
  ...mockDusunList.map((d): MapMarker => ({ id: 1000 + d.id, name: d.name, description: d.description.substring(0, 100) + '...', latitude: d.latitude, longitude: d.longitude, category: 'dusun', dusunSlug: d.slug, dusunName: d.name, googleMapsUrl: `https://maps.google.com/?q=${d.latitude},${d.longitude}` })),
  // Wisata markers
  ...mockWisataItems.map((w): MapMarker => ({ id: 2000 + w.id, name: w.name, description: w.description.substring(0, 100) + '...', latitude: w.latitude, longitude: w.longitude, category: 'wisata', imageUrl: w.imageUrl, dusunSlug: w.dusunSlug, dusunName: w.dusunName, googleMapsUrl: w.googleMapsUrl })),
  // UMKM markers
  ...mockUMKMItems.map((u): MapMarker => ({ id: 3000 + u.id, name: u.name, description: u.description.substring(0, 100) + '...', latitude: u.latitude, longitude: u.longitude, category: 'umkm', imageUrl: u.imageUrl, dusunSlug: u.dusunSlug, dusunName: u.dusunName, googleMapsUrl: `https://maps.google.com/?q=${u.latitude},${u.longitude}` })),
];

/* --------------------------------------------------------
   Helper: Paginated Response Builder
   -------------------------------------------------------- */
export function paginate<T>(items: T[], page: number, perPage: number): PaginatedResponse<T> {
  const start = (page - 1) * perPage;
  return {
    data: items.slice(start, start + perPage),
    totalPages: Math.ceil(items.length / perPage),
    totalItems: items.length,
  };
}

/* --------------------------------------------------------
   Mock Data Fetchers
   -------------------------------------------------------- */
export function getMockNews(params?: { page?: number; per_page?: number; search?: string }): PaginatedResponse<NewsArticle> {
  let filtered = [...mockNews];
  if (params?.search) {
    const s = params.search.toLowerCase();
    filtered = filtered.filter((n) => n.title.toLowerCase().includes(s) || n.excerpt.toLowerCase().includes(s));
  }
  return paginate(filtered, params?.page || 1, params?.per_page || 9);
}

export function getMockNewsBySlug(slug: string): NewsArticle | null {
  return mockNews.find((n) => n.slug === slug) || null;
}

export function getMockDusunBySlug(slug: string): Dusun | null {
  return mockDusunList.find((d) => d.slug === slug) || null;
}

export function getMockUMKMByDusun(dusunSlug: string): UMKMItem[] {
  return mockUMKMItems.filter((u) => u.dusunSlug === dusunSlug);
}

export function getMockWisataByDusun(dusunSlug: string): WisataItem[] {
  return mockWisataItems.filter((w) => w.dusunSlug === dusunSlug);
}

export function getMockKebudayaanByDusun(dusunSlug: string): KebudayaanItem[] {
  return mockKebudayaan.filter((k) => k.dusunSlug === dusunSlug);
}

export function getMockGalleryByDusun(dusunSlug: string): GalleryItem[] {
  return mockGallery.filter((g) => g.dusunSlug === dusunSlug);
}

export function getMockUMKMBySlug(slug: string): UMKMItem | null {
  return mockUMKMItems.find((u) => u.slug === slug) || null;
}

export function getMockWisataBySlug(slug: string): WisataItem | null {
  return mockWisataItems.find((w) => w.slug === slug) || null;
}

export function getMockKebudayaanBySlug(slug: string): KebudayaanItem | null {
  return mockKebudayaan.find((k) => k.slug === slug) || null;
}
