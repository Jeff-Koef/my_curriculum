const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files

// Open the database connection to 'mydatabase.db'
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error when opening the database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.post('/submit-data', (req, res) => {
    const { email, password } = req.body;
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.run(sql, [email, password], function(err) {
        if (err) {
            console.error('Failed to insert data into database:', err.message);
            return res.status(500).send('Failed to save data');
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({ message: 'Email and password received and saved successfully', userId: this.lastID });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.get(sql, [email, password], (err, row) => {
        if (err) {
            console.error('Error during database query:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (row) {
            res.json({ message: 'Login successful', userId: row.id });
        } else {
            res.status(401).send('Login failed');
        }
    });
});

app.get('/user-classes', (req, res) => {
    const userId = req.query.userId; // Get user ID from the request query parameter

    if (!userId) {
        return res.status(400).send('User ID is required');
    }

    const sql = `
    SELECT classes.id, classes.name, classes.description, user_classes.grade 
    FROM user_classes 
    JOIN classes ON user_classes.class_id = classes.id 
    WHERE user_classes.user_id = ?`;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error('Error fetching user classes:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.json(rows);
    });
});
app.get('/all-classes', (req, res) => {
    db.all("SELECT * FROM classes", [], (err, rows) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

app.post('/updateCheckbox', (req, res) => {
    const isChecked = req.body.isChecked; // Assuming isChecked is sent in request body as boolean
    const sql = `UPDATE classes SET your_boolean_column = ? WHERE condition_column = ?`;
    const conditionValue = 'some_condition_value'; // Define your condition
  
    connection.query(sql, [isChecked, conditionValue], (err, result) => {
      if (err) {
        console.error('Error updating checkbox value:', err);
        res.status(500).send('Error updating checkbox value');
      } else {
        console.log('Checkbox value updated successfully');
        res.send('Checkbox value updated successfully');
      }
    });
  });

process.on('SIGINT', () => {
    db.close(() => {
        console.log('Database connection closed.');
        process.exit(0);
    });
});