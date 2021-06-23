import Image from 'next/image'
import React from 'react'
import styles from '../styles/hero.module.css'

const Hero = () => {
    return (
        <div className={styles.HeroContainer}>
            <h1 className={styles.HeroTitle}>Gimme a name, Summoner</h1>
            <div className={styles.HeroImageWrapper}>
                <Image
                    className={styles.HeroImage}
                    src='/assets/images/HomeArt1.jpg'
                    alt='homeArt'
                    width={800}
                    height={400}
                    layout='intrinsic'
                />
            </div>
        </div>
    )
}

export default Hero