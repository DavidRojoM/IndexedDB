let db;
const dbReq = indexedDB.open("BookShop", 1);

dbReq.onsuccess = (e) => {
  db = e.target.result;
};

dbReq.onerror = (e) => {
  alert(`error opening IDB ${e.target.errorCode}`);
};

dbReq.onupgradeneeded = (e) => {
  db = e.target.result;

  const bookStore = db.createObjectStore("books", {
    autoIncrement: false,
  });

  bookStore.createIndex("searchName", "name");
  bookStore.createIndex("searchDate", "date");
  bookStore.createIndex("searchAuthorName", "author.name");

  const authorsStore = db.createObjectStore("authors", {
    autoIncrement: false,
  });
  authorsStore.createIndex("searchName", "name");
};
