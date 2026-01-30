import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight, ChevronDown, Smile, Meh, Frown, X } from 'lucide-react-native';
import { Emotion } from '../../types';

interface InvestmentCalendarProps {
    selectedDate: string;
    onDateSelect: (date: string) => void;
    onMonthChange?: (year: number, month: number) => void;
    diaryMarkers: Record<string, Emotion>; // e.g., {'2026-01-05': 'happy'}
}

export const InvestmentCalendar = ({ selectedDate, onDateSelect, onMonthChange, diaryMarkers }: InvestmentCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Start with Jan 2026

    const updateMonth = (newDate: Date) => {
        setCurrentMonth(newDate);
        if (onMonthChange) {
            onMonthChange(newDate.getFullYear(), newDate.getMonth() + 1);
        }
    };
    const [showPicker, setShowPicker] = useState<'month' | 'year' | null>(null);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const years = Array.from({ length: 11 }, (_, i) => 2020 + i); // 2020 ~ 2030

    const handleMonthSelect = (monthIndex: number) => {
        const newDate = new Date(currentMonth);
        newDate.setMonth(monthIndex);
        updateMonth(newDate);
        setShowPicker(null);
    };

    const handleYearSelect = (year: number) => {
        const newDate = new Date(currentMonth);
        newDate.setFullYear(year);
        updateMonth(newDate);
        setShowPicker(null);
    };

    const renderHeader = () => {
        const monthName = months[currentMonth.getMonth()];
        const year = currentMonth.getFullYear();

        return (
            <View className="flex-row items-center justify-between px-4 py-4 mb-2">
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                        onPress={() => setShowPicker(showPicker === 'month' ? null : 'month')}
                        className="flex-row items-center bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800"
                    >
                        <Text className="text-white text-lg font-bold mr-1">{monthName}</Text>
                        <ChevronDown color="#9CA3AF" size={16} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setShowPicker(showPicker === 'year' ? null : 'year')}
                        className="flex-row items-center bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800"
                    >
                        <Text className="text-white text-lg font-bold mr-1">{year}</Text>
                        <ChevronDown color="#9CA3AF" size={16} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row gap-2">
                    <TouchableOpacity
                        onPress={() => updateMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                        className="p-2 bg-gray-900/50 rounded-lg border border-gray-800"
                    >
                        <ChevronLeft color="white" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => updateMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                        className="p-2 bg-gray-900/50 rounded-lg border border-gray-800"
                    >
                        <ChevronRight color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderPicker = () => {
        if (!showPicker) return null;

        return (
            <View className="absolute top-2 left-2 right-2 z-50 bg-[#1a1b2e] rounded-2xl border border-purple-500/30 p-4 shadow-2xl shadow-black">
                <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-800">
                    <Text className="text-purple-300 font-bold uppercase tracking-widest text-xs">
                        Select {showPicker === 'month' ? 'Month' : 'Year'}
                    </Text>
                    <TouchableOpacity onPress={() => setShowPicker(null)}>
                        <X color="#6B7280" size={18} />
                    </TouchableOpacity>
                </View>

                {showPicker === 'month' ? (
                    <View className="flex-row flex-wrap">
                        {months.map((m, idx) => (
                            <TouchableOpacity
                                key={m}
                                style={{ width: '33.33%' }}
                                className={`py-3 px-1 mb-2 rounded-xl items-center ${currentMonth.getMonth() === idx ? 'bg-primary' : 'bg-gray-900/50'
                                    }`}
                                onPress={() => handleMonthSelect(idx)}
                            >
                                <Text className={`text-sm font-medium ${currentMonth.getMonth() === idx ? 'text-white' : 'text-gray-400'
                                    }`}>
                                    {m.substring(0, 3)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
                        <View className="flex-row flex-wrap">
                            {years.map(y => (
                                <TouchableOpacity
                                    key={y}
                                    style={{ width: '33.33%' }}
                                    className={`py-3 px-1 mb-2 rounded-xl items-center ${currentMonth.getFullYear() === y ? 'bg-primary' : 'bg-gray-900/50'
                                        }`}
                                    onPress={() => handleYearSelect(y)}
                                >
                                    <Text className={`text-sm font-medium ${currentMonth.getFullYear() === y ? 'text-white' : 'text-gray-400'
                                        }`}>
                                        {y}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                )}
            </View>
        );
    };

    const renderDaysOfWeek = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <View className="flex-row border-b border-gray-900 pb-2">
                {days.map(day => (
                    <Text key={day} className="flex-1 text-center text-gray-500 text-xs font-bold uppercase tracking-tighter">
                        {day}
                    </Text>
                ))}
            </View>
        );
    };

    const renderCalendarGrid = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const numDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);

        const grid = [];
        // Empty cells for days of previous month
        for (let i = 0; i < startDay; i++) {
            grid.push(<View key={`empty-${i}`} style={{ width: '14.28%' }} className="h-16 p-1" />);
        }

        // Day cells
        for (let day = 1; day <= numDays; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            const emotion = diaryMarkers[dateStr];

            grid.push(
                <View key={day} style={{ width: '14.28%' }} className="h-16 p-1">
                    <TouchableOpacity
                        onPress={() => onDateSelect(dateStr)}
                        activeOpacity={0.7}
                        className={`flex-1 items-center justify-center rounded-2xl relative ${isSelected
                            ? 'bg-primary border border-white/20'
                            : emotion
                                ? 'bg-[#2D1B4E]/40 border border-purple-500/40'
                                : 'bg-card border border-gray-900'
                            }`}
                    >
                        <Text className={`text-base font-bold ${isSelected ? 'text-white' : emotion ? 'text-purple-100' : 'text-gray-500'
                            } -translate-y-1.5`}>
                            {day}
                        </Text>

                        {emotion && (
                            <View className="absolute bottom-1.5">
                                {emotion === 'happy' && <Smile size={10} color="#10B981" />}
                                {emotion === 'sad' && <Frown size={10} color="#EF4444" />}
                                {emotion === 'neutral' && <Meh size={10} color="#EAB308" />}
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            );
        }

        // Fill the rest of the last row
        const totalCellsSoFar = grid.length;
        const remainingCells = (7 - (totalCellsSoFar % 7)) % 7;
        for (let i = 0; i < remainingCells; i++) {
            grid.push(<View key={`empty-end-${i}`} style={{ width: '14.28%' }} className="h-16 p-1" />);
        }

        return (
            <View className="flex-row flex-wrap mt-2">
                {grid}
            </View>
        );
    };

    return (
        <View className="bg-background px-2 pb-6 relative">
            {renderHeader()}
            <View className="relative">
                {renderPicker()}
                {renderDaysOfWeek()}
                {renderCalendarGrid()}
            </View>
        </View>
    );
};
