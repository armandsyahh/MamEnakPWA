const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js', 
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),

    new WorkboxWebpackPlugin.GenerateSW({
      swDest: 'sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev' && url.pathname.startsWith('/list'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurantapi',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 72 * 60 * 60,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev' && url.pathname.startsWith('/detail'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurantdetailapi',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 72 * 60 * 60,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev' && url.pathname.startsWith('/images/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'restaurantimages',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    }),
  ],
  devtool: 'source-map',
};
