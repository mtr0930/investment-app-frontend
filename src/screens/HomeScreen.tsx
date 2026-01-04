import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SentimentGauge } from '../components/SentimentGauge';
import { MarketChart } from '../components/MarketChart';
import { StockCard } from '../components/StockCard';
import { NewsCard } from '../components/NewsCard';
import { MOCK_MARKET_INDICES, MOCK_NEWS, MOCK_STOCKS } from '../data/dummy';

export const HomeScreen = () => {
    const [selectedMarket, setSelectedMarket] = useState<'S&P 500' | 'NASDAQ'>('S&P 500');
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />
            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
            >
                <View className="mt-4 mb-6">
                    <Text className="text-white text-2xl font-bold">Investment Dashboard</Text>
                    <Text className="text-gray-400 text-sm">Real-time market status & AI analysis</Text>
                </View>

                <SentimentGauge score={68} />

                {/* Market Tabs */}
                <View className="flex-row mt-6 gap-3">
                    {(['S&P 500', 'NASDAQ'] as const).map((market) => (
                        <TouchableOpacity
                            key={market}
                            onPress={() => setSelectedMarket(market)}
                            className={`flex-1 py-3 items-center justify-center rounded-xl border ${selectedMarket === market ? 'bg-[#1a2e25] border-primary' : 'bg-card border-gray-800'}`}
                        >
                            <Text className={`${selectedMarket === market ? 'text-primary font-bold' : 'text-gray-400 font-medium'}`}>
                                {market}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Chart */}
                <MarketChart data={MOCK_MARKET_INDICES[selectedMarket]} />

                {/* Major Stocks */}
                <View className="mt-8">
                    <Text className="text-white text-lg font-bold mb-3">Today's Major Stocks</Text>
                    <View className="flex-row flex-wrap justify-between">
                        {MOCK_STOCKS.map(stock => (
                            <StockCard key={stock.ticker} stock={stock} />
                        ))}
                    </View>
                </View>

                {/* News */}
                <View className="mt-8">
                    <Text className="text-white text-lg font-bold mb-3">Major News</Text>
                    {MOCK_NEWS.map(news => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
