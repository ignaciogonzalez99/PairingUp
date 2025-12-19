export interface Person {
    id: string;
    name: string;
}

export interface Pair {
    id: string;
    person1: Person;
    person2: Person;
}

export interface Match {
    id: string;
    team1: Person[];
    team2: Person[];
    createdAt: number;
}
