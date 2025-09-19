const myLibrary = [];

function Book(author, title, pages, year, read, cover) {
    this.author = author;
    this.tile = title;
    this.pages = pages;
    this.year = year;
    this.read = read;
    this.cover = cover;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(author, title, pages, year, read, cover) {
    let book = new Book(author, title, pages, year, read, cover)
    myLibrary.push(book);
}

// initialize document
let header = document.querySelector('.header');
let content = document.querySelector('.content')
let books = document.querySelector('.books');

// create DOM element for book
function makeBook(Book) {
    // create structure
    let book = document.createElement('div');
    book.classList.add('book');


    let bookTop = document.createElement('div');
    bookTop.classList.add('book-top');

    let bookBottom = document.createElement('div');
    bookBottom.classList.add('book-bottom');


    let title = document.createElement('h3');
    title.classList.add('title');

    let read = document.createElement('button');
    read.classList.add('read');

    let removeBook = document.createElement('button');
    removeBook.classList.add('remove-book');


    let author = document.createElement('p');
    author.classList.add('author');

    let id = document.createElement('p');
    id.classList.add('id');

    let pages = document.createElement('p');
    pages.classList.add('pages');


    book.appendChild(bookTop);
    book.appendChild(bookBottom);

    bookTop.appendChild(title);
    bookTop.appendChild(read);
    bookTop.appendChild(removeBook);

    bookBottom.appendChild(author);
    bookBottom.appendChild(id);
    bookBottom.appendChild(pages);

    // assign book values to elements
    title.textContent = Book.title;
    if (Book.read) {read.textContent = 'x'};
    author.textContent = Book.author;
    id.textContent = crypto.randomUUID();
    pages.textContent = Book.pages;

    return book;
}

/* 
Pseudocode
if library empty
    return
for book in library
    display book
*/
function displayBooks(library) {
    if (library.length === 0) {
        return;
    }

    // display each book in library
    for (book in library) {
        let bookElement = makeBook(book);
        books.appendChild(bookElement);
    }
}

function newBook() {
    const modal = document.querySelector('.modal');
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const openForm = document.querySelector('.add-book');
    const closeForm = document.querySelector('.close-form');
    const submitForm = document.querySelector('.submit');

    let author = formData.get('author');
    let title = formData.get('title');
    let pages = formData.get('pages');
    let year = formData.get('year');
    let read = formData.get('read');
    let cover = formData.get('cover');

    openForm.addEventListener('click', () => {
        modal.showModal();
    })

    closeForm.addEventListener('click', () => {
        modal.close();
    })

    submitForm.addEventListener('click', () => {
        let newBook = new Book(author, title, pages, year, read, cover);
        addBookToLibrary(newBook);
        let bookElement = makeBook(newBook);
        books.appendChild(bookElement);
    })
}

newBook();