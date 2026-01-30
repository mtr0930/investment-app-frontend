import React from 'react';
import { View, Text } from 'react-native';
import { NewsCard } from '../NewsCard';
import { News } from '../../types';
import { Newspaper } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface PortfolioNewsProps {
    news: News[];
}

export const PortfolioNews = ({ news }: PortfolioNewsProps) => {
    const { t } = useTranslation();
    return (
        <View className="mt-8">
            <View className="flex-row items-center gap-2 mb-3">
                <Newspaper size={20} color="#60A5FA" />
                <Text className="text-white text-lg font-bold">{t('home.portfolio_news')}</Text>
            </View>
            {news.map(item => (
                <NewsCard key={item.id} news={item} />
            ))}
        </View>
    );
};
