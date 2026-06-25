<?php
/**
 * Plugin Name: Portal Desa Jlubang — Content API
 * Description: Registers the Custom Post Types, ACF fields, and REST routes that the Next.js frontend (github.com/Mhoseaaa/desa-jlubang) expects. Requires the free "Advanced Custom Fields" plugin to be installed and active.
 * Version: 1.0.0
 * Author: Tim KKN Desa Jlubang
 */

if (!defined('ABSPATH')) exit;

/* ===========================================================
   1. Custom Post Types
   =========================================================== */
add_action('init', function () {
    $cpts = [
        'dusun'        => ['label' => 'Dusun',        'icon' => 'dashicons-location-alt',   'archive' => true],
        'umkm'         => ['label' => 'UMKM',          'icon' => 'dashicons-store',          'archive' => true],
        'wisata'       => ['label' => 'Wisata',        'icon' => 'dashicons-camera',         'archive' => true],
        'kebudayaan'   => ['label' => 'Kebudayaan',    'icon' => 'dashicons-art',             'archive' => true],
        'agenda'       => ['label' => 'Agenda',        'icon' => 'dashicons-calendar-alt',   'archive' => true],
        'galeri'       => ['label' => 'Galeri',        'icon' => 'dashicons-format-gallery', 'archive' => false],
        'pemerintahan' => ['label' => 'Pemerintahan',  'icon' => 'dashicons-groups',          'archive' => false],
    ];

    foreach ($cpts as $slug => $cfg) {
        register_post_type($slug, [
            'labels' => [
                'name'          => $cfg['label'],
                'singular_name' => $cfg['label'],
                'add_new_item'  => "Tambah {$cfg['label']}",
                'edit_item'     => "Edit {$cfg['label']}",
                'all_items'     => "Semua {$cfg['label']}",
            ],
            'public'       => true,
            'has_archive'  => $cfg['archive'],
            'show_in_rest' => true,
            'rest_base'    => $slug,
            'menu_icon'    => $cfg['icon'],
            'supports'     => ['title', 'editor', 'excerpt', 'thumbnail'],
            'menu_position' => 20,
        ]);
    }
});

