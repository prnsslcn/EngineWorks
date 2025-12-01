// lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";
// import type { Database } from "./supabase.types"; // 타입 추가 예정이면 여기

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 🔒 안전장치: 브라우저에서 잘못 import하면 바로 터지게
if (typeof window !== "undefined") {
  throw new Error(
    "supabaseServer (service role client) must not be imported/used in the browser.",
  );
}

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
  );
}

/**
 * 서버(Admin)용 Supabase 클라이언트
 * - Service Role Key 사용
 * - RLS를 무시하고 전체 행 접근 가능
 * - 반드시 서버에서만 사용해야 함
 */
export const supabaseServer = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
  },
});
