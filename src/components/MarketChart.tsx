import React, { useState, useMemo } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-wagmi-charts';
import { MarketIndex } from '../types';

interface MarketChartProps {
    data: MarketIndex;
    selected?: boolean;
}

const { width } = Dimensions.get('window');
const TIME_RANGES = ['1D', '1W', '1M', '3M', '1Y', 'All'];

// Keep this outside to avoid re-creation
const ChartCore = React.memo(({ chartData, color }: { chartData: any[], color: string }) => {
    if (!chartData || chartData.length === 0) return null;

    return (
        <View className="items-center" style={{ height: 160 }}>
            <LineChart.Provider data={chartData}>
                <LineChart height={160} width={width - 80}>
                    <LineChart.Path color={color} width={3}>
                        <LineChart.Gradient color={color} />
                    </LineChart.Path>
                </LineChart>
            </LineChart.Provider>
        </View>
    );
});

export const MarketChart = ({ data }: MarketChartProps) => {
    const [selectedRange, setSelectedRange] = useState('1M');

    const color = useMemo(() => (data.changePercent || 0) >= 0 ? '#10B981' : '#EF4444', [data.changePercent]);
    const chartData = useMemo(() => data.chartData || [], [data.chartData]);

    return (
        <View className="bg-card rounded-[24px] p-6 border border-gray-800/50 mt-4 shadow-sm">
            <View className="flex-row justify-between items-start mb-6">
                <View>
                    <Text className="text-gray-500 text-xs font-black uppercase tracking-widest mb-1">{data.name}</Text>
                    <View className="flex-row items-baseline gap-2">
                        <Text className="text-white text-3xl font-black tracking-tight">
                            {(data.value || 0).toLocaleString()}
                        </Text>
                        <View className={`px-2 py-0.5 rounded-md ${(data.changePercent || 0) >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                            <Text style={{ color }} className="text-xs font-bold">
                                {(data.changePercent || 0) > 0 ? '+' : ''}{data.changePercent || 0}%
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            <ChartCore chartData={chartData} color={color} />

            {/* Time Range Selector */}
            <View className="flex-row justify-between mt-8 bg-gray-900/40 p-1.5 rounded-xl border border-white/5">
                {TIME_RANGES.map((range) => {
                    const isActive = selectedRange === range;
                    return (
                        <TouchableOpacity
                            key={range}
                            onPress={() => setSelectedRange(range)}
                            className="px-4 py-2 rounded-lg"
                            style={{ backgroundColor: isActive ? '#1F2937' : 'transparent' }}
                        >
                            <Text
                                className="text-[11px] font-black"
                                style={{ color: isActive ? '#10B981' : '#6B7280' }}
                            >
                                {range}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};
