import React from 'react';
import { View, Text } from 'react-native';
import { News } from '../types';

interface NewsCardProps {
    news: News;
}

export const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    return (
        <View className="bg-card rounded-xl p-4 border border-gray-800 mb-3">
            <Text className="text-white font-semibold text-base mb-2 leading-6">{news.title}</Text>
            <View className="flex-row justify-between items-center mt-1">
                <View className="flex-row items-center">
                    <Text className="text-gray-500 text-xs mr-2">{news.source}</Text>
                    <Text className="text-gray-600 text-xs">•  {news.timeAgo}</Text>
                </View>
                {news.relatedTicker && (
                    <View className="bg-gray-900 px-2 py-1 rounded border border-gray-700">
                        <Text className="text-primary text-xs font-bold">{news.relatedTicker}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};
