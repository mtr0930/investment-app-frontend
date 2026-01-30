import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StatusBar, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { SentimentComparison } from '../components/SentimentComparison';
import { MarketChart } from '../components/MarketChart';
import { MarketTabs } from '../components/home/MarketTabs';
import { PortfolioOverview } from '../components/home/PortfolioOverview';
import { PortfolioNews } from '../components/home/PortfolioNews';
import { MOCK_MARKET_INDICES, MOCK_NEWS, MOCK_PORTFOLIO } from '../data/dummy';
import { fetchMarketSummary } from '../services/marketApi';
import { MarketSummaryResponse } from '../types';
import { Config } from '../config';

export const HomeScreen = ({ navigation }: any) => {
    const { t } = useTranslation();

    const [selectedMarket, setSelectedMarket] = useState<'S&P 500' | 'NASDAQ'>('S&P 500');
    const [marketData, setMarketData] = useState<MarketSummaryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // 데이터 로드 함수
    const loadMarketData = useCallback(async () => {
        const data = await fetchMarketSummary();
        if (data) {
            setMarketData(data);
        }
        setLoading(false);
        setRefreshing(false);
    }, []);

    // 1. 초기 로드(REST) 및 실시간 소켓 연결 설정
    useEffect(() => {
        // 백엔드 점검 중이거나 소켓 에러 시 초기 데이터를 REST로 시도
        loadMarketData();

        // WebSocket 연결
        const socket = new WebSocket(Config.WS_URL);

        socket.onopen = () => {
            console.log('[WebSocket] Connected to market summary');
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'MARKET_UPDATE') {
                    setMarketData(message.data);
                    setLoading(false); // 소켓에서 데이터를 받으면 로딩 종료
                }
            } catch (error) {
                console.error('[WebSocket] Failed to parse message:', error);
            }
        };

        socket.onerror = (error) => {
            console.error('[WebSocket] Connection error:', error);
        };

        socket.onclose = (event) => {
            console.log('[WebSocket] Closed:', event.code, event.reason);
        };

        return () => {
            socket.close();
        };
    }, [loadMarketData]);

    // 당겨서 새로고침
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadMarketData();
    }, [loadMarketData]);

    const apiIndexName = (selectedMarket === 'S&P 500' ? 'S&P 500 Index' : 'Nasdaq Index') as ('S&P 500 Index' | 'Nasdaq Index');
    const indexInfo = marketData?.[apiIndexName];

    const chartData = useMemo(() => {
        const base = MOCK_MARKET_INDICES[selectedMarket];
        if (!indexInfo) return base;

        return {
            ...base,
            value: indexInfo.price || base.value,
            changePercent: indexInfo.change_percent || base.changePercent,
        };
    }, [selectedMarket, marketData, indexInfo]);

    const handlePortfolioPress = useCallback(() => {
        if (navigation) {
            navigation.navigate('Portfolio');
        }
    }, [navigation]);

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar barStyle="light-content" />
            <ScrollView
                className="flex-1 px-4"
                contentContainerStyle={{ paddingBottom: 100 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />}
            >
                <View className="mt-4 mb-6">
                    <Text className="text-white text-2xl font-bold">{t('home.dashboard_title')}</Text>
                    <Text className="text-gray-400 text-sm">{t('home.dashboard_subtitle')}</Text>
                </View>

                {loading && !marketData ? (
                    <View className="py-20 items-center justify-center">
                        <ActivityIndicator color="#10B981" />
                    </View>
                ) : (
                    <>
                        <SentimentComparison
                            trendScore={marketData?.fear_greed_index?.value || 78}
                            myScore={45}
                        />

                        <MarketTabs selectedMarket={selectedMarket} onSelect={setSelectedMarket} />

                        <MarketChart data={chartData} />

                        {/* Futures Grid */}
                        <View className="flex-row gap-4 mt-4">
                            <View className="flex-1 bg-card p-4 rounded-2xl border border-gray-800">
                                <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">S&P 500 Futures</Text>
                                <View className="flex-row justify-between items-baseline">
                                    <Text className="text-white font-bold text-lg">
                                        {marketData?.['S&P 500 Futures']?.price?.toLocaleString() || '4,842'}
                                    </Text>
                                    <View className={`px-1.5 py-0.5 rounded ${(marketData?.['S&P 500 Futures']?.change_percent ?? 0) >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                        <Text className={`text-[10px] font-black ${(marketData?.['S&P 500 Futures']?.change_percent ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {(marketData?.['S&P 500 Futures']?.change_percent ?? 0.5) >= 0 ? '+' : ''}{marketData?.['S&P 500 Futures']?.change_percent ?? 0.5}%
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View className="flex-1 bg-card p-4 rounded-2xl border border-gray-800">
                                <Text className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Nasdaq 100 Fut.</Text>
                                <View className="flex-row justify-between items-baseline">
                                    <Text className="text-white font-bold text-lg">
                                        {marketData?.['Nasdaq 100 Futures']?.price?.toLocaleString() || '15,230'}
                                    </Text>
                                    <View className={`px-1.5 py-0.5 rounded ${(marketData?.['Nasdaq 100 Futures']?.change_percent ?? 0) >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                                        <Text className={`text-[10px] font-black ${(marketData?.['Nasdaq 100 Futures']?.change_percent ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {(marketData?.['Nasdaq 100 Futures']?.change_percent ?? 0.8) >= 0 ? '+' : ''}{marketData?.['Nasdaq 100 Futures']?.change_percent ?? 0.8}%
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </>
                )}

                <PortfolioOverview
                    holdings={MOCK_PORTFOLIO}
                    onManagePress={handlePortfolioPress}
                />

                <PortfolioNews news={MOCK_NEWS} />
            </ScrollView>
        </SafeAreaView>
    );
};
