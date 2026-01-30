import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Diary } from '../types';
import { Smile, Meh, Frown, TrendingUp } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface DiaryCardProps {
    diary: Diary;
}

export const DiaryCard: React.FC<DiaryCardProps> = ({ diary }) => {
    const navigation = useNavigation<any>();

    const getIcon = () => {
        switch (diary.emotion) {
            case 'happy': return <Smile size={20} color="#10B981" />;
            case 'sad': return <Frown size={20} color="#EF4444" />;
            default: return <Meh size={20} color="#EAB308" />;
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('DiaryDetail', { diary })}
            className="bg-card rounded-xl p-5 border border-gray-800 mb-4"
        >
            <View className="flex-row justify-between items-start mb-2">
                <View>
                    <View className="flex-row items-center gap-2 mb-1">
                        <Text className="text-white font-bold text-lg">{diary.title}</Text>
                        {getIcon()}
                    </View>
                    <Text className="text-gray-500 text-xs">{diary.diary_date}</Text>
                </View>
            </View>

            <Text className="text-gray-300 text-sm leading-5 mb-4" numberOfLines={2}>
                {diary.content}
            </Text>

            {/* AI Summary Badge */}
            <View className="bg-[#2D1B4E] p-3 rounded-lg border border-purple-900 mb-3 flex-row items-start">
                <TrendingUp size={14} color="#A78BFA" style={{ marginRight: 8, marginTop: 2 }} />
                <Text className="text-purple-300 text-sm font-medium flex-1">{diary.ai_summary}</Text>
            </View>

            {/* Tags */}
            <View className="flex-row gap-2">
                {diary.mentioned_tickers.map(ticker => (
                    <View key={ticker} className="bg-gray-900 px-2 py-1 rounded-full border border-gray-700">
                        <Text className="text-primary text-xs font-bold">{ticker}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};
