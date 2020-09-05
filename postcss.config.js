module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("@fullhuman/postcss-purgecss")({
      content: [
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./public/index.html",
        "./src/**/*.css",
      ],
      defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
    }),
  ],
};
