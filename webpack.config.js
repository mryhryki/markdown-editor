const path = require('path')
const { GenerateSW } = require('workbox-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new GenerateSW({
      swDest: path.resolve(__dirname, 'sw.js'),
      runtimeCaching: [
        {
          handler: 'NetworkFirst',
          urlPattern: /.*/,
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: 'dist/',
  },
  devServer: {
    hot: true,
    open: true,
  },
}
