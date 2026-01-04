/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        card: '#1E1E1E',
        primary: '#10B981', // Green
        accent: '#8B5CF6', // Purple
        text: '#FFFFFF',
        'text-dim': '#A1A1AA',
        'trade-up': '#10B981',
        'trade-down': '#EF4444',
      },
    },
  },
  plugins: [],
}
