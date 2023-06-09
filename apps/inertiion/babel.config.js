module.exports = function (api) {
  api.cache(true);

  return {
    env: { production: { plugins: ["react-native-paper/babel"] } },
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@components": "./components",
            "@hooks": "./hooks",
            "@screens": "./screens",
            "@store": "./store",
            "@theme": "./theme",
            "@types": "./types",
            "@utils": "./utils",
          },
        },
      ],
    ],
    presets: ["babel-preset-expo"],
  };
};
