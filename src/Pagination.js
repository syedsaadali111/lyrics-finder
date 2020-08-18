import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ page, hasNextPage, setPage}) => {
    return (
        <div className={styles.paginationContainer}>
            {page > 2 && (
                <>
                <div onClick={() => setPage(1)} className={styles.pageLink}>1</div>
                <div className={styles.divider}>. . .</div>
                </>
            )}
            {page !== 1 && <div onClick={() => setPage(page - 1)} className={styles.pageLink}>{page - 1}</div>}
            <div className={`${styles.pageLink} ${styles.current}`}>{page}</div>
            {hasNextPage && <div onClick={() => setPage(page + 1)} className={styles.pageLink}>{page + 1}</div>}
            {/* {page === 1 && <div onClick={() => setPage(page + 2)} className={styles.pageLink}>{page + 2}</div>} */}
        </div>
    );
}
 
export default Pagination;