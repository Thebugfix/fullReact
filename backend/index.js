const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(require('cors')());

let books = [
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
      image: "https://covers.openlibrary.org/b/id/8226091-L.jpg"
    },
    {
      title: "1984",
      author: "George Orwell",
      genre: "Dystopian",
      image: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      genre: "Classic",
      image: "https://covers.openlibrary.org/b/id/8099254-L.jpg"
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Classic",
      image: "https://covers.openlibrary.org/b/id/6513246-L.jpg"
    }
  ];

app.get('/books', (req, res) => res.json(books));

app.post('/books', (req, res) => {
  const { title, author, genre, image } = req.body;
  books.push({ title, author, genre, image });
  res.status(201).json({ message: 'Book added!' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
