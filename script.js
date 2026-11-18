let id = 1;
const tickets = [];

const submitButton = document.querySelector('#save-btn');

function getCurrentDate() {
    return new Date().toLocaleDateString('en-CA');
};

function addData(e) {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let priority = document.getElementById("priority").value;
    const currentDate = getCurrentDate();

    if (title === "") {
        alert("Please fill title field");
        return;
    }

    let table = document.getElementById("tableBody");

    tickets.push({
        id: id,
        title: title,
        description: description,
        priority: priority,
        date: currentDate,
        status: "open"
    });

    id++;

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "medium";

    renderTable();
}

function renderTable() {
    const tbody = document.querySelector('#tableBody');

    if (!tbody) return;

    const rows = tickets.map(ticket => {
        const tr = document.createElement('tr');

        const values = [
            ticket.id,
            ticket.title,
            ticket.description,
            ticket.priority,
            ticket.date,
            ticket.status
        ];

        values.forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            tr.appendChild(td);
        });

        return tr;
    })
    
    tbody.replaceChildren(...rows)
}

submitButton.addEventListener('click', addData);