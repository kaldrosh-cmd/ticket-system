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

    let rowStyle = "";

    if (priority === "low") {
        rowStyle = 'style="background-color: green;"';
    } else if (priority === "medium") {
        rowStyle = 'style="background-color: yellow;"'
    } else if (priority === "high") {
        rowStyle = 'style="background-color: red;"'
    };

    let table = document.getElementById("tableBody");

    let row = `
    <tr ${rowStyle}>
    <td>${id}</td>
    <td>${title}</td>
    <td>${description}</td>
    <td>${priority}</td>
    <td>${currentDate}</td>
    <td>
        <select class="status-select">
            <option value="open" selected>Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
        </select>
    </td>
    </tr>`;

    table.insertAdjacentHTML("beforeend", row);

    tickets.push({
        id: id,
        title: title,
        description: description,
        priority: priority,
        date: currentDate,
        status: "open"
    });

    id++

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("priority").value = "medium";
}

submitButton.addEventListener('click', addData);