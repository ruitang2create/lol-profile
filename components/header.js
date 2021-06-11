import Link from 'next/link'
import React from 'react'
import styles from '../styles/layout.module.css'

const Header = ({ home }) => {
    const search = (e) => {
        e.preventDefault();
        alert(`Search for ${e.target.value}`)
    }
    return (
        <nav className={styles.HeaderContainer}>
            <div className={styles.HeaderHomeBtnWrapper}>
                <Link href="/">
                    <a className={styles.HeaderHomeBtn}>LOL Profile</a>
                </Link>
            </div>
            {
                !home &&
                <form onSubmit={search} className={styles.HeaderSearchBar}>
                    <input
                        className={styles.HeaderSearchInput}
                        placeholder='Summoner Id...'
                    />
                </form>
            }
        </nav>
    )
}

export default Header