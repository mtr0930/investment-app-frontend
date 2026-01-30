import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

interface AIAnalysisButtonProps {
    onPress: () => void;
    isLoading?: boolean;
}

export const AIAnalysisButton = ({ onPress, isLoading }: AIAnalysisButtonProps) => {
    const { t } = useTranslation();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isLoading) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 0.85,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isLoading, pulseAnim]);

    return (
        <TouchableOpacity
            className="mt-6 active:opacity-90"
            onPress={onPress}
            disabled={isLoading}
        >
            <Animated.View style={{ transform: [{ scale: pulseAnim }], opacity: isLoading ? 0.8 : 1 }}>
                <LinearGradient
                    colors={isLoading ? ['#6D28D9', '#4C1D95'] : ['#7E22CE', '#3B0764']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="py-4 rounded-xl items-center flex-row justify-center border border-purple-500/30 shadow-lg shadow-purple-500/20"
                >
                    <Text className="text-white font-bold text-lg">
                        {isLoading ? `✨ ${t('common.analyzing')}...` : `✨ ${t('common.analyze')}`}
                    </Text>
                </LinearGradient>
            </Animated.View>
        </TouchableOpacity>
    );
};
