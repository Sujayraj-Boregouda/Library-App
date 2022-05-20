// ***Prototype Way*** //

// Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// Display constructor (This is responsible to show booklist in ui)
function Display() {

    // Add Methods to Display Prototype
    Display.prototype.add = function (book) {
        let tableBody = document.getElementById("tableBody");

        let uiString = `
                    <tr>                
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.type}</td>
                    </tr>
                `;

        tableBody.innerHTML += uiString;
    }

    // Clears the Input Field
    Display.prototype.clear = function () {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    // Validates the form
    Display.prototype.validate = function (book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    }

    // Shows Alert
    Display.prototype.show = function (type, displayMessage) {
        let message = document.getElementById("message");
        let boldText;
        if (type === "success") {
            boldText = "Suceess!";
        } else {
            boldText = "Error!";
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>${boldText} :</strong> ${displayMessage}.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        setTimeout(() => {
            message.innerHTML = '';
        }, 3000);
    }
}


// Add Submit Event Listener to Library Form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    // let type = document.querySelector('input[name="type"]:checked').value; 
    // Found This in comment


    let type;    
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

/* // Another way to capture type
let typeNodes = document.querySelectorAll(".type");
  Array.from(typeNodes).forEach((typeVal) => {
    if (typeVal.checked) {
      type = typeVal.value;
    }
  });
*/

    // Intitating Book
    let book = new Book(name, author, type);

    let display = new Display();

    // Displays Book
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success", "Your book has been added to the list");        
        localStorage.setItem("Entries",JSON.stringify(book))
    } else {
        display.show("danger", "You won't be able to add an empty book");
    }
}


