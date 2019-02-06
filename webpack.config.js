const createConfig = require("./src/build/webpack-config-types");
const path = require("path");
const webpack = require("webpack");
const packageJson = require("./package.json");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ChunkRenamePlugin = require("./src/build/webpack-emoji-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env = { production: false, extraDefines: {} }, argv) => createConfig({
    entry: "./src/js/loader.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "cta🔥🔥🔥.js",
        chunkFilename: "[name]"
    },
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, "src"),
        stats: {
            chunks: false,
            maxModules: 0,
            entrypoints: true,
            chunkModules: false,
            chunkOrigins: false,
        },
        watchOptions: {
            ignored: /node_modules/g
        }
    },
    plugins: [
        ...(env.production ? [] : [new webpack.HotModuleReplacementPlugin()]),
        new webpack.DefinePlugin({
            $hideDebug: JSON.stringify(env.production && !(process.env.SHOW_DEBUG_TOOLS !== "false" && process.env.SHOW_DEBUG_TOOLS !== undefined)),
            $version: JSON.stringify(packageJson.version),
            $buildtime: JSON.stringify(Date.now()),
            ...env.extraDefines,
        }),
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new ChunkRenamePlugin({
            chunkFilename: "[emoji:6].js",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.txt$/,
                use: "raw-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader" },
                    { loader: "postcss-loader", options: {
                        plugins: [
                            require("cssnano")(),
                            require("autoprefixer")(),
                        ]
                    }}
                ]
            },
        ]
    },
    mode: env.production ? "production" : "development",
    devtool: env.production ? "none" : "inline-source-map",
    optimization: {
        minimizer: [
            // new TerserPlugin({
            //     cache: true,
            //     parallel: true,
            //     terserOptions: {
            //         ecma: 8,
            //         warnings: false,
            //         parse: {},
            //         compress: {
            //             arguments: true,
            //             drop_console: env.production,
            //             drop_debugger: env.production,
            //             ecma: 8,
            //             passes: env.production ? 25 : 1,
            //             toplevel: true,
            //             unsafe: true,
            //             unsafe_arrows: true,
            //             unsafe_comps: true,
            //             unsafe_Function: true,
            //             unsafe_math: true,
            //             unsafe_methods: true,
            //             unsafe_proto: true,
            //             unsafe_regexp: true,
            //             unsafe_undefined: true,
            //         },
            //         mangle: {
            //             eval: true,
            //             keep_classnames: false,
            //             keep_fnames: false,
            //             toplevel: true,
            //             safari10: false,
            //         },
            //         module: false,
            //         output: null,
            //         toplevel: true,
            //         nameCache: null,
            //         ie8: false,
            //         keep_classnames: false,
            //         keep_fnames: false,
            //         safari10: false,
            //     },
            // }),
        ],
    },
    resolve: {
        alias: {
            "@templates": __dirname + "/templates/",
            "@src": __dirname + "/src/js/",
            "@css": __dirname + "/src/css/",
            "@scenes": __dirname + "/scenes/",
            "@res": __dirname + "/res/"
        },
        extensions: [".js", ".jsx", ".json"]
    },
});