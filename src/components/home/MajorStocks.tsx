import React from 'react';
import { View, Text } from 'react-native';
import { StockCard } from '../StockCard';
import { Stock } from '../../types';

interface MajorStocksProps {
    stocks: Stock[];
}

export const MajorStocks = ({ stocks }: MajorStocksProps) => {
    return (
        <View className="mt-8">
            <Text className="text-white text-lg font-bold mb-3">Today's Major Stocks</Text>
            <View className="flex-row flex-wrap justify-between">
                {stocks.map(stock => (
                    <StockCard key={stock.ticker} stock={stock} />
                ))}
            </View>
        </View>
    );
};
