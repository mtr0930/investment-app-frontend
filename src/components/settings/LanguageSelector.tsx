import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Languages, Check } from 'lucide-react-native';

interface LanguageSelectorProps {
    currentLanguage: 'ko' | 'en';
    onSelect: (lang: 'ko' | 'en') => void;
}

import { useTranslation } from 'react-i18next';

export const LanguageSelector = ({ currentLanguage, onSelect }: LanguageSelectorProps) => {
    const { t } = useTranslation();
    const languages = [
        { code: 'ko', label: '한국어 (Korean)', flag: '🇰🇷' },
        { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    ];

    return (
        <View className="mt-6 px-4">
            <View className="flex-row items-center mb-4 gap-2">
                <Languages size={20} color="#10B981" />
                <Text className="text-white text-lg font-bold">{t('settings.language_title')}</Text>
            </View>

            <View className="bg-card rounded-2xl border border-gray-800 overflow-hidden">
                {languages.map((lang, index) => (
                    <TouchableOpacity
                        key={lang.code}
                        onPress={() => onSelect(lang.code as 'ko' | 'en')}
                        className={`flex-row items-center justify-between p-4 ${index !== languages.length - 1 ? 'border-b border-gray-800' : ''}`}
                    >
                        <View className="flex-row items-center gap-3">
                            <Text className="text-xl">{lang.flag}</Text>
                            <Text className={`text-base ${currentLanguage === lang.code ? 'text-white font-bold' : 'text-gray-400'}`}>
                                {lang.label}
                            </Text>
                        </View>
                        {currentLanguage === lang.code && (
                            <Check size={20} color="#10B981" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
            <Text className="text-gray-500 text-xs mt-3 px-1">
                {t('settings.language_footer')}
            </Text>
        </View>
    );
};
