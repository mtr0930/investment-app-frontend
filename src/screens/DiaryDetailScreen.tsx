import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Smile, Meh, Frown, TrendingUp, Calendar, Send } from 'lucide-react-native';
import { DiaryDetailHeader } from '../components/diaries/DiaryDetailHeader';
import { AIAnalysisButton } from '../components/newdiary/AIAnalysisButton';
import { Diary } from '../types';
import { useTranslation } from 'react-i18next';

import { diaryApi } from '../services/diaryApi';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import { AIStreamingLoader } from '../components/common/SkeletonLoader';

export const DiaryDetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { t } = useTranslation();
    const { diary: initialDiary } = route.params as { diary: Diary };

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialDiary.title);
    const [content, setContent] = useState(initialDiary.content);
    const [aiSummary, setAiSummary] = useState(initialDiary.ai_summary);
    const [aiPrompt, setAiPrompt] = useState('');
    const [mentionedTickers, setMentionedTickers] = useState(initialDiary.mentioned_tickers);
    const [sentimentScore, setSentimentScore] = useState(initialDiary.market_sentiment_score);

    const { startAnalysis, isAnalyzing, analysisResult, streamingSummary, streamingTickers, streamingScore } = useAIAnalysis();

    useEffect(() => {
        if (analysisResult) {
            setAiSummary(analysisResult.ai_summary);
            setMentionedTickers(analysisResult.mentioned_tickers);
            setSentimentScore(analysisResult.sentiment_score);
            setAiPrompt('');
        }
    }, [analysisResult]);

    const getScoreEmotion = (score: number | null): 'happy' | 'sad' | 'neutral' => {
        if (score === null) return 'neutral';
        if (score >= 67) return 'happy';
        if (score <= 33) return 'sad';
        return 'neutral';
    };

    const getIcon = () => {
        const score = isAnalyzing ? streamingScore : (sentimentScore ?? null);
        const emotion = getScoreEmotion(score);

        switch (emotion) {
            case 'happy': return <Smile size={28} color="#10B981" />;
            case 'sad': return <Frown size={28} color="#EF4444" />;
            default: return <Meh size={28} color="#EAB308" />;
        }
    };

    const getEmotionText = () => {
        const score = isAnalyzing ? streamingScore : (sentimentScore ?? null);
        const emotion = getScoreEmotion(score);

        switch (emotion) {
            case 'happy': return t('common.greed');
            case 'sad': return t('common.fear');
            default: return t('common.neutral');
        }
    };

    const handleDelete = () => {
        Alert.alert(
            t('common.delete_title'),
            t('common.delete_message'),
            [
                { text: t('common.cancel'), style: 'cancel' },
                {
                    text: t('common.delete'),
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await diaryApi.deleteDiary(initialDiary.id);
                            navigation.goBack();
                        } catch (error) {
                            console.error('Error deleting diary:', error);
                            Alert.alert('Error', 'Failed to delete diary');
                        }
                    }
                }
            ]
        );
    };

    const handleReAnalyze = () => {
        if (!aiPrompt.trim() || isAnalyzing) return;
        startAnalysis(content, aiPrompt.trim());
    };

    const handleSave = async () => {
        Alert.alert(
            '수정하시겠습니까?',
            '변경사항을 저장합니다.',
            [
                { text: '취소', style: 'cancel' },
                {
                    text: '저장',
                    onPress: async () => {
                        try {
                            await diaryApi.updateDiary(initialDiary.id, {
                                title,
                                content,
                                ai_summary: aiSummary,
                                mentioned_tickers: mentionedTickers,
                                market_sentiment_score: sentimentScore,
                            });
                            setIsEditing(false);
                            Alert.alert('성공', '수정되었습니다.');
                        } catch (error) {
                            console.error('Error updating diary:', error);
                            Alert.alert('Error', 'Failed to update diary');
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />
            <DiaryDetailHeader
                onBack={() => navigation.goBack()}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
                isEditing={isEditing}
                onSave={handleSave}
                onCancel={() => {
                    setIsEditing(false);
                    setTitle(initialDiary.title);
                    setContent(initialDiary.content);
                }}
            />

            <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Header Section */}
                <View className="mt-6 mb-8">
                    <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center bg-gray-900 px-3 py-1.5 rounded-full border border-gray-800">
                            <Calendar size={14} color="#6B7280" />
                            <Text className="text-gray-400 text-xs ml-2 font-medium">{initialDiary.diary_date}</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            {getIcon()}
                            <Text className="text-white font-bold text-base">{getEmotionText()}</Text>
                        </View>
                    </View>

                    {isEditing ? (
                        <TextInput
                            className="text-white text-3xl font-bold leading-tight border-b border-gray-800 pb-2"
                            value={title}
                            onChangeText={setTitle}
                            multiline
                        />
                    ) : (
                        <Text className="text-white text-3xl font-bold leading-tight">{title}</Text>
                    )}
                </View>

                {/* AI Section (Prompt + Report) */}
                <View className="mb-8">
                    {/* Prompt Input - Top when editing */}
                    {isEditing && (
                        <View className="mb-4">
                            <Text className="text-purple-400 font-bold mb-2 text-xs uppercase tracking-wider">{t('common.ai_refine')}</Text>
                            <View className="bg-black/20 rounded-xl border border-purple-500/40 flex-row items-center p-2">
                                <TextInput
                                    className="flex-1 text-gray-200 px-2 py-2"
                                    placeholder={t('common.ai_prompt_placeholder')}
                                    placeholderTextColor="#6B7280"
                                    value={aiPrompt}
                                    onChangeText={setAiPrompt}
                                    multiline={false}
                                />
                                <TouchableOpacity
                                    onPress={handleReAnalyze}
                                    disabled={isAnalyzing || !aiPrompt}
                                    className={`p-2 rounded-lg ${isAnalyzing || !aiPrompt ? 'bg-gray-800' : 'bg-purple-600'}`}
                                >
                                    <Send size={16} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* AI Analysis Report Box */}
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
                                {mentionedTickers && mentionedTickers.length > 0 && (
                                    <View className="flex-row flex-wrap gap-2 mb-4">
                                        {mentionedTickers.map(ticker => (
                                            <View key={ticker} className="bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                                                <Text className="text-green-400 text-[10px] font-bold">#{ticker}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                <Text className="text-gray-100 text-[16px] leading-7 font-medium">
                                    {aiSummary}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Content Section (My Notes) */}
                <View className="mb-10">
                    <Text className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-xs">My Notes</Text>
                    {isEditing ? (
                        <TextInput
                            className="text-gray-300 text-lg leading-8 border border-gray-800 rounded-xl p-4 min-h-[200px] bg-gray-900/30"
                            value={content}
                            onChangeText={setContent}
                            multiline
                            textAlignVertical="top"
                        />
                    ) : (
                        <Text className="text-gray-300 text-lg leading-8">
                            {content}
                        </Text>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};
