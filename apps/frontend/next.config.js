const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  transpilePackages: ["models"],
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glb$/,
      use: [{ loader: "file-loader", options: { outputPath: "static" } }],
    });
    return config;
  },
});
