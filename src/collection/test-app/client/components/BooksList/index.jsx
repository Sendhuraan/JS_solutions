import React from 'react';
import { Link } from 'react-router-dom';

const Book = ({ book }) => {
    return (
        <li>
            <div>
                <img alt={book.title} src={book.image_url} />
                <div>
                    <h3>{ book.title }</h3>
                    <Link to={`/book/${book.mal_id}`}>Show details</Link>
                </div>
            </div>
            <hr />
        </li>
    );
};

const BooksList = ({ gridResults }) => {
    return (
        <ul>
        {
          gridResults.map((book, index) => {
            return (
                <Book book={book} key={index} />
            );
          })
        }
      </ul>
    );
};

export default BooksList;
