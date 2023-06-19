const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production'
    return {
        devtool: isProduction ? false : 'source-map',
        entry: {
            main: './src/backend/scripts/main.js'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './scripts/[name].js',
        },
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
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sassOptions: {
                                    implementation: require('sass'),
                                },
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './styles/[name].css',
            }),
        ]
    }
}