import React from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'
import styles from '../../styles/Profile.module.css'
import championsBgs from '../../static/data/championsBackground.json'
import RankQueueBoard from '../../components/RankQueueBoard'

const Profile = ({ data }) => {
    if (!data) return <Layout>loading...</Layout>

    const favChamp = data.summonerMasteries.length > 0 ? championsBgs[data.summonerMasteries[0].championId].name : null
    console.log(favChamp)

    return (
        <Layout>
            <div className={styles.profilePageContainer}>
                <div className={styles.profileHeroBgContainer}>
                    {
                        favChamp &&
                        <div
                            className={styles.profileHeroBg}
                            style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,1)), url("/official_assets/img/champion/splash/${favChamp}_0.jpg")` }}
                        />
                    }
                </div>
                <div className={styles.profileInfoContainer}>
                    <div className={styles.BasicInfoContainer}>
                        <Image
                            className={styles.SummonerProfileImg}
                            src={`/official_assets/11.12.1/img/profileicon/${data.summonerDTO.profileIconId}.png`}
                            alt='summonerProfile'
                            width={128}
                            height={128}
                        />
                        <div className={styles.SummonerLvl}>{`${data.summonerDTO.summonerLevel}`}</div>
                        <h1>{`${data.summonerDTO.name}`}</h1>
                    </div>
                    <div className={styles.RankInfoContainer}>
                        <RankQueueBoard
                            queueType='Solo/Duo'
                            queue={data.summonerLeagueDTO.solo}
                        />
                        <RankQueueBoard
                            queueType='Flexible'
                            queue={data.summonerLeagueDTO.flex}
                        />
                    </div>
                </div>
                <div className={styles.GameStatsContainer}>
                    <div className={styles.PlayerStyleInfoContainer}>
                        Player Stlye
                    </div>
                    <div className={styles.MatchHistoryContainer}>
                        {
                            data.matchList.length > 0 &&
                            data.matchList.map((match, index) => {
                                return (
                                    <div className="MatchRecord" key={index}>{`Game ID: ${match.gameId}`}</div>
                                )
                            })
                        }
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

    if (!summonerLeagueDTO) {
        return {
            props: {
                error: true
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

    res = await fetch('http://localhost:3001/api/summoner/matchHistory', {
        method: 'POST',
        headers: {
            "content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            region: "na1",
            accountId: summonerDTO.accountId,
        })
    })

    if (!res.ok) {
        return {
            props: {
                error: true
            }
        }
    }

    const matchList = await res.json()

    // console.log(matchList)

    return {
        props: {
            data: {
                summonerDTO,
                summonerLeagueDTO,
                summonerMasteries,
                matchList
            }
        }
    }
}

export default Profile
