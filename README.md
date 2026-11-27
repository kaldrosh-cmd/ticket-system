# Ticket System

A simple web app for submitting tickets through a form and displaying them in a table.

## How to run

- **Locally:** Open `index.html` in your browser.
- **Online:** Use the GitHub Pages link, if enabled for this repository.

## Design decisions

### Ticket order

I use `tickets.push()` to add new tickets to the end of the array. They appear at the bottom of the table, in the order they were created.

### Date format

For now, I store and display dates using `toLocaleString('pl-PL')`. If I add sorting, I'll store timestamps or ISO strings and format them for display. Sorting Polish date strings as text would give incorrect results because the day comes before the month and year.

### Displaying user input

I use `textContent` instead of `innerHTML` to display ticket content. This treats user input as plain text, so any HTML or JavaScript entered in the form won't run when displayed in the table.

### Event Delegation

Event listeners are attached to `<tbody>` instead of individual buttons or selects so they keep working when table rows are dynamically added or re-rendered.

