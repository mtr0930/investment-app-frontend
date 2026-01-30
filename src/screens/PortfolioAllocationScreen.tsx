import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { G, Circle } from 'react-native-svg';
import { MOCK_PORTFOLIO } from '../data/dummy';

const COLORS = ['#3B82F6', '#10B981', '#FBBF24', '#F97316', '#A855F7'];

export const PortfolioAllocationScreen = () => {
    const navigation = useNavigation();

    const totalValue = useMemo(() => {
        return MOCK_PORTFOLIO.reduce((sum, item) => sum + item.marketValue, 0);
    }, []);

    const allocationData = useMemo(() => {
        return MOCK_PORTFOLIO.map((item, index) => ({
            ...item,
            percentage: (item.marketValue / totalValue) * 100,
            color: COLORS[index % COLORS.length]
        })).sort((a, b) => b.marketValue - a.marketValue);
    }, [totalValue]);

    // Donut Chart logic
    const radius = 80;
    const strokeWidth = 50;
    const center = 110;
    const circumference = 2 * Math.PI * radius;

    let accumulatedPercentage = 0;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View className="px-4 py-4 flex-row items-center">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
                    <ChevronLeft color="white" size={28} />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 px-6">
                <View className="mt-4 mb-10">
                    <Text className="text-gray-400 text-sm font-medium mb-1">총 금액</Text>
                    <Text className="text-white text-4xl font-black">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Text>
                </View>

                {/* Donut Chart */}
                <View className="items-center justify-center mb-16">
                    <Svg width={220} height={220} viewBox="0 0 220 220">
                        <G rotation="-90" origin="110, 110">
                            {allocationData.map((item, index) => {
                                const strokeDashoffset = circumference - (item.percentage / 100) * circumference;
                                const rotation = (accumulatedPercentage / 100) * 360;
                                accumulatedPercentage += item.percentage;

                                return (
                                    <Circle
                                        key={item.id}
                                        cx={center}
                                        cy={center}
                                        r={radius}
                                        stroke={item.color}
                                        strokeWidth={strokeWidth}
                                        strokeDasharray={`${circumference} ${circumference}`}
                                        strokeDashoffset={strokeDashoffset}
                                        fill="transparent"
                                        transform={`rotate(${rotation}, ${center}, ${center})`}
                                    />
                                );
                            })}
                            {/* Inner Circle to make it look like a donut */}
                            <Circle
                                cx={center}
                                cy={center}
                                r={radius - strokeWidth / 2 + 1}
                                fill="#000000"
                            />
                        </G>
                    </Svg>
                </View>

                {/* Legend List */}
                <View className="gap-6 pb-10">
                    {allocationData.map((item) => (
                        <View key={item.id} className="flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                                <View
                                    style={{ backgroundColor: item.color }}
                                    className="w-4 h-4 rounded-[4px] mr-4"
                                />
                                <View>
                                    <Text className="text-white text-[17px] font-bold mb-0.5">{item.name}</Text>
                                    <Text className="text-gray-500 text-sm font-medium">${item.marketValue.toLocaleString()}</Text>
                                </View>
                            </View>
                            <Text className="text-gray-400 text-[17px] font-bold">
                                {item.percentage.toFixed(1)}%
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
