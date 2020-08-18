import React, {useState, useCallback} from 'react';
import styles from './App.module.css';

import useFetchSongs from './useFetchSongs';
import SongList from './SongList';
import SearchForm from './SearchForm';
import Pagination from './Pagination';

function App() {

  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState('');

  const { songs, loading, error, hasNextPage }= useFetchSongs(searchString, page);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    setPage(1);
    const value = e.target.value;
    setSearchString(value);
  }, []);

  return (
    <div className="App">
      <div className={styles.formContainer}>
        <SearchForm searchString={searchString} handleChange={handleChange} />
      </div>
      <div className={styles.songListContainer}>
        <SongList songlist={{songs, loading, error}} searchString={searchString} />
        <Pagination page={page} hasNextPage={hasNextPage} setPage={setPage}/>
      </div>
    </div>
  );
}

export default App;