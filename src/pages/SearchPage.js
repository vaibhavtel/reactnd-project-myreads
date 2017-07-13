import React from "react";
import {debounce} from "lodash";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "../components/BookShelf";

class SearchPage extends React.Component {
    state = {
        searchResults: [],
        books: []
    }

    isBookOnShelf = (bookId) => {
        return this.state.books.filter(book => book.id === bookId);
    }

    handleChange = (searchTerm) => {
        if (searchTerm.length) {
            BooksAPI.search(searchTerm, 100).then(searchResults => {
                if (searchResults.length) {
                    this.setState({
                        searchResults: searchResults.map(book => {
                            const isBookOnShelf = this.isBookOnShelf(book.id);
                            if (isBookOnShelf.length) {
                                book.shelf = isBookOnShelf[0].shelf;
                            } else {
                                book.shelf = "none";
                            }
                            return book;
                        })
                    });
                } else {
                    this.setState({
                        searchResults: []
                    });
                }
            });
        } else if (this.state.searchResults.length) {
            this.setState({
                searchResults: []
            });
        }
    }

    componentDidMount() {
        BooksAPI.getAll().then(books => {
            this.setState({books});
        });
    }

    addBookToShelf = (book, newShelf) => {
        const bookId = book.id;
        BooksAPI.update(book, newShelf).then(() => {
            this.setState(oldState => {
                return {
                    books: oldState.searchResults.map(book => {
                        if (book.id === bookId) {
                            book.shelf = newShelf;
                        }
                        return book;
                    })
                };
            });
        });
    }

    render() {
        const handleChangeDebounced = debounce(this.handleChange, 200);
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"
                        className="close-search">
                        Close
                    < /Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" autoFocus placeholder="Search by title or author" onChange={event => handleChangeDebounced(event.target.value.trim())} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf
                        bookShelfTitle="Search Results"
                        books={this.state.searchResults.sort(sortBy( "title"))}
                        changeShelf={this.addBookToShelf}
                    />
                </div>
            </div>
        )
    }
}

export default SearchPage;