/* ===========================================================
   2. ACF Field Groups
   Each group sets `show_in_rest` so its fields are exposed
   under the `acf` key of the post's REST response — this is
   the exact shape src/lib/api/wordpress.ts expects.
   =========================================================== */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    $dusun_relation_field = [
        'key'           => 'field_dusun_relation',
        'name'          => 'dusun',
        'label'         => 'Dusun',
        'type'          => 'post_object',
        'post_type'     => ['dusun'],
        'return_format' => 'object',
        'ui'            => 1,
        'instructions'  => 'Pilih dusun yang menjadi lokasi data ini.',
    ];

    // --- Dusun ---------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_dusun', 'title' => 'Detail Dusun', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'dusun']]],
        'fields' => [
            ['key' => 'field_dusun_history', 'name' => 'history', 'label' => 'Sejarah Dusun', 'type' => 'textarea', 'rows' => 6, 'instructions' => 'Gunakan baris kosong untuk memisah paragraf.'],
            ['key' => 'field_dusun_lat', 'name' => 'latitude', 'label' => 'Latitude', 'type' => 'number', 'step' => 'any', 'required' => 1],
            ['key' => 'field_dusun_lng', 'name' => 'longitude', 'label' => 'Longitude', 'type' => 'number', 'step' => 'any', 'required' => 1],
            ['key' => 'field_dusun_head', 'name' => 'head_name', 'label' => 'Nama Kepala Dusun', 'type' => 'text'],
            ['key' => 'field_dusun_pop', 'name' => 'population', 'label' => 'Jumlah Penduduk', 'type' => 'number'],
            ['key' => 'field_dusun_area', 'name' => 'area', 'label' => 'Luas Wilayah', 'type' => 'text', 'placeholder' => 'contoh: 6.2 km²'],
            ['key' => 'field_dusun_rt', 'name' => 'rt', 'label' => 'Jumlah RT', 'type' => 'number'],
            ['key' => 'field_dusun_rw', 'name' => 'rw', 'label' => 'Jumlah RW', 'type' => 'number'],
        ],
    ]);

    // --- UMKM ------------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_umkm', 'title' => 'Detail UMKM', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'umkm']]],
        'fields' => [
            ['key' => 'field_umkm_desc', 'name' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea', 'rows' => 4, 'required' => 1],
            ['key' => 'field_umkm_category', 'name' => 'category', 'label' => 'Kategori', 'type' => 'select', 'choices' => [
                'Kerajinan' => 'Kerajinan', 'Kuliner' => 'Kuliner', 'Kesehatan' => 'Kesehatan', 'Fashion' => 'Fashion', 'Jasa' => 'Jasa',
            ], 'allow_null' => 0],
            ['key' => 'field_umkm_owner', 'name' => 'owner', 'label' => 'Nama Pemilik', 'type' => 'text', 'required' => 1],
            ['key' => 'field_umkm_phone', 'name' => 'phone', 'label' => 'No. Telepon / WhatsApp', 'type' => 'text', 'required' => 1, 'placeholder' => '0812-3456-7890'],
            ['key' => 'field_umkm_address', 'name' => 'address', 'label' => 'Alamat', 'type' => 'text', 'required' => 1],
            ['key' => 'field_umkm_products', 'name' => 'products', 'label' => 'Produk Unggulan', 'type' => 'text', 'instructions' => 'Pisahkan dengan koma, contoh: Batik Tulis, Batik Cap, Selendang'],
            ['key' => 'field_umkm_lat', 'name' => 'latitude', 'label' => 'Latitude', 'type' => 'number', 'step' => 'any', 'required' => 1],
            ['key' => 'field_umkm_lng', 'name' => 'longitude', 'label' => 'Longitude', 'type' => 'number', 'step' => 'any', 'required' => 1],
            array_merge($dusun_relation_field, ['key' => 'field_umkm_dusun', 'required' => 1]),
            ['key' => 'field_umkm_gallery', 'name' => 'gallery', 'label' => 'Galeri Foto Tambahan', 'type' => 'gallery', 'instructions' => 'Foto produk selain foto utama (featured image).'],
        ],
    ]);

    // --- Wisata ------------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_wisata', 'title' => 'Detail Wisata', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'wisata']]],
        'fields' => [
            ['key' => 'field_wisata_desc', 'name' => 'description', 'label' => 'Deskripsi', 'type' => 'textarea', 'rows' => 4, 'required' => 1],
            ['key' => 'field_wisata_category', 'name' => 'category', 'label' => 'Kategori', 'type' => 'select', 'choices' => [
                'Alam' => 'Alam', 'Budaya' => 'Budaya', 'Edukasi' => 'Edukasi', 'Religi' => 'Religi',
            ], 'allow_null' => 0],
            ['key' => 'field_wisata_facilities', 'name' => 'facilities', 'label' => 'Fasilitas', 'type' => 'text', 'instructions' => 'Pisahkan dengan koma, contoh: Parkir, Toilet, Warung, Gazebo'],
            ['key' => 'field_wisata_price', 'name' => 'ticket_price', 'label' => 'Harga Tiket', 'type' => 'text', 'placeholder' => 'contoh: Rp 10.000'],
            ['key' => 'field_wisata_hours', 'name' => 'open_hours', 'label' => 'Jam Operasional', 'type' => 'text', 'placeholder' => 'contoh: 07:00 - 17:00 WIB'],
            ['key' => 'field_wisata_lat', 'name' => 'latitude', 'label' => 'Latitude', 'type' => 'number', 'step' => 'any', 'required' => 1],
            ['key' => 'field_wisata_lng', 'name' => 'longitude', 'label' => 'Longitude', 'type' => 'number', 'step' => 'any', 'required' => 1],
            ['key' => 'field_wisata_address', 'name' => 'address', 'label' => 'Alamat', 'type' => 'text', 'required' => 1],
            ['key' => 'field_wisata_rating', 'name' => 'rating', 'label' => 'Rating (0–5)', 'type' => 'number', 'step' => '0.1', 'min' => 0, 'max' => 5],
            array_merge($dusun_relation_field, ['key' => 'field_wisata_dusun', 'required' => 1]),
            ['key' => 'field_wisata_gallery', 'name' => 'gallery', 'label' => 'Galeri Foto Tambahan', 'type' => 'gallery'],
        ],
    ]);

    // --- Kebudayaan ------------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_kebudayaan', 'title' => 'Detail Kebudayaan', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'kebudayaan']]],
        'fields' => [
            ['key' => 'field_kebudayaan_category', 'name' => 'category', 'label' => 'Kategori', 'type' => 'select', 'required' => 1, 'choices' => [
                'tradisi' => 'Tradisi', 'kesenian' => 'Kesenian', 'makanan' => 'Makanan Khas', 'kerajinan' => 'Kerajinan', 'cerita-rakyat' => 'Cerita Rakyat',
            ], 'allow_null' => 0, 'instructions' => 'Gunakan Excerpt untuk ringkasan singkat dan Editor (konten utama) untuk isi lengkap.'],
            array_merge($dusun_relation_field, ['key' => 'field_kebudayaan_dusun', 'required' => 1]),
            ['key' => 'field_kebudayaan_video', 'name' => 'video_url', 'label' => 'URL Video (YouTube)', 'type' => 'url'],
            ['key' => 'field_kebudayaan_gallery', 'name' => 'gallery', 'label' => 'Dokumentasi Foto', 'type' => 'gallery'],
        ],
    ]);

    // --- Agenda ------------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_agenda', 'title' => 'Detail Agenda', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'agenda']]],
        'fields' => [
            ['key' => 'field_agenda_date', 'name' => 'event_date', 'label' => 'Tanggal', 'type' => 'date_picker', 'return_format' => 'Y-m-d', 'display_format' => 'd/m/Y', 'required' => 1],
            ['key' => 'field_agenda_time', 'name' => 'event_time', 'label' => 'Waktu', 'type' => 'text', 'placeholder' => 'contoh: 09:00 - 12:00 WIB'],
            ['key' => 'field_agenda_location', 'name' => 'location', 'label' => 'Lokasi', 'type' => 'text', 'required' => 1],
            ['key' => 'field_agenda_category', 'name' => 'category', 'label' => 'Kategori', 'type' => 'text', 'placeholder' => 'contoh: Pemerintahan, Sosial, Pertanian'],
            ['key' => 'field_agenda_status', 'name' => 'status', 'label' => 'Status', 'type' => 'select', 'choices' => [
                'upcoming' => 'Akan Datang', 'ongoing' => 'Berlangsung', 'completed' => 'Selesai',
            ], 'default_value' => 'upcoming', 'allow_null' => 0, 'instructions' => 'Gunakan Excerpt untuk ringkasan kegiatan.'],
        ],
    ]);

    // --- Galeri ------------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_galeri', 'title' => 'Detail Galeri', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'galeri']]],
        'fields' => [
            ['key' => 'field_galeri_caption', 'name' => 'caption', 'label' => 'Keterangan Foto', 'type' => 'text'],
            array_merge($dusun_relation_field, ['key' => 'field_galeri_dusun', 'required' => 0, 'instructions' => 'Kosongkan jika foto bersifat umum (tidak spesifik satu dusun).']),
        ],
    ]);
    // Note: set the Featured Image for each Galeri entry — that's the photo itself.

    // --- Pemerintahan ------------------------------------------------------------
    acf_add_local_field_group([
        'key' => 'group_pemerintahan', 'title' => 'Detail Pejabat', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'pemerintahan']]],
        'fields' => [
            ['key' => 'field_pemerintahan_role', 'name' => 'role', 'label' => 'Jabatan', 'type' => 'text', 'required' => 1, 'placeholder' => 'contoh: Kepala Desa, Kepala Dusun Citrowonodadi'],
            ['key' => 'field_pemerintahan_period', 'name' => 'period', 'label' => 'Periode Jabatan', 'type' => 'text', 'placeholder' => 'contoh: 2024–2030'],
        ],
    ]);
    // Note: use the title field for the person's name, Featured Image for their photo.

    // --- Desa Profile (singleton, lives on an Options Page) -------------------
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Profil Desa',
            'menu_title' => 'Profil Desa',
            'menu_slug'  => 'profil-desa-settings',
            'capability' => 'manage_options',
            'icon_url'   => 'dashicons-admin-home',
            'redirect'   => false,
        ]);
    }

    acf_add_local_field_group([
        'key' => 'group_profil_desa', 'title' => 'Profil Desa',
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'profil-desa-settings']]],
        'fields' => [
            ['key' => 'field_pd_tab_umum', 'name' => 'tab_umum', 'label' => 'Umum', 'type' => 'tab'],
            ['key' => 'field_pd_name', 'name' => 'name', 'label' => 'Nama Desa', 'type' => 'text', 'default_value' => 'Desa Jlubang'],
            ['key' => 'field_pd_tagline', 'name' => 'tagline', 'label' => 'Tagline', 'type' => 'text'],
            ['key' => 'field_pd_description', 'name' => 'description', 'label' => 'Deskripsi Singkat', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_pd_history', 'name' => 'history', 'label' => 'Sejarah Desa', 'type' => 'textarea', 'rows' => 8, 'instructions' => 'Gunakan baris kosong untuk memisah paragraf.'],
            ['key' => 'field_pd_vision', 'name' => 'vision', 'label' => 'Visi', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_pd_mission', 'name' => 'mission', 'label' => 'Misi', 'type' => 'textarea', 'rows' => 6, 'instructions' => 'Satu poin misi per baris.'],

            ['key' => 'field_pd_tab_kontak', 'name' => 'tab_kontak', 'label' => 'Kontak & Lokasi', 'type' => 'tab'],
            ['key' => 'field_pd_address', 'name' => 'address', 'label' => 'Alamat', 'type' => 'text'],
            ['key' => 'field_pd_district', 'name' => 'district', 'label' => 'Kecamatan', 'type' => 'text'],
            ['key' => 'field_pd_regency', 'name' => 'regency', 'label' => 'Kabupaten', 'type' => 'text'],
            ['key' => 'field_pd_province', 'name' => 'province', 'label' => 'Provinsi', 'type' => 'text'],
            ['key' => 'field_pd_postal_code', 'name' => 'postal_code', 'label' => 'Kode Pos', 'type' => 'text'],
            ['key' => 'field_pd_phone', 'name' => 'phone', 'label' => 'Telepon', 'type' => 'text'],
            ['key' => 'field_pd_email', 'name' => 'email', 'label' => 'Email', 'type' => 'email'],
            ['key' => 'field_pd_head_name', 'name' => 'head_name', 'label' => 'Nama Kepala Desa', 'type' => 'text'],
            ['key' => 'field_pd_head_title', 'name' => 'head_title', 'label' => 'Jabatan', 'type' => 'text', 'default_value' => 'Kepala Desa'],
            ['key' => 'field_pd_lat', 'name' => 'latitude', 'label' => 'Latitude Kantor Desa', 'type' => 'number', 'step' => 'any'],
            ['key' => 'field_pd_lng', 'name' => 'longitude', 'label' => 'Longitude Kantor Desa', 'type' => 'number', 'step' => 'any'],
            ['key' => 'field_pd_fb', 'name' => 'social_facebook', 'label' => 'Facebook URL', 'type' => 'url'],
            ['key' => 'field_pd_ig', 'name' => 'social_instagram', 'label' => 'Instagram URL', 'type' => 'url'],
            ['key' => 'field_pd_yt', 'name' => 'social_youtube', 'label' => 'YouTube URL', 'type' => 'url'],
            ['key' => 'field_pd_tw', 'name' => 'social_twitter', 'label' => 'Twitter / X URL', 'type' => 'url'],
            ['key' => 'field_pd_tiktok', 'name' => 'social_tiktok', 'label' => 'TikTok URL', 'type' => 'url'],

            ['key' => 'field_pd_tab_stats', 'name' => 'tab_stats', 'label' => 'Statistik', 'type' => 'tab'],
            ['key' => 'field_pd_stat_population', 'name' => 'stat_population', 'label' => 'Jumlah Penduduk', 'type' => 'number'],
            ['key' => 'field_pd_stat_area', 'name' => 'stat_area', 'label' => 'Luas Wilayah', 'type' => 'text', 'placeholder' => 'contoh: 12.5 km²'],
            ['key' => 'field_pd_stat_dusun', 'name' => 'stat_dusun', 'label' => 'Jumlah Dusun', 'type' => 'number'],
            ['key' => 'field_pd_stat_rt', 'name' => 'stat_rt', 'label' => 'Jumlah RT', 'type' => 'number'],
            ['key' => 'field_pd_stat_rw', 'name' => 'stat_rw', 'label' => 'Jumlah RW', 'type' => 'number'],
            ['key' => 'field_pd_stat_elevation', 'name' => 'stat_elevation', 'label' => 'Ketinggian', 'type' => 'text', 'placeholder' => 'contoh: 200 mdpl'],
        ],
    ]);
});

