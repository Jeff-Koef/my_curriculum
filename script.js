const classes = [
    { name: "Introduction to Programming", required: true },
    { name: "Calculus I", required: true },
    // Add more classes as needed
];

function displayClasses() {
    const listElement = document.getElementById('class-list');
    listElement.innerHTML = '';
    classes.forEach(cls => {
        const item = document.createElement('div');
        item.textContent = `${cls.name} - Required: ${cls.required ? 'Yes' : 'No'}`;
        listElement.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', displayClasses);
