/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: 'smooth',
      },
      colors: {
        // bg color
        primary_color: '#df1388',
        while_color: "#fff",
        // text color
        text_color: '#333',
        text_active_color: '#e30051',
        // 
        blue_color_01: '#0066b3',
        blue_color_02: '#149abc',
        //
        organ_color_01: '#e28336',

        // 

        yellow_color_01: '#ff6',

        //
        gray_bg_color_01: '#f3f3f3'
      }
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '40px',
      '5xl': '48px',
      '6xl': '64px',
    }
  },
  plugins: [],
}