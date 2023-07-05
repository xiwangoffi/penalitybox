const path = require('path');
const createExpoWebpackConfig = require("@expo/webpack-config");

module.exports = function (env, argv) {
  env.mode = "development";
  const config = createExpoWebpackConfig(
    {
      ...env,
      modifyWebpackConfig: (expoConfig) => {
        expoConfig.module.rules.push({
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/media",
              publicPath: "/penalitybox/static/media",
            },
          },
        });

        expoConfig.output.publicPath = "/penalitybox/";

        return expoConfig;
      },
    },
    argv
  );

  return config;
};
