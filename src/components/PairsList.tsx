import React from 'react';
import { Pair } from '../types';
import styles from './PairsList.module.css';

interface PairsListProps {
    pairs: Pair[];
    onUnpair: (id: string) => void;
}

export const PairsList: React.FC<PairsListProps> = ({ pairs, onUnpair }) => {
    if (pairs.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Formed Pairs</h3>
            <div className={styles.list}>
                {pairs.map((pair) => (
                    <div key={pair.id} className={styles.pairCard}>
                        <div className={styles.pairContent}>
                            <span className={styles.person}>{pair.person1.name}</span>
                            <span className={styles.connector}>&</span>
                            <span className={styles.person}>{pair.person2.name}</span>
                        </div>
                        <button className={styles.unpairBtn} onClick={() => onUnpair(pair.id)}>Break</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
