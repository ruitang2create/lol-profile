import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/MatchHistory.module.css';
import championsBgs from '../static/data/championsBackground.json';
import runesDB from '../static/data/runes.json';
import summonerspellsDB from '../static/data/summonerspells.json';

const MatchRecord = ({ summonerName, playerInfo, matchDetails }) => {
    const playedChamp = championsBgs[playerInfo.champion].name;
    const identifyPlayer = (summonerName, playersList) => {
        let tempId = -1;
        for (let i = 0; i < playersList.length; i++) {
            if (summonerName == playersList[i].player.summonerName) {
                tempId = i;
                break;
            }
        }
        return tempId;
    }

    const playerParticipantId = identifyPlayer(summonerName, matchDetails.participantIdentities);
    const playerDTO = matchDetails.participants[playerParticipantId];
    const playerItems = [playerDTO.stats.item0, playerDTO.stats.item1, playerDTO.stats.item2, playerDTO.stats.item3, playerDTO.stats.item4, playerDTO.stats.item5];
    console.log(playerDTO)

    const getRuneIconPath = (runesId) => {
        return `/official_assets/img/${runesDB[runesId].icon}`
    }

    const getSummonerSpellIconPath = (spellId) => {
        const spellPath = summonerspellsDB[spellId].image.full;
        return `/official_assets/11.12.1/img/spell/${spellPath}`;
    }

    const getKdaIndex = () => {
        if (playerDTO.stats.deaths == 0) return 'Perfect';
        return ((playerDTO.stats.kills + playerDTO.stats.assists) / playerDTO.stats.deaths).toFixed(2);
    }

    const computeCs = () => {
        const minions = playerDTO.stats.totalMinionsKilled + playerDTO.stats.neutralMinionsKilled;
        const gameDurationInMins = matchDetails.gameDuration / 60;
        const csPerMin = (minions / gameDurationInMins).toFixed(1);
        return `${minions} (${csPerMin}) CS`;
    }

    const bgColor = playerDTO.stats.win ? 'rgba(0, 102, 204, 0.2)' : 'rgba(204, 0, 0, 0.2)';

    return (
        <div className={styles.MatchRecord} style={{ backgroundColor: bgColor }}>
            <div className={styles.col1}>
                <div className={styles.champProfileContainer}>
                    <Image
                        className={styles.ChampionProfile}
                        src={`/official_assets/11.12.1/img/champion/${playedChamp}.png`}
                        width={200}
                        height={200}
                    />
                </div>
                <div className={styles.Runes}>
                    <div className={styles.MainRune}>
                        <Image
                            className={styles.RuneImage}
                            src={getRuneIconPath(playerDTO.stats.perk0)}
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className={styles.SecRune}>
                        <Image
                            className={styles.RuneImage}
                            src={getRuneIconPath(playerDTO.stats.perk4)}
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.col2}>
                <div className={styles.SummonerSpellsContainer}>
                    <div className={styles.SummonerSpells}>
                        <Image
                            className={styles.SpellImg}
                            src={getSummonerSpellIconPath(playerDTO.spell1Id)}
                            width={40}
                            height={40}
                        />
                    </div>
                    <div className={styles.SummonerSpells}>
                        <Image
                            className={styles.SpellImg}
                            src={getSummonerSpellIconPath(playerDTO.spell2Id)}
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
                <div className={styles.Items}>
                    {playerItems.map((item, index) => {
                        return (
                            <div key={index} className={styles.ItemContainer}>
                                <Image
                                    className={styles.ItemImg}
                                    src={`/official_assets/11.12.1/img/item/${item}.png`}
                                    width={30}
                                    height={30}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={styles.col3}>
                <div className={styles.StatsContainer}>
                    <div className={styles.KdaIndex}>{`${getKdaIndex()} KDA`}</div>
                    <div className={styles.Kda}>{`${playerDTO.stats.kills}/`}<span className={styles.DeathNum}>{playerDTO.stats.deaths}</span>{`/${playerDTO.stats.assists}`}</div>
                    <div className={styles.Cs}>{computeCs()}</div>
                </div>
                <div className={styles.AwardContainer}></div>
            </div>
            <div className={styles.col4}>
                <div className={styles.Team1}></div>
                <div className={styles.Team2}></div>
            </div>
        </div>
    );
};

export default MatchRecord;