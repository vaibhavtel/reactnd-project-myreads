import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import SearchPage from "./pages/SearchPage";
import HomePage from "./pages/HomePage";
import "./App.css";

class BooksApp extends React.Component {
    constructor() {
        super();
        this.state = {
            books: []
        };
        this.changeShelf = this.changeShelf.bind(this);
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }
    changeShelf(book, newShelf) {
        const books = this.state.books,
            bookId = book.id;
        BooksAPI.update(book, newShelf).then(() => {
            if (books.filter(book => book.id === bookId).length) {
                this.setState(oldState => {
                    return {books: oldState.books.map(book => {
                        if (book.id === bookId) {
                            book.shelf = newShelf;
                        }
                        return book;
                    })};
                });
            } else {
                this.setState({books: books.concat(book)});
            }
        });
    }
    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <HomePage
                        books={this.state.books}
                        changeShelf={this.changeShelf}
                    />
                )}/>
                <Route exact path="/search" render={() => (
                    <SearchPage
                        changeShelf={this.changeShelf}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp;
