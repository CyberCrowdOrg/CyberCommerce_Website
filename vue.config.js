// const {defineConfig} = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    transpileDependencies: true,
    productionSourceMap: true,
    outputDir: "/Users/dawnton/Documents/mvp/dist",
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "/Users/dawnton/Documents/mvp/config",
                        to: "/Users/dawnton/Documents/mvp/dist",
                    },
                ],
            }),
            new ZipPlugin({
                path: '/Users/dawnton/Documents/mvp',//路径名
                filename: 'dist.zip',//打包名
                pathPrefix:"dist",
                exclude: [/\.DS_Store$/,],
            }),
            new CompressionPlugin({
                filename: '[path][base].gz',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            }),
            new NodePolyfillPlugin()
        ],
    }
}
