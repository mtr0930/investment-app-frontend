import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TrendingUp, Send, Calendar, Smile, Meh, Frown } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

import { DiaryDetailHeader } from '../components/diaries/DiaryDetailHeader';
import { AIAnalysisButton } from '../components/newdiary/AIAnalysisButton';
import { diaryApi } from '../services/diaryApi';
import { DiaryAnalyzeResponse } from '../types';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import { AIStreamingLoader } from '../components/common/SkeletonLoader';

export const NewDiaryScreen = () => {
    const { t } = useTranslation();
    const route = useRoute<any>();
    const navigation = useNavigation<any>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [aiResult, setAiResult] = useState<DiaryAnalyzeResponse | null>(null);
    const [aiPrompt, setAiPrompt] = useState('');

    const { startAnalysis, isAnalyzing, analysisResult, streamingSummary, streamingTickers, streamingScore } = useAIAnalysis();

    useEffect(() => {
        if (analysisResult) {
            setAiResult(analysisResult);
            setAiPrompt('');
        }
    }, [analysisResult]);

    // Use date from params, or fallback to today
    const selectedDate = route.params?.date || new Date().toISOString().split('T')[0];

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Error', 'Please enter title and content');
            return;
        }

        Alert.alert(
            '저장하시겠습니까?',
            '작성한 일기를 저장합니다.',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '저장',
                    onPress: async () => {
                        try {
                            await diaryApi.createDiary({
                                title: title.trim(),
                                content: content.trim(),
                                diary_date: selectedDate,
                                ...(aiResult ? {
                                    ai_summary: aiResult.ai_summary,
                                    mentioned_tickers: aiResult.mentioned_tickers,
                                    market_sentiment_score: aiResult.sentiment_score
                                } : {})
                            });

                            Alert.alert('성공', '일기가 저장되었습니다.', [
                                { text: '확인', onPress: () => navigation.goBack() }
                            ]);
                        } catch (error) {
                            console.error('Error saving diary:', error);
                            Alert.alert('Error', 'Failed to save diary');
                        }
                    }
                }
            ]
        );
    };

    const handleAIAnalysis = () => {
        if (!content.trim()) {
            Alert.alert('Info', 'Please write something in the content first');
            return;
        }
        startAnalysis(content, aiPrompt.trim());
    };

    const getScoreEmotion = (score: number | null): 'happy' | 'sad' | 'neutral' => {
        if (score === null) return 'neutral';
        if (score >= 67) return 'happy';
        if (score <= 33) return 'sad';
        return 'neutral';
    };

    const getEmotionIcon = () => {
        const score = isAnalyzing ? streamingScore : (aiResult?.sentiment_score ?? null);
        const emotion = getScoreEmotion(score);

        switch (emotion) {
            case 'happy': return <Smile size={28} color="#10B981" />;
            case 'sad': return <Frown size={28} color="#EF4444" />;
            default: return <Meh size={28} color="#EAB308" />;
        }
    };

    const getEmotionText = () => {
        const score = isAnalyzing ? streamingScore : (aiResult?.sentiment_score ?? null);
        const emotion = getScoreEmotion(score);
        return t(`common.${emotion === 'happy' ? 'greed' : emotion === 'sad' ? 'fear' : 'neutral'}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />
            <DiaryDetailHeader
                onBack={() => navigation.goBack()}
                onEdit={() => { }}
                onDelete={() => { }}
                isEditing={true}
                onSave={handleSave}
                onCancel={() => navigation.goBack()}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 60 }}>
                    {/* Header Section (Date, Emotion, Title) */}
                    <View className="mt-6 mb-8">
                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
                                <Calendar size={14} color="#6B7280" />
                                <Text className="text-gray-400 text-xs ml-2 font-medium">{selectedDate}</Text>
                            </View>
                            <View className="flex-row items-center gap-2">
                                {getEmotionIcon()}
                                <Text className="text-white font-bold text-base">
                                    {getEmotionText()}
                                </Text>
                            </View>
                        </View>

                        <TextInput
                            className="text-white text-3xl font-bold leading-tight border-b border-gray-800 pb-2"
                            placeholder={t('new_diary.title_placeholder')}
                            placeholderTextColor="#4B5563"
                            value={title}
                            onChangeText={setTitle}
                            multiline
                        />
                    </View>

                    {/* AI Section */}
                    <View className="mb-8">
                        <View className="mb-4">
                            <Text className="text-purple-400 font-bold mb-2 text-xs uppercase tracking-wider">{t('common.ai_refine')}</Text>
                            <View className="bg-black/20 rounded-xl border border-purple-500/40 flex-row items-center p-2">
                                <TextInput
                                    className="flex-1 text-gray-200 px-2 py-2"
                                    placeholder={t('common.ai_prompt_placeholder')}
                                    placeholderTextColor="#6B7280"
                                    value={aiPrompt}
                                    onChangeText={setAiPrompt}
                                />
                                <TouchableOpacity
                                    onPress={handleAIAnalysis}
                                    disabled={isAnalyzing || (!aiPrompt && !content)}
                                    className={`p-2 rounded-lg ${isAnalyzing || (!aiPrompt && !content) ? 'bg-gray-800' : 'bg-purple-600'}`}
                                >
                                    <Send size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {(aiResult || isAnalyzing) && (
                            <View className="bg-[#2D1B4E]/40 rounded-2xl p-6 border border-purple-500/30">
                                <View className="flex-row items-center mb-5">
                                    <View className="bg-purple-500/20 p-2 rounded-lg mr-3">
                                        <TrendingUp size={18} color="#A78BFA" />
                                    </View>
                                    <Text className="text-purple-300 font-bold text-base">{t('common.ai_report')}</Text>
                                </View>

                                {isAnalyzing ? (
                                    <View>
                                        {/* Streaming Tickers - Above Summary */}
                                        {streamingTickers.length > 0 && (
                                            <View className="flex-row flex-wrap gap-2 mb-4">
                                                {streamingTickers.map(ticker => (
                                                    <View key={ticker} className="bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                                                        <Text className="text-green-400 text-[10px] font-bold">#{ticker}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                        <Text className="text-gray-100 text-[16px] leading-7 font-medium mb-4">
                                            {streamingSummary}
                                        </Text>

                                        <AIStreamingLoader />
                                    </View>
                                ) : (
                                    <View>
                                        {/* Final Tickers - Above Summary */}
                                        {aiResult?.mentioned_tickers && aiResult.mentioned_tickers.length > 0 && (
                                            <View className="flex-row flex-wrap gap-2 mb-4">
                                                {aiResult.mentioned_tickers.map(ticker => (
                                                    <View key={ticker} className="bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                                                        <Text className="text-green-400 text-[10px] font-bold">#{ticker}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}

                                        <Text className="text-gray-100 text-[16px] leading-7 font-medium">
                                            {aiResult?.ai_summary}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>

                    {/* My Notes Section */}
                    <View className="mb-10">
                        <Text className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">My Notes</Text>
                        <TextInput
                            className="text-gray-300 text-lg leading-8 border border-gray-800 rounded-xl p-4 min-h-[200px] bg-gray-900/30"
                            placeholder={t('new_diary.content_placeholder')}
                            placeholderTextColor="#4B5563"
                            value={content}
                            onChangeText={setContent}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
