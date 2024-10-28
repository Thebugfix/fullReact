import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './index.css'

const App = () => {

  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/books');
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/books', { title, author, genre, image });
      setBooks([...books, { title, author, genre, image }]);
      setTitle('');
      setAuthor('');
      setGenre('');
      setImage('');
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index} style={{ marginBottom: '20px' }}>
            <img src={book.image} alt={`${book.title} cover`} style={{ width: '100px', height: '150px' }} />
            <p><strong>{book.title}</strong> - {book.author} ({book.genre})</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddBook}>
        <h3>Add Your Own Book</h3>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
        <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre" />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default App;
