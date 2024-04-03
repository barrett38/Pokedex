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

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Close the database connection.");
});
