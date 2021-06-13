import React from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'
import styles from '../../styles/Profile.module.css'
import championsBgs from '../../static/data/championsBackground.json'

const Profile = ({ data }) => {
    if (!data) return <Layout>loading...</Layout>

    const favChamp = championsBgs[data.summonerMasteries[0].championId].name

    return (
        <Layout>
            <div className={styles.profilePageContainer}>
                <img
                    className={styles.profileHeroBg}
                    src={`/official_assets/img/champion/splash/${favChamp}_0.jpg`}
                    alt='profileHeroBg'
                />
                <div className={styles.BasicInfoContainer}>
                    <Image
                        src={`/official_assets/11.12.1/img/profileicon/${data.summonerDTO.profileIconId}.png`}
                        alt='summonerProfile'
                        width={128}
                        height={128}
                    />
                    <h1>{`${data.summonerDTO.name}(lvl. ${data.summonerDTO.summonerLevel})`}</h1>
                </div>
                <div className={styles.RankInfoContainer}>
                    <div className={styles.SoloInfoContainer}>
                        <div className={styles.RankInfoTitle}>Solo/Duo Queue</div>
                        <Image
                            src={`/assets/images/riot/emblems/Emblem_${data.summonerLeagueDTO.solo.tier}.png`}
                            alt='rankEmblem'
                            width={100}
                            height={100 * 585 / 512}
                        />
                        <div className={styles.RankTier}>{`${data.summonerLeagueDTO.solo.tier} ${data.summonerLeagueDTO.solo.rank}`}</div>
                    </div>
                    <div className={styles.FlexInfoContainer}>
                        <div className={styles.RankInfoTitle}>Flexible Queue</div>
                        <Image
                            src={`/assets/images/riot/emblems/Emblem_${data.summonerLeagueDTO.flex.tier}.png`}
                            alt='rankEmblem'
                            width={100}
                            height={100 * 585 / 512}
                        />
                        <div className={styles.RankTier}>{`${data.summonerLeagueDTO.flex.tier} ${data.summonerLeagueDTO.flex.rank}`}</div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let res = await fetch('http://localhost:3001/api/summoner/v4/summoners/byName', {
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

    const summonerDTO = await res.json()

    if (!summonerDTO) {
        return {
            props: {
                error: true
            }
        }
    }

    console.log(summonerDTO)

    res = await fetch('http://localhost:3001/api/league/v4/entries/bySummoner', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            region: "na1",
            id: summonerDTO.id,
        })
    })

    if (!res.ok) {
        return {
            props: {
                error: true
            }
        }
    }

    let summonerLeagueDTO = await res.json()

    const unrankedSolo = {
        queueType: 'RANKED_SOLO_5x5',
        tier: 'UNRANKED',
        rank: ''
    }

    const unrankedFlex = {
        queueType: 'RANKED_FLEX_SR',
        tier: 'UNRANKED',
        rank: ''
    }

    if (summonerLeagueDTO.length == 0) {
        summonerLeagueDTO = {
            solo: unrankedSolo,
            flex: unrankedFlex
        }
    } else if (summonerLeagueDTO.length == 1) {
        if (summonerLeagueDTO[0].queueType == 'RANKED_SOLO_5x5') {
            summonerLeagueDTO = {
                solo: summonerLeagueDTO[0],
                flex: unrankedFlex
            }
        } else {
            summonerLeagueDTO = {
                solo: unrankedSolo,
                flex: summonerLeagueDTO[0]
            }
        }
    } else {
        if (summonerLeagueDTO[0].queueType == 'RANKED_SOLO_5x5') {
            summonerLeagueDTO = {
                solo: summonerLeagueDTO[0],
                flex: summonerLeagueDTO[1]
            }
        } else {
            summonerLeagueDTO = {
                solo: summonerLeagueDTO[1],
                flex: summonerLeagueDTO[0]
            }
        }
    }

    console.log(summonerLeagueDTO)

    res = await fetch('http://localhost:3001/api/champion-mastery/v4/champion-masteries/bySummoner', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            region: "na1",
            summonerId: summonerDTO.id,
        })
    })

    if (!res.ok) {
        return {
            props: {
                error: true
            }
        }
    }

    const summonerMasteries = await res.json()

    return {
        props: {
            data: {
                summonerDTO,
                summonerLeagueDTO,
                summonerMasteries
            }
        }
    }
}

export default Profile
