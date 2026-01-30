import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

export const SettingsHeader = () => {
    const { t } = useTranslation();

    return (
        <View className="px-4 pt-4 pb-4 border-b border-gray-900">
            <Text className="text-white text-2xl font-bold">{t('settings.title')}</Text>
            <Text className="text-gray-400 text-sm">{t('settings.subtitle')}</Text>
        </View>
    );
};
