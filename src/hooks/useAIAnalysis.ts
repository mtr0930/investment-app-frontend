import { useState, useRef, useEffect, useCallback } from 'react';
import { Config } from '../config';
import { DiaryAnalyzeResponse } from '../types';

export const useAIAnalysis = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<DiaryAnalyzeResponse | null>(null);
    const [streamingSummary, setStreamingSummary] = useState<string>("");
    const [streamingTickers, setStreamingTickers] = useState<string[]>([]);
    const [streamingScore, setStreamingScore] = useState<number | null>(null);
    const ws = useRef<WebSocket | null>(null);
    const accumulatedData = useRef<string>("");

    const stopAnalysis = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
        }
        setIsAnalyzing(false);
    }, []);

    const extractSummary = (rawJson: string): string => {
        // "ai_summary": " value starts here
        const marker = '"ai_summary"';
        const startIndex = rawJson.indexOf(marker);
        if (startIndex === -1) return "";

        // Find the start of the string value (after colon and opening quote)
        const valueStartIndex = rawJson.indexOf('"', startIndex + marker.length + 1);
        if (valueStartIndex === -1) return "";

        // Content starts right after the opening quote
        const contentStart = valueStartIndex + 1;

        // Find the end quote (ignoring escaped quotes)
        let currentPos = contentStart;
        let summary = "";

        while (currentPos < rawJson.length) {
            const char = rawJson[currentPos];
            if (char === '\\') {
                // Skip the escape char and add the next char
                summary += rawJson[currentPos + 1] || '';
                currentPos += 2;
            } else if (char === '"') {
                // Found the closing quote
                break;
            } else {
                summary += char;
                currentPos += 1;
            }
        }

        return summary;
    };

    const extractTickers = (rawJson: string): string[] => {
        const regex = /"mentioned_tickers"\s*:\s*\[([^\]]*)\]/;
        const match = rawJson.match(regex);
        if (match && match[1]) {
            return match[1]
                .split(',')
                .map(t => t.trim().replace(/"/g, ''))
                .filter(t => t.length > 0);
        }
        return [];
    };

    const extractScore = (rawJson: string): number | null => {
        const regex = /"sentiment_score"\s*:\s*(\d+)/;
        const match = rawJson.match(regex);
        if (match && match[1]) {
            return parseInt(match[1], 10);
        }
        return null;
    };

    const startAnalysis = useCallback((diaryContent: string, prompt?: string) => {
        if (!diaryContent.trim()) return;

        // Reset state
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setStreamingSummary("");
        setStreamingTickers([]);
        setStreamingScore(null);
        accumulatedData.current = "";

        // Close existing connection if any
        if (ws.current) {
            ws.current.close();
        }

        console.log(`[WS] Connecting to AI Analysis: ${Config.AI_WS_URL}`);
        ws.current = new WebSocket(Config.AI_WS_URL);

        ws.current.onopen = () => {
            console.log('[WS] Connected to AI Analysis');
            ws.current?.send(JSON.stringify({
                content: diaryContent,
                prompt: prompt || undefined
            }));
        };

        ws.current.onmessage = (e) => {
            try {
                const message = JSON.parse(e.data);

                if (message.type === 'AI_CHUNK') {
                    accumulatedData.current += message.chunk;

                    // Extract partial summary for streaming effect
                    const partialSummary = extractSummary(accumulatedData.current);
                    if (partialSummary) {
                        setStreamingSummary(partialSummary);
                    }

                    const partialTickers = extractTickers(accumulatedData.current);
                    if (partialTickers.length > 0) {
                        setStreamingTickers(partialTickers);
                    }

                    const partialScore = extractScore(accumulatedData.current);
                    if (partialScore !== null) {
                        setStreamingScore(partialScore);
                    }
                }
                else if (message.type === 'AI_DONE') {
                    console.log('[WS] AI Analysis Done');
                    try {
                        const finalJson = JSON.parse(accumulatedData.current);
                        setAnalysisResult(finalJson);
                        if (finalJson.ai_summary) {
                            setStreamingSummary(finalJson.ai_summary);
                        }
                        if (finalJson.mentioned_tickers) {
                            setStreamingTickers(finalJson.mentioned_tickers);
                        }
                        if (finalJson.sentiment_score !== undefined) {
                            setStreamingScore(finalJson.sentiment_score);
                        }
                    } catch (err) {
                        console.error("[WS] Final JSON parsing error:", err, "Raw content:", accumulatedData.current);
                    }
                    setIsAnalyzing(false);
                    stopAnalysis();
                }
            } catch (err) {
                console.error("[WS] Message parsing error:", err);
            }
        };

        ws.current.onerror = (e: any) => {
            console.error("[WS] WebSocket error:", e.message);
            setIsAnalyzing(false);
            stopAnalysis();
        };

        ws.current.onclose = () => {
            console.log('[WS] AI Analysis connection closed');
            setIsAnalyzing(false);
        };
    }, [stopAnalysis]);

    useEffect(() => {
        return () => {
            stopAnalysis();
        };
    }, [stopAnalysis]);

    return { startAnalysis, stopAnalysis, isAnalyzing, analysisResult, streamingSummary, streamingTickers, streamingScore };
};
