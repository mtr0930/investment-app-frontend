import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Plus, BookOpen } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { DiaryHeader } from '../components/diaries/DiaryHeader';
import { DiaryCard } from '../components/DiaryCard';
import { InvestmentCalendar } from '../components/diaries/InvestmentCalendar';
import { diaryApi } from '../services/diaryApi';
import { Diary, Emotion } from '../types';

export const DiaryListScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<any>();
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const [monthlySummary, setMonthlySummary] = useState<Record<string, Emotion>>({});
    const [isLoading, setIsLoading] = useState(false);

    // Initial and focus-based fetch
    const fetchDiaries = useCallback(async () => {
        setIsLoading(true);
        try {
            const params = searchQuery ? { q: searchQuery } : { diary_date: selectedDate };
            const data = await diaryApi.getDiaries(params);
            setDiaries(data);
        } catch (error) {
            console.error('Error fetching diaries:', error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedDate, searchQuery]);

    const fetchMonthlySummary = useCallback(async (year?: number, month?: number) => {
        try {
            const now = new Date();
            const y = year || now.getFullYear();
            const m = month || now.getMonth() + 1;
            const data = await diaryApi.getMonthlySummary(y, m);
            setMonthlySummary(data);
        } catch (error) {
            console.error('Error fetching summary:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchDiaries();
            fetchMonthlySummary();
        }, [fetchDiaries, fetchMonthlySummary])
    );

    const hasDiaryOnSelectedDate = diaries.length > 0;

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />

            <DiaryHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Calendar Core UI */}
                <InvestmentCalendar
                    selectedDate={selectedDate}
                    onDateSelect={(date) => {
                        setSelectedDate(date);
                        setSearchQuery(''); // Clear search when picking date
                    }}
                    onMonthChange={fetchMonthlySummary}
                    diaryMarkers={monthlySummary}
                />

                {/* Selected Date Diary List */}
                <View className="px-4 mt-6 pb-20">
                    <Text className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">
                        {searchQuery ? t('diaries.search_results') : `${selectedDate} ${t('diaries.records')}`}
                    </Text>

                    {diaries.map(diary => (
                        <DiaryCard key={diary.id} diary={diary} />
                    ))}

                    {!hasDiaryOnSelectedDate && !searchQuery && (
                        <View className="items-center py-12 bg-card/30 rounded-3xl border border-gray-900 border-dashed">
                            <View className="w-16 h-16 bg-gray-900 rounded-full items-center justify-center mb-4">
                                <BookOpen size={32} color="#4B5563" />
                            </View>
                            <Text className="text-gray-400 text-base mb-6">{t('diaries.no_record')}</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('NewDiaryStack', { date: selectedDate })}
                                className="bg-primary flex-row items-center px-6 py-3 rounded-full"
                            >
                                <Plus size={20} color="white" />
                                <Text className="text-white font-bold ml-2">{t('new_diary.title')}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
