const MONTHS = [
    'January','February','March','April',
    'May','June','July','August',
    'September','October','November','December'
];

const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function buildCalendar(widget, date) {
    let table = widget.querySelector('table');

    if (!table) {
        table = document.createElement('table');
        widget.appendChild(table);
    }

    table.innerHTML = '';

    /* Header */
    const headerRow = document.createElement('tr');
    const headerCell = document.createElement('th');
    headerCell.colSpan = 7;
    headerCell.className = 'month';

    const prev = document.createElement('button');
    prev.className = 'boto-prev';
    prev.innerHTML = '&#8249;';
    prev.title = 'Previous month';
    prev.onclick = () => { date.setMonth(date.getMonth() - 1); buildCalendar(widget, date); };

    const next = document.createElement('button');
    next.className = 'boto-next';
    next.innerHTML = '&#8250;';
    next.title = 'Next month';
    next.onclick = () => { date.setMonth(date.getMonth() + 1); buildCalendar(widget, date); };

    headerCell.innerHTML =
        MONTHS[date.getMonth()] +
        `<span class="year">${date.getFullYear()}</span>`;

    headerCell.appendChild(prev);
    headerCell.appendChild(next);
    headerRow.appendChild(headerCell);
    table.appendChild(headerRow);

    /* Day-of-week row */
    const dayRow = document.createElement('tr');
    DAYS.forEach(d => {
        const th = document.createElement('th');
        th.className = 'day-header';
        th.textContent = d;
        dayRow.appendChild(th);
    });
    table.appendChild(dayRow);

    /* Day grid */
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const cursor = new Date(date.getFullYear(), date.getMonth(), 1 - firstDay);
    const today = new Date();

    for (let week = 0; week < 6; week++) {
        const row = document.createElement('tr');
        for (let day = 0; day < 7; day++) {
            const td = document.createElement('td');
            const span = document.createElement('span');
            span.textContent = cursor.getDate();

            if (cursor.getMonth() !== date.getMonth()) {
                td.className = 'fora';
            } else if (cursor.toDateString() === today.toDateString()) {
                td.className = 'avui';
            }

            td.appendChild(span);
            row.appendChild(td);
            cursor.setDate(cursor.getDate() + 1);
        }
        table.appendChild(row);
    }
}

buildCalendar(document.getElementById('calendar'), new Date());
