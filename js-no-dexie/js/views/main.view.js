function renderAuthors(authors) {
  const authorsContainer = domElements.$authorsList;
  authorsContainer.innerHTML = "";
  for (const author of authors) {
    authorsContainer.innerHTML += `<li>${author.id} - <b>${author.name}</b></li>`;
  }
}

function renderBooks(books) {
  const booksContainer = domElements.$booksList;
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
