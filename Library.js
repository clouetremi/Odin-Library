// On créer un Array pour stocker nos livres
const myLibrary = [];

// Fonction constructor qui prend 5 arguments qui va nous permettre de créer nos livres
function Book(title, author, page, read, id) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function () {
        return `The book ${this.title} by ${this.author} has ${this.page} pages and its status is ${this.read}`
    }
};

// Fonction qui ajoute notre livre dans le tableau en 
// créant une variable pour notre nouveau livre
// Puis la pousse dans notre Array myLibrary

function addBookToLibrary(title, author, page, read) {
    const newBook = new Book(title, author, page, read);
    myLibrary.push(newBook)
};

// Essaie de la fonction avec un livre et test avec console.log pour voir si ça charge bien
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

// Fonction qui va faire apparaître chaque livre sur le DOM
function displayLibrary() {
    const libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
    <h3><strong>Title : </strong>${book.title}</h3>
    <p><strong>Author : </strong>${book.author}</p>
    <p><strong>Page : </strong>${book.page}</p>
    <p><strong>Status : </strong>${book.read}</p>
    <p><strong>ID : </strong>${book.id}</p>
<br>
    <button class="btn-delete-book" type="button" data-id="${book.id}">Delete New book</button>
     <button class="btn-change-read" type="button" data-id="${book.id}">Change read status</button>
    `;
        libraryContainer.appendChild(bookCard);
    });

    // Ajoute un gestionnaire d'event pour tous les boutons de suppression
    const deleteButtons = document.querySelectorAll(".btn-delete-book");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const id = button.getAttribute("data-id");
            const bookIndex = myLibrary.findIndex(book => book.id === id);
            if (bookIndex !== -1) {
                myLibrary.splice(bookIndex, 1);
                displayLibrary();
            }
        });
    });

    const changeRead = document.querySelectorAll(".btn-change-read");
    changeRead.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const id = button.getAttribute("data-id");
            const book = myLibrary.find(book => book.id === id);
            if (book) {
                book.toggleRead()
                displayLibrary();
            }
        });
    });
};

displayLibrary();

// Fonction qui fait apparaître notre form qui nous permet de rentrer un livre
function addBook() {
    const displayBook = document.querySelector(".display-book")
    displayBook.innerHTML = `
    <form id="book-form">
<label for="title">Title :</label>
<input type="text" id="title" name="title" required>
<br><br>
<label for="author">Author :</label>
<input type="text" id="author" name="author" required>
<br><br>
<label for="page">Page :</label>
<input type="text" id="page" name="page" required>
<br><br>
<label for="read">Status :</label>
<div>
<input type="radio" id="read-yes" name="read" value="Read" required>
<label for="read-yes">Read</label>
</div>
<div>
<input type="radio" id="read-no" name="read" value="Didn't read yet" required>
<label for="read-no">Didn't read yet</label>
</div>
<br><br>

<button class="btn-save-book" type="submit">Add New book</button>
</form>
`;

    const form = document.querySelector("#book-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        saveBook();
    });
};

// Fonction concernant notre bouton de base pour faire apparaître notre form 
const btnAddBook = document.querySelector(".btn-add-book");
btnAddBook.addEventListener("click", addBook);


// Fonction permettant d'enregistrer les infos de notre form
function saveBook() {

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").value;
    const read = document.querySelector('input[name="read"]:checked')?.value;

    if (!title || !author || !page || !read) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    // Ajouter le livre à la bibliothèque
    addBookToLibrary(title, author, page, read);

    // Mettre à jour l'affichage des livres
    displayLibrary();

    // Effacer le formulaire après l'ajout 
    document.querySelector(".display-book").innerHTML = "";
}

Book.prototype.toggleRead = function () {
    this.read = this.read === "Read" ? "Didn't read yet" : "Read";
};