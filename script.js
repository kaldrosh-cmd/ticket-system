const ticketForm = document.querySelector('#ticket-form');
const tbody = document.getElementById('tableBody');

let id = 1;
const tickets = [];

const renderTable = function() {
    tbody.replaceChildren();

    tickets.forEach(ticket => {
        const row = tbody.insertRow();
        row.insertCell().textContent = ticket.id;
        row.insertCell().textContent = ticket.title;
        row.insertCell().textContent = ticket.description;
        row.insertCell().textContent = ticket.priority;
        row.insertCell().textContent = ticket.date;
        row.insertCell().textContent = ticket.status;
    });
}

function addTicket(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    tickets.push({
        id: id++,
        title: formData.get('title'),
        description: formData.get('description'),
        priority: formData.get('priority'),
        date: getDate(),
        status: "open"
    });

    renderTable();
    e.target.reset();
}

function getDate() {
    const currentTime = new Date().toLocaleString('pl-PL');
    return currentTime;
}


ticketForm.addEventListener('submit', addTicket)