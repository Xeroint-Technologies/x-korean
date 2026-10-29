(() => {
  const MANIFEST_URL = 'https://raw.githubusercontent.com/Xeroint-Technologies/asset-korea-gbrn/main/github-data/manifest.json';
  const FALLBACK = {
    version: '1.0.6',
    version_code: 6,
    apk_url: 'https://drive.google.com/file/d/1S1vO-nsaUkVmHjNcvtxpGbhvbxYXmQbE/view?usp=drive_link',
    data_version: '1.0.2'
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  };

  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Tutup menu' : 'Buka menu');
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  setText('year', new Date().getFullYear());

  async function loadManifest() {
    try {
      const response = await fetch(`${MANIFEST_URL}?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Manifest tidak dapat dimuat');
      const manifest = await response.json();
      const version = typeof manifest.version === 'string' ? manifest.version : FALLBACK.version;
      const dataVersion = typeof manifest.data_version === 'string' ? manifest.data_version : FALLBACK.data_version;
      const apkUrl = typeof manifest.apk_url === 'string' && /^https:\/\//i.test(manifest.apk_url) ? manifest.apk_url : FALLBACK.apk_url;
      ['heroVersion', 'downloadVersion', 'floatingVersion'].forEach(id => setText(id, `v${version}`));
      setText('dataVersion', `v${dataVersion}`);
      const button = document.getElementById('downloadButton');
      if (button) button.href = apkUrl;
      setText('manifestStatus', 'Versi terbaru dimuat dari manifest resmi.');
    } catch (error) {
      // The site still works offline or when GitHub is temporarily unavailable.
      ['heroVersion', 'downloadVersion', 'floatingVersion'].forEach(id => setText(id, `v${FALLBACK.version}`));
      setText('dataVersion', `v${FALLBACK.data_version}`);
      const button = document.getElementById('downloadButton');
      if (button) button.href = FALLBACK.apk_url;
      setText('manifestStatus', 'Menggunakan informasi versi cadangan.');
    }
  }
  loadManifest();
})();
