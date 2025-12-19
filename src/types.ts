export interface Person {
    id: string;
    name: string;
}

export interface Match {
    id: string;
    team1: Person[];
    team2: Person[];
    createdAt: number;
}
