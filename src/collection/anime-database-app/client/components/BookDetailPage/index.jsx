import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import BookDetail from '../BookDetail';


const BookDetailPage = ({ match }) => {
  const {
    params: { bookId }
  } = match;
  const [book, setBook] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API_BASE_URL = 'https://api.jikan.moe/v3/anime';
    const fetchBook = async () => {
      setLoading(true);
      setError(false);
      try {
        const result = await axios.get(`${API_BASE_URL}/${bookId}`);
        setBook(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    // Call the API
    fetchBook();
  }, [bookId]);

  return (
    <>
      <Link to={'/'}>Go back to search books</Link>
      {book && <BookDetail book={book} />}
    </>
  );
};

export default BookDetailPage;
