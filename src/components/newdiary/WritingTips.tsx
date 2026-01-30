import React from 'react';
import { View, Text } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export const WritingTips = () => {
    const { t } = useTranslation();
    return (
        <View className="mt-6 bg-[#0F172A] p-4 rounded-xl border border-blue-900/30">
            <View className="flex-row items-center mb-2">
                <Lightbulb size={18} color="#FDBA74" />
                <Text className="text-blue-200 font-bold ml-2">{t('new_diary.writing_tips')}</Text>
            </View>
            <View className="gap-2 pl-1">
                <Text className="text-gray-400 text-xs">• {t('new_diary.tip_1')}</Text>
                <Text className="text-gray-400 text-xs">• {t('new_diary.tip_2')}</Text>
                <Text className="text-gray-400 text-xs">• {t('new_diary.tip_3')}</Text>
            </View>
        </View>
    );
};
