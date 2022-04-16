document.addEventListener('DOMContentLoaded', function () {

    // Obtener la URL del evento
    const url_base = "/agenda/public";
    // Recolectar los datos del formulario
    let formulario = document.querySelector('form');

    // Recolectar los datos del formulario
    let calendarEl = document.getElementById('agenda');

    // Crear una instancia de la clase Agenda
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        //Traducir al español
        locale: "es",
        displayEventTime: false,
        timeZone: '',
        weekNumbers: true,
        dayMaxEvents: true,
        themeSystem: 'bootstrap5',
        eventColor: '#fd0d0d',
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
        },
        eventClick: function (info) {
            let evento = info.event;

            // Obtiene la respuesta del servidor
            axios.post(url_base + "/evento/editar/" + info.event.id).
                then(
                    (respuesta) => {

                        // Obtener el id del evento
                        formulario.id.value = respuesta.data.id;
                        // Obtener el titulo del evento
                        formulario.title.value = respuesta.data.title;
                        // Obtener la descripcion del evento
                        formulario.descripcion.value = respuesta.data.descripcion;
                        // Obtener la fecha y la hora
                        formulario.start.value = respuesta.data.start;
                        formulario.end.value = respuesta.data.end;
                        // Formulario.color.value = respuesta.data.color;

                        /*//! ******************************
                        //TODO: Falta el color
                        //TODO: Fatlta Formato de fecha
                        //! ******************************/

                        // Mostrar el modal
                        $('#evento').modal('show');
                    }
                ).catch(
                    error => {
                        if (error.response) {
                            console.log(error.response.data);
                        }
                    }
                )
        }
    });

    //Mostrar el calendario
    calendar.render();

    // Guardar el evento
    document.getElementById("btnGuardar").addEventListener("click", function () {
        enviarDatos("/evento/agregar");
    });

    // Editar el evento
    document.getElementById("btnEliminar").addEventListener("click", function () {
        enviarDatos("/evento/borrar/" + formulario.id.value);
    });

    // Modificar el evento
    document.getElementById("btnModificar").addEventListener("click", function () {
        enviarDatos("/evento/actualizar/" + formulario.id.value);
    });

    // funcion para validar el formulario
    function enviarDatos(url) {
        // Recolectar los datos del formulario
        const datos = new FormData(formulario);

        // Obtener la URL del evento
        const url_evento = url_base + url;

        console.log(url_evento);

        // Crear el objeto
        axios.post(url_evento, datos).
            then(
                (respuesta) => {
                    // Actuelizar el calendario
                    calendar.refetchEvents();

                    //Ocultar el modal
                    $('#evento').modal('hide');
                }
            ).catch(
                // Mostrar el error
                error => {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                }
            )
    }
});