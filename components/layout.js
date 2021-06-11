import React from 'react'
import styled from 'styled-components'
import Header from './header'

const layout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>LOL Profile</title>
                <meta name="description" content="Generate a unique summoner profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default layout
