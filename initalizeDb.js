const sqlite3 = require('sqlite3').verbose();

// Open a database connection
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the mydatabase.db SQLite database.');

  // Step 1: Drop the existing 'user_classes' table if it exists
  db.run('DROP TABLE IF EXISTS user_classes', (err) => {
    if (err) {
      console.error('Error dropping table user_classes:', err.message);
      return;
    }
    console.log('user_classes table dropped.');

    // Step 2: Create a new table 'userClasses'
    db.run(`
      CREATE TABLE IF NOT EXISTS userClasses (
        userID INTEGER,
        classID INTEGER,
        taken BOOLEAN,
        PRIMARY KEY (userID, classID),
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (classID) REFERENCES classes(id)
      )`, (err) => {
      if (err) {
        console.error('Error creating table userClasses:', err.message);
        return;
      }
      console.log('New table userClasses created.');

      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err.message);
          return;
        }
        console.log('Closed the database connection.');
      });
    });
  });
});
