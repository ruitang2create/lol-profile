import React from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'
import styles from '../../styles/Profile.module.css'

const Profile = ({ data }) => {

    if (!data) return <Layout>loading...</Layout>

    return (
        <Layout>
            <div className={styles.BasicInfoContainer}>
                <Image
                    src={`/official_assets/11.12.1/img/profileicon/${data.profileIconId}.png`}
                    alt='summonerProfile'
                    width={128}
                    height={128}
                />
                <h1>{`${data.name}(lvl. ${data.summonerLevel})`}</h1>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch('http://localhost:3001/api/summoner/v4/summoners/byName', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            region: "na1",
            summonerName: context.params.summonerName
        })
    })

    if (!res.ok) {
        return {
            props: {
                error: true
            }
        }
    }

    let data = await res.json()

    if (!data) {
        return {
            props: {
                error: true
            }
        }
    }

    console.log(data)

    return {
        props: { data }
    }
}

export default Profile
