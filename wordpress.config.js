const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const defaults = require('@wordpress/scripts/config/webpack.config')
const path = require('path')

// change these variables to fit your project
const outputPath = 'dist'
const entryPoints = {
  'script': './src/js/scripts.js',
}

const legacyScripts = {
  mode: 'production',
  entry: entryPoints,
  output: {
    path: path.resolve(__dirname, outputPath + '/js'),
    filename: '[name].min.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // ensure compatibility with older browsers
          },
        },
      },
      {
        test: /\.js$/,
        loader: 'webpack-remove-debug', // remove "debug" package
      },
      {
        test: /\.sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: { indentedSyntax: true },
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
        use: 'url-loader?limit=1024',
      },
    ],
  },
}

//With WP Scripts
const wp = {
  ...defaults,
  entry: {
    ...defaults.entry,
    'script-bundle': path.resolve(__dirname, '/src/index.js'),
    'script-bundle-admin': path.resolve(__dirname, '/src/admin/index.js'),
  },
  stats: {
    ...defaults.stats,
    errorDetails: true
  },
  output: {
    ...defaults.output,
    filename: '[name].js'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
}

module.exports = [wp, legacyScripts]