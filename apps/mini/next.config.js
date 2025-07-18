/** @type {import('next').NextConfig} */
const { withTamagui } = require("@tamagui/next-plugin");
const { join } = require("node:path");

const boolVals = {
  true: true,
  false: false,
};

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ??
  process.env.NODE_ENV === "development";

const plugins = [
  withTamagui({
    config: "../../packages/config/src/tamagui.config.ts",
    components: ["tamagui", "@myapp/ui"],
    appDir: true,
    importsWhitelist: ["constants.js", "colors.js"],
    outputCSS:
      process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
    logTimings: true,
    disableExtraction,
    shouldExtract: (path) => {
      if (path.includes(join("packages", "app"))) {
        return true;
      }
    },
    disableThemesBundleOptimize: true,
    excludeReactNativeWebExports: [
      "Switch",
      "ProgressBar",
      "Picker",
      "CheckBox",
      "Touchable",
    ],
  }),
];

module.exports = () => {
  /** @type {import('next').NextConfig} */
  let nextConfig = {
    // Silence warnings
    // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    webpack: (config) => {
      config.externals.push("pino-pretty", "lokijs", "encoding");
      return config;
    },

    typescript: {
      ignoreBuildErrors: true,
    },
    transpilePackages: [
      "solito",
      "react-native-web",
      "expo-linking",
      "expo-constants",
      "expo-modules-core",
    ],

    experimental: {
      scrollRestoration: true,
    },
  };

  for (const plugin of plugins) {
    nextConfig = {
      ...nextConfig,
      ...plugin(nextConfig),
    };
  }

  return nextConfig;
};
