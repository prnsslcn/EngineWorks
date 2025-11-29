// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경변수 누락 시 바로 에러를 던져서 초기에 문제를 발견하도록
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
}

// 타입을 엄격하게 쓰고 싶으면 Database 타입을 생성해서 제네릭으로 넣을 수 있음
export const supabase = createClient(supabaseUrl, supabaseAnonKey);