import React from 'react';
import SongItem from './SongItem';
import styles from './SongList.module.css';

const SongList = ( { songlist: {songs, loading, error}, searchString } ) => {
    return (
        <>
            {loading && <p className={styles.message}>Loading...</p>}
            {error && <p className={styles.message}>Error. Try Refreshing</p>}
            {!error && !loading && songs.length === 0 && <p className={styles.message}>No songs related to this search query</p>}
            <div className={styles.songList}>
                {searchString === '' && !error && !loading && <div className={styles.message}>Top Trending Right Now</div>}
                {songs.map( song => <SongItem songId={song.track.track_id} key={song.track.track_id} name={song.track.track_name}/>)}
            </div>
        </>
    );
}
 
export default SongList;