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
                .addClass('form-control eventInput')
                .attr('data-hour', hour)
                .attr('class', 'eventInput')
                .attr('id', 'event_' + hour)
                .attr('placeholder', 'Enter event');

            var saveBtn = $('<button>')
                .addClass('btn btn-primary saveBtn')
                .text('Save')
                .attr('data-hour', hour)
                .attr('id', 'event_', + hour + '_btn');

                row.append($('<td>').text(time));
                row.append($('<td>').append(eventInput));
                row.append($('<td>').append(saveBtn));

            scheduleTableBody.append(row); 
        }
    }

    function applyTimeStatus(row, hour) {
        var currentHour = dayjs().hour(); 

        if (hour < currentHour) {
            row.addClass('past');
        } else if (hour === currentHour) {
            row.addClass('present');
        } else {
            row.addClass('future');
        } 
    
    function saveEvent(hour, eventText) {
        localStorage.setItem('event_' + hour, eventText); 
        console.log('Event saved for ' + hour);
    }

    function loadEvents() {
        $('.eventInput').each(function () {
            var hour = $(this).attr('data-hour');
            var storedEvent = localStorage.getItem('event_' + hour);

            if (storedEvent) {
                $(this).val(storedEvent);
                console.log('Event loaded for ' + hour);
            }
        });
    }

    $('table').on("click", ".saveBtn", function () {
        var hour = $(this).attr('data-hour');
        var eventText = $(this).closest('tr').find('input.eventInput').val();
        saveEvent(hour, eventText);
    });
     
    $('.eventInput').on('input', function() {
        var hour = $(this).attr('data-hour');
        var eventText = $(this).val();
        saveEvent(hour, eventText);
    }); 

    displayCurrentDate();
    createSchedule();
    loadEvents(); 
}); 
