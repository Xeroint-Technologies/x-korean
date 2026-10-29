# X-Korean Website

Landing page responsif untuk aplikasi Android X-Korean. Dibuat menggunakan HTML, CSS, dan JavaScript biasa, tanpa framework/build step.

## Jalankan lokal

Buka `index.html` di browser. Untuk pengujian fetch manifest, disarankan memakai local server (misalnya ekstensi Live Server di VS Code), karena browser dapat membatasi `fetch()` dari file lokal.

## Hosting dengan GitHub Pages

1. Upload seluruh isi folder ini ke repository GitHub (pastikan `index.html` berada di root repository).
2. Buka **Settings → Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch yang digunakan (mis. `main`) dan folder `/ (root)`, lalu **Save**.
5. Tunggu proses deploy selesai dan buka URL GitHub Pages yang diberikan.

## Update versi dan tautan APK

Website mengambil `version`, `data_version`, dan `apk_url` dari manifest:
`https://raw.githubusercontent.com/Xeroint-Technologies/asset-korea-gbrn/main/github-data/manifest.json`

Jika manifest tidak bisa diakses, website memakai nilai cadangan di `script.js`. Ubah bagian `FALLBACK` jika tautan APK atau versi cadangan berubah.

Tombol download membuka tautan Google Drive yang tersedia di manifest. Pastikan pengaturan berbagi file APK di Google Drive mengizinkan pengunjung mengaksesnya.
