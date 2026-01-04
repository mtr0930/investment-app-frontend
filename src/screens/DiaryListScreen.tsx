import { useState } from 'react';
import { View, Text, TextInput, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { DiaryCard } from '../components/DiaryCard';
import { MOCK_DIARIES } from '../data/dummy';

export const DiaryListScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SafeAreaView className="flex-1 bg-background">
            <StatusBar barStyle="light-content" />
            <View className="px-4 pt-4 pb-2">
                <Text className="text-white text-2xl font-bold">Investment Diary</Text>
                <Text className="text-gray-400 text-sm mb-4">Check your past investment records</Text>

                <View className="bg-card rounded-xl px-4 py-3 flex-row items-center border border-gray-800 mb-2">
                    <Search size={20} color="#6B7280" />
                    <TextInput
                        className="flex-1 ml-3 text-white text-base"
                        placeholder="Search title, content, stock..."
                        placeholderTextColor="#6B7280"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={MOCK_DIARIES}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <DiaryCard diary={item} />}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};
