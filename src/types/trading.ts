export type BaselineState = 'controlled' | 'neutral' | 'elevated' | 'reactive' | 'uncertain';

export interface Rule {
    id: number;
    text: string;
    locked: boolean;
    violated: boolean;
}

export interface Trade {
    id: number;
    date: string;
    pair: string;
    type: 'Long' | 'Short';
    entry: string;
    exit: string;
    followedRules: boolean;
    emotion: BaselineState;
    notes: string;
}

export interface Observation {
    id: number;
    date: string;
    title: string;
    content: string;
    state: string;
}

export interface Session {
    date: string;
    emotionalBaseline: BaselineState;
    rulesLocked: boolean;
    tradesTaken: number;
    tradesAllowed: number;
    stabilityScore: number;
    preSessionComplete: boolean;
    notes: string;
}

export interface Analytics {
    weeklyStability: number[];
    ruleAdherence: number;
    avgTradesPerDay: number;
    behavioralTrend: string;
    consistencyDays: number;
    primaryDeviation: string;
}
