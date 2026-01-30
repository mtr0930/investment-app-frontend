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
        date: '2026-01-05',
        emotion: 'happy',
        preview: 'Bought NVDA today. AI market is booming.',
        content: "AI semiconductor market seems to continue growing, so I bought more NVIDIA. Jensen Huang\'s vision about the future of accelerated computing is very convincing. The demand for H100 and soon H200 remains unprecedented. I\'m planning to hold this for at least 3 years to see where the AI revolution takes us.",
        aiSummary: 'Positive outlook on AI sector',
        relatedStocks: ['NVDA'],
    },
    {
        id: '2',
        title: 'TSLA Concerns',
        date: '2026-01-04',
        emotion: 'sad',
        preview: 'Tesla margins are dropping. Need to reconsider.',
        content: "Tesla\'s Q4 margins were lower than expected. The price war in China is intensifying, and the Cybertruck production ramp-up is taking longer than predicted. I should watch the $150 support level closely. If it breaks, I might need to trim my position.",
        aiSummary: 'Caution advised for TSLA due to margin pressure',
        relatedStocks: ['TSLA'],
    },
    {
        id: '3',
        title: 'Market Neutrality',
        date: '2026-01-02',
        emotion: 'neutral',
        preview: 'Waiting for CPI data this week.',
        content: "The market is in wait-and-see mode ahead of the CPI print. Inflation seems sticky, which could delay rate cuts. I'm keeping a high cash position for now to pounce on any significant dips in quality tech stocks.",
        aiSummary: 'Observing macro conditions before next move',
        relatedStocks: ['SPY', 'QQQ'],
    },
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

import { PortfolioHolding } from "../types";
export const MOCK_PORTFOLIO: PortfolioHolding[] = [
    {
        id: '1',
        ticker: 'COIN',
        name: '코인베이스',
        averagePrice: 298.50,
        shares: 19,
        currentPrice: 252.98,
        marketValue: 4806.66,
        totalGain: -808.01,
        gainPercent: -14.3
    },
    {
        id: '2',
        ticker: 'TSLA',
        name: '테슬라',
        averagePrice: 187.12,
        shares: 5.001471,
        currentPrice: 242.84,
        marketValue: 2260.98,
        totalGain: 389.67,
        gainPercent: 20.8
    },
    {
        id: '3',
        ticker: 'PLTR',
        name: '팔란티어',
        averagePrice: 13.50,
        shares: 22,
        currentPrice: 42.12,
        marketValue: 3824.68,
        totalGain: 2335.28,
        gainPercent: 156.7
    },
    {
        id: '4',
        ticker: 'TSLL',
        name: 'TSLL',
        averagePrice: 19.36,
        shares: 289,
        currentPrice: 19.12,
        marketValue: 5569.34,
        totalGain: -106.96,
        gainPercent: -1.8
    }
];

