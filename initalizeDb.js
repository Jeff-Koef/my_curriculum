const sqlite3 = require('sqlite3').verbose();

// Open a database connection
let db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the mydatabase.db SQLite database.');
});

// SQL statement to create the users table
let sqlUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

// SQL statement to create the classes table
let sqlClasses = `
CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT
);`;

// SQL statement to create the user_classes table
let sqlUserClasses = `
CREATE TABLE IF NOT EXISTS user_classes (
  user_id INTEGER,
  class_id INTEGER,
  grade TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (class_id) REFERENCES classes(id),
  PRIMARY KEY (user_id, class_id)
);`;

// Execute the SQL statement to create the users table
db.run(sqlUsers, (err) => {
  if (err) {
    return console.error('Error creating users table:', err.message);
  }
  console.log('Users table created or already exists.');
});

// Execute the SQL statement to create the classes table
db.run(sqlClasses, (err) => {
  if (err) {
    return console.error('Error creating classes table:', err.message);
  }
  console.log('Classes table created or already exists.');
});

// Execute the SQL statement to create the user_classes table
db.run(sqlUserClasses, (err) => {
  if (err) {
    return console.error('Error creating user_classes table:', err.message);
  }
  console.log('User_Classes table created or already exists.');
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
