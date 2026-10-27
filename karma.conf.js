const path = require("path");
const fs = require("fs");

if (!process.env.CHROME_BIN && fs.existsSync("/usr/bin/google-chrome")) {
  process.env.CHROME_BIN = "/usr/bin/google-chrome";
}

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine", "webpack"],

    files: [{ pattern: "tests/**/*.spec.js", watched: false }],

    preprocessors: {
      "tests/**/*.spec.js": ["webpack"],
    },

    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env", { targets: { chrome: "120" } }],
                  ["@babel/preset-react", { runtime: "automatic" }],
                ],
                plugins: [["istanbul", { exclude: ["tests/**", "node_modules/**"] }]],
              },
            },
          },
        ],
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname),
          "next/link": path.resolve(__dirname, "tests/mocks/next-link.js"),
        },
      },
    },

    reporters: ["progress", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "html", subdir: "html" }, { type: "text-summary" }, { type: "json-summary", subdir: "." }],
    },

    browsers: ["ChromeHeadlessSinSandbox"],
    customLaunchers: {
      ChromeHeadlessSinSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"],
      },
    },

    client: {
      jasmine: { random: false },
      clearContext: false,
    },

    singleRun: true,
  });
};
