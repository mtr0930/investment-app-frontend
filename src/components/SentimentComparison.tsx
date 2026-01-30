import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

interface SentimentGaugeProps {
    score: number;
    label: string;
    description: string;
}

const RADIUS = 70; // Slightly smaller to fit two
const STROKE_WIDTH = 10;
const CENTER_X = 90;
const CENTER_Y = 90;

import { useTranslation } from 'react-i18next';

const Gauge = ({ score, label: gaugeLabel, description }: SentimentGaugeProps) => {
    const { t } = useTranslation();
    // Standard semi-circle: -180 (left) to 0 (right).
    const rotation = -180 + (score / 100) * 180;
    const needleRotation = useSharedValue(-180);

    useEffect(() => {
        needleRotation.value = withTiming(rotation, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
        });
    }, [score]);

    const arcPath = `M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER_X + RADIUS} ${CENTER_Y}`;

    const animatedProps = useAnimatedProps(() => {
        const angleRad = (needleRotation.value * Math.PI) / 180;
        const x = CENTER_X + (RADIUS - 20) * Math.cos(angleRad);
        const y = CENTER_Y + (RADIUS - 20) * Math.sin(angleRad);
        return {
            x2: x,
            y2: y,
        };
    });

    const getSentimentLabel = (s: number) => {
        if (s < 20) return t('common.extreme_fear');
        if (s < 40) return t('common.fear');
        if (s < 60) return t('common.neutral');
        if (s < 80) return t('common.greed');
        return t('common.extreme_greed');
    };

    const sentimentText = getSentimentLabel(score);
    const color = score < 40 ? '#EF4444' : score < 60 ? '#EAB308' : '#10B981';

    return (
        <View className="items-center flex-1">
            <Text className="text-gray-300 font-bold mb-2 text-sm">{gaugeLabel}</Text>

            <View className="h-[90px] justify-end overflow-hidden">
                <Svg height={CENTER_Y} width={CENTER_X * 2} viewBox={`0 0 ${CENTER_X * 2} ${CENTER_Y + 10}`}>
                    <Defs>
                        <LinearGradient id={`grad-${gaugeLabel}`} x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor="#EF4444" stopOpacity="1" />
                            <Stop offset="0.5" stopColor="#EAB308" stopOpacity="1" />
                            <Stop offset="1" stopColor="#10B981" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    <Path d={arcPath} stroke="#333" strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />
                    <Path d={arcPath} stroke={`url(#grad-${gaugeLabel})`} strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />

                    <Circle cx={CENTER_X} cy={CENTER_Y} r="5" fill={color} />
                    <AnimatedLine
                        x1={CENTER_X}
                        y1={CENTER_Y}
                        stroke={color}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        animatedProps={animatedProps}
                    />
                </Svg>
            </View>

            <View className="items-center mt-1">
                <Text className="text-3xl font-bold" style={{ color }}>{score}</Text>
                <Text className="text-gray-400 text-xs">{sentimentText}</Text>
            </View>
        </View>
    );
};

export const SentimentComparison = ({ trendScore, myScore }: { trendScore: number, myScore: number }) => {
    const { t } = useTranslation();
    return (
        <View className="bg-card rounded-2xl p-4 border border-gray-800">
            <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white font-bold text-lg">💡 {t('home.sentiment_title')}</Text>
            </View>

            <View className="flex-row justify-between">
                <Gauge
                    score={trendScore}
                    label={t('home.cnn_label')}
                    description="Market Sentiment"
                />
                <View className="w-[1px] bg-gray-800 mx-2 h-32 self-center" />
                <Gauge
                    score={myScore}
                    label={t('home.my_label')}
                    description="Based on your diaries"
                />
            </View>

            <View className="mt-6 bg-primary/5 p-4 rounded-[20px] border border-primary/10">
                <Text className="text-primary/90 text-[13px] text-center font-medium leading-[20px]">
                    {trendScore > myScore
                        ? "현재 시장은 당신보다 더 탐욕적입니다. 냉정한 판단이 필요한 시점이에요."
                        : "당신은 시장보다 더 낙관적입니다. 자신의 주관을 믿고 포트폴리오를 유지해보세요."}
                </Text>
            </View>
        </View>
    );
};
