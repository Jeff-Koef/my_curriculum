const sqlite3 = require('sqlite3').verbose();

// Open a database connection
let db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the mydatabase.db SQLite database.');
});

// SQL statement to drop the existing classes table if it exists
let sqlDropClasses = `DROP TABLE IF EXISTS classes;`;

// SQL statement to create the classes table with new structure
let sqlCreateClasses = `
CREATE TABLE IF NOT EXISTS classes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  Type TEXT NOT NULL,
  NUM TEXT NOT NULL,
  Name TEXT NOT NULL,
  Credits TEXT NOT NULL,
  Required TEXT NOT NULL,
  Prec TEXT
);`;

// Execute the SQL statement to drop and then recreate the classes table
db.run(sqlDropClasses, (err) => {
  if (err) {
    return console.error('Error dropping classes table:', err.message);
  }
  console.log('Classes table dropped.');

  db.run(sqlCreateClasses, (err) => {
    if (err) {
      return console.error('Error creating classes table:', err.message);
    }
    console.log('Classes table created.');

    // Data to be inserted
    const classesData = [
        ['CSC', '120', 'Introduction to Computational Thinking', '3', 'Yes', 'NULL'],
        ['CSC', '123', 'Introduction to Computer Programming with C++', '3', 'Yes', 'NULL'],
        ['CSC', '223', 'Object-Oriented Programming with Java', '3', 'Yes', 'CSC 123'],
        ['CSC', '280', 'Data Structures', '3', 'Yes', 'CSC 123 or CSC 223'],
        ['CSC', '212', 'Theory of Computing', '3', 'Yes', 'NULL'],
        ['CSC', '326', 'Switching Circuits and Logic Design', '3', 'Yes', 'NULL'],
        ['CSC', '327', 'Switching Circuits and Logic Design Laboratory', '1', 'Yes', 'NULL'],
        ['CSC', '370', 'Concepts of Programming Languages', '3', 'Yes', 'NULL'],
        ['CSC', '322', 'Intoduction to Computer Graphics', '3', 'Yes', 'CSC 280'],
        ['CSC', '323', 'Introduction to Computer Networks', '3', 'Yes', 'CSC 123'],
        ['CSC', '390', 'Computer Organization and Architecture', '3', 'Yes', 'CSC 326'],
        ['CSC', '363', 'Software Engineering', '3', 'Yes', 'CSC 280'],
        ['CSC', '306', 'Introduction to Operating Systems', '3', 'Yes', 'CSC 390'],
        ['CSC', '409', 'Web Programming', '3', 'Yes', 'NULL'],
        ['CSC', '442', 'Introduction to Database System', '3', 'Yes', 'CSC 363'],
        ['ENGR', '441', 'Interdisciplinary Senior Design I', '3', 'Yes', 'NULL'],
        ['CSC', '411', 'Design and Analysis of Algorithms', '3', 'Yes', 'CSC 280'],
        ['ENGR', '442', 'Interdisciplinary Senior Design II', '3', 'Yes', 'NULL'],
        ['MATH', '121', 'Calculus I', '4', 'Yes', 'NULL'],
        ['MATH', '122', 'Calculus II', '4', 'Yes', 'MATH 121'],
        ['MATH', '309', 'Probability and Statistics for Engr', '3', 'Yes', 'MATH 122'],
        ['CSC', '210', 'Discrete Mathematics', '3', 'Yes', 'NULL'],
        ['ENGR', '222', 'Engineering Mathematics I', '4', 'No', 'MATH 122'],
        ['MATH', '221', 'Analytic Geometry & Calculus III', '4', 'No', 'MATH 122'],
        ['MATH', '301', 'Linear Algebra', '3', 'No', 'MATH 221 or CSC 210'],
        ['MATH', '314', 'Statistics II', '3', 'No', 'MATH 309'],
        ['MATH', '321', 'Abstract Algebra I', '3', 'No', 'CSC 210'],
        ['MATH', '407', 'Graph Theory', '3', 'No', 'CSC 210'],
        ['MATH', '408', 'Elementary Number Theory', '3', 'No', 'CSC 210'],
        ['MATH', '409', 'Algebraic Number Theory', '3', 'No', 'MATH 408'],
        ['MATH', '415', 'Combinatorics', '3', 'No', 'CSC 210'],
        ['MATH', '421', 'Introductory Analysis I', '4', 'No', 'MATH 221'],
        ['MATH', '424', 'Complex Variables', '3', 'No', 'MATH 221'],
        ['MATH', '431', 'Probability and Statistics with Applications I', '3', 'No', 'MATH 221'],
        ['MATH', '432', 'Probability and Statistics with Applications II', '3', 'No', 'MATH 431'],
        ['MATH', '434', 'Introduction to Mathematical Finance', '3', 'No', 'MATH 122 & MATH 309'],
        ['MATH', '436', 'Introduction to Game Theory', '3', 'No', 'MATH 301 & MATH 431'],
        ['MATH', '441', 'Introduction to Partial Differential Equations', '3', 'No', 'MATH 221'],
        ['MATH', '451', 'Introduction to mathematical Logic', '3', 'No', 'MATH 321'],
        ['PHIL', '201', 'Classical Mind (LC)', '3', 'Yes', 'NULL'],
        ['ENG', '101', 'Writing and Rhetoric (LC)', '3', 'Yes', 'NULL'],
        ['PHIL', '202', 'Modern Mind (LC)', '3', 'Yes', 'PHIL 201'],
        ['TRS', '201', 'Foundations of Theology I (LC)', '3', 'Yes', 'NULL'],
        ['TRS', '202', 'The Church and the Human Person', '3', 'Yes', 'TRS 201'],
        ['PHIL', '363', 'Profesional Ethics in Engineering', '3', 'Yes', 'PHIL 202'],
        ['PHYS', '205', 'College Physics I', '4', 'No', 'NULL'],
        ['PHYS', '225', 'Introductory Mechanics Laboratory', '1', 'No', 'PHYS 205'],
        ['PHYS', '206', 'College Physics II', '4', 'No', 'PHYS 205'],
        ['PHYS', '226', 'Introductory Electricity Laboratory', '1', 'No', 'PHYS 206'],
        ['PHYS', '215', 'University Physics I', '4', 'No', 'MATH 122'],
        ['PHYS', '225', 'Introductory Mechanics Laboratory', '1', 'No', 'PHYS 215'],
        ['PHYS', '216', 'University Physics II', '4', 'No', 'PHYS 215 & MATH 122'],
        ['PHYS', '226', 'Introductory Electricity Laboratory', '1', 'No', 'PHYS 216'],
        ['BIOL', '105', 'Mechanisms of Life I', '3', 'No', 'NULL'],
        ['BIOL', '115', 'Mechanisms of Life I Lab', '2', 'No', 'BIOL 105'],
        ['BIOL', '106', 'Mechanisms of Life II', '3', 'No', 'BIOL 105'],
        ['BIOL', '116', 'Mechanisms of Life II Lab', '2', 'No', 'BIOL 106'],
        ['CHEM', '103', 'General Chemistry I', '3', 'No', 'NULL'],
        ['CHEM', '113', 'General Chemistry I Lab', '2', 'No', 'CHEM 103'],
        ['CHEM', '104', 'General Chemistry II', '3', 'No', 'CHEM 103'],
        ['CHEM', '114', 'General Chemistry II Lab', '2', 'No', 'CHEM 104'],
        ['CHEM', '107', 'General Chemistry I for Engineers', '3', 'No', 'NULL'],
        ['CHEM', '113', 'General Chemistry I for Engineers Lab', '2', 'No', 'CHEM 107'],
        ['CHEM', '108', 'General Chemistry II for Engineers', '3', 'No', 'CHEM 107'],
        ['CHEM', '114', 'General Chemistry II for Engineers Lab', '2', 'No', 'CHEM 108'],
        ['CHEM', '109', 'General, Organic, and Biochemistry for the Health Sciences', '3', 'No', 'NULL'],
        ['CHEM', '119', 'General, Organic, and Biochemistry for the Health Sciences Lab', '2', 'No', 'CHEM 109'],
        ['BIOL', '103', 'Human Biology: What makes us human', '3', 'No', 'NULL'],
        ['BIOL', '109', 'Medicine and Society', '3', 'No', 'NULL'],
        ['BIOL', '217', 'Molecular Genetics & Protein Engineering', '3', 'No', 'BIOL 106 and BIOL 116'],
        ['CHEM', '109', 'General, Organic, and Biochemistry for the Health Sciences', '3', 'No', 'NULL'],
        ['CHEM', '110', 'Introduction to Earth Science', '3', 'No', 'NULL'],
        ['PSY', '204', 'Introduction to Biological Psychology', '3', 'No', 'NULL'],
        ['PSY', '304', 'Brain and Behavior', '3', 'No', 'NULL'],
        ['PSY', '371', 'Sensation & Perception', '3', 'No', 'PSY 201']
      ];

    // SQL statement for inserting data
    let sqlInsert = `INSERT INTO classes (Type, NUM, Name, Credits, Required, Prec) VALUES (?, ?, ?, ?, ?, ?);`;

    // Insert each row into the classes table
    classesData.forEach((data) => {
      db.run(sqlInsert, data, (err) => {
        if (err) {
          return console.error('Error inserting data into classes table:', err.message);
        }
        console.log(`Data inserted for ${data[1]}: ${data[2]}`);
      });
    });
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Closed the database connection.');
});
