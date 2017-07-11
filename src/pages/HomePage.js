import React from "react";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "../components/BookShelf";

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            books: [],
            currentlyReading:[],
            read:[],
            wantToRead:[]
        };
        this.categorizeBooks = this.categorizeBooks.bind(this);
        this.changeShelf = this.changeShelf.bind(this);
    }

    categorizeBooks(books) {
        const currentlyReading = [],
            read = [],
            wantToRead = [];
        if (books.length) {
            books.forEach((book) => {
                if (book.shelf === "currentlyReading") {
                    currentlyReading.push(book);
                } else if (book.shelf === "read") {
                    read.push(book);
                } else if (book.shelf === "wantToRead") {
                    wantToRead.push(book);
                }
            });
            this.setState({books: books, currentlyReading: currentlyReading, read: read, wantToRead: wantToRead});
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.categorizeBooks(books);
        });
    }

    changeShelf(book, newShelf) {
        const bookId = book.id;
        BooksAPI.update(book, newShelf).then(() => {
            const books = this.state.books.map(book => {
                if (book.id === bookId) {
                    book.shelf = newShelf;
                }
                return book;
            });
            this.categorizeBooks(books);
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf
                        bookShelfTitle="Currently Reading"
                        books={this.state.currentlyReading.sort(sortBy( "title"))}
                        changeShelf={this.changeShelf}
                    />
                    <BookShelf
                        bookShelfTitle="Want to Read"
                        books={this.state.wantToRead.sort(sortBy( "title"))}
                        changeShelf={this.changeShelf}
                    />
                    <BookShelf
                        bookShelfTitle="Read"
                        books={this.state.read.sort(sortBy( "title"))}
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
