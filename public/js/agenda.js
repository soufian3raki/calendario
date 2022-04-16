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
        timeZone: '',
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
            axios.post("http://localhost/agenda/public/evento/editar/" + info.event.id).
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

    //Validar el formulario
    document.getElementById("btnGuardar").addEventListener("click", function () {
        enviarDatos("http://localhost/agenda/public/evento/agregar");
    });

    document.getElementById("btnEliminar").addEventListener("click", function () {
        enviarDatos("http://localhost/agenda/public/evento/borrar/" + formulario.id.value);
    });

    function enviarDatos(url) {
        //Recolectar los datos del formulario
        const datos = new FormData(formulario);

        //Crear el objeto
        axios.post(url, datos).
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
    }


});