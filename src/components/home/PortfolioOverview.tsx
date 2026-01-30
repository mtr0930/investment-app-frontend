import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Briefcase } from 'lucide-react-native';
import { PortfolioCard } from '../PortfolioCard';
import { PortfolioHolding } from '../../types';
import { useTranslation } from 'react-i18next';

interface PortfolioOverviewProps {
    holdings: PortfolioHolding[];
    onManagePress?: () => void;
}

export const PortfolioOverview = ({ holdings, onManagePress }: PortfolioOverviewProps) => {
    const { t } = useTranslation();

    return (
        <View className="mt-8">
            <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                    <Briefcase size={20} color="#10B981" />
                    <Text className="text-white text-lg font-bold">{t('portfolio.title')}</Text>
                </View>
                <TouchableOpacity onPress={onManagePress}>
                    <Text className="text-primary text-sm font-medium">{t('common.manage')}</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap justify-between">
                {holdings.slice(0, 4).map(holding => (
                    <PortfolioCard key={holding.id} holding={holding} />
                ))}
            </View>
        </View>
    );
};
