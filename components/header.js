import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/layout.module.css'
import Router from 'next/router'

const Header = ({ home }) => {
    const [searchInput, setSearchInput] = useState("");

    const search = (e) => {
        e.preventDefault();
        if (searchInput.length > 0) {
            Router.push(`/profile/${searchInput}`);
        }
    }
    return (
        <nav className={styles.HeaderContainer}>
            <div className={styles.HeaderHomeBtnWrapper}>
                <Link href="/">
                    <a className={styles.HeaderHomeBtn}>League Profile</a>
                </Link>
            </div>
            {
                !home &&
                <form onSubmit={search} className={styles.HeaderSearchBar}>
                    <input
                        className={styles.HeaderSearchInput}
                        placeholder='Summoner Id...'
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </form>
            }
        </nav>
    )
}

export default Header