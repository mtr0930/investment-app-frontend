import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface NewDiaryHeaderProps {
    onBack: () => void;
    onSave: () => void;
}

export const NewDiaryHeader = ({ onBack, onSave }: NewDiaryHeaderProps) => {
    const { t } = useTranslation();
    return (
        <View className="flex-row items-center px-4 py-3 border-b border-gray-900">
            <TouchableOpacity onPress={onBack} className="mr-4">
                <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
            <Text className="text-white text-lg font-bold flex-1 text-center mr-8">{t('new_diary.title')}</Text>
            <TouchableOpacity onPress={onSave} className="bg-[#1a2e25] px-4 py-1.5 rounded-full border border-primary">
                <Text className="text-primary font-bold">{t('common.save')}</Text>
            </TouchableOpacity>
        </View>
    );
};
