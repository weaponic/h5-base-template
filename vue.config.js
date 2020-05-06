const path = require("path");
const webpack = require("webpack");
const resolve = (dir) => path.join(__dirname, dir);

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  indexPath: "index.html",
  publicPath: isDev ? "/" : "./",
  assetsDir: "static",
  outputDir: "dist",
  filenameHashing: true,
  productionSourceMap: false,
  parallel: require("os").cpus().length > 1,
  css: {
    sourceMap: isDev,
  },
  pluginOptions: {
    // less全局变量配置
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/styles/global.less")],
    },
  },
  configureWebpack: {
    // 参考webpack配置
    optimization: {},
    plugins: [new webpack.optimize.SplitChunksPlugin()],
  },
  chainWebpack: (config) => {
    // 一些常用路径的alias
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("pages", resolve("src/views"))
      .set("scripts", resolve("src/scripts"))
      .set("styles", resolve("src/styles"));
  },
  devServer: {
    // 服务代理
    proxy: {
      "/{{contextPath}}": {
        target: "{{ url }}",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
