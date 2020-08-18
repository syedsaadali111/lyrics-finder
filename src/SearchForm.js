import React from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({ searchString, handleChange}) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <input
                className={styles.searchField}
                value={searchString}
                onChange={handleChange}
                type="text"
                placeholder="Type lyrics of a song, song name or the artist name"
            />
        </form>
    );
}
 
export default SearchForm;