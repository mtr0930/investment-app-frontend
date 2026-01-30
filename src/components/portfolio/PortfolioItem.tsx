import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PortfolioHolding } from '../../types';
import { useTranslation } from 'react-i18next';

interface PortfolioItemProps {
    holding: PortfolioHolding;
    onDelete: (id: string) => void;
    currency: 'USD' | 'KRW';
}

const EXCHANGE_RATE = 1350;

export const PortfolioItem = ({ holding, onDelete, currency }: PortfolioItemProps) => {
    const { t } = useTranslation();
    const isPositive = holding.totalGain >= 0;

    const formatVal = (val: number, showDecimal = true) => {
        const converted = currency === 'USD' ? val : val * EXCHANGE_RATE;
        const formatted = converted.toLocaleString(undefined, {
            minimumFractionDigits: currency === 'USD' && showDecimal ? 2 : 0,
            maximumFractionDigits: currency === 'USD' && showDecimal ? 2 : 0
        });
        return currency === 'USD' ? `$${formatted}` : `${formatted}원`;
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-5 border-b border-white/5 bg-background"
        >
            <View className="flex-row items-center flex-1">
                {/* Ticker Initial Logo */}
                <View className="w-12 h-12 bg-card rounded-2xl items-center justify-center mr-4 border border-gray-800">
                    <Text className="text-primary font-bold text-lg">
                        {holding.ticker[0]}
                    </Text>
                </View>

                {/* Ticker and Shares */}
                <View>
                    <Text className="text-white text-[17px] font-bold mb-1">{holding.name}</Text>
                    <Text className="text-gray-500 text-sm font-medium">{holding.shares}주</Text>
                </View>
            </View>

            {/* Market Value and Gain/Loss */}
            <View className="items-end">
                <Text className="text-white text-[17px] font-bold mb-1">
                    {formatVal(holding.marketValue)}
                </Text>
                <Text className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? '+' : ''}{formatVal(holding.totalGain)} ({holding.gainPercent.toFixed(1)}%)
                </Text>
            </View>
        </TouchableOpacity>
    );
};
