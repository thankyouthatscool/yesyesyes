import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "inertiion",
  slug: "inertiion",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.ozahnitko.inertiion",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    API_URL: process.env.API_URL,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    ENV: process.env.ENV,
    eas: {
      projectId: "8bc63a5b-3b3b-4880-a1bb-dd406383ea51",
    },
  },
  runtimeVersion: {
    policy: "sdkVersion",
  },
  updates: {
    url: "https://u.expo.dev/8bc63a5b-3b3b-4880-a1bb-dd406383ea51",
  },
  plugins: [
    [
      "expo-image-picker",
      {
        photoPermission: "The app need to access the pictures, please.",
      },
    ],
  ],
});
