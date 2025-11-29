// lib/products.ts

export type EngineCategory = "industrial" | "power-gen" | "marine";

export interface EngineProduct {
    id: string;
    name: string;
    power: string;
    fuel: string;
    description: string;
    category: EngineCategory;
}

export const CATEGORY_LABEL: Record<EngineCategory, string> = {
    industrial: "산업용",
    "power-gen": "발전용",
    marine: "해양용",
};

export const FEATURED_PRODUCTS: EngineProduct[] = [
    {
        id: "industrial-diesel",
        name: "산업용 디젤 엔진",
        power: "250–1,200 kW",
        fuel: "디젤 / 바이오디젤",
        description:
            "대형 공장, 건설 장비, 압축기 등 고부하 환경에서 안정적인 출력을 제공하는 플래그십 디젤 엔진 라인업입니다.",
        category: "industrial",
    },
    {
        id: "power-gen",
        name: "발전용 엔진",
        power: "500–2,500 kW",
        fuel: "디젤 / 천연가스",
        description:
            "데이터센터, 병원, 공공 인프라를 위한 비상·상용 발전 설비용 엔진으로, 장시간 운전과 뛰어난 연비를 제공합니다.",
        category: "power-gen",
    },
    {
        id: "marine",
        name: "해양·선박용 엔진",
        power: "300–1,800 kW",
        fuel: "중유 / 경유",
        description:
            "어선, 상선, 작업선 등 다양한 선박 환경에서 높은 내구성과 신뢰성을 보장하는 해양용 엔진 솔루션입니다.",
        category: "marine",
    },
];

// 상세 페이지용 헬퍼
export function getProductById(id: string): EngineProduct | undefined {
    return FEATURED_PRODUCTS.find((p) => p.id === id);
}