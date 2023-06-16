module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...require("daisyui").default.tailwind,
  daisyui: {
    themes: ["lofi"], // Disable automatic theme switching
  },
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'arvo': ['Arvo', 'serif'],
        'bitter': ['Bitter', 'serif'],
        'capriola': ['Capriola', 'sans-serif'],
        'courgette': ['Courgette', 'cursive'],
        'creteRound': ['Crete Round', 'serif'],
        'cbGaramond': ['EB Garamond', 'serif'],
        'lato': ['Lato', 'sans-serif'],
        'lobster': ['Lobster', 'cursive'],
        'oswald': ['Oswald', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'barlow' :['Barlow', 'sans-serif'],
        'dMSans' :[ 'DM Sans', 'sans-serif'],
        'merriWeather' : ['Merriweather', 'serif'],
        'openSans' :['Open Sans', 'sans-serif'],
      },
    },
    screens: {
      sm: "360px",
      // => @media (min-width: 576px) { ... }
      md: "769px",
      // => @media (min-width: 768px) { ... }
      lg: "992px",
      // => @media (min-width: 992px) { ... }
      xl: "1200px",
      // => @media (min-width: 1200px) { ... }
      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("daisyui")],
}





