// Obtener el parámetro "ct" de la URL
function getCT() {
  const params = new URLSearchParams(window.location.search);
  const ct = params.get('ct');
  return ct ? ct : 'default';
}

// Cargar datos desde el JSON
async function cargarDatos() {
  try {
    const response = await fetch('/data/dataVr.json');
    const data = await response.json();

    const ct = getCT();
    const info = data[ct] || data['default'];

    // Aquí puedes manipular el DOM según los datos
    if (ct === 'default') {
      document.getElementById('mensaje').textContent = info.mensaje;
    } else {
      document.getElementById('ciudad').textContent = info.ciudad;
      document.getElementById('fechas').textContent = info.fechas;
      document.getElementById('lugar').textContent = info.lugar;
    }

  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
}

// Ejecutar la función
cargarDatos();