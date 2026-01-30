import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface SkeletonLoaderProps {
    width?: number | string;
    height: number;
    borderRadius?: number;
    className?: string;
}

export const SkeletonLoader = ({ width = '100%', height, borderRadius = 8, className = '' }: SkeletonLoaderProps) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <Animated.View
            style={[{ opacity, width: width as any, height: height as any, borderRadius }]}
            className={`bg-purple-500/20 ${className}`}
        />
    );
};

export const AIStreamingLoader = () => {
    return (
        <View className="gap-y-3">
            <SkeletonLoader height={16} width="90%" />
            <SkeletonLoader height={16} width="100%" />
            <SkeletonLoader height={16} width="70%" />
        </View>
    );
};
