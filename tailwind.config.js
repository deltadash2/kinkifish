/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./MyComponents/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "blog-image1":
          'url("/assets/images/2acf347881ff223c3aa44f835182f4fd.png")',
        "blog-image2":
          'url("/assets/images/975c38a88a0ebcce53f6e2791c344561.png")',
        "blog-image3":
          'url("/assets/images/2836d011ee46272832d354c9582873d8.png")',
        tiktokimage1:
          'url("/assets/images/d6817c6638a3763c1dad6eaab51442ce.png")',
        tiktokimage2:
          'url("/assets/images/7af54a6d9f77a0e14de5272c823f982f.png")',
        tiktokimage3:
          'url("/assets/images/5648ef30de333c8d324b55c7610b8c7d.png")',
        customizeVideoImg:
          'url("/assets/images/4f614aa77b5ef8ed1cae8ec61a3dba88.png")',
        customizeAddVideoImg: 'url("/assets/images/1536.png")',
        bgVideoPlayImg:
          'url("/assets/images/play-button-icon-png-18927-removebg-preview.png")',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
