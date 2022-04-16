document.addEventListener('DOMContentLoaded', function () {

    // Recolectar los datos del formulario
    let formulario = document.querySelector('form');

    let calendarEl = document.getElementById('agenda');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        //Traducir al español
        locale: "es",
        //Opciones del calendario
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        dateClick: function (info) {
            $("#evento").modal("show");
        }
    });
    calendar.render();

    document.getElementById("btnGuardar").addEventListener("click", function () {

        const datos = new FormData(formulario);
        console.log(datos);


    });
});