import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HelpCircle, ChevronRight, Plus } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface PortfolioHeaderProps {
    onAdd: () => void;
    totalValue: number;
    currency: 'USD' | 'KRW';
    setCurrency: (currency: 'USD' | 'KRW') => void;
    onAllocationPress?: () => void;
}

const EXCHANGE_RATE = 1350;

export const PortfolioHeader = ({
    onAdd,
    totalValue,
    currency,
    setCurrency,
    onAllocationPress
}: PortfolioHeaderProps) => {
    const { t } = useTranslation();

    const getFormattedValue = (value: number, showDecimal = true) => {
        const val = currency === 'USD' ? value : value * EXCHANGE_RATE;
        const formatted = val.toLocaleString(undefined, {
            minimumFractionDigits: currency === 'USD' && showDecimal ? 2 : 0,
            maximumFractionDigits: currency === 'USD' && showDecimal ? 2 : 0
        });
        return currency === 'USD' ? `$${formatted}` : `${formatted}원`;
    };

    return (
        <View className="px-5 pt-8 pb-4 bg-background">
            <View className="flex-row items-center justify-between mb-10">
                <View>
                    <Text className="text-white text-3xl font-bold">{t('portfolio.title')}</Text>
                    <Text className="text-gray-500 mt-1">{t('portfolio.subtitle')}</Text>
                </View>
                <TouchableOpacity
                    onPress={onAdd}
                    className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center border border-primary/20"
                >
                    <Plus color="#10B981" size={24} />
                </TouchableOpacity>
            </View>

            <View className="mb-12">
                <View className="flex-row justify-between items-start mb-6">
                    <View>
                        <Text className="text-primary text-xs font-bold uppercase tracking-widest mb-2 opacity-80">내 투자 자산</Text>
                        <Text className="text-white text-[42px] font-black tracking-tighter leading-none">
                            {getFormattedValue(totalValue)}
                        </Text>
                    </View>

                    <View className="flex-row bg-gray-900/40 p-1 rounded-full border border-white/5">
                        <TouchableOpacity
                            onPress={() => setCurrency('USD')}
                            className={`px-3 py-1.5 rounded-full ${currency === 'USD' ? 'bg-primary' : ''}`}
                        >
                            <Text className={`text-[10px] font-black ${currency === 'USD' ? 'text-white' : 'text-gray-500'}`}>$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setCurrency('KRW')}
                            className={`px-3 py-1.5 rounded-full ${currency === 'KRW' ? 'bg-primary' : ''}`}
                        >
                            <Text className={`text-[10px] font-black ${currency === 'KRW' ? 'text-white' : 'text-gray-500'}`}>원</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="gap-4">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-500 text-[15px] font-medium">총 수익</Text>
                        <Text className="text-green-400 text-lg font-bold">
                            +{getFormattedValue(1206.90)} (12.3%)
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center gap-1">
                            <Text className="text-gray-500 text-[15px] font-medium">일간 수익</Text>
                            <HelpCircle color="#4B5563" size={14} />
                        </View>
                        <Text className="text-green-400 text-lg font-bold">
                            +{getFormattedValue(878.09)} (5.9%)
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={onAllocationPress}
                className="flex-row items-center justify-between py-6 border-t border-b border-white/5"
            >
                <View className="flex-row items-center gap-4">
                    <View className="w-1.5 h-8 bg-primary rounded-full" />
                    <Text className="text-white text-[18px] font-bold">투자 비중 보기</Text>
                </View>
                <ChevronRight color="#4B5563" size={24} />
            </TouchableOpacity>

            <View className="mt-12 mb-3">
                <Text className="text-gray-500 text-xs font-black uppercase tracking-[3px]">해외주식</Text>
            </View>
        </View>
    );
};
