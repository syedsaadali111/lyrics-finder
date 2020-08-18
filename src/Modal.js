import React from 'react';
import styles  from './Modal.module.css';

const Modal = ({ title, lyrics:{lyrics, lyricsLoading, lyricsError}, setIsModalOpen}) => {


    return (
        <div id='modal' onClick={(e) => {return e.target.id === 'modal' ? setIsModalOpen(false) : null}} className={styles.modal}>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>{title}</div>
                    <span onClick={() => {setIsModalOpen(false)}} className={styles.close}>&times;</span>
                </div>
                <div className={styles.content}>
                    {lyricsLoading && <p>Loading...</p>}
                    {lyricsError && <p>Error. Try Refreshing</p>}
                    <p>{lyrics}</p>
                </div>
            </div>
        </div>
    );
}
 
export default Modal;