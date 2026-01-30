import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface DiaryHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const DiaryHeader = ({ searchQuery, setSearchQuery }: DiaryHeaderProps) => {
    const { t } = useTranslation();
    return (
        <View className="px-4 pt-4 pb-2">
            <Text className="text-white text-2xl font-bold">{t('diaries.title')}</Text>
            <Text className="text-gray-400 text-sm mb-4">{t('diaries.subtitle')}</Text>

            <View className="bg-card rounded-xl px-4 py-3 flex-row items-center border border-gray-800 mb-2">
                <Search size={20} color="#6B7280" />
                <TextInput
                    className="flex-1 ml-3 text-white text-base"
                    placeholder={t('diaries.search_placeholder')}
                    placeholderTextColor="#6B7280"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
        </View>
    );
};
