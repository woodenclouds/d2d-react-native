module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app/assets': './src/assets',
          '@app/components': './src/components',
          '@app/config': './src/config',
          '@app/constants': './src/constants',
          '@app/contexts': './src/contexts',
          '@app/hooks': './src/hooks',
          '@app/navigations': './src/navigations',
          '@app/redux': './src/redux',
          '@app/screens': './src/screens',
          '@app/services': './src/services',
          '@app/logic': './src/tests',
          '@app/themes': './src/themes',
          '@app/utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
