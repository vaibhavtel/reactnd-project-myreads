import React from "react";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "../components/BookShelf";

class HomePage extends React.Component {
    state = {
        books: []
    }

    changeShelf = (book, newShelf) => {
        const bookId = book.id;
        BooksAPI.update(book, newShelf).then(() => {
            this.setState(oldState => {
                return {
                    books: oldState.books.map(book => {
                        if (book.id === bookId) {
                            book.shelf = newShelf;
                        }
                        return book;
                    })
                };
            });
        });
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books});
        });
    }

    render() {
        const wantToRead = this.state.books.filter(book => book.shelf === "wantToRead");
        const currentlyReading = this.state.books.filter(book => book.shelf === "currentlyReading");
        const read = this.state.books.filter(book => book.shelf === "read");
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf
                        bookShelfTitle="Currently Reading"
                        books={currentlyReading.sort(sortBy( "title"))}
                        changeShelf={this.changeShelf}
                    />
                    <BookShelf
                        bookShelfTitle="Want to Read"
                        books={wantToRead.sort(sortBy( "title"))}
                        changeShelf={this.changeShelf}
                    />
                    <BookShelf
                        bookShelfTitle="Read"
                        books={read.sort(sortBy( "title"))}
                        changeShelf={this.changeShelf}
                    />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
};

export default HomePage;
