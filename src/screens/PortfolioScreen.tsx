import React, { useMemo, useState } from 'react';
import { FlatList, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PortfolioHeader } from '../components/portfolio/PortfolioHeader';
import { PortfolioItem } from '../components/portfolio/PortfolioItem';
import { MOCK_PORTFOLIO } from '../data/dummy';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Briefcase, Plus } from 'lucide-react-native';

export const PortfolioScreen = () => {
    const navigation = useNavigation<any>();
    const { t } = useTranslation();
    const [currency, setCurrency] = useState<'USD' | 'KRW'>('USD');

    const totalValue = useMemo(() => {
        return MOCK_PORTFOLIO.reduce((sum, item) => sum + item.marketValue, 0);
    }, []);

    const handleAdd = () => {
        navigation.navigate('StockSearch');
    };

    const handleDelete = (id: string) => {
        console.log('Delete holding:', id);
    };

    return (
        <SafeAreaView className="flex-1 bg-background" edges={['top']}>
            <StatusBar barStyle="light-content" />

            <FlatList
                data={MOCK_PORTFOLIO}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <PortfolioHeader
                        onAdd={handleAdd}
                        totalValue={totalValue}
                        currency={currency}
                        setCurrency={setCurrency}
                        onAllocationPress={() => navigation.navigate('PortfolioAllocation')}
                    />
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center py-20 px-8">
                        <View className="w-24 h-24 bg-gray-900/50 rounded-full items-center justify-center mb-6 border border-white/5">
                            <Briefcase color="#1F2937" size={48} />
                        </View>
                        <Text className="text-gray-400 text-xl font-bold text-center mb-2">{t('portfolio.empty_portfolio')}</Text>
                        <Text className="text-gray-600 text-sm text-center leading-5 px-4">
                            보유 중인 종목을 추가하여 자산 가치를 추적하고 투자 일기와 연동해보세요.
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View className="px-5">
                        <PortfolioItem
                            holding={item}
                            onDelete={handleDelete}
                            currency={currency}
                        />
                    </View>
                )}
                ListFooterComponent={
                    <View className="px-5 mt-4">
                        <TouchableOpacity
                            onPress={handleAdd}
                            className="flex-row items-center gap-3 py-4"
                        >
                            <View className="w-12 h-12 rounded-full bg-gray-900 items-center justify-center border border-dashed border-gray-700">
                                <Plus color="#6B7280" size={24} />
                            </View>
                            <Text className="text-gray-400 text-base font-bold">주식 추가하기</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </SafeAreaView>
    );
};
