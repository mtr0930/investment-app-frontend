export interface Stock {
    ticker: string;
    name: string;
    price: number;
    changePercent: number;
}

export interface MarketIndex {
    name: string;
    value: number;
    changePercent: number;
    chartData: { timestamp: number; value: number }[];
}

export interface News {
    id: string;
    title: string;
    source: string;
    timeAgo: string;
    relatedTicker?: string;
}

export type Emotion = 'happy' | 'neutral' | 'sad';

export interface Diary {
    id: string;
    title: string;
    date: string;
    emotion: Emotion;
    preview: string;
    aiSummary: string;
    relatedStocks: string[];
}
