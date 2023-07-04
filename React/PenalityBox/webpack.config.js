const path = require('path');
const createExpoWebpackConfig = require("@expo/webpack-config");

module.exports = function (env, argv) {
  env.mode = "development";
 const config = createExpoWebpackConfig(
    {
      ...env,
      output: {
        publicPath: "/penalitybox/",
        publicUrl: "/penalitybox/",
      },
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "static/media",
              },
            },
          },
        ],
      },
    },
    argv
  );

  return config;
};
