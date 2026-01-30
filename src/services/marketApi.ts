import { Config } from '../config';
import { MarketSummaryResponse } from '../types';

export const fetchMarketSummary = async (): Promise<MarketSummaryResponse | null> => {
    const url = `${Config.API_URL}/api/market/summary`;
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        console.log(`[API] Fetching market summary from: ${url}`);

        const response = await fetch(url, {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.log(`[API] Server responded with error: ${response.status}`);
            return null;
        }

        const data = await response.json();
        console.log(`[API] Successfully fetched data from ${Config.API_URL}`);
        return data;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log(`[API] Request timed out for ${url}`);
        } else {
            console.log(`[API] Connection failed to ${url}. Is the server running and accessible?`);
        }
        return null;
    }
};
