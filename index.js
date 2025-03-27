import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const PORT = 3001;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "MY NEW BD",  // Replace with your database name
  password: "7323001107",  // Replace with your PostgreSQL password
  port: 5432,  // Default PostgreSQL port
});


// Connect to the PostgreSQL database
db.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Get all to-do items
app.get('/todos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM todo_items ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching to-do items', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Add a new to-do item
app.post('/todos', async (req, res) => {
  const { item } = req.body;
  try {
    await db.query('INSERT INTO todo_items (item) VALUES ($1)', [item]);
    res.status(201).send('To-do item added');
  } catch (err) {
    console.error('Error adding to-do item', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a to-do item
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM todo_items WHERE id = $1', [id]);
    res.status(200).send('To-do item deleted');
  } catch (err) {
    console.error('Error deleting to-do item', err.stack);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

