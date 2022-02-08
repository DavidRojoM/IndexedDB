function addAuthor(value) {
  const transaction = db.transaction(["authors"], "readwrite");
  const store = transaction.objectStore("authors");

  const id = generateRandomId();
  const author = {
    ...value,
    id,
  };

  return store.add(author, id);
}

function generateRandomId() {
  return Math.random().toString(36);
}

function findAllAuthors() {
  const transaction = db.transaction(["authors"], "readonly");
  const store = transaction.objectStore("authors");
  return store.getAll();
}

function findOneAuthor(id) {
  const transaction = db.transaction(["authors"], "readwrite");
  const store = transaction.objectStore("authors");
  return store.get(id);
}

function addBook(value) {
  const authorRequest = findOneAuthor(value.author);
  authorRequest.onsuccess = (e) => {
    const book = {
      ...value,
      author: e.target.result,
      id: generateRandomId(),
    };
    const transaction = db.transaction(["books"], "readwrite");
    const store = transaction.objectStore("books");
    const request = store.add(book, book.id);
    request.onsuccess = () => {
      console.log("Book: successfully added");
    };
    request.onerror = (e) => {
      throw new Error(`Book: could not add => ${e.target.errorCode}`);
    };
  };
  authorRequest.onerror = (e) => {
    throw new Error(`Author: not found=> ${e.target.errorCode}`);
  };
}

function findAllBooks() {
  const transaction = db.transaction(["books"], "readonly");
  const store = transaction.objectStore("books");
  return store.getAll();
}
