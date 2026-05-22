const MONTHS = [
    'January','February','March','April',
    'May','June','July','August',
    'September','October','November','December'
];

const DAYS = ['SU','MO','TU','WE','TH','FR','SA'];

function buildCalendar(widget, date) {
    widget.innerHTML = '';

    // ── Header (outside table) ──
    const header = document.createElement('div');
    header.className = 'cal-header';

    const prev = document.createElement('button');
    prev.className = 'nav-btn';
    prev.innerHTML = '&#9664;';
    prev.title = 'Previous month';
    prev.onclick = () => { date.setMonth(date.getMonth() - 1); buildCalendar(widget, date); };

    const titleWrap = document.createElement('div');
    titleWrap.className = 'cal-header-title';
    titleWrap.innerHTML =
        `<span class="cal-month-name">${MONTHS[date.getMonth()]}</span>` +
        `<span class="cal-year-name">${date.getFullYear()}</span>`;

    const next = document.createElement('button');
    next.className = 'nav-btn';
    next.innerHTML = '&#9654;';
    next.title = 'Next month';
    next.onclick = () => { date.setMonth(date.getMonth() + 1); buildCalendar(widget, date); };

    header.appendChild(prev);
    header.appendChild(titleWrap);
    header.appendChild(next);
    widget.appendChild(header);

    // ── Table ──
    const table = document.createElement('table');

    // Day-of-week row
    const dayRow = document.createElement('tr');
    DAYS.forEach(d => {
        const th = document.createElement('th');
        th.className = 'day-header';
        th.textContent = d;
        dayRow.appendChild(th);
    });
    table.appendChild(dayRow);

    // Day grid — fix: determine today once, compare cleanly
    const todayStr = new Date().toDateString();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const cursor = new Date(date.getFullYear(), date.getMonth(), 1 - firstDay);

    for (let week = 0; week < 6; week++) {
        const row = document.createElement('tr');
        for (let day = 0; day < 7; day++) {
            const td = document.createElement('td');
            const span = document.createElement('span');
            span.textContent = cursor.getDate();

            const isCurrentMonth = cursor.getMonth() === date.getMonth();
            const isToday = cursor.toDateString() === todayStr;

            if (isToday && isCurrentMonth) {
                td.className = 'avui';
            } else if (!isCurrentMonth) {
                td.className = 'fora';
            }

            td.appendChild(span);
            row.appendChild(td);
            cursor.setDate(cursor.getDate() + 1);
        }
        table.appendChild(row);
    }

    widget.appendChild(table);
}

buildCalendar(document.getElementById('calendar'), new Date());
