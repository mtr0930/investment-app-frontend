import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { MarketIndex } from '../types';

interface MarketChartProps {
    data: MarketIndex;
    selected?: boolean;
}

const { width } = Dimensions.get('window');

export const MarketChart: React.FC<MarketChartProps> = ({ data, selected }) => {
    const color = data.changePercent >= 0 ? '#10B981' : '#EF4444';

    return (
        <View className="bg-card rounded-2xl p-4 border border-gray-800 mt-4">
            <View className="mb-4">
                <Text className="text-gray-400 text-sm font-medium">{data.name}</Text>
                <View className="flex-row items-end gap-2">
                    <Text className="text-white text-2xl font-bold">
                        {data.value.toLocaleString()}
                    </Text>
                    <Text style={{ color }} className="text-sm mb-1 font-medium">
                        {data.changePercent > 0 ? '+' : ''}{data.changePercent}%
                    </Text>
                </View>
            </View>

            <LineChart.Provider data={data.chartData}>
                <LineChart height={120} width={width - 64}>
                    <LineChart.Path color={color} width={3}>
                        <LineChart.Gradient color={color} />
                    </LineChart.Path>
                    <LineChart.CursorCrosshair color={color} />
                </LineChart>
            </LineChart.Provider>

            {/* X Axis Labels Mock */}
            <View className="flex-row justify-between mt-2 px-2">
                <Text className="text-gray-600 text-xs">01/01</Text>
                <Text className="text-gray-600 text-xs">01/03</Text>
                <Text className="text-gray-600 text-xs">01/05</Text>
                <Text className="text-gray-600 text-xs">01/07</Text>
            </View>
        </View>
    );
};
