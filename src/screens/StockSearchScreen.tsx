import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Modal, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Search, Plus, TrendingUp, Clock, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

// Expanded mock data for search
const GLOBAL_STOCKS = [
    { ticker: 'NVDA', name: 'Nvidia Corporation', price: '485.20', change: '+3.2%' },
    { ticker: 'TSLA', name: 'Tesla, Inc.', price: '248.48', change: '-1.2%' },
    { ticker: 'AAPL', name: 'Apple Inc.', price: '192.53', change: '+0.4%' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', price: '374.07', change: '+1.1%' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '141.80', change: '+0.8%' },
    { ticker: 'AMZN', name: 'Amazon.com, Inc.', price: '145.24', change: '+1.5%' },
    { ticker: 'META', name: 'Meta Platforms Inc.', price: '334.22', change: '+2.1%' },
    { ticker: 'UNH', name: 'UnitedHealth Group', price: '542.10', change: '-0.3%' },
    { ticker: 'V', name: 'Visa Inc.', price: '256.40', change: '+0.6%' },
    { ticker: 'XOM', name: 'Exxon Mobil Corp.', price: '102.30', change: '-1.5%' },
];

export const StockSearchScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [selectedStock, setSelectedStock] = useState<any>(null);
    const [avgPrice, setAvgPrice] = useState('');
    const [shares, setShares] = useState('');

    const filteredStocks = GLOBAL_STOCKS.filter(stock =>
        stock.ticker.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelectStock = (stock: any) => {
        setSelectedStock(stock);
        setAvgPrice(stock.price);
    };

    const handleConfirmAdd = () => {
        // In a real app, this would update global state/API
        console.log('Adding stock to portfolio:', {
            ticker: selectedStock.ticker,
            avgPrice: parseFloat(avgPrice),
            shares: parseFloat(shares)
        });
        setSelectedStock(null);
        navigation.goBack();
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar barStyle="light-content" />

            {/* Header with Search Input */}
            <View className="px-4 py-3 flex-row items-center gap-3">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>

                <View className="flex-1 bg-gray-900 rounded-2xl flex-row items-center px-4 border border-gray-800">
                    <Search color="#6B7280" size={18} />
                    <TextInput
                        className="flex-1 h-12 text-white ml-2 text-base"
                        placeholder={t('diaries.search_placeholder')}
                        placeholderTextColor="#6B7280"
                        value={query}
                        onChangeText={setQuery}
                        autoFocus
                    />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {query === '' ? (
                    <View className="px-4 mt-4">
                        {/* Recent Searches / Trends */}
                        <View className="mb-8">
                            <View className="flex-row items-center mb-4">
                                <Clock color="#6B7280" size={16} />
                                <Text className="text-gray-400 font-bold ml-2 text-xs uppercase tracking-widest">Recent Searches</Text>
                            </View>
                            <View className="flex-row flex-wrap gap-2">
                                {['NVDA', 'TSLA', 'AAPL'].map(item => (
                                    <TouchableOpacity
                                        key={item}
                                        onPress={() => setQuery(item)}
                                        className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-800"
                                    >
                                        <Text className="text-gray-300">{item}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View>
                            <View className="flex-row items-center mb-4">
                                <TrendingUp color="#10B981" size={16} />
                                <Text className="text-gray-400 font-bold ml-2 text-xs uppercase tracking-widest">Trending Now</Text>
                            </View>
                            {GLOBAL_STOCKS.slice(0, 5).map((stock) => (
                                <StockSearchItem
                                    key={stock.ticker}
                                    stock={stock}
                                    onSelect={() => handleSelectStock(stock)}
                                />
                            ))}
                        </View>
                    </View>
                ) : (
                    <View className="px-4 mt-2">
                        {filteredStocks.length > 0 ? (
                            filteredStocks.map((stock) => (
                                <StockSearchItem
                                    key={stock.ticker}
                                    stock={stock}
                                    onSelect={() => handleSelectStock(stock)}
                                />
                            ))
                        ) : (
                            <View className="items-center py-20">
                                <Text className="text-gray-500 text-lg">No stocks found</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            {/* Modal for entering asset details */}
            <Modal
                visible={!!selectedStock}
                transparent
                animationType="slide"
                onRequestClose={() => setSelectedStock(null)}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    className="flex-1 justify-end bg-black/60"
                >
                    <View className="bg-[#1A1B2E] rounded-t-[40px] p-6 pb-12 border-t border-purple-500/30 shadow-2xl shadow-purple-500/20">
                        <View className="flex-row justify-between items-center mb-8">
                            <View className="flex-row items-center gap-4">
                                <View className="w-12 h-12 bg-primary/20 rounded-2xl items-center justify-center border border-primary/30">
                                    <Text className="text-primary font-bold text-lg">{selectedStock?.ticker[0]}</Text>
                                </View>
                                <View>
                                    <Text className="text-white font-bold text-xl">{selectedStock?.ticker}</Text>
                                    <Text className="text-gray-500">{selectedStock?.name}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setSelectedStock(null)} className="p-2 bg-gray-900 rounded-full">
                                <X color="#6B7280" size={20} />
                            </TouchableOpacity>
                        </View>

                        <View className="gap-6">
                            <View>
                                <Text className="text-purple-300 font-bold text-xs uppercase tracking-widest mb-2 ml-1">
                                    {t('portfolio.avg_price')} (USD)
                                </Text>
                                <View className="bg-gray-900/50 rounded-2xl border border-gray-800 px-4">
                                    <TextInput
                                        className="h-14 text-white text-lg font-medium"
                                        keyboardType="decimal-pad"
                                        value={avgPrice.toString()}
                                        onChangeText={setAvgPrice}
                                        placeholder="0.00"
                                        placeholderTextColor="#4B5563"
                                    />
                                </View>
                            </View>

                            <View>
                                <Text className="text-purple-300 font-bold text-xs uppercase tracking-widest mb-2 ml-1">
                                    {t('portfolio.shares')}
                                </Text>
                                <View className="bg-gray-900/50 rounded-2xl border border-gray-800 px-4">
                                    <TextInput
                                        className="h-14 text-white text-lg font-medium"
                                        keyboardType="decimal-pad"
                                        value={shares}
                                        onChangeText={setShares}
                                        placeholder="0"
                                        placeholderTextColor="#4B5563"
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleConfirmAdd}
                            disabled={!avgPrice || !shares}
                            className={`mt-10 h-16 rounded-2xl items-center justify-center shadow-lg shadow-emerald-500/20 ${(!avgPrice || !shares) ? 'bg-gray-800' : 'bg-primary'
                                }`}
                        >
                            <Text className="text-white font-bold text-lg">{t('portfolio.add_holding')}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
};

const StockSearchItem = ({ stock, onSelect }: { stock: any, onSelect: () => void }) => (
    <TouchableOpacity
        onPress={onSelect}
        className="flex-row items-center justify-between py-4 border-b border-gray-900"
    >
        <View className="flex-row items-center gap-4">
            <View className="w-12 h-12 bg-gray-900 rounded-2xl items-center justify-center border border-gray-800">
                <Text className="text-primary font-bold text-xs">{stock.ticker[0]}</Text>
            </View>
            <View>
                <Text className="text-white font-bold text-base">{stock.ticker}</Text>
                <Text className="text-gray-500 text-xs">{stock.name}</Text>
            </View>
        </View>

        <View className="flex-row items-center gap-4">
            <View className="items-end">
                <Text className="text-white font-medium">${stock.price}</Text>
                <Text className={stock.change.startsWith('+') ? "text-green-400 text-xs" : "text-red-400 text-xs"}>
                    {stock.change}
                </Text>
            </View>
            <View className="w-8 h-8 bg-primary/20 rounded-full items-center justify-center border border-primary/30">
                <Plus color="#10B981" size={18} />
            </View>
        </View>
    </TouchableOpacity>
);
