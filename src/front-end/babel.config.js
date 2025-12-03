module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@assets': './assets',
            '@hooks': './src/hooks',
            '@theme': './src/theme',
            '@navigation': './src/navigation',
            '@config': './src/config',
            '@utils': './src/utils',
            '@contexts': './src/contexts',
            '@modules': './src/modules',
            '@routes': './src/routes'
          },
        },
      ],
    ],
  };
};
