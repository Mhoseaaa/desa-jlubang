# Setup WordPress untuk Portal Desa Jlubang

Frontend Next.js ini sudah bisa berjalan penuh tanpa WordPress (otomatis memakai data contoh / mock data). Saat WordPress sudah siap, ikuti langkah di bawah — **tidak ada perubahan kode di frontend yang diperlukan**, cukup isi `.env`.

## 1. Install WordPress

Gunakan hosting apa saja yang mendukung WordPress (Hostinger, Niagahoster, dll), atau jalankan secara lokal untuk pengembangan.

## 2. Install plugin yang dibutuhkan

1. **Advanced Custom Fields** (gratis) — wajib, dari Plugins → Add New → cari "Advanced Custom Fields".
2. **Portal Desa Jlubang — Content API** — plugin ini sendiri:
   - Buat folder baru `wp-content/plugins/portal-desa-jlubang/`
   - Upload `portal-desa-jlubang.php` ke folder tersebut
   - Aktifkan dari menu Plugins di wp-admin

Setelah aktif, akan muncul menu admin baru: **Dusun, UMKM, Wisata, Kebudayaan, Agenda, Galeri, Pemerintahan**, dan **Profil Desa**.

## 3. Flush permalink

Buka **Settings → Permalinks** lalu klik **Save Changes** (tanpa mengubah apapun) — ini wajib agar REST API untuk Custom Post Type baru terdaftar.

## 4. Isi data, urutan yang disarankan

1. **Profil Desa** (menu tersendiri) — isi nama desa, sejarah, visi/misi, kontak, statistik.
2. **Dusun** — tambahkan setiap dusun (Citro, Wonodadi, dst). Field lain (UMKM/Wisata/Kebudayaan/Galeri) merujuk ke Dusun, jadi isi ini dulu.
3. **Pemerintahan** — satu entri per pejabat (Kepala Desa, Sekretaris, tiap Kepala Dusun, dst). Nama pejabat = judul (title) post, foto = featured image.
4. **UMKM**, **Wisata**, **Kebudayaan**, **Galeri**, **Agenda** — isi sesuai kebutuhan, masing-masing punya field "Dusun" untuk relasi (kecuali Agenda, yang berlaku untuk seluruh desa).

Tips: nama (title) + foto utama (featured image) + excerpt (ringkasan) selalu dipakai di semua tipe konten; field tambahan (koordinat, kontak, dll) ada di kotak "Detail ..." di bawah editor.

## 5. Sambungkan ke Next.js

Di file `.env.local` (lihat `.env.example`):

```
NEXT_PUBLIC_WORDPRESS_API_URL=https://domain-wordpress-anda.com/wp-json/wp/v2
```

Deploy ulang (atau restart `npm run dev`) — frontend otomatis beralih dari data contoh ke data WordPress yang sebenarnya.

## Verifikasi cepat

Buka di browser: `https://domain-wordpress-anda.com/wp-json/wp/v2/dusun` — harus muncul JSON berisi data dusun, dengan field tambahan di dalam key `"acf"`. Jika `"acf"` tidak muncul, cek Custom Fields → [Field Group terkait] → Settings → pastikan **"Show in REST API"** aktif (tergantung versi ACF).

## Catatan keamanan

Plugin ini mengizinkan akses CORS dari semua origin (`Access-Control-Allow-Origin: *`) supaya domain Vercel Anda bisa membaca REST API. Setelah domain produksi Anda tetap, sebaiknya ganti `*` di bagian bawah `portal-desa-jlubang.php` dengan domain spesifik Anda, misalnya `https://wonodadi.vercel.app`, untuk keamanan lebih baik.
