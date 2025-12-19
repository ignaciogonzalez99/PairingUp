import React from 'react';
import { Person } from '../types';
import styles from './PersonCard.module.css';

interface PersonCardProps {
    person: Person;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, person: Person) => void;
    onRemove?: (id: string) => void;
    onClick?: (person: Person) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onDragStart, onRemove, onClick }) => {
    return (
        <div
            className={styles.card}
            draggable
            onDragStart={(e) => onDragStart(e, person)}
            onClick={() => onClick && onClick(person)}
        >
            <span className={styles.name}>{person.name}</span>
            {onRemove && (
                <button className={styles.removeBtn} onClick={() => onRemove(person.id)}>
                    ×
                </button>
            )}
        </div>
    );
};
