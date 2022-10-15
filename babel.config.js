module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
  // plugins: [
  //   [
  //     'module-resolver',
  //     {
  //       root: ['./src'],
  //       extensions: [
  //         '.ts',
  //         '.tsx',
  //         '.jsx',
  //         '.js',
  //         '.jsx',
  //         '.json',
  //         '.svg',
  //         '.jpg',
  //       ],
  //       alias: {
  //         components: './src/components',
  //       },
  //     },
  //   ],
  // ],
};
