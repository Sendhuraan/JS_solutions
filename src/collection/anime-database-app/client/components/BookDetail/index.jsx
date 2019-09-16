import React from 'react';

const BookDetail = ({ book }) => {

    return (
        <section>
            <div>
                <img alt={book.title} src={book.image_url} />
                <div>
                    <h3><strong>Title:</strong> { book.title }</h3>
                    <p><strong>Synopsis</strong> {book.synopsis}</p>
                </div>
            </div>
        </section>
    );
};

export default BookDetail;
