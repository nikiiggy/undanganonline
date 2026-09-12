document.addEventListener("DOMContentLoaded", function () {
  // 1. Ambil Nama Tamu dari URL Query (?to=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guestName = urlParams.get('to');
  if (guestName) {
    document.getElementById('guest-name').textContent = guestName;
    document.getElementById('rsvp-nama').value = guestName;
  }

  // 2. Load Data JSON
  fetch('./data.json')
    .then(res => res.json())
    .then(data => {
      // Inject CSS Tema
      document.getElementById('theme-style').href = `../assets/css/${data.theme}.css`;
      
      // Set Music
      document.getElementById('bg-music').src = data.audio_url;

      // Cover & Mempelai
      const namaPasangan = `${data.pria.nama_panggilan} & ${data.wanita.nama_panggilan}`;
      document.getElementById('cover-couples').textContent = namaPasangan;
      document.getElementById('penutup-couples').textContent = namaPasangan;

      // Kutipan
      document.getElementById('salam-text').textContent = data.kutipan.salam;
      document.getElementById('quote-text').textContent = `"${data.kutipan.teks}"`;
      document.getElementById('quote-source').textContent = data.kutipan.sumber;

      // Profil Pria
      document.getElementById('pria-foto').src = data.pria.foto;
      document.getElementById('pria-lengkap').textContent = data.pria.nama_lengkap;
      document.getElementById('pria-ortu').textContent = data.pria.orang_tua;
      document.getElementById('pria-ig').href = data.pria.instagram;

      // Profil Wanita
      document.getElementById('wanita-foto').src = data.wanita.foto;
      document.getElementById('wanita-lengkap').textContent = data.wanita.nama_lengkap;
      document.getElementById('wanita-ortu').textContent = data.wanita.orang_tua;
      document.getElementById('wanita-ig').href = data.wanita.instagram;

      // Akad & Resepsi
      document.getElementById('akad-tgl').textContent = data.akad.tanggal;
      document.getElementById('akad-jam').textContent = data.akad.jam;
      document.getElementById('akad-lokasi').textContent = data.akad.lokasi;
      document.getElementById('akad-maps').href = data.akad.maps;

      document.getElementById('resepsi-tgl').textContent = data.resepsi.tanggal;
      document.getElementById('resepsi-jam').textContent = data.resepsi.jam;
      document.getElementById('resepsi-lokasi').textContent = data.resepsi.lokasi;
      document.getElementById('resepsi-maps').href = data.resepsi.maps;

      document.getElementById('save-calendar').href = data.save_the_date_url;

      // GaleriFoto
      const galleryBox = document.getElementById('gallery-container');
      data.galeri.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        galleryBox.appendChild(img);
      });
      document.getElementById('video-frame').src = data.video_embed;

      // Love Story
      const storyBox = document.getElementById('story-container');
      data.love_story.forEach(story => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `<strong>${story.tahun} - ${story.judul}</strong><p style="font-size:0.85rem;">${story.cerita}</p>`;
        storyBox.appendChild(item);
      });

      // Digital Gift / Rekening
      const rekBox = document.getElementById('rekening-container');
      data.rekening.forEach(rek => {
        const div = document.createElement('div');
        div.style.cssText = "background: var(--bg-color); padding: 12px; border-radius: 8px; margin-bottom: 10px;";
        div.innerHTML = `
          <strong>${rek.bank}</strong> - ${rek.nomor}<br>
          <small>a.n ${rek.pemilik}</small><br>
          <button class="btn btn-outline" style="font-size: 11px; padding: 4px 10px; margin-top: 5px;" onclick="navigator.clipboard.writeText('${rek.nomor}'); alert('Nomor rekening disalin!')">Salin Rekening</button>
        `;
        rekBox.appendChild(div);
      });
    });
});

// Fitur Buka Undangan & Play Music
function bukaUndangan() {
  document.getElementById('cover').classList.add('opened');
  document.body.classList.remove('locked');
  const music = document.getElementById('bg-music');
  music.play().catch(() => console.log("Autoplay ditahan browser"));
}

// Fitur Kirim RSVP ke WhatsApp
function kirimRSVP(event) {
  event.preventDefault();
  const nama = document.getElementById('rsvp-nama').value;
  const status = document.getElementById('rsvp-status').value;
  const jumlah = document.getElementById('rsvp-jumlah').value;
  const pesan = document.getElementById('rsvp-pesan').value;
  
  const noWA = "6281234567890"; // Ganti dengan Nomor WA Pengantin / Admin kamu
  const text = `Halo, saya *${nama}*\nStatus: *${status}* (${jumlah} orang)\n\nUcapan:\n"${pesan}"`;
  
  window.open(`https://wa.me/${noWA}?text=${encodeURIComponent(text)}`, '_blank');
}
