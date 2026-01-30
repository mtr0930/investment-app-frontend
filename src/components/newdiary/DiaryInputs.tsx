import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

interface DiaryInputsProps {
    title: string;
    setTitle: (text: string) => void;
    content: string;
    setContent: (text: string) => void;
}

export const DiaryInputs = ({ title, setTitle, content, setContent }: DiaryInputsProps) => {
    const { t } = useTranslation();
    return (
        <View className="mt-6">
            <Text className="text-gray-500 mb-2">{t('new_diary.title_placeholder')}</Text>
            <TextInput
                className="text-white text-xl font-bold border-b border-gray-800 pb-2 mb-6"
                placeholder={t('new_diary.title_placeholder')}
                placeholderTextColor="#4B5563"
                value={title}
                onChangeText={setTitle}
            />

            <View className="bg-card rounded-2xl p-4 min-h-[250px] border border-gray-800">
                <TextInput
                    className="text-white text-base leading-6"
                    placeholder={t('new_diary.content_placeholder')}
                    placeholderTextColor="#4B5563"
                    multiline
                    textAlignVertical="top"
                    value={content}
                    onChangeText={setContent}
                    style={{ minHeight: 200 }}
                />
            </View>
        </View>
    );
};
