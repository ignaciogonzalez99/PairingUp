import React, { useState } from 'react';
import styles from './ControlPanel.module.css';

interface ControlPanelProps {
    teamSize: number;
    setTeamSize: (size: number) => void;
    onAddPerson: (name: string) => void;
    onReset: () => void;
    onRandomize: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    teamSize,
    setTeamSize,
    onAddPerson,
    onReset,
    onRandomize
}) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAddPerson(name.trim());
            setName('');
        }
    };

    return (
        <div className={styles.panel}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Enter name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button type="submit" className={styles.addBtn}>Add</button>
            </form>

            <div className={styles.settings}>
                <label className={styles.label}>Team Size:</label>
                <div className={styles.counter}>
                    <button
                        className={styles.counterBtn}
                        onClick={() => setTeamSize(Math.max(1, teamSize - 1))}
                    >
                        -
                    </button>
                    <span className={styles.count}>{teamSize}</span>
                    <button
                        className={styles.counterBtn}
                        onClick={() => setTeamSize(teamSize + 1)}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.actions}>
                <button onClick={onRandomize} className={styles.randomBtn}>Randomize</button>
                <button onClick={onReset} className={styles.resetBtn}>Reset All</button>
            </div>
        </div>
    );
};
