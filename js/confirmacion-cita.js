var urlPage = window.location.search;
const urlParams = new URLSearchParams(urlPage)
const nombre = urlParams.get('invitee_full_name');
const servicio = urlParams.get('event_type_name');


const fecha_inicio = urlParams.get('event_start_time');
const fecha = new Date(fecha_inicio).toLocaleDateString('es-co', { day:"numeric", month:"long", weekday:"long",});
const hora = new Date(fecha_inicio).toLocaleTimeString('es-co', {hour:"numeric", minute:"numeric"});


const modalidad = urlParams.get('modalidad');

// 2022-10-31T19:00:00-05:00


//https://sokakids.com/confirmacion-asesoria?assigned_to=Soka%20Kids&event_type_uuid=cfd0884a-3db5-4e40-9712-7f6edf2be4ec&event_type_name=Sesión%20de%20Coach&event_start_time=2022-10-31T19%3A00%3A00-05%3A00&event_end_time=2022-10-31T20%3A00%3A00-05%3A00&invitee_uuid=214b8ee8-c862-4cbc-b259-26f33035200a&invitee_full_name=Gio%20Moreno&invitee_email=giovannnym%40gmail.com&text_reminder_number=%2B57%20313%202047407&answer_1=3132047407


document.getElementById('invitee_name').innerText = nombre;
document.getElementById('service_type').innerText = servicio;
document.getElementById('event_start').innerText = fecha;
document.getElementById('time').innerText = hora;
document.getElementById('modalidad').innerText = modalidad;

if (modalidad === 'Virtual') {
    document.getElementById('whatsapp').classList.add('d-none');
}