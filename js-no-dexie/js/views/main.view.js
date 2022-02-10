function renderAuthors(authors) {
  const authorsContainer = domElements.$authorsList;
  authorsContainer.innerHTML = "";
  for (const author of authors) {
    authorsContainer.innerHTML += `<li>${author.id} - <b>${author.name}</b></li>`;
  }
}

function renderBooks(books, field = "all") {
  const containers = {
    all: domElements.$booksList,
    name: domElements.$booksListByName,
    date: domElements.$booksListByDate,
    author: domElements.$booksListByAuthor,
  };
  const booksContainer = containers[field];
  booksContainer.innerHTML = "";
  for (const { id, name, date, author } of books) {
    booksContainer.innerHTML += `<li>Id=> ${id}<br>Name=> ${name}<br>Date=> ${date}<br>Author=> ${author.name}</li>`;
  }
}

function resetAddAuthorForm() {
  domElements.$addAuthorForm.reset();
}

function resetAddBookForm() {
  domElements.$addBookForm.reset();
}

function resetUpdateAuthorForm() {
  domElements.$updateAuthorForm.reset();
}

function resetDeleteAuthorForm() {
  domElements.$deleteAuthorForm.reset();
}
