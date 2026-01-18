import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                terminal: "#00ff41",
                neon: "#bc13fe",
            },
            fontFamily: {
                mono: ["var(--font-mono)", "monospace"],
            },
        },
    },
    plugins: [],
};
export default config;
