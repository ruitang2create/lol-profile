import React from 'react';
import styles from '../styles/Profile.module.css';
import Image from 'next/image';
import { Pie, Chart } from 'react-chartjs-2';

const RankQueueBoard = props => {
    const tier = props.queue.tier.toLowerCase();
    const getWinRate = (wins, losses) => {
        return `${Math.round((wins / (wins + losses)) * 100)}%`;
    }

    return (
        <div className={styles.QueueInfoContainer}>
            <div className={styles.RankInfoTitle}>{`${props.queueType} Queue`}</div>
            <Image
                src={`/assets/images/riot/emblems/Emblem_${tier.charAt(0).toUpperCase() + tier.slice(1)}.png`}
                alt='rankEmblem'
                width={100}
                height={100 * 585 / 512}
            />
            <div className={styles.RankTier}>{`${props.queue.tier} ${props.queue.rank}`}</div>
            {
                props.queue.tier != 'UNRANKED' &&
                <div className={styles.DetailedRankInfoContainer}>
                    <div className={styles.LeaguePoint}>{`${props.queue.leaguePoints} LP`}</div>
                    <div className={styles.WinRate}>
                        <Pie
                            data={{
                                labels: [
                                    'Win',
                                    'Loss'
                                ],
                                datasets: [{
                                    label: 'My First Dataset',
                                    data: [props.queue.wins, props.queue.losses],
                                    backgroundColor: [
                                        'rgb(54, 162, 235)',
                                        'rgb(255, 99, 132)'
                                    ],
                                    hoverOffset: 4,
                                    rotation: 180,
                                }]
                            }}
                            height={100}
                            width={100}
                        />
                        <h3 className={styles.WinRateNumber}>Win Rate: {getWinRate(props.queue.wins, props.queue.losses)}</h3>
                    </div>
                </div>
            }
        </div>
    );
};

export default RankQueueBoard;