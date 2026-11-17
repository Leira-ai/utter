// Utter web: tombol salin alamat + penanda blok terbaru dari RPC publik.
// Tanpa dependensi. Gagal jaringan tidak memengaruhi isi halaman.
(function () {
  document.querySelectorAll('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          var old = btn.textContent;
          btn.textContent = 'Tersalin';
          setTimeout(function () { btn.textContent = old; }, 1400);
        });
      }
    });
  });

  var slot = document.querySelector('[data-latest-block]');
  if (slot) {
    fetch('https://sepolia-rpc.giwa.io', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_blockNumber', params: [] }),
    })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var n = parseInt(j.result, 16);
        if (Number.isFinite(n)) slot.textContent = 'Blok terbaru jaringan saat halaman ini dibuka: ' + n.toLocaleString('id-ID') + '.';
      })
      .catch(function () { /* diam: snapshot tetap terbaca */ });
  }
})();
