
// On crée un Array pour stocker nos livres
const myLibrary = [];

class Book {
    constructor(title, author, page, read) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.read = read;
        this.id = crypto.randomUUID();
    }

    // Méthode pour afficher les infos du livre
    info() {
        return `The book ${this.title} by ${this.author} has ${this.page} pages and its status is ${this.read}`;
    }

    // Méthode pour changer le statut de lecture
    toggleRead() {
        this.read = this.read === "Read" ? "Didn't read yet" : "Read";
    }
}

// Fonction pour ajouter un livre à la bibliothèque
function addBookToLibrary(title, author, page, read) {
    const newBook = new Book(title, author, page, read);
    myLibrary.push(newBook);
}

// Essaie de la fonction avec un livre
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");

// Fonction pour afficher les livres dans le DOM
function displayLibrary() {
    const libraryContainer = document.querySelector(".library-container");
    libraryContainer.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <h3><strong>Title :</strong> ${book.title}</h3>
            <p><strong>Author :</strong> ${book.author}</p>
            <p><strong>Pages :</strong> ${book.page}</p>
            <p><strong>Status :</strong> ${book.read}</p>
            <p><strong>ID :</strong> ${book.id}</p>
            <br>
            <button class="btn-delete-book" type="button" data-id="${book.id}">Delete Book</button>
            <button class="btn-change-read" type="button" data-id="${book.id}">Change Read Status</button>
        `;
        libraryContainer.appendChild(bookCard);
    });

    // Ajout des événements pour supprimer un livre
    document.querySelectorAll(".btn-delete-book").forEach((button) => {
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

    // Ajout des événements pour changer le statut de lecture
    document.querySelectorAll(".btn-change-read").forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            const id = button.getAttribute("data-id");
            const book = myLibrary.find(book => book.id === id);
            if (book) {
                book.toggleRead();
                displayLibrary();
            }
        });
    });
}

displayLibrary();

// Fonction pour afficher le formulaire d'ajout de livre
function addBook() {
    const displayBook = document.querySelector(".display-book");
    displayBook.innerHTML = `
        <form id="book-form">
            <label for="title">Title :</label>
            <input type="text" id="title" name="title" required><br><br>

            <label for="author">Author :</label>
            <input type="text" id="author" name="author" required><br><br>

            <label for="page">Pages :</label>
            <input type="number" id="page" name="page" required><br><br>

            <label for="read">Status :</label>
            <div>
                <input type="radio" id="read-yes" name="read" value="Read" required>
                <label for="read-yes">Read</label>
            </div>
            <div>
                <input type="radio" id="read-no" name="read" value="Didn't read yet" required>
                <label for="read-no">Didn't read yet</label>
            </div><br><br>

            <button class="btn-save-book" type="submit">Add New Book</button>
        </form>
    `;

    // Ajout d'un event listener au formulaire
    document.querySelector("#book-form").addEventListener("submit", (event) => {
        event.preventDefault();
        saveBook();
    });
}

// Fonction pour sauvegarder le livre depuis le formulaire
function saveBook() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const page = document.querySelector("#page").value;
    const read = document.querySelector('input[name="read"]:checked')?.value;

    if (!title || !author || !page || !read) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    // Ajouter le livre à la bibliothèque
    addBookToLibrary(title, author, page, read);

    // Mettre à jour l'affichage des livres
    displayLibrary();

    // Effacer le formulaire après l'ajout
    document.querySelector(".display-book").innerHTML = "";
}

// Gestion du bouton pour afficher le formulaire
document.querySelector(".btn-add-book").addEventListener("click", addBook);
