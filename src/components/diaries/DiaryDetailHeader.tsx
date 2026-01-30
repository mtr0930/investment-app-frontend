import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Edit3, Trash2, Check, X } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface DiaryDetailHeaderProps {
    onBack: () => void;
    onEdit: () => void;
    onDelete: () => void;
    isEditing?: boolean;
    onSave?: () => void;
    onCancel?: () => void;
}

export const DiaryDetailHeader = ({ onBack, onEdit, onDelete, isEditing, onSave, onCancel }: DiaryDetailHeaderProps) => {
    const { t } = useTranslation();

    return (
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-900">
            <TouchableOpacity onPress={isEditing ? onCancel : onBack} className="p-2 -ml-2">
                {isEditing ? <X color="#9CA3AF" size={24} /> : <ArrowLeft color="white" size={24} />}
            </TouchableOpacity>

            <View className="flex-row items-center gap-2">
                {isEditing ? (
                    <TouchableOpacity onPress={onSave} className="bg-primary px-4 py-1.5 rounded-full">
                        <Text className="text-white font-bold">{t('common.save')}</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        <TouchableOpacity onPress={onEdit} className="p-2 bg-gray-900 rounded-full border border-gray-800">
                            <Edit3 color="#10B981" size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onDelete} className="p-2 bg-gray-900 rounded-full border border-gray-800">
                            <Trash2 color="#EF4444" size={20} />
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};
