window.addEventListener("load", () => {
  domElements.$addAuthorForm.addEventListener("submit", addAuthorHandler);
  domElements.$addBookForm.addEventListener("submit", addBookHandler);
  domElements.$showAuthors.addEventListener("click", showAuthorsHandler);
  domElements.$showBooks.addEventListener("click", showBooksHandler);
  domElements.$booksByNameForm.addEventListener(
    "submit",
    findBookByNameHandler
  );
  domElements.$booksByDate.addEventListener("submit", findBookByDateHandler);
  domElements.$booksByAuthorNameForm.addEventListener(
    "submit",
    findBookByAuthorNameHandler
  );
  domElements.$deleteAuthorForm.addEventListener(
    "submit",
    deleteAuthorByNameHandler
  );
  domElements.$updateAuthorForm.addEventListener(
    "submit",
    updateAuthorByNameHandler
  );
});

function addAuthorHandler(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const formValue = Object.fromEntries(data.entries());

  const request = addAuthor(formValue);
  resetAddAuthorForm();
  request.onsuccess = (e) => {
    console.log("Author: successfully added", e.target.result);
  };

  request.onerror = (e) => {
    throw new Error(`Author: error adding: ${e.target.errorCode}`);
  };
}

function showAuthorsHandler() {
  const request = findAllAuthors();

  request.onsuccess = (e) => {
    console.log(e.target.result);
    renderAuthors(e.target.result);
  };

  request.onerror = (e) => {
    throw new Error(`Author: error reading: ${e.target.errorCode}`);
  };
}

function addBookHandler(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const formValue = Object.fromEntries(data.entries());
  addBook(formValue);
  resetAddBookForm();
}

function showBooksHandler() {
  const request = findAllBooks();

  request.onsuccess = (e) => {
    console.log(e.target.result);
    renderBooks(e.target.result);
  };

  request.onerror = (e) => {
    console.error("Author: error reading: ", e.target.errorCode);
  };
}
