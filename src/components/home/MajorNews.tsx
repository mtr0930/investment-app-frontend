import React from 'react';
import { View, Text } from 'react-native';
import { NewsCard } from '../NewsCard';
import { News } from '../../types';

interface MajorNewsProps {
    news: News[];
}

export const MajorNews = ({ news }: MajorNewsProps) => {
    return (
        <View className="mt-8">
            <Text className="text-white text-lg font-bold mb-3">Major News</Text>
            {news.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
        </View>
    );
};
