import React from 'react';
import { View, Text } from 'react-native';
import { Diary } from '../types';
import { Smile, Meh, Frown, TrendingUp } from 'lucide-react-native';

interface DiaryCardProps {
    diary: Diary;
}

export const DiaryCard: React.FC<DiaryCardProps> = ({ diary }) => {
    const getIcon = () => {
        switch (diary.emotion) {
            case 'happy': return <Smile size={20} color="#10B981" />;
            case 'sad': return <Frown size={20} color="#EF4444" />;
            default: return <Meh size={20} color="#EAB308" />;
        }
    };

    return (
        <View className="bg-card rounded-xl p-5 border border-gray-800 mb-4">
            <View className="flex-row justify-between items-start mb-2">
                <View>
                    <View className="flex-row items-center gap-2 mb-1">
                        <Text className="text-white font-bold text-lg">{diary.title}</Text>
                        {getIcon()}
                    </View>
                    <Text className="text-gray-500 text-xs">{diary.date}</Text>
                </View>
            </View>

            <Text className="text-gray-300 text-sm leading-5 mb-4" numberOfLines={2}>
                {diary.preview}
            </Text>

            {/* AI Summary Badge */}
            <View className="bg-[#2D1B4E] p-3 rounded-lg border border-purple-900 mb-3 flex-row items-center">
                <TrendingUp size={14} color="#A78BFA" style={{ marginRight: 6 }} />
                <Text className="text-purple-300 text-sm font-medium">{diary.aiSummary}</Text>
            </View>

            {/* Tags */}
            <View className="flex-row gap-2">
                {diary.relatedStocks.map(ticker => (
                    <View key={ticker} className="bg-gray-900 px-2 py-1 rounded-full border border-gray-700">
                        <Text className="text-primary text-xs font-bold">{ticker} ↗ +3.2%</Text>
                        {/* Hardcoded percentage for visual parity with screenshot */}
                    </View>
                ))}
            </View>
        </View>
    );
};
