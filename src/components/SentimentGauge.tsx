import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);

interface SentimentGaugeProps {
    score: number;
}

const RADIUS = 80;
const STROKE_WIDTH = 12;
const CENTER_X = 100;
const CENTER_Y = 100; // Half circle, but providing space

export const SentimentGauge: React.FC<SentimentGaugeProps> = ({ score }) => {
    // Score 0-100 mapped to 180 (left) - 360/0 (right) degrees. 
    // Actually usually gauges are -180 to 0 (top half).
    // Let's assume standard semi-circle: -180 (left) to 0 (right).

    // Map score 0 -> -180, 100 -> 0.
    const rotation = -180 + (score / 100) * 180;

    const needleRotation = useSharedValue(-180);

    useEffect(() => {
        needleRotation.value = withTiming(rotation, {
            duration: 1000,
            easing: Easing.out(Easing.exp),
        });
    }, [score]);

    // Create the arc path
    // M 20 100 A 80 80 0 0 1 180 100
    // (Assuming center 100,100, radius 80)
    // Start: (20, 100), End: (180, 100).
    const arcPath = `M ${CENTER_X - RADIUS} ${CENTER_Y} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER_X + RADIUS} ${CENTER_Y}`;

    // Needle endpoint calculation (for simple line, or use transform)
    // We'll use SVG transform for the needle group.

    // Reanimated prop for needle rotation
    const animatedProps = useAnimatedProps(() => {
        const angleRad = (needleRotation.value * Math.PI) / 180;
        const x = CENTER_X + (RADIUS - 20) * Math.cos(angleRad);
        const y = CENTER_Y + (RADIUS - 20) * Math.sin(angleRad);
        return {
            x2: x,
            y2: y,
        };
    });

    const getLabel = (s: number) => {
        if (s < 30) return 'Fear';
        if (s < 70) return 'Neutral';
        return 'Greed';
    };

    const label = getLabel(score);
    const color = score < 30 ? '#EF4444' : score < 70 ? '#EAB308' : '#10B981';

    return (
        <View className="items-center justify-center p-4 bg-card rounded-2xl border border-gray-800">
            <View className="flex-row items-center mb-4">
                <Text className="text-white font-bold text-lg">✨ AI Investment Sentiment</Text>
            </View>

            <View className="h-[110px] justify-end overflow-hidden">
                <Svg height="200" width="200" viewBox="0 0 200 110">
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                            <Stop offset="0" stopColor="#EF4444" stopOpacity="1" />
                            <Stop offset="0.5" stopColor="#EAB308" stopOpacity="1" />
                            <Stop offset="1" stopColor="#10B981" stopOpacity="1" />
                        </LinearGradient>
                    </Defs>
                    {/* Background Track (optional) */}
                    <Path d={arcPath} stroke="#333" strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />

                    {/* Colored Arc */}
                    <Path d={arcPath} stroke="url(#grad)" strokeWidth={STROKE_WIDTH} fill="none" strokeLinecap="round" />

                    {/* Needle */}
                    <Circle cx={CENTER_X} cy={CENTER_Y} r="6" fill={color} />
                    <AnimatedLine
                        x1={CENTER_X}
                        y1={CENTER_Y}
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        animatedProps={animatedProps}
                    />
                </Svg>
            </View>

            <View className="items-center mt-2">
                <Text className="text-4xl font-bold text-primary" style={{ color }}>{score}</Text>
                <Text className="text-gray-400 text-sm mt-1">{label}</Text>
            </View>

            <View className="flex-row justify-between w-full px-8 mt-2">
                <Text className="text-gray-600 text-xs">Fear</Text>
                <Text className="text-gray-600 text-xs">Neutral</Text>
                <Text className="text-gray-600 text-xs">Greed</Text>
            </View>

            <View className="mt-4 p-3 bg-gray-900 rounded-lg w-full">
                <Text className="text-gray-300 text-xs text-center">
                    AI analysis indicates current market sentiment is <Text style={{ color }} className="font-bold">{label}</Text>.
                </Text>
            </View>
        </View>
    );
};
