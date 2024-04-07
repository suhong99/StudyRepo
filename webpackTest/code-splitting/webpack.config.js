var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none', // production, development, none
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // 모든 css 파일에 대해서 style-loader와 css-loader 적용
        test: /\.css$/,
        // 순서도 중요함 -> 오른쪽에서 왼쪽으로 실행
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // plugins: [
  //   new MiniCssExtractPlugin()
  // ],
};
