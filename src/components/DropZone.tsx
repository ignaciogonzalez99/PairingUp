import React from 'react';
import { Person } from '../types';
import { PersonCard } from './PersonCard';
import styles from './DropZone.module.css';

interface DropZoneProps {
    activePair: Person[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onPersonClick?: (person: Person) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ activePair, onDrop, onDragOver, onPersonClick }) => {
    return (
        <div
            className={styles.zone}
            onDrop={onDrop}
            onDragOver={onDragOver}
        >
            <div className={styles.content}>
                {activePair.length === 0 && <p className={styles.placeholder}>Drop here to pair</p>}
                {activePair.map((person) => (
                    // Pass a dummy onDragStart that prevents dragging out if needed, or allow it.
                    // For simplicity, we just display them. using the same card but maybe different style?
                    // Let's reuse PersonCard but disable drag?
                    <div key={person.id} className={styles.droppedItem}>
                        <PersonCard
                            person={person}
                            onDragStart={() => { }}
                            onClick={() => onPersonClick && onPersonClick(person)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
