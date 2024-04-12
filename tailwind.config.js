/** @type {import('tailwindcss').Config} */
import { colors } from "./src/styles/colors";
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily: {
        light: ["Poppins_300Light"],
        regular: ["Poppins_400Regular"],
        medium: ["Poppins_500Medium"],
        semibold: ["Poppins_600SemiBold"],
      },
    },
  },
  plugins: [],
};
