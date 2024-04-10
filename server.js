const jwt = require('jsonwebtoken');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const SECRET_KEY = 'your_secret_key'; // Keep this key secure

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Serve static files


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// Open the database connection to 'mydatabase.db'
const db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error('Error when opening the database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Handle POST request to '/submit-data'
app.post('/submit-data', (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    console.log(email, password); // Log the received data to the console

    // SQL statement to insert a new user into the 'users' table
    const sql = `INSERT INTO users (email, password) VALUES (?, ?)`;

    // Execute the SQL statement to insert the new user
    db.run(sql, [email, password], function(err) {
        if (err) {
            console.error('Failed to insert data into database:', err.message);
            // Check for a unique constraint violation, which indicates the email is already in use
            if (err.code === "SQLITE_CONSTRAINT") {
                return res.status(409).send('Email already exists.');
            }
            return res.status(500).send('Failed to save data'); // General error response
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        res.json({ message: 'Email and password received and saved successfully' }); // Success response
    });
});

app.get('/protected-route', authenticateToken, (req, res) => {
    // This code is only reached if the token is valid
    res.json({ message: "Success", userId: req.user.userId });
});

// Handle POST request to '/login'
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ? AND password = ?"; // Consider hashing passwords

    db.get(sql, [email, password], (err, row) => {
        if (err) {
            console.error('Error during database query:', err.message);
            return res.status(500).send('Internal Server Error');
        }
        if (row) {
            // User found, generate a JWT
            const token = jwt.sign({ userId: row.id, email: row.email }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } else {
            // User not found, login failed
            res.status(401).send('Login failed');
        }
    });
});
// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

// Gracefully close the database connection when the server is stopped
process.on('SIGINT', () => {
    db.close(() => {
        console.log('Database connection closed.');
        process.exit(0);
    });
});