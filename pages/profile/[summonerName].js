import React, { useState } from 'react'
import Image from 'next/image'
import Layout from '../../components/layout'
import styles from '../../styles/Profile.module.css'
import championsBgs from '../../static/data/championsBackground.json'
import RankQueueBoard from '../../components/RankQueueBoard'
import MatchRecord from '../../components/MatchRecord'
import MatchHistoryFilterData from '../../static/data/matchHistoryFilterOptions.json';
import { Radar } from 'react-chartjs-2';

const Profile = ({ data }) => {
    if (!data) return <Layout>loading...</Layout>
    const [matchesRange, setMatchesRange] = useState({
        begin: 0,
        end: 5,
    });
    const [champRolesCount, setChampRolesCount] = useState([0, 0, 0, 0, 0, 0]);

    const favChamp = data.summonerMasteries.length > 0 ? championsBgs[data.summonerMasteries[0].championId].name : null
    const rolesPrefChartData = {
        labels: ['Assassin', 'Fighter', 'Tank', 'Support', 'Marksman', 'Mage'],
        datasets: [
            {
                label: 'Frequency',
                backgroundColor: "rgba(34, 202, 236, .2)",
                borderColor: "rgba(34, 202, 236, 1)",
                pointBackgroundColor: "rgba(34, 202, 236, 1)",
                poingBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(34, 202, 236, 1)",
                data: champRolesCount
            }
        ]
    };

    const rolesPrefChartOptions = {
        scale: {
            ticks: {
                stepSize: 10,
                showLabelBackdrop: false,
                backdropColor: "rgba(203, 197, 11, 1)"
            },
            angleLines: {
                color: "rgba(255, 255, 255, .3)",
                lineWidth: 1
            },
            gridLines: {
                color: "rgba(255, 255, 255, .3)",
                circular: true
            }
        }
    }

    const countRoles = () => {
        let count = [0, 0, 0, 0, 0, 0];
        data.matchRecords.forEach((record) => {
            const champ = championsBgs[record.playerInfo.champion];
            champ.tags.forEach(tag => {
                if (tag == 'Assassin') {
                    count[0]++;
                } else if (tag == 'Fighter') {
                    count[1]++;
                } else if (tag == 'Tank') {
                    count[2]++;
                } else if (tag == 'Support') {
                    count[3]++;
                } else if (tag == 'Marksman') {
                    count[4]++;
                } else if (tag == 'Mage') {
                    count[5]++;
                }
            })
        })
        setChampRolesCount(count);
    }

    countRoles();

    return (
        <Layout>
            <div className={styles.profilePageContainer}>
                <div className={styles.profileHeroBgContainer}>
                    {
                        favChamp &&
                        <div
                            className={styles.profileHeroBg}
                            style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url("/official_assets/img/champion/splash/${favChamp}_0.jpg")` }}
                        />
                    }
                </div>
                <div className={styles.MatchHistoryContainer}>
                    <div className={styles.MatchHistoryFilter}>
                    </div>
                    <div className={styles.MatchHistoryListContainer}>
                        {
                            data.matchRecords.length > 0 &&
                            data.matchRecords.map((record, index) => {
                                return (
                                    <MatchRecord
                                        key={index}
                                        summonerName={data.summonerDTO.name}
                                        playerInfo={record.playerInfo}
                                        matchDetails={record.matchDetails}
                                    />
                                )
                            })
                        }
                    </div>
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
                <div className={styles.PlayerStyleInfoContainer}>
                    <div className={styles.RolesPrefChartContainer}>
                        <h2>Roles Preference</h2>
                        <Radar
                            data={rolesPrefChartData}
                            options={rolesPrefChartOptions}
                        />
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

    const matchRecords = await res.json()

    console.log(matchRecords);

    return {
        props: {
            data: {
                summonerDTO,
                summonerLeagueDTO,
                summonerMasteries,
                matchRecords
            }
        }
    }
}

export default Profile
