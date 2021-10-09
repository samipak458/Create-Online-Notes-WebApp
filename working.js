console.log("Active");
displayNotes(); //As the browser open it show all the stored notes

//If user add a note add it to the LocalStorage
let addButton = document.getElementById('addBtn');

addButton.addEventListener('click', function () {

    let textByUser = document.getElementById('addText');
    let titleByUser = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    let objOfNotes; //array which storing note

    if (notes == null) {
        objOfNotes = [];
    }
    else {                                //We might have multiple notes 
        objOfNotes = JSON.parse(notes);   //By using JSON we convert it into Object
    }

    if (textByUser.value == '' ) {
       errorMessage();
    }
    else {
        let myObj = {
            title: titleByUser.value,
            text: textByUser.value
        }
        objOfNotes.push(myObj);
        addMessage();
    }

    localStorage.setItem('notes', JSON.stringify(objOfNotes)); 
    textByUser.value = "";
    titleByUser.value = "";

    //  console.log(objOfNotes); //Testing

    displayNotes();
});



//Function to show elements(notes) from LocalStorage
function displayNotes() {
    let notes = localStorage.getItem('notes');
    let objOfNotes;

    if (notes == null) {
        objOfNotes = [];
    }
    else {
        objOfNotes = JSON.parse(notes);
    }

    let html = "";

    objOfNotes.forEach(function (element, index) {  //index is the length of the array

        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
      </div>
        `;
    });

    let notePad = document.getElementById('notes');

    if (objOfNotes.length != 0) {
        notePad.innerHTML = html;
    }
    else {
        notePad.innerHTML = `Nothing to show! Use "Add a note" above to add notes`
    }
}

//Funtion to delete notes
function deleteNote(index) {

    // console.log("I am deleting "+index); //testing

    let notes = localStorage.getItem('notes');
    let objOfNotes;

    if (notes == null) {
        objOfNotes = [];
    }
    else {
        objOfNotes = JSON.parse(notes);
    }

    objOfNotes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(objOfNotes));
    displayNotes();
}


//Searching Note by keyword
let searchNote = document.getElementById('searchText');
searchNote.addEventListener('input', function () {

    let search = searchNote.value.toLowerCase();

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();

        if (cardTxt.includes(search)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});

//Show adding message
function addMessage() {
    let message = document.getElementById('message');

    message.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Message:</strong> Your book has been successfully added.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

    setTimeout(() => {
        message.innerHTML = ``;
    }, 2000);
}

function errorMessage() {
    let message = document.getElementById('message');

    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
    <strong>Message:</strong> To create note, add text.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

    setTimeout(() => {
        message.innerHTML = ``;
    }, 2000);
}



