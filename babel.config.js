module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          '@commons': './src/commons',
          '@domain': './src/domain',
          '@data': './src/data',
          '@presentation': './src/presentation',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
