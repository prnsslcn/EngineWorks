// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
// import type { Database } from "./supabase.types"; // 나중에 타입 생성하면 여기에

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경변수 누락 시 바로 에러를 던져서 초기에 문제를 발견하도록
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );
}

/**
 * 브라우저/공개 용 Supabase 클라이언트
 * - anon 키만 사용
 * - RLS 내에서 허용된 데이터만 접근 가능
 */
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // 브라우저에서 굳이 세션 유지할 필요 없으니 끔 (필요하면 true로 변경 가능)
    persistSession: false,
  },
});

/**
 * ✅ 기존 코드 호환용 alias
 * - 예전: import { supabase } from "@/lib/supabaseClient";
 * - 지금: 그대로 둬도 작동, 새 코드는 supabaseClient 사용 권장
 */
export const supabase = supabaseClient;
