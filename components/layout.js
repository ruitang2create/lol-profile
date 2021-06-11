import React from 'react'
import styles from '../styles/layout.module.css'
import Header from './header'
import Footer from './footer'
import Head from "next/head";

const Layout = ({ children, home }) => {
    return (
        <div>
            <Head>
                <title>LOL Profile</title>
                <meta name="description" content="Generate a unique summoner profile" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet" />
            </Head>
            <Header home={home}/>
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
