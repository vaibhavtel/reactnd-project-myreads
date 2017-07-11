import React from "react";
import PropTypes from "prop-types";
import {debounce} from "lodash";
import { Link } from "react-router-dom";
import sortBy from "sort-by";
import * as BooksAPI from "../BooksAPI";
import BookShelf from "../components/BookShelf";

class SearchPage extends React.Component {
    constructor() {
        super();
        this.state = {
            searchResults: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDebounced = debounce(this.handleChange, 200);
    }
    handleChange(searchTerm) {
        if (searchTerm.length) {
            BooksAPI.search(searchTerm, 100).then(searchResults => {
                if (searchResults.length) {
                    this.setState({searchResults});
                } else {
                    this.setState({searchResults: []});
                }
            });
        } else if (this.state.searchResults.length){
            this.setState({searchResults: []});
        }
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"
                        className="close-search">
                        Close
                    < /Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" autoFocus placeholder="Search by title or author" onChange={event => this.handleChangeDebounced(event.target.value.trim())} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf
                        bookShelfTitle="Search Results"
                        books={this.state.searchResults.sort(sortBy( "title"))}
                        changeShelf={this.props.changeShelf}
                    />
                </div>
            </div>
        )
    }
}

SearchPage.propTypes = {
    changeShelf: PropTypes.func.isRequired
}

export default SearchPage;
