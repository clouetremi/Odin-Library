const myLibrary = [];

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

function addBookToLibrary(title, author, page, read) {
    const newBook = new Book(title, author, page, read);
    myLibrary.push(newBook)
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");

console.log(myLibrary);

function displayLibrary() {
    const libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
    <h3><strong>Title : </strong>${book.title}</h3>
    <p><strong>Author : </strong>${book.author}</p>
    <p><strong>Page : </strong>${book.page}</p>
    <p><strong>Status : </strong>${book.read}</p>
    <p><strong>ID : </strong>${book.id}</p>
    `
        libraryContainer.appendChild(bookCard);
    })
}

// Fonction qui affiche notre array avec les livres
displayLibrary();

// Fonction qui fait apparaître notre form 
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
<input type="text" id="read" name="read" required>
<br><br>

<button class="btn-save-book">Add New book</button>
</form>
</body>
`;
// Fonction permettant de lancer la fonction pour enregistrer les infos du form quand on clique sur le bouton
const btnSaveBook = document.querySelector(".btn-save-book");
btnSaveBook.addEventListener("click", saveBook);
};

// Fonction concernant notre bouton de base pour faire apparaître notre form 
const btnAddBook = document.querySelector(".btn-add-book");
btnAddBook.addEventListener("click", addBook);


// Fonction permettant d'enregistrer les infos de notre form

function saveBook() {

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").value;
    const read = document.querySelector("#read").value;

    if (!title || !author || !page || !read){
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

