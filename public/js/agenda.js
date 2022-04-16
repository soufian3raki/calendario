document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('agenda');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: "es",
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        dateClick: function (info) {
            $("#evento").modal("show");
        }
    });
    calendar.render();
});