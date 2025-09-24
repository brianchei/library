const myLibrary = [];

function Book(author, title, pages, year, read, cover) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.year = year;
    this.read = read;
    this.cover = cover;
    this.id = (crypto.randomUUID()).slice(1, 15);
}

function addBookToLibrary(author, title, pages, year, read, cover) {
    let book = new Book(author, title, pages, year, read, cover)
    myLibrary.push(book);
    return book;
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


    let cover = document.createElement('div');
    cover.classList.add('cover');

    let bookTop = document.createElement('div');
    bookTop.classList.add('book-top');

    let bookBottom = document.createElement('div');
    bookBottom.classList.add('book-bottom');


    let pages = document.createElement('p');
    pages.classList.add('pages');

    let title = document.createElement('h3');
    title.classList.add('title');

    let removeBook = document.createElement('button');
    removeBook.classList.add('remove-book');
    // make button work
    removeBook.addEventListener('click', () => {
        book.remove();
    })


    let year = document.createElement('p');
    year.classList.add('year');

    let author = document.createElement('p');
    author.classList.add('author');

    let id = document.createElement('p');
    id.classList.add('ID');

    let read = document.createElement('button');
    read.classList.add('read');


    book.appendChild(cover);
    book.appendChild(bookTop);
    book.appendChild(bookBottom);

    bookTop.appendChild(pages);
    bookTop.appendChild(title);
    bookTop.appendChild(removeBook);

    bookBottom.appendChild(year);
    bookBottom.appendChild(author);
    bookBottom.appendChild(id);
    bookBottom.appendChild(read);

    // assign book values to elements
    // cover img url
    let coverImg = document.createElement('img');
    coverImg.setAttribute('src', Book.cover);
    cover.appendChild(coverImg);
    pages.textContent = Book.pages;
    title.textContent = Book.title;
    removeBook.textContent = 'x';
    year.textContent = Book.year;
    author.textContent = Book.author;
    id.textContent = Book.id;
    if (Book.read === "on") {read.textContent = "Read"} else {read.textContent = "Unread"};


    return book;
}


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
    const openForm = document.querySelector('.add-book');
    const closeForm = document.querySelector('.close-form');
    const submitForm = document.querySelector('.submit');

    openForm.addEventListener('click', () => {
        modal.showModal();
    })

    closeForm.addEventListener('click', () => {
        modal.close();
    })

    submitForm.addEventListener('click', () => {
        const form = document.querySelector('form');
        const formData = new FormData(form);

        let author = formData.get('author');
        let title = formData.get('title');
        let pages = formData.get('pages');
        let year = formData.get('year');
        let read = formData.get('read');
        let cover = formData.get('cover');
        
        let toAdd = addBookToLibrary(author, title, pages, year, read, cover);
        let bookElement = makeBook(toAdd);
        books.appendChild(bookElement);
    })
}

displayBooks(myLibrary);
newBook();