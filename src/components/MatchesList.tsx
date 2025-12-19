import React from 'react';
import { Match } from '../types';
import styles from './MatchesList.module.css';

interface MatchesListProps {
    matches: Match[];
    onUnpair: (id: string) => void;
}

export const MatchesList: React.FC<MatchesListProps> = ({ matches, onUnpair }) => {
    if (matches.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Matches</h3>
            <div className={styles.list}>
                {matches.map((match) => (
                    <div key={match.id} className={styles.matchCard}>
                        <div className={styles.teamsContainer}>
                            <div className={styles.team}>
                                {match.team1.map(p => <div key={p.id} className={styles.personVal}>{p.name}</div>)}
                            </div>
                            <div className={styles.vs}>VS</div>
                            <div className={styles.team}>
                                {match.team2.map(p => <div key={p.id} className={styles.personVal}>{p.name}</div>)}
                            </div>
                        </div>
                        <button className={styles.unpairBtn} onClick={() => onUnpair(match.id)}>Break Match</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
