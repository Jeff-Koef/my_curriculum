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

function openPage(pageName, evt) {
    // Declare all variables
    var i, buttoncontent, buttonlinks;
  
    // Get all elements with class="tabcontent" and hide them
    buttoncontent = document.getElementsByClassName("buttoncontent");
    for (i = 0; i < buttoncontent.length; i++) {
      buttoncontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    buttonlinks = document.getElementsByClassName("buttonlinks");
    for (i = 0; i < buttonlinks.length; i++) {
      buttonlinks[i].className = buttonlinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
  }
