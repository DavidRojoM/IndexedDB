let db;
const dbReq = indexedDB.open("BookShop");

dbReq.onsuccess = (e) => {
  db = e.target.result;
};

dbReq.onerror = (e) => {
  alert(`error opening IDB ${e.target.errorCode}`);
};

dbReq.onupgradeneeded = (e) => {
  db = e.target.result;

  db.createObjectStore("books", {
    autoIncrement: true,
  });

  db.createObjectStore("authors", {
    autoIncrement: true,
  });
};

//HANDLERS
