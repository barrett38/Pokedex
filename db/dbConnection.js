const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "./db/myDatabase.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the myDatabase database.");
  }
);

db.run(
  `CREATE TABLE Users (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT,
        LastName TEXT,
        Email TEXT UNIQUE,
        Password TEXT,
        TermsAccepted INTEGER,
        AcquisitionChannel TEXT
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Users table created.");
  }
);

// Insert a new user
db.run(
  `INSERT INTO Users (FirstName, LastName) VALUES (?, ?)`,
  ["John", "Doe"],
  function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  }
);

// Select all users
db.all(`SELECT * FROM Users`, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
