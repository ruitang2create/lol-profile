import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../styles/MatchHistory.module.css';
import championsBgs from '../static/data/championsBackground.json';
import championsDB from '../public/official_assets/11.12.1/data/en_US/champion.json';
import runesDB from '../static/data/runes.json';

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
    console.log(playerDTO);

    const getRuneIconPath = (runesId) => {
        return `/official_assets/img/${runesDB[runesId].icon}`
    }

    return (
        <div className={styles.MatchRecord}>
            <div className={styles.col1}>
                <Image
                    className={styles.ChampionProfile}
                    src={`/official_assets/11.12.1/img/champion/${playedChamp}.png`}
                    width={200}
                    height={200}
                />
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
                <div className={styles.SummonerSpells}></div>
                <div className={styles.Items}></div>
            </div>
            <div className={styles.col3}>
                <div className={styles.KdaIndex}></div>
                <div className={styles.Kda}></div>
                <div className={styles.Cs}></div>
            </div>
            <div className={styles.col4}>
                <div className={styles.Team1}></div>
                <div className={styles.Team2}></div>
            </div>
        </div>
    );
};

export default MatchRecord;