/* ===========================================================
   3. Desa Profile REST route
   Custom namespace (not /wp/v2) since this is a singleton
   backed by an ACF Options Page, not a post type.
   GET /wp-json/portal-desa/v1/profile
   =========================================================== */
add_action('rest_api_init', function () {
    register_rest_route('portal-desa/v1', '/profile', [
        'methods'  => 'GET',
        'callback' => function () {
            if (!function_exists('get_field')) {
                return new WP_Error('acf_missing', 'Advanced Custom Fields harus aktif.', ['status' => 500]);
            }

            $mission_raw = (string) get_field('mission', 'option');
            $mission = array_values(array_filter(array_map('trim', explode("\n", $mission_raw))));

            return [
                'name'        => get_field('name', 'option'),
                'tagline'     => get_field('tagline', 'option'),
                'description' => get_field('description', 'option'),
                'history'     => get_field('history', 'option'),
                'vision'      => get_field('vision', 'option'),
                'mission'     => $mission,
                'address'     => get_field('address', 'option'),
                'district'    => get_field('district', 'option'),
                'regency'     => get_field('regency', 'option'),
                'province'    => get_field('province', 'option'),
                'postalCode'  => get_field('postal_code', 'option'),
                'phone'       => get_field('phone', 'option'),
                'email'       => get_field('email', 'option'),
                'headName'    => get_field('head_name', 'option'),
                'headTitle'   => get_field('head_title', 'option'),
                'latitude'    => (float) get_field('latitude', 'option'),
                'longitude'   => (float) get_field('longitude', 'option'),
                'socialMedia' => [
                    'facebook'  => get_field('social_facebook', 'option') ?: null,
                    'instagram' => get_field('social_instagram', 'option') ?: null,
                    'youtube'   => get_field('social_youtube', 'option') ?: null,
                    'twitter'   => get_field('social_twitter', 'option') ?: null,
                    'tiktok'    => get_field('social_tiktok', 'option') ?: null,
                ],
                'stats' => [
                    'population' => (int) get_field('stat_population', 'option'),
                    'area'       => get_field('stat_area', 'option'),
                    'dusun'      => (int) get_field('stat_dusun', 'option'),
                    'rt'         => (int) get_field('stat_rt', 'option'),
                    'rw'         => (int) get_field('stat_rw', 'option'),
                    'elevation'  => get_field('stat_elevation', 'option'),
                ],
            ];
        },
        'permission_callback' => '__return_true',
    ]);
});

/* ===========================================================
   4. CORS — allow the Next.js frontend (running on a different
   origin: localhost in dev, your Vercel domain in production)
   to read these REST endpoints.
   =========================================================== */
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $allowed_origins = [
            'https://desa-jlubang.vercel.app',
            'http://localhost:3000',
        ];
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        if (in_array($origin, $allowed_origins, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
        header('Access-Control-Allow-Methods: GET');
        return $value;
    });
}, 15);
