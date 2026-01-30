// 로컬 개발 시 PC의 IP 주소를 입력하세요.
const HOST = '192.168.219.100';

const ENV = {
    local: {
        API_BASE: `http://${HOST}:8000`,
        WS_BASE: `ws://${HOST}:8000`,
    },
    dev: {
        API_BASE: 'https://dev-api.example.com',
        WS_BASE: 'wss://dev-api.example.com',
    },
    prod: {
        API_BASE: 'https://api.example.com',
        WS_BASE: 'wss://api.example.com',
    },
};

const activeEnv = ENV.local; // 필요 시 dev나 prod로 변경

export const Config = {
    API_URL: activeEnv.API_BASE,
    WS_URL: `${activeEnv.WS_BASE}/ws/market-summary`,
    AI_WS_URL: `${activeEnv.WS_BASE}/ws/ai-analyze`,
};
