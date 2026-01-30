import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MarketTabsProps {
    selectedMarket: 'S&P 500' | 'NASDAQ';
    onSelect: (market: 'S&P 500' | 'NASDAQ') => void;
}

export const MarketTabs = ({ selectedMarket, onSelect }: MarketTabsProps) => {
    return (
        <View className="flex-row mt-6 gap-3">
            {(['S&P 500', 'NASDAQ'] as const).map((market) => (
                <TouchableOpacity
                    key={market}
                    onPress={() => onSelect(market)}
                    className={`flex-1 py-3 items-center justify-center rounded-xl border ${selectedMarket === market ? 'bg-[#1a2e25] border-primary' : 'bg-card border-gray-800'}`}
                >
                    <Text className={`${selectedMarket === market ? 'text-primary font-bold' : 'text-gray-400 font-medium'}`}>
                        {market}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};
