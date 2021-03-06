const path = require("path");
const merge = require("webpack-merge");

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        _c: path.resolve(__dirname, "src/components/"),
        _request: path.resolve(__dirname, "src/libs/http/api.request.js")
      }
    }
  },
  chainWebpack: config => {
    const ofs = ["vue-modules", "vue", "normal-modules", "normal"];
    const scssRules = config.module.rule("scss");
    const cssRules = config.module.rule("css");
    const postRules = config.module.rule("postcss");

    const addSassResourcesLoader = (rules, type) => {
      rules
        .oneOf(type)
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: "./src/assets/style/scss/_variable.scss" // your resource file or patterns
        });
    };
    ofs.forEach(type => {
      addSassResourcesLoader(cssRules, type);
      addSassResourcesLoader(scssRules, type);
      addSassResourcesLoader(postRules, type);
    });
    return config;
  }
};
