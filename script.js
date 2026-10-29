
(() => {
  const MANIFEST_URL =
    'https://raw.githubusercontent.com/Xeroint-Technologies/asset-korea-gbrn/main/github-data/manifest.json';

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Tutup menu' : 'Buka menu'
    );
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Buka menu');
    });
  });

  setText('year', new Date().getFullYear());

  async function loadManifest() {
    const button = document.getElementById('downloadButton');

    // Nonaktifkan download sampai manifest berhasil dimuat
    if (button) {
      button.removeAttribute('href');
      button.setAttribute('aria-disabled', 'true');
      button.style.pointerEvents = 'none';
      button.style.opacity = '0.6';
    }

    setText('manifestStatus', 'Memuat informasi versi terbaru...');

    try {
      const response = await fetch(
        `${MANIFEST_URL}?t=${Date.now()}`,
        { cache: 'no-store' }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const manifest = await response.json();

      if (
        typeof manifest.version !== 'string' ||
        typeof manifest.apk_url !== 'string' ||
        !/^https:\/\/\S+$/i.test(manifest.apk_url)
      ) {
        throw new Error('Data versi atau URL APK tidak valid');
      }

      ['heroVersion', 'downloadVersion', 'floatingVersion']
        .forEach(id => setText(id, `v${manifest.version}`));

      setText('dataVersion',
        typeof manifest.data_version === 'string'
          ? `v${manifest.data_version}`
          : 'Tidak tersedia'
      );

      if (button) {
        button.href = manifest.apk_url;
        button.removeAttribute('aria-disabled');
        button.style.pointerEvents = '';
        button.style.opacity = '';
      }

      setText(
        'manifestStatus',
        'Informasi versi berhasil dimuat dari manifest resmi.'
      );
    } catch (error) {
      console.error('Gagal memuat manifest:', error);

      ['heroVersion', 'downloadVersion', 'floatingVersion']
        .forEach(id => setText(id, 'Tidak tersedia'));

      setText('dataVersion', 'Tidak tersedia');
      setText(
        'manifestStatus',
        'Gagal memuat informasi versi. Silakan muat ulang halaman.'
      );
    }
  }

  loadManifest();
})();
