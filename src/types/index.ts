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
    content: string;
    diary_date: string;
    emotion: Emotion;
    ai_summary: string;
    mentioned_tickers: string[];
    market_sentiment_score: number;
}

export interface DiaryCreateRequest {
    title: string;
    content: string;
    diary_date: string;
    mentioned_tickers?: string[];
    market_sentiment_score?: number;
    ai_summary?: string;
}

export interface DiaryAnalyzeRequest {
    content: string;
    prompt?: string;
}

export interface DiaryAnalyzeResponse {
    mentioned_tickers: string[];
    sentiment_score: number;
    ai_summary: string;
    emotion: Emotion;
}

export interface DiarySummaryResponse {
    [key: string]: Emotion;
}

export interface PortfolioHolding {
    id: string;
    ticker: string;
    name: string;
    averagePrice: number;
    shares: number;
    currentPrice: number;
    marketValue: number;
    totalGain: number;
    gainPercent: number;
}

export interface MarketIndexInfo {
    price: number;
    change: number;
    change_percent: number;
    news?: any[];
}

export interface FearGreedInfo {
    value: number;
    rating: string;
    last_updated: string;
}

export interface MarketSummaryResponse {
    "S&P 500 Index": MarketIndexInfo;
    "Nasdaq Index": MarketIndexInfo;
    "S&P 500 Futures": MarketIndexInfo;
    "Nasdaq 100 Futures": MarketIndexInfo;
    "fear_greed_index": FearGreedInfo;
}
