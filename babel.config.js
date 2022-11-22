module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ts',
          '.tsx',
          '.jsx',
          '.js',
          '.jsx',
          '.json',
          '.svg',
          '.jpg',
        ],
        alias: {
          components: './src/components',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {moduleName: '@env', path: './.env', envName: 'APP_ENV'},
    ],
  ],
};
