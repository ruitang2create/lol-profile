import Image from 'next/image'
import React from 'react'
import styles from '../styles/hero.module.css'

const Hero = () => {
    return (
        <div className={styles.HeroContainer}>
            <h1 className={styles.HeroTitle}>Gimme a name, summoner</h1>
            <Image 
            src='/assets/images/HomeArt1.jpg'
            alt='homeArt'
            width={600}
            height={300}
            />
        </div>
    )
}

export default Hero