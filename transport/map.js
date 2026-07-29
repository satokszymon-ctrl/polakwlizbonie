/* Mapa transportu w Lizbonie: linie metra, promy i koleje podmiejskie
   na podkładzie OpenStreetMap. Współrzędne stacji są przybliżone. */
(function () {
  var el = document.getElementById('mapa-lizbona');
  if (!el || typeof L === 'undefined') return;

  var KOLOR = {
    azul: '#1d5bb0',
    amarela: '#d99a00',
    verde: '#2f8a56',
    vermelha: '#c94334',
    prom: '#0f6f9e',
    kolej: '#5d6b78'
  };

  var metro = {
    azul: {
      nazwa: 'Linha Azul',
      stacje: [
        ['Reboleira', 38.7522, -9.2408], ['Amadora Este', 38.7565, -9.2295],
        ['Alfornelos', 38.7601, -9.2181], ['Pontinha', 38.7658, -9.2058],
        ['Carnide', 38.7592, -9.1966], ['Colégio Militar/Luz', 38.7527, -9.1926],
        ['Alto dos Moinhos', 38.7492, -9.1861], ['Laranjeiras', 38.7481, -9.1780],
        ['Jardim Zoológico', 38.7423, -9.1700], ['Praça de Espanha', 38.7401, -9.1630],
        ['São Sebastião', 38.7372, -9.1547], ['Parque', 38.7332, -9.1508],
        ['Marquês de Pombal', 38.7250, -9.1500], ['Avenida', 38.7203, -9.1450],
        ['Restauradores', 38.7150, -9.1420], ['Baixa-Chiado', 38.7110, -9.1400],
        ['Terreiro do Paço', 38.7075, -9.1360], ['Santa Apolónia', 38.7140, -9.1230]
      ]
    },
    amarela: {
      nazwa: 'Linha Amarela',
      stacje: [
        ['Odivelas', 38.7930, -9.1830], ['Senhor Roubado', 38.7862, -9.1790],
        ['Ameixoeira', 38.7797, -9.1620], ['Lumiar', 38.7738, -9.1595],
        ['Quinta das Conchas', 38.7700, -9.1570], ['Campo Grande', 38.7592, -9.1570],
        ['Cidade Universitária', 38.7524, -9.1580], ['Entre Campos', 38.7470, -9.1470],
        ['Campo Pequeno', 38.7420, -9.1450], ['Saldanha', 38.7350, -9.1450],
        ['Picoas', 38.7300, -9.1470], ['Marquês de Pombal', 38.7250, -9.1500],
        ['Rato', 38.7200, -9.1540]
      ]
    },
    verde: {
      nazwa: 'Linha Verde',
      stacje: [
        ['Telheiras', 38.7570, -9.1680], ['Campo Grande', 38.7592, -9.1570],
        ['Alvalade', 38.7530, -9.1440], ['Roma', 38.7500, -9.1390],
        ['Areeiro', 38.7420, -9.1340], ['Alameda', 38.7370, -9.1340],
        ['Arroios', 38.7320, -9.1350], ['Anjos', 38.7270, -9.1350],
        ['Intendente', 38.7230, -9.1360], ['Martim Moniz', 38.7180, -9.1360],
        ['Rossio', 38.7140, -9.1395], ['Baixa-Chiado', 38.7110, -9.1400],
        ['Cais do Sodré', 38.7060, -9.1450]
      ]
    },
    vermelha: {
      nazwa: 'Linha Vermelha',
      stacje: [
        ['Aeroporto', 38.7688, -9.1284], ['Encarnação', 38.7724, -9.1200],
        ['Moscavide', 38.7770, -9.1090], ['Oriente', 38.7676, -9.0994],
        ['Cabo Ruivo', 38.7590, -9.0995], ['Olivais', 38.7570, -9.1080],
        ['Chelas', 38.7540, -9.1140], ['Bela Vista', 38.7480, -9.1160],
        ['Olaias', 38.7410, -9.1250], ['Alameda', 38.7370, -9.1340],
        ['Saldanha', 38.7350, -9.1450], ['São Sebastião', 38.7372, -9.1547]
      ]
    }
  };

  var koleje = [
    { nazwa: 'Linha de Cascais', punkty: [
      [38.7061, -9.1449], [38.7036, -9.1766], [38.6999, -9.1900], [38.6963, -9.2028],
      [38.6957, -9.2296], [38.6950, -9.2450], [38.6907, -9.2751], [38.6884, -9.2957],
      [38.6842, -9.3060], [38.6822, -9.3153], [38.6799, -9.3375], [38.6845, -9.3480],
      [38.6893, -9.3553], [38.6941, -9.3690], [38.6984, -9.3800], [38.7037, -9.3925],
      [38.7053, -9.3977], [38.7020, -9.4110], [38.6997, -9.4200]
    ]},
    { nazwa: 'Linha de Sintra', punkty: [
      [38.7143, -9.1395], [38.7280, -9.1673], [38.7390, -9.1840], [38.7503, -9.2010],
      [38.7550, -9.2180], [38.7580, -9.2350], [38.7565, -9.2620], [38.7622, -9.2757],
      [38.7627, -9.2873], [38.7690, -9.3010], [38.7740, -9.3180], [38.7788, -9.3345],
      [38.7853, -9.3452], [38.7930, -9.3557], [38.7974, -9.3722], [38.7990, -9.3865]
    ]},
    { nazwa: 'Fertagus (przez most 25 Kwietnia)', punkty: [
      [38.7420, -9.1340], [38.7470, -9.1470], [38.7420, -9.1680], [38.7280, -9.1673],
      [38.7080, -9.1720], [38.6990, -9.1762], [38.6875, -9.1745], [38.6785, -9.1665],
      [38.6650, -9.1560], [38.6455, -9.1455], [38.6280, -9.1230], [38.6180, -9.1075],
      [38.5958, -9.0680]
    ]},
    { nazwa: 'Linha da Azambuja', punkty: [
      [38.7139, -9.1225], [38.7280, -9.1120], [38.7395, -9.1041], [38.7550, -9.1010],
      [38.7676, -9.0994], [38.7773, -9.0972], [38.7941, -9.0983], [38.8075, -9.0935],
      [38.8382, -9.0846], [38.8580, -9.0700], [38.8963, -9.0353], [38.9280, -9.0060]
    ]}
  ];

  var promy = [
    { nazwa: 'Cais do Sodré → Cacilhas', punkty: [
      [38.7057, -9.1447], [38.6990, -9.1462], [38.6920, -9.1478], [38.6885, -9.1487]
    ]},
    { nazwa: 'Belém → Trafaria', punkty: [
      [38.6947, -9.2062], [38.6890, -9.2150], [38.6830, -9.2262], [38.6775, -9.2355]
    ]},
    { nazwa: 'Terreiro do Paço → Barreiro', punkty: [
      [38.7069, -9.1355], [38.6960, -9.1190], [38.6830, -9.1010], [38.6690, -9.0870],
      [38.6600, -9.0790], [38.6555, -9.0740]
    ]}
  ];

  var przesiadki = {
    'Campo Grande': 'amarela i verde',
    'Saldanha': 'amarela i vermelha',
    'São Sebastião': 'azul i vermelha',
    'Marquês de Pombal': 'azul i amarela',
    'Alameda': 'verde i vermelha',
    'Baixa-Chiado': 'azul i verde'
  };

  var mapa = L.map(el, { scrollWheelZoom: false, zoomControl: true });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(mapa);

  var wszystko = [];

  // koleje podmiejskie pod spodem
  koleje.forEach(function (k) {
    L.polyline(k.punkty, {
      color: KOLOR.kolej, weight: 3, opacity: .75, dashArray: '2 7', lineCap: 'round'
    }).bindTooltip(k.nazwa, { sticky: true }).addTo(mapa);
  });

  promy.forEach(function (p) {
    L.polyline(p.punkty, {
      color: KOLOR.prom, weight: 3, opacity: .9, dashArray: '9 7', lineCap: 'round'
    }).bindTooltip('Prom: ' + p.nazwa, { sticky: true }).addTo(mapa);
  });

  // linie metra
  Object.keys(metro).forEach(function (id) {
    var linia = metro[id];
    var punkty = linia.stacje.map(function (s) { return [s[1], s[2]]; });
    wszystko = wszystko.concat(punkty);

    L.polyline(punkty, {
      color: KOLOR[id], weight: 5, opacity: .95, lineCap: 'round', lineJoin: 'round'
    }).bindTooltip(linia.nazwa, { sticky: true }).addTo(mapa);

    linia.stacje.forEach(function (s) {
      var nazwa = s[0];
      var wezel = przesiadki[nazwa];
      L.circleMarker([s[1], s[2]], {
        radius: wezel ? 6 : 3.5,
        color: wezel ? '#15202b' : KOLOR[id],
        weight: wezel ? 2.5 : 2,
        fillColor: '#fff',
        fillOpacity: 1
      }).bindTooltip(
        wezel ? '<b>' + nazwa + '</b><br>przesiadka: ' + wezel : nazwa,
        { direction: 'top' }
      ).addTo(mapa);
    });
  });

  // lotnisko
  L.circleMarker([38.7688, -9.1284], {
    radius: 8, color: '#c94334', weight: 3, fillColor: '#fff', fillOpacity: 1
  }).bindTooltip('<b>Lotnisko</b><br>stacja Aeroporto, linia vermelha', { direction: 'top' }).addTo(mapa);

  mapa.fitBounds(L.latLngBounds(wszystko).pad(0.08));

  // klik odblokowuje przewijanie kolkiem myszy
  mapa.on('click', function () { mapa.scrollWheelZoom.enable(); });
  mapa.on('mouseout', function () { mapa.scrollWheelZoom.disable(); });
})();
