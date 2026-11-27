const ticketForm = document.querySelector("#ticket-form");
const titleError = document.querySelector("#title-error");
const descriptionError = document.querySelector("#description-error");
const priorityError = document.querySelector("#priority-error");
const tbody = document.getElementById("tableBody");

let id = 1;
const tickets = [];

const renderTable = function () {
  tbody.replaceChildren();

  tickets.forEach((ticket) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = ticket.id;
    row.insertCell().textContent = ticket.title;
    row.insertCell().textContent = ticket.description;
    row.insertCell().textContent = ticket.priority;
    row.insertCell().textContent = ticket.date;

    const select = document.createElement("select");
    select.dataset.id = ticket.id;

    select.append(
      new Option("open", "open"),
      new Option("in progress", "in progress"),
      new Option("closed", "closed"),
    );

    select.value = ticket.status;
    row.insertCell().append(select);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = ticket.id;
    deleteBtn.className = "delete-btn";
    row.insertCell().append(deleteBtn);
  });
};

function addTicket(e) {
  e.preventDefault();

  titleError.textContent = "";
  descriptionError.textContent = "";
  priorityError.textContent = "";

  const formData = new FormData(e.target);
  const title = formData.get("title").trim();
  const description = formData.get("description").trim();
  const priority = formData.get("priority").trim();

  if (title.length < 3 || title.length > 100) {
    titleError.textContent = "Title needs to be from 3 to 100 characters long";
    return;
  }
  if (description.length > 500) {
    descriptionError.textContent =
      "Description needs to be no more than 500 characters long";
    return;
  }
  if (!["low", "medium", "high"].includes(priority)) {
    priorityError.textContent =
      "Priority needs to be either low, medium or high";
    return;
  }

  tickets.push({
    id: id++,
    title,
    description,
    priority,
    date: getDate(),
    status: "open",
  });

  renderTable();
  e.target.reset();
}

function getDate() {
  const currentTime = new Date().toLocaleString("pl-PL");
  return currentTime;
}

ticketForm.addEventListener("submit", addTicket);
tbody.addEventListener('change', function changeStatus (event) {
  const ticketId = Number(event.target.dataset.id);
  const ticket = tickets.find((s) => s.id === ticketId);
  ticket.status = event.target.value;
  renderTable();
});

tbody.addEventListener('click', function deleteTicket(event) {
  const deleteBtn = event.target.closest(".delete-btn");
  if (!deleteBtn) return;

  const ticketId = Number(deleteBtn.dataset.id);
  const index = tickets.findIndex((t) => t.id === ticketId);

  if (index !== -1) {
    tickets.splice(index, 1);
    renderTable();
  }
});