import React from 'react';
import styles from '../styles/BotNav.module.css';

const BotNav = props => {
    return (
        <div className={styles.BottomNavigator}>
            {props.navItems.map((item, index) => {
                return (
                    <div
                        className={styles.BotNavItem}
                        key={index}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

export default BotNav;