import React, {useState, useCallback} from 'react';
import useFetchLyrics from './useFetchLyrics';
import Modal from './Modal';
import styles from './SongItem.module.css';

const SongItem = ({ name, songId }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lyrics, lyricsLoading, lyricsError }= useFetchLyrics(songId);

    const handleSongSelect = useCallback(() => {
        setIsModalOpen(true);
      }, []);

    return (
        <>
            <div className={styles.songTitle} key={name} onClick={() => handleSongSelect(songId, name)}>
                {name}
            </div>
            {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} title={name} lyrics={{lyrics, lyricsLoading, lyricsError}}/>}
        </>
    );
}
 
export default SongItem;