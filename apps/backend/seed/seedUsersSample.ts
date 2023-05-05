import { verbose } from "sqlite3";

const sqlite3 = verbose();

const db = new sqlite3.Database("users");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users 
    (
        userId TEXT PRIMARY KEY NOT NULL, 
        username TEXTS NOT NULL, 
        isAdmin BOOLEAN NOT NULL
    )
    `
  );

  const stmt = db.prepare(`INSERT INTO users VALUES (?, ?, ?)`);

  [].forEach(({ isAdmin, userId, username }) => {
    stmt.run(userId, username, isAdmin);
  });

  db.each(`SELECT * FROM users`, (err, row) => {
    if (err) {
      console.log(err);
    } else {
      console.log(row);
    }
  });
});
