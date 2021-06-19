import React from 'react';
import Link from 'next/link';
import styles from '../styles/MatchHistory.module.css';
import Image from 'next/image';

const TeamList = ({ teamInfoList }) => {
    return (
        <div className={styles.TeamList}>
            {teamInfoList.map((member, index) => {
                return (
                    <div className={styles.TeamListItem} key={index}>
                        <div className={styles.TeamChampProfileContainer}>
                            <Image
                                src={`/official_assets/11.12.1/img/champion/${member.championName}.png`}
                                width={25}
                                height={25}
                            />
                        </div>
                        <div className={styles.TeamMemberIdContainer}>
                            <Link href={`/profile/${member.summonerName}`}>
                                <a rel='noreferrer noopener' target='_blank' >{member.summonerName}</a>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TeamList;