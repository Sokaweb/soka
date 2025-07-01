// script.js
document.addEventListener('DOMContentLoaded', () => {
  fetch('/data/dataCamp.json')
    .then(response => response.json())
    .then(data => {
      const mesMap = {
        enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
        julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
      };

      // 1. Transformamos el objeto en un array con fecha para ordenar
      const eventos = Object.values(data).map(item => {
        const mesNum = mesMap[item.mes.toLowerCase()];
        const año = new Date().getFullYear();
        const fecha = new Date(año, mesNum, item.diaInicio);
        return { ...item, mesNum, fecha };
      }).filter(e => e && !isNaN(e.fecha));

      // 2. Separamos próximos y pasados
      const hoy = new Date();
      const proximos = eventos.filter(e => e.fecha >= hoy)
                              .sort((a, b) => a.fecha - b.fecha);
      const pasados  = eventos.filter(e => e.fecha <  hoy)
                              .sort((a, b) => a.fecha - b.fecha);

      // 3. Renderizamos el próximo evento
      const div1 = document.getElementById('proximo-evento');
      if (proximos.length) {
        const e = proximos[0];
        div1.innerHTML = `
          <div class="d-flex my-1 gradient-yellow shadow p-0 rounded col-12 col-md-6 mx-auto align-items-center">
            <div class="col-4 bg-primary rounded text-center p-1">
              <p class="bungee text-white m-0 text-uppercase pt-1">${e.mes}</p>
              <h2 class="bungee text-white m-0" style="text-shadow: 2px 2px 2px black;">${e.diaInicio}-${e.diaFin}</h2>
            </div>
            <div class="col-8">
              <h2 class="bungee text-left text-white m-0 ">
                <span class="py-1  rounded">${e.ciudad}</span>
              </h2>
              <h6 class="text-left text-white m-0 font-weight-normal text-uppercase">${e.lugar}</h6>
            </div>
          </div>
        `;
      } else {
        div1.innerHTML = `<p>No hay próximos eventos.</p>`;
      }

      // 4. Renderizamos los demás eventos
      const div2 = document.getElementById('eventos-restantes');
      let html = '';

      // 4.1. Próximos restantes
      proximos.slice(1).forEach(e => {
        html += `
          <div class="d-flex my-1 bg-primary shadow p-0 rounded col-12 col-md-4 mx-0 mx-md-1 align-items-center">
            <div class="col-4 gradient-yellow rounded text-center p-2 m-0">
              <p class="bungee text-primary-morado m-0 text-uppercase pt-1">${e.mes}</p>
              <h2 class="bungee text-white m-0" style="text-shadow: 2px 2px 2px black;">${e.diaInicio}-${e.diaFin}</h2>
            </div>
            <div class="col-8">
              <h2 class="bungee text-left text-white m-0 ">
                <span class="py-1  rounded">${e.ciudad}</span>
              </h2>
              <h6 class="text-left text-white m-0 font-weight-normal text-uppercase">${e.lugar}</h6>
            </div>
          </div>
        `;
      });

      // 4.2. Pasados al final con "Próximamente"
      pasados.forEach(e => {
        html += `
          <div class="my-3 bg-secondary shadow p-2 py-3 rounded col-12 col-md-4 mx-0 mx-md-1 evento pasado">
            <h2 class="bungee text-white m-0 mb-2">
              <span class="gradient-yellow py-1 px-3 rounded">${e.ciudad}</span>
            </h2>
            <h4 class="bungee text-white m-0 mt-1">Próximamente</h4>
            <h4 class="bungee text-white m-0">${e.lugar}</h4>
          </div>
        `;
      });

      div2.innerHTML = html;
    })
    .catch(err => {
      console.error('Error al cargar dataCamp.json:', err);
    });
});
