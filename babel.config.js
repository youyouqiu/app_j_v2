module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      root: ['./src'],
      extensions: [
        '.js', '.ts', '.tsx',
        '.ios.js', '.ios.ts', '.ios.tsx',
        '.android.js', '.android.ts', '.android.tsx']
    }],
    '@babel/plugin-transform-runtime',
  ]
}
