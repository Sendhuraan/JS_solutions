/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext';

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

const BooksList = () => {
    return (
		<ul>
			<AppContext.Consumer>
				{(context) => {
					return context.state.grid_results.map((book, index) => {
						return (
							<Book book={book} key={index} />
						);
					})
				}}
			</AppContext.Consumer>
		</ul>
	);
};

export default BooksList;
