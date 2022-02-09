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

function findBookByName(name) {
  const transaction = db.transaction(["books"], "readonly");
  const store = transaction.objectStore("books");
  const index = store.index("searchName");
  return index.get(name);
}

function findBookByDate(from, to) {
  const dateRange = IDBKeyRange.bound(from, to);
  const transaction = db.transaction(["books"], "readonly");
  const store = transaction.objectStore("books");
  const index = store.index("searchDate");
  return index.getAll(dateRange);
}

function findBookByAuthorName(name) {
  const transaction = db.transaction(["books"], "readonly");
  const store = transaction.objectStore("books");
  const index = store.index("searchAuthorName");
  return index.get(name);
}

function deleteAuthor(name) {
  const transaction = db.transaction(["authors", "books"], "readwrite");
  const authorsStore = transaction.objectStore("authors");
  const booksStore = transaction.objectStore("books");

  const authorsIndex = authorsStore.index("searchName");
  const booksIndex = booksStore.index("searchAuthorName");

  authorsIndex.getAllKeys(name).onsuccess = (e) => {
    for (const result of e.target.result) {
      console.log("clave", result);
      authorsStore.delete(result);
    }
  };
  booksIndex.getAllKeys(name).onsuccess = (e) => {
    for (const result of e.target.result) {
      booksStore.delete(result);
    }
  };
}

function updateAuthor(name, newName) {
  const transaction = db.transaction(["authors", "books"], "readwrite");
  const authorsStore = transaction.objectStore("authors");
  const booksStore = transaction.objectStore("books");

  const authorsIndex = authorsStore.index("searchName");
  const booksIndex = booksStore.index("searchAuthorName");
  let newAuthor = {
    name: newName,
  };
  authorsIndex.getAllKeys(name).onsuccess = (e) => {
    for (const authorId of e.target.result) {
      newAuthor.id = authorId;
      authorsStore.put(newAuthor, authorId);
    }
  };
  booksIndex.getAll(name).onsuccess = (e) => {
    for (const book of e.target.result) {
      book.author = newAuthor;
      booksStore.put(book, book.id);
    }
  };
}
