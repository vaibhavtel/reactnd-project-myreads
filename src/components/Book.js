import React from "react";
import PropTypes from "prop-types";

const Book = (props) => {
    const book = props.book,
    changeShelf = (event) => {
        const newShelf = event.target.value;
        if(newShelf !==book.shelf) {
            props.changeShelf(book, newShelf);
        }
    },
    returnAuthors = () => {
        if (book.authors) {
            return (
                book.authors.map((bookAuthor) => (
                    <div className="book-authors" key={bookAuthor}>
                        {bookAuthor}
                    </div>
                ))
            )
        }
    };
    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.smallThumbnail})` }} alt={book.title}></div>
                <div className="book-shelf-changer">
                    <select onChange={changeShelf} value={book.shelf}>
                        <option value="" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            {returnAuthors()}
        </div>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default Book;
