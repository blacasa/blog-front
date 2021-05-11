module.exports = {
  assetsDir: "./",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  pwa: {
    name: "13 jeux solo",
    themeColor: "#2c3e50",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "./service-worker.js"
      // ...other Workbox options...
    }
  },
  configureWebpack:{
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  }
};
