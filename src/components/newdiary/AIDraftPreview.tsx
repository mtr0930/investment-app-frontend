import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Sparkles, Check, X, RotateCcw } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface AIDraftPreviewProps {
    draft: string;
    onApply: () => void;
    onDismiss: () => void;
    onRegenerate: () => void;
}

export const AIDraftPreview = ({ draft, onApply, onDismiss, onRegenerate }: AIDraftPreviewProps) => {
    const { t } = useTranslation();

    return (
        <View className="mt-6 bg-[#1a1b2e] rounded-2xl border border-purple-500/40 overflow-hidden">
            <View className="flex-row items-center justify-between px-4 py-3 bg-purple-900/20 border-b border-purple-500/20">
                <View className="flex-row items-center">
                    <Sparkles size={16} color="#A78BFA" />
                    <Text className="text-purple-300 font-bold ml-2">{t('common.ai_report')}</Text>
                </View>
                <TouchableOpacity onPress={onDismiss}>
                    <X size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>

            <View className="p-4">
                <Text className="text-gray-200 text-base leading-6 mb-4">
                    {draft}
                </Text>

                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={onApply}
                        className="flex-1 bg-purple-600 py-3 rounded-xl flex-row items-center justify-center"
                    >
                        <Check size={18} color="white" />
                        <Text className="text-white font-bold ml-2">적용하기 (Apply)</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onRegenerate}
                        className="w-12 bg-gray-900 items-center justify-center rounded-xl border border-gray-800"
                    >
                        <RotateCcw size={18} color="#6B7280" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
