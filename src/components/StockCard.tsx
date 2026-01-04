import React from 'react';
import { View, Text } from 'react-native';
import { Stock } from '../types';

interface StockCardProps {
    stock: Stock;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
    const isPositive = stock.changePercent >= 0;
    const color = isPositive ? '#10B981' : '#EF4444';
    const bg = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';

    return (
        <View className="bg-card rounded-xl p-4 border border-gray-800 flex-1 min-w-[45%] m-1">
            <View className="flex-row justify-between items-start mb-2">
                <View>
                    <Text className="text-white font-bold text-lg">{stock.ticker}</Text>
                    <Text className="text-gray-400 text-xs">{stock.name}</Text>
                </View>
                <View style={{ backgroundColor: bg }} className="px-2 py-1 rounded-full">
                    <Text style={{ color }} className="text-xs font-bold">
                        {isPositive ? '↗' : '↘'} {Math.abs(stock.changePercent)}%
                    </Text>
                </View>
            </View>
            <Text className="text-white font-bold text-xl mt-2">${stock.price.toFixed(2)}</Text>
        </View>
    );
};
