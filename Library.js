const myLibrary = [];

function Book(title, author, page, read, id) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function () {
        return `ID: ${this.id} - ${this.title} by ${this.author}, ${this.page} pages,${this.read}`;
    };
}


// Take params, create a book then store it in the array
function addBookToLibrary(title, author, page, read) {
    const newBook = new Book(title, author, page, read);
    myLibrary.push(newBook);
}

// Ajout de quelques livres
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary("1984", "Georegs Orwell", 328, "read");

// Affichage des livres de la bibliothèque
myLibrary.forEach(book => console.log(book.info()));

console.log(myLibrary)