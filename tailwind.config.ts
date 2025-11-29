// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ew: {
                    navy: "#041f45",
                    navyDark: "#020f24",
                    accent: "#38bdf8",
                    muted: "#64748b",
                },
            },
            boxShadow: {
                "ew-card": "0 18px 45px rgba(15,23,42,0.45)",
            },
        },
    },
} satisfies Config;