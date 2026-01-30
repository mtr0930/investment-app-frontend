import { Config } from '../config';
import {
    Diary,
    DiaryCreateRequest,
    DiaryAnalyzeRequest,
    DiaryAnalyzeResponse,
    DiarySummaryResponse
} from '../types';

const BASE_URL = `${Config.API_URL}/api/diaries`;

export const diaryApi = {
    // 1. 일기 목록 조회
    getDiaries: async (params?: { date?: string; q?: string }): Promise<Diary[]> => {
        const query = new URLSearchParams(params as any).toString();
        const url = `${BASE_URL}${query ? `?${query}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch diaries');
        return response.json();
    },

    // 2. 일기 상세 조회
    getDiaryById: async (id: string): Promise<Diary> => {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch diary detail');
        return response.json();
    },

    // 3. 일기 등록
    createDiary: async (data: DiaryCreateRequest): Promise<Diary> => {
        console.log('[API] Creating diary with payload:', JSON.stringify(data, null, 2));
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create diary');
        return response.json();
    },

    // 4. 일기 수정
    updateDiary: async (id: string, data: Partial<DiaryCreateRequest>): Promise<Diary> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update diary');
        return response.json();
    },

    // 5. 일기 삭제
    deleteDiary: async (id: string): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete diary');
    },

    // 6. 월별 요약 조회
    getMonthlySummary: async (year: number, month: number): Promise<DiarySummaryResponse> => {
        const response = await fetch(`${BASE_URL}/summary?year=${year}&month=${month}`);
        if (!response.ok) throw new Error('Failed to fetch summary');
        return response.json();
    },

    // 7. AI 분석 요청
    analyzeDiary: async (data: DiaryAnalyzeRequest): Promise<DiaryAnalyzeResponse> => {
        const response = await fetch(`${BASE_URL}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to analyze diary');
        return response.json();
    }
};
