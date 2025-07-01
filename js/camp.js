// script.js
document.addEventListener('DOMContentLoaded', () => {
  // 1. Carga del JSON
  fetch('/data/dataCamp.json')
    .then(response => response.json())
    .then(data => {
      // 2. Mapeo a array con Date
      const mesMap = {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
        julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
      };

      const eventos = Object.values(data).map(item => {
        // Extraemos el primer día y el mes del campo "fechas"
        const match = item.fechas.match(/(\d{1,2})\s*(?:al|y)\s*\d{1,2}\s*de\s*([a-záéíóú]+)/i);
        if (!match) return null;
        const dia = parseInt(match[1], 10);
        const mes = mesMap[match[2].toLowerCase()];
        const año = new Date().getFullYear();
        const fecha = new Date(año, mes, dia);
        return { ...item, fecha };
      }).filter(e => e && !isNaN(e.fecha));

      // 3. Separar próximos y pasados
      const hoy = new Date();
      const proximos = eventos.filter(e => e.fecha >= hoy).sort((a, b) => a.fecha - b.fecha);
      const pasados  = eventos.filter(e => e.fecha <  hoy).sort((a, b) => a.fecha - b.fecha);

      // 4. Primer div: próximo evento (el más cercano >= hoy)
      const div1 = document.getElementById('proximo-evento');
      if (proximos.length > 0) {
        const e = proximos[0];
        div1.innerHTML = `
          <div class="my-3 p-2 py-3 " >
            <h1 class="bungee text-white m-0 mb-2"><span class="gradient-yellow py-1 px-3 rounded">${e.ciudad}</span></h1>
            <h1 class="bungee text-white m-0 mt-3" style="text-shadow: -2px 2px 2px rgba(8, 65, 80, 0.9);">${e.fechas}</h1>
            <h1 class="bungee text-white m-0" style="text-shadow: -2px 2px 4px rgba(11, 88, 107, 0.9);">${e.lugar}</h1>
          </div>
        `;
      } else {
        div1.innerHTML = `<p>No hay próximos eventos.</p>`;
      }

      // 5. Segundo div: resto de eventos
      const div2 = document.getElementById('eventos-restantes');
      let html = '';

      // 5.1. Los demás próximos, de más cercano a lejano (sin repetir el primero)
      proximos.slice(1).forEach(e => {
        html += `
          <div class="my-3 bg-secondary shadow p-2 py-3 pt-4 rounded col-12 col-md-4 mx-0 mx-md-1" >
            <h2 class="bungee text-white m-0 mb-2"><span class="gradient-yellow py-1 px-3 rounded">${e.ciudad}</span></h2>
            <h4 class="bungee text-white m-0 mt-3">${e.fechas}</h4>
            <h4 class="bungee text-white m-0">${e.lugar}</h4>
          </div>
        `;
      });

      // 5.2. Los pasados, al final, con etiqueta "Próximamente"
      pasados.forEach(e => {
        html += `
          <div class="my-3 bg-secondary shadow p-2 py-3 pt-4 rounded col-12 col-md-4 mx-0 mx-md-1 evento pasado" >
            <h2 class="bungee text-white m-0 mb-2"><span class="gradient-yellow py-1 px-3 rounded">${e.ciudad}</span></h2>
            <h4 class="bungee text-white m-0 mt-3">Próximamente</h4>
            <h4 class="bungee text-white m-0">${e.lugar}</h4>
          </div>
        `;
      });

      div2.innerHTML = html;
    })
    .catch(err => {
      console.error('Error al cargar eventos.json:', err);
    });
});
