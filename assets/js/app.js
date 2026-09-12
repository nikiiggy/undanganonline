document.addEventListener("DOMContentLoaded", function () {
  // Ambil nama tamu dari parameter URL (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  if (guestName) {
    document.getElementById('guest-name').textContent = guestName;
  }

  // Ambil data dari data.json di folder yang sama
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      // Panggil CSS tema sesuai isi JSON
      document.getElementById('theme-style').href = `../assets/css/${data.theme}.css`;

      // Set teks HTML dari JSON
      document.getElementById('bride-groom').textContent = `${data.pria} & ${data.wanita}`;
      document.getElementById('akad-date').textContent = `${data.akad.tanggal} (${data.akad.jam})`;
      document.getElementById('akad-maps').href = data.akad.maps;
      
      document.getElementById('resepsi-date').textContent = `${data.resepsi.tanggal} (${data.resepsi.jam})`;
      document.getElementById('resepsi-maps').href = data.resepsi.maps;
    })
    .catch(err => console.error("Gagal load JSON:", err));
});
