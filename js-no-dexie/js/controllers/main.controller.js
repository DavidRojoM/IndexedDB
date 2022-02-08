window.addEventListener("load", () => {
  domElements.$addAuthorForm.addEventListener("submit", addAuthorHandler);
  domElements.$addBookForm.addEventListener("submit", addBookHandler);
  domElements.$showAuthors.addEventListener("click", showAuthorsHandler);
  domElements.$showBooks.addEventListener("click", showBooksHandler);
});

function addAuthorHandler(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const formValue = Object.fromEntries(data.entries());

  const request = addAuthor(formValue);
  resetAddAuthorForm();
  request.onsuccess = () => {
    console.log("Author: successfully added");
  };

  request.onerror = (e) => {
    console.error("Author: error adding: ", e.target.errorCode);
  };
}

function showAuthorsHandler() {
  const request = findAllAuthors();

  request.onsuccess = (e) => {
    renderAuthors(e.target.result);
  };

  request.onerror = (e) => {
    console.error("Author: error reading: ", e.target.errorCode);
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
    renderBooks(e.target.result);
  };

  request.onerror = (e) => {
    console.error("Author: error reading: ", e.target.errorCode);
  };
}
