import React from 'react';
import Link from 'next/link';
import styles from '../styles/MatchHistory.module.css';
import Image from 'next/image';

const TeamList = ({ teamInfoList }) => {
    console.log(`Team: ${teamInfoList[0].championName}`);


    return (
        <div className={styles.TeamList}>
            {teamInfoList.map((member, index) => {
                console.log('champion id: ' + typeof member.championId);
                return (
                    <div className={styles.TeamListItem} key={index}>
                        <div className={styles.TeamChampProfileContainer}>
                            <Image
                                src={`/official_assets/11.12.1/img/champion/${member.championName}.png`}
                                width={20}
                                height={20}
                            />
                        </div>
                        <div className={styles.TeamMemberIdContainer}>
                            <Link href={`/profile/${member.summonerName}`}>
                                <a>{member.summonerName}</a>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TeamList;