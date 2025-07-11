module.exports = (api) => {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { jsxRuntime: "automatic" }]],
    plugins: [
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: ["../.."],
          alias: {
            // define aliases to shorten the import paths
            app: "../../packages/app",
            "@myapp/ui": "../../packages/ui",
          },
          extensions: [".js", ".jsx", ".tsx", ".ios.js", ".android.js"],
        },
      ],
      // if you want reanimated support
      // 'react-native-reanimated/plugin',
      ...(process.env.EAS_BUILD_PLATFORM === "android"
        ? []
        : [
            [
              "@tamagui/babel-plugin",
              {
                components: ["@myapp/ui", "tamagui"],
                config: "../../packages/config/src/tamagui.config.ts",
                logTimings: true,
                disableExtraction: process.env.NODE_ENV === "development",
              },
            ],
          ]),
    ],
  };
};
