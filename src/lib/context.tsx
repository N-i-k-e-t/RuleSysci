'use client';

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react';
import { Rule, Trade, Observation, Session, Analytics, BaselineState } from '@/types/trading';

interface AppState {
    sidebarCollapsed: boolean;
    labMode: boolean;
    session: Session;
    rules: Rule[];
    trades: Trade[];
    observations: Observation[];
    analytics: Analytics;
}

type Action =
    | { type: 'TOGGLE_SIDEBAR' }
    | { type: 'TOGGLE_LAB_MODE' }
    | { type: 'SET_LAB_MODE'; payload: boolean }
    | { type: 'UPDATE_SESSION'; payload: Partial<Session> }
    | { type: 'ADD_TRADE'; payload: Trade }
    | { type: 'TOGGLE_RULE_VIOLATION'; payload: number }
    | { type: 'ADD_OBSERVATION'; payload: Observation }
    | { type: 'SET_EMOTIONAL_BASELINE'; payload: BaselineState }
    | { type: 'COMPLETE_PRE_SESSION' };

const initialState: AppState = {
    sidebarCollapsed: false,
    labMode: false,
    session: {
        date: new Date().toISOString().split('T')[0],
        emotionalBaseline: 'neutral',
        rulesLocked: true,
        tradesTaken: 0,
        tradesAllowed: 3,
        stabilityScore: 85,
        preSessionComplete: false,
        notes: '',
    },
    rules: [
        { id: 1, text: 'No entries before 9:30 AM', locked: true, violated: false },
        { id: 2, text: 'Maximum 3 trades per session', locked: true, violated: false },
        { id: 3, text: 'Halt after 2 consecutive losses', locked: true, violated: false },
        { id: 4, text: 'No position after impulse trigger', locked: true, violated: false },
        { id: 5, text: 'Execute the setup, not the feeling', locked: true, violated: false },
    ],
    trades: [
        {
            id: 1,
            date: '2026-02-17',
            pair: 'EUR/USD',
            type: 'Long',
            entry: '1.0845',
            exit: '1.0872',
            followedRules: true,
            emotion: 'neutral',
            notes: 'Setup confirmed. Entry waited for structure. No deviation observed.',
        },
        {
            id: 2,
            date: '2026-02-17',
            pair: 'GBP/USD',
            type: 'Short',
            entry: '1.2601',
            exit: '1.2585',
            followedRules: true,
            emotion: 'neutral',
            notes: 'Slight hesitation on entry. Held structure. Observation: hesitation pattern recurring.',
        },
        {
            id: 3,
            date: '2026-02-16',
            pair: 'USD/JPY',
            type: 'Long',
            entry: '150.42',
            exit: '150.28',
            followedRules: false,
            emotion: 'reactive',
            notes: 'Entry without confirmation. Trigger: quantity increased after first profitable trade.',
        },
    ],
    observations: [
        {
            id: 1,
            date: '2026-02-17',
            title: 'Structure held under pressure',
            content: 'Observed: waited for setup confirmation instead of reacting to price movement. Outcome correlated with patience. Difference from last week: reduced noise reactivity. Pattern: when entry is structural, execution quality improves.',
            state: 'controlled',
        },
        {
            id: 2,
            date: '2026-02-16',
            title: 'Overtrading pattern identified',
            content: 'Observation: trade quantity increased after consecutive wins. Hypothesis: confidence creates impulse trigger. Proposed adjustment: after 2 consecutive wins, enforce 30-minute observation period before next entry.',
            state: 'analytical',
        },
    ],
    analytics: {
        weeklyStability: [72, 85, 68, 91, 88, 79, 85],
        ruleAdherence: 82,
        avgTradesPerDay: 2.3,
        behavioralTrend: 'stabilizing',
        consistencyDays: 4,
        primaryDeviation: 'Impulse entry after win',
    },
};

function ruleSysciReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'TOGGLE_SIDEBAR':
            return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
        case 'TOGGLE_LAB_MODE':
            return { ...state, labMode: !state.labMode };
        case 'SET_LAB_MODE':
            return { ...state, labMode: action.payload };
        case 'UPDATE_SESSION':
            return { ...state, session: { ...state.session, ...action.payload } };
        case 'ADD_TRADE':
            return {
                ...state,
                trades: [action.payload, ...state.trades],
                session: {
                    ...state.session,
                    tradesTaken: state.session.tradesTaken + 1,
                },
            };
        case 'TOGGLE_RULE_VIOLATION':
            return {
                ...state,
                rules: state.rules.map((r) =>
                    r.id === action.payload ? { ...r, violated: !r.violated } : r
                ),
            };
        case 'ADD_OBSERVATION':
            return {
                ...state,
                observations: [action.payload, ...state.observations],
            };
        case 'SET_EMOTIONAL_BASELINE':
            return {
                ...state,
                session: { ...state.session, emotionalBaseline: action.payload },
            };
        case 'COMPLETE_PRE_SESSION':
            return {
                ...state,
                session: { ...state.session, preSessionComplete: true },
            };
        default:
            return state;
    }
}

interface RuleSysciContextType extends AppState {
    toggleSidebar: () => void;
    toggleLabMode: () => void;
    setLabMode: (val: boolean) => void;
    updateSession: (data: Partial<Session>) => void;
    addTrade: (trade: Trade) => void;
    toggleRuleViolation: (id: number) => void;
    addObservation: (obs: Observation) => void;
    setEmotionalBaseline: (em: BaselineState) => void;
    completePreSession: () => void;
}

const RuleSysciContext = createContext<RuleSysciContextType | null>(null);

export function RuleSysciProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(ruleSysciReducer, initialState);

    const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), []);
    const toggleLabMode = useCallback(() => dispatch({ type: 'TOGGLE_LAB_MODE' }), []);
    const setLabMode = useCallback((val: boolean) => dispatch({ type: 'SET_LAB_MODE', payload: val }), []);
    const updateSession = useCallback((data: Partial<Session>) => dispatch({ type: 'UPDATE_SESSION', payload: data }), []);
    const addTrade = useCallback((trade: Trade) => dispatch({ type: 'ADD_TRADE', payload: trade }), []);
    const toggleRuleViolation = useCallback((id: number) => dispatch({ type: 'TOGGLE_RULE_VIOLATION', payload: id }), []);
    const addObservation = useCallback((obs: Observation) => dispatch({ type: 'ADD_OBSERVATION', payload: obs }), []);
    const setEmotionalBaseline = useCallback((em: BaselineState) => dispatch({ type: 'SET_EMOTIONAL_BASELINE', payload: em }), []);
    const completePreSession = useCallback(() => dispatch({ type: 'COMPLETE_PRE_SESSION' }), []);

    const value = {
        ...state,
        toggleSidebar,
        toggleLabMode,
        setLabMode,
        updateSession,
        addTrade,
        toggleRuleViolation,
        addObservation,
        setEmotionalBaseline,
        completePreSession,
    };

    return <RuleSysciContext.Provider value={value}>{children}</RuleSysciContext.Provider>;
}

export function useRuleSysci() {
    const ctx = useContext(RuleSysciContext);
    if (!ctx) throw new Error('useRuleSysci must be used within RuleSysciProvider');
    return ctx;
}
