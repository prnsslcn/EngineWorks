// lib/products.ts
import { supabase } from "./supabaseClient";

export type EngineCategory = "industrial" | "power-gen" | "marine";

export interface EngineProduct {
    id: number;
    slug: string;
    name: string;
    category: EngineCategory;
    power: string;
    fuel: string;
    description_md: string;
    is_published: boolean;
}

export const CATEGORY_LABEL: Record<EngineCategory, string> = {
    industrial: "산업용 엔진",
    "power-gen": "발전용 엔진",
    marine: "해양 엔진",
};

/** 전체 제품 목록 조회 */
export async function fetchAllProducts(): Promise<EngineProduct[]> {
    const { data, error } = await supabase
        .from("engine_product")
        .select(
            "id, slug, name, category, power, fuel, description_md, is_published"
        )
        .eq("is_published", true)
        .order("id", { ascending: true });

    if (error) {
        console.error("[products] failed to fetch:", error.message);
        return [];
    }

    return (data ?? []) as EngineProduct[];
}

/** slug 기준 단일 제품 조회 */
export async function fetchProductBySlug(
    slug: string
): Promise<EngineProduct | null> {
    const { data, error } = await supabase
        .from("engine_product")
        .select(
            "id, slug, name, category, power, fuel, description_md, is_published"
        )
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

    if (error) {
        console.error("[products] failed to fetch by slug:", error.message);
        return null;
    }

    return data as EngineProduct;
}