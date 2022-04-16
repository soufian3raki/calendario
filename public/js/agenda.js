document.addEventListener('DOMContentLoaded', function () {

    // Recolectar los datos del formulario
    let formulario = document.querySelector('form');

    // Recolectar los datos del formulario
    let calendarEl = document.getElementById('agenda');

    // Crear una instancia de la clase Agenda
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
        //Opciones del calendario
        events: "http://localhost/agenda/public/evento/mostrar",
        dateClick: function (info) {
            //reseteamos el formulario
            formulario.reset();

            //Obtener la fecha seleccionada
            formulario.start.value = info.dateStr;
            formulario.end.value = info.dateStr;

            //Mostrar el modal
            $("#evento").modal("show");
        }
    });

    //Mostrar el calendario
    calendar.render();

    //Validar el formulario
    document.getElementById("btnGuardar").addEventListener("click", function () {

        //Recolectar los datos del formulario
        const datos = new FormData(formulario);
        console.log(datos);

        //Crear el objeto
        axios.post("http://localhost/agenda/public/evento/agregar", datos).
            then(
                (respuesta) => {
                    // Actuelizar el calendario
                    calendar.refetchEvents();

                    //Ocultar el modal
                    $('#evento').modal('hide');
                }
            ).catch(
                error => {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                }
            )
    });
});