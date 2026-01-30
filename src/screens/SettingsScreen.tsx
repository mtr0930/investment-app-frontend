import React, { useState } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SettingsHeader } from '../components/settings/SettingsHeader';
import { LanguageSelector } from '../components/settings/LanguageSelector';

import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
    const { i18n } = useTranslation();

    const handleLanguageChange = (lang: 'ko' | 'en') => {
        i18n.changeLanguage(lang);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />
            <SettingsHeader />
            <ScrollView className="flex-1">
                <LanguageSelector
                    currentLanguage={i18n.language as 'ko' | 'en'}
                    onSelect={handleLanguageChange}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
