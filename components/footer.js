import React from 'react'
import styles from '../styles/layout.module.css'

const Footer = () => {
    return (
        <div className={styles.FooterContainer}>
            <div>
                <a
                    href="http://portfolio.ruitangcs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Designed and created by Rui Tang</a>
            </div>
            <p>LOL Profile isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
        </div>
    )
}

export default Footer