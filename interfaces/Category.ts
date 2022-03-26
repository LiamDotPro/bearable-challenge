export interface Entry {
    id: string;
    moodAssessment: 1 | 2 | 3 | 4 | 5;
    feelings: string[];
}

export interface Count{
    one: number,
    two: number,
    three: number,
    four: number,
    five: number
}