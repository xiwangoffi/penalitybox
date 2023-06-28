const createExpoWebpackConfig = require("@expo/webpack-config");

module.exports = function (env, argv) {
  env.mode = "development";
  const config = createExpoWebpackConfig(env, argv);

  /*
  // Ajout de la règle pour les fichiers d'images
  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/media",
        },
      },
    ],
  });

  // Ajout de la règle pour les fichiers de polices de caractères
  config.module.rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    use: ["file-loader"],
  }); 
  */

  return config;
};
