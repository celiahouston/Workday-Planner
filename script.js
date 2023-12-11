$(document).ready(function () {
    function displayCurrentDate() {
        $('#currentDate').text(dayjs().format('dddd, MMMM D, YYYY'));
    }

    function createSchedule() {
        var scheduleTableBody = $('#scheduleTableBody');

        for (var hour = 9; hour <= 17; hour++) {
            var row = $('<tr>');
            var time = dayjs().hour(hour).format('h A') + ' - ' + dayjs().hour(hour + 1).format('h A');

            var eventInput = $('<input>')
                .addClass('form-control description')
                .attr('data-hour', hour)
                .atttr('id', 'event_' + hour); 
                .attr('placeholder', 'Enter event');

            var saveBtn = $('<button>')
                .addClass('btn btn-primary saveBtn')
                .text('Save')
                .attr('data-hour', hour);

            row.append($('<td>').text(time));
            row.append($('<td>').append(eventInput));
            row.append($('<td>').append(row));
        }

    }

    function saveEvent(hour, eventText) {

    }

    function loadEvents() {
        $('.description').each(function () {
            var hour = $(this).attr('data-hour');
            var storedEvent = localStorage.getItem('event_' + hour);

            if (storedEvent) {
                $(this).val(storedEvent);
                console.log('Event loaded for ' hour);
            }
        });
    }

    $('table').on("click", ".saveBtn", function () {
        var hour = $(this).attr('data-hour');
        var eventText = $(this).siblings('.description').val();
        saveEvent(hour, eventText);
    }); 

    $('.description').on('input', function () {
        var hour = $(this).attr('data-hour');
        var eventText = $(this).val();
        saveEvent(hour, eventText);
    });

    displayCurrentDate();
    createSchedule();
    loadEvents(); 
}); 