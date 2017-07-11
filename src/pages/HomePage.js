import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import BookShelf from "../components/BookShelf";

const HomePage = (props) => {
    const books ={
        currentlyReading:[],
        read:[],
        wantToRead:[]
    };
    if (props.books.length) {
        props.books.forEach((book) => {
            if (book.shelf === "currentlyReading") {
                books.currentlyReading.push(book);
            } else if (book.shelf === "read") {
                books.read.push(book);
            } else if (book.shelf === "wantToRead") {
                books.wantToRead.push(book);
            }
        });
    }
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <BookShelf
                    bookShelfTitle="Currently Reading"
                    books={books.currentlyReading.sort(sortBy( "title"))}
                    changeShelf={props.changeShelf}
                />
                <BookShelf
                    bookShelfTitle="Want to Read"
                    books={books.wantToRead.sort(sortBy( "title"))}
                    changeShelf={props.changeShelf}
                />
                <BookShelf
                    bookShelfTitle="Read"
                    books={books.read.sort(sortBy( "title"))}
                    changeShelf={props.changeShelf}
                />
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    )
};

HomePage.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default HomePage;
