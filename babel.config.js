module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 2,
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: [
    [
      '@babel/plugin-proposal-decorators', // @babel/plugin-proposal-decorators需要在@babel/plugin-proposal-class-properties之前
      {
        legacy: true, // 推荐
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true, // babel编译时，对class的属性采用赋值表达式，而不是Object.defineProperty（更简洁）
      },
    ],
    [
      '@babel/plugin-proposal-private-property-in-object',
      {
        loose: true,
      },
    ],
  ],
};
