import React from 'react';
import { View, Text } from 'react-native';
import { PortfolioHolding } from '../types';

interface PortfolioCardProps {
    holding: PortfolioHolding;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ holding }) => {
    const isPositive = holding.gainPercent >= 0;
    const color = isPositive ? '#10B981' : '#EF4444';
    const bg = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

    return (
        <View className="bg-card rounded-2xl p-4 border border-gray-800/50 flex-1 min-w-[45%] m-1">
            <View className="flex-row justify-between items-start mb-1">
                <Text className="text-white font-bold text-lg">{holding.ticker}</Text>
                <View style={{ backgroundColor: bg }} className="px-2 py-0.5 rounded-md">
                    <Text style={{ color }} className="text-[10px] font-bold">
                        {isPositive ? '+' : ''}{holding.gainPercent.toFixed(1)}%
                    </Text>
                </View>
            </View>

            <View className="flex-row items-baseline gap-1 mt-2">
                <Text className="text-white font-bold text-lg">${holding.currentPrice.toFixed(2)}</Text>
            </View>

            <View className="mt-2 pt-2 border-t border-white/5">
                <Text className="text-gray-500 text-[10px] uppercase font-bold tracking-tighter">
                    {holding.shares} Shares
                </Text>
            </View>
        </View>
    );
};
