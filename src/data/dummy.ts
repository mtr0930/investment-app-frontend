import { Diary, MarketIndex, News, Stock } from "../types";

export const MOCK_STOCKS: Stock[] = [
    { ticker: 'NVDA', name: 'NVIDIA', price: 485.23, changePercent: 3.2 },
    { ticker: 'TSLA', name: 'Tesla', price: 242.84, changePercent: 2.1 },
    { ticker: 'AAPL', name: 'Apple', price: 178.52, changePercent: -1.5 },
    { ticker: 'MSFT', name: 'Microsoft', price: 378.91, changePercent: 1.8 },
];

export const MOCK_NEWS: News[] = [
    { id: '1', title: 'Tesla reports record quarterly deliveries', source: 'Reuters', timeAgo: '2h ago', relatedTicker: 'TSLA' },
    { id: '2', title: 'Apple announces new AI features for iPhone', source: 'Bloomberg', timeAgo: '4h ago', relatedTicker: 'AAPL' },
    { id: '3', title: 'NVIDIA stock hits new all-time high', source: 'CNBC', timeAgo: '6h ago', relatedTicker: 'NVDA' },
    { id: '4', title: 'Fed signals potential rate cuts in 2024', source: 'WSJ', timeAgo: '8h ago', relatedTicker: 'SPY' },
];

export const MOCK_DIARIES: Diary[] = [
    {
        id: '1',
        title: 'NVIDIA Buy Decision',
        date: '2026-01-04',
        emotion: 'happy',
        preview: 'AI semiconductor market seems to continue growing, so I bought more NVIDIA. Jensen Huang...',
        aiSummary: 'Positive outlook on AI sector',
        relatedStocks: ['NVDA'],
    },
    {
        id: '2',
        title: 'Tesla Earnings Worries',
        date: '2026-01-03',
        emotion: 'neutral',
        preview: 'Tesla quarterly earnings are coming up. Deliveries were good but margins are worrying. Adjusted some positions...',
        aiSummary: 'Cautious approach before earnings',
        relatedStocks: ['TSLA'],
    },
    {
        id: '3',
        title: 'Apple Cut Loss',
        date: '2026-01-01',
        emotion: 'sad',
        preview: 'Decided to cut losses on Apple. Innovation seems stagnant lately...',
        aiSummary: 'Negative sentiment on innovation',
        relatedStocks: ['AAPL'],
    }
];

// Generate simple mock chart data
const generateChartData = (base: number, volatility: number, points: number = 20) => {
    let current = base;
    return Array.from({ length: points }).map((_, i) => {
        current = current * (1 + (Math.random() - 0.45) * volatility);
        return { timestamp: i, value: current };
    });
};

export const MOCK_MARKET_INDICES: { [key: string]: MarketIndex } = {
    'S&P 500': {
        name: 'S&P 500',
        value: 4820,
        changePercent: 0.42,
        chartData: generateChartData(4700, 0.005),
    },
    'NASDAQ': {
        name: 'NASDAQ',
        value: 15000,
        changePercent: 0.85,
        chartData: generateChartData(14800, 0.008),
    }
};
