import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Lightbulb } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export const NewDiaryScreen = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-background">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <View className="flex-row items-center px-4 py-3 border-b border-gray-900">
                    <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-bold flex-1 text-center mr-8">New Diary</Text>
                    <TouchableOpacity className="bg-[#1a2e25] px-4 py-1.5 rounded-full border border-primary">
                        <Text className="text-primary font-bold">Save</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-4 pt-6">
                    <Text className="text-gray-500 mb-2">Enter Title</Text>
                    <TextInput
                        className="text-white text-xl font-bold border-b border-gray-800 pb-2 mb-6"
                        placeholder="Today's investment thought..."
                        placeholderTextColor="#4B5563"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <View className="bg-card rounded-2xl p-4 min-h-[250px] border border-gray-800">
                        <TextInput
                            className="text-white text-base leading-6"
                            placeholder="Write your thoughts freely...\n\nEx: 'NVDA AI chip demand is increasing. Jensen's vision is impressive.'"
                            placeholderTextColor="#4B5563"
                            multiline
                            textAlignVertical="top"
                            value={content}
                            onChangeText={setContent}
                            style={{ minHeight: 200 }}
                        />
                    </View>

                    <TouchableOpacity className="mt-6 active:opacity-90">
                        <LinearGradient
                            colors={['#7E22CE', '#3B0764']} // Purple gradients
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className="py-4 rounded-xl items-center flex-row justify-center border border-purple-500/30"
                        >
                            <Text className="text-white font-bold text-lg mr-2">✨ Analyze with AI</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <View className="mt-6 bg-[#0F172A] p-4 rounded-xl border border-blue-900/30">
                        <View className="flex-row items-center mb-2">
                            <Lightbulb size={18} color="#FDBA74" />
                            <Text className="text-blue-200 font-bold ml-2">Writing Tips</Text>
                        </View>
                        <View className="gap-2 pl-1">
                            <Text className="text-gray-400 text-xs">• Mention stock tickers (AAPL, TSLA) for auto-tagging</Text>
                            <Text className="text-gray-400 text-xs">• Be honest about your reasons and emotions</Text>
                            <Text className="text-gray-400 text-xs">• It helps for future review</Text>
                        </View>
                    </View>
                    <View className="h-20" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};